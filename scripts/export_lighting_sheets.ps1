param(
  [Parameter(Mandatory = $true)]
  [string[]] $WorkbookPaths,
  [Parameter(Mandatory = $true)]
  [string] $OutputDirectory
)

$ErrorActionPreference = 'Stop'
$outputRoot = [System.IO.Path]::GetFullPath($OutputDirectory)
[System.IO.Directory]::CreateDirectory($outputRoot) | Out-Null

$workbookSheets = @(
  @('dining-pendant', 'resin-light'),
  @(
    'small-pendant',
    'large-chandelier',
    'alabaster-small-pendant',
    'alabaster-chandelier',
    'alabaster-table-floor',
    'alabaster-ceiling'
  )
)

for ($workbookIndex = 0; $workbookIndex -lt $WorkbookPaths.Count; $workbookIndex += 1) {
  $resolvedWorkbook = [System.IO.Path]::GetFullPath($WorkbookPaths[$workbookIndex])
  $slugs = $workbookSheets[$workbookIndex]

  for ($sheetIndex = 1; $sheetIndex -le $slugs.Count; $sheetIndex += 1) {
    $slug = $slugs[$sheetIndex - 1]
    $pdfPath = Join-Path $outputRoot "$slug.pdf"
    if (Test-Path -LiteralPath $pdfPath) {
      Write-Output "$sheetIndex|$slug|existing"
      continue
    }
    $excel = $null
    $workbook = $null
    $worksheet = $null
    $usedRange = $null

    try {
      for ($launchAttempt = 1; $launchAttempt -le 6; $launchAttempt += 1) {
        try {
          $excel = New-Object -ComObject Excel.Application
          break
        }
        catch {
          if ($launchAttempt -eq 6) { throw }
          Start-Sleep -Seconds (2 * $launchAttempt)
        }
      }
      $excel.Visible = $false
      $excel.DisplayAlerts = $false
      $excel.ScreenUpdating = $false
      $workbook = $excel.Workbooks.Open($resolvedWorkbook, 0, $true)
      $worksheet = $workbook.Worksheets.Item($sheetIndex)
      $usedRange = $worksheet.UsedRange

      $worksheet.PageSetup.PrintArea = $usedRange.Address()
      $worksheet.PageSetup.Zoom = $false
      $worksheet.PageSetup.FitToPagesWide = 1
      $worksheet.PageSetup.FitToPagesTall = $false
      $worksheet.PageSetup.Orientation = 2 # xlLandscape
      $worksheet.PageSetup.CenterHorizontally = $true
      $worksheet.PageSetup.LeftMargin = $excel.InchesToPoints(0.2)
      $worksheet.PageSetup.RightMargin = $excel.InchesToPoints(0.2)
      $worksheet.PageSetup.TopMargin = $excel.InchesToPoints(0.25)
      $worksheet.PageSetup.BottomMargin = $excel.InchesToPoints(0.25)
      $worksheet.PageSetup.HeaderMargin = 0
      $worksheet.PageSetup.FooterMargin = 0

      $worksheet.ExportAsFixedFormat(0, $pdfPath, 0, $true, $false)
      Start-Sleep -Seconds 2
      Write-Output "$sheetIndex|$slug|$pdfPath"
    }
    finally {
      if ($workbook) { try { $workbook.Close($false) } catch { } }
      if ($excel) { try { $excel.Quit() } catch { } }
      if ($usedRange) { [System.Runtime.InteropServices.Marshal]::ReleaseComObject($usedRange) | Out-Null }
      if ($worksheet) { [System.Runtime.InteropServices.Marshal]::ReleaseComObject($worksheet) | Out-Null }
      if ($workbook) { [System.Runtime.InteropServices.Marshal]::ReleaseComObject($workbook) | Out-Null }
      if ($excel) { [System.Runtime.InteropServices.Marshal]::ReleaseComObject($excel) | Out-Null }
      [GC]::Collect()
      [GC]::WaitForPendingFinalizers()
      Start-Sleep -Seconds 2
    }
  }
}
