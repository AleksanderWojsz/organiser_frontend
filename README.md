
```sh
npm run dev
```

npm install --save @capacitor/core @capacitor/cli
npm cap init
npm install @capacitor/android
npm install capacitor-resources
npm install @capacitor/keyboard

npm run build

npx cap add android / npx cap sync android

Put icons in the @/resources folder and run
npm run resources

open the `android` folder in android studio. Then build -> build app bundle -> build apk

if there is an error: `splash.9.png: AAPT: error: file failed to compile.`
then remove `.9` from the filename