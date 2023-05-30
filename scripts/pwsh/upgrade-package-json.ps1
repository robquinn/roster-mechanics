
# upgrades all packages in package json under $keyToUpgrade
# $keyToUpgrade = 'dependencies'
$keyToUpgrade = 'devDependencies'
$keysWithFiller = Get-Content .\package.json | jq  ".$keyToUpgrade | keys" | ForEach-Object {$_ -match '[a-z]*[\-]*[a-z]*' ? $_ -replace '(\[|\]|\{|\}|\,|\"|`n)*','' : ''}   
$keys = $keysWithFiller | Where-Object { $_ } | Select -Unique     
$latestArray = $keys | ForEach-Object {"$_@latest"} 
$latest = $latestArray.Trim() -join " "
$command = Write-Output "npm i -D ${latest}"
Write-output $command
# Invoke-Expression -Command $command