cd C:\git\chess4you_angular\tour-of-heroes
git pull
start /wait cmd.exe /c "npm install && npm audit fix"
start /wait cmd.exe /c "sonar-scanner -Dsonar.host.url=https://sonarcloud.io -Dsonar.login=d65fbeeaf3452e667aa3aa7c0fdb080b59638407 -Dsonar.organization=bliblob-github -Dsonar.projectKey=Bliblob_chess4you_angular -Dsonar.projectName=Bliblob_chess4you_angular -Dsonar.projectVersion=1.0 -Dsonar.sourceEncoding=UTF-8 -Dsonar.sources=src -Dsonar.exclusions=**/node_modules/**,**/*.spec.ts -Dsonar.tests=src -Dsonar.test.inclusions=**/*.spec.ts -Dsonar.typescript.lcov.reportPaths=coverage/lcov.info"
start /wait cmd.exe /c "npm run deploy"
exit 0