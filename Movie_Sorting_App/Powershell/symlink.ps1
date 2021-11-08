param ($linkfolder, $basefolder)
write-host "Link folder: $linkfolder  Base folder: $basefolder"

$folderNames =  Get-ChildItem -Path $basefolder  -Recurse -Directory -Force -ErrorAction SilentlyContinue | ForEach-Object Name 
# $fullPath = $folderName.Name
# New-Item -ItemType HardLink -Path "$linkfolder\$fullPath" -Target "$basefolder\$fullPath"
# mklink /J "$linkfolder\$fullPath" Target "$basefolder\$fullPath"
# write-host $folderNames
foreach ($name in $folderNames)
{
    # write-host $name
    New-Item -ItemType Junction -Path "$linkfolder\[Nmov]-$name" -Target "$basefolder\$name"
}
