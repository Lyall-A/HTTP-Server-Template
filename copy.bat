@echo off
set /p name=Enter name: 

mkdir "../%name%"

xcopy "./app" "../%name%/app" /s /e /i

copy "./index.js" "../%name%/index.js"
copy "./app.js" "../%name%/app.js"
copy "./server.json" "../%name%/server.json"

timeout /t 5