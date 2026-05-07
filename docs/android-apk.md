# Android APK build (Capacitor)

This project can generate:
- Debug APK (for tests)
- Signed Release APK (for distribution)

## Prerequisites

- Node.js + npm
- Java JDK (17+ recommended)
- Android SDK with `build-tools` installed
- `ANDROID_HOME` configured
- Bash shell (Linux/macOS/WSL/Git Bash)

## First setup

```bash
npm install
npm run android:init
```

## Build debug APK

```bash
MODE=debug bash ./scripts/build-android-apk.sh
```

Output:

`android/app/build/outputs/apk/debug/app-debug.apk`

## Build signed release APK

```bash
MODE=release \
KEYSTORE_PATH=/absolute/path/your-keystore.jks \
KEYSTORE_PASSWORD=your_keystore_password \
KEY_ALIAS=your_key_alias \
KEY_PASSWORD=your_key_password \
bash ./scripts/build-android-apk.sh
```

Output:

`android/app/build/outputs/apk/release/app-release-signed.apk`

## Notes

- The script runs `npm run generate` and `npx cap sync android` automatically.
- API calls stay online-first; no offline data sync is configured.
