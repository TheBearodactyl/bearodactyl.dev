$bitrate = "8k"

Get-ChildItem -Path . -Filter *.mp3 | ForEach-Object {
  $inputFile = $_.FullName
  $tempOutputFile = "$($_.BaseName)_temp_output.mp3"

  ffmpeg -i "$inputFile" -b:a $bitrate -map a "$tempOutputFile"

  if (Test-Path "$tempOutputFile")
  {
    Remove-Item "$inputFile"
    Rename-Item "$tempOutputFile" "$inputFile"
  } else
  {
    Write-Warning "Conversion failed for $inputFile"
  }
}

