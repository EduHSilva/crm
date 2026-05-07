#!/usr/bin/env bash
set -euo pipefail

# Usage:
#   MODE=debug bash ./scripts/build-android-apk.sh
#   MODE=release KEYSTORE_PATH=/abs/path/keystore.jks KEYSTORE_PASSWORD=*** KEY_ALIAS=*** KEY_PASSWORD=*** bash ./scripts/build-android-apk.sh

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

MODE="${MODE:-debug}"

if [[ "$MODE" != "debug" && "$MODE" != "release" ]]; then
  echo "Invalid MODE: $MODE (use debug or release)"
  exit 1
fi

echo "1) Generating static web build..."
npm run generate

if [[ ! -d "$ROOT_DIR/android" ]]; then
  echo "2) Android project not found. Creating with Capacitor..."
  npx cap add android
fi

echo "3) Syncing web assets into Android project..."
npx cap sync android

ANDROID_DIR="$ROOT_DIR/android"
cd "$ANDROID_DIR"

GRADLEW="./gradlew"
if [[ ! -f "$GRADLEW" ]]; then
  echo "Could not find ./gradlew inside android/"
  exit 1
fi

if [[ "$MODE" == "debug" ]]; then
  echo "4) Building debug APK..."
  "$GRADLEW" assembleDebug
  APK_PATH="$ANDROID_DIR/app/build/outputs/apk/debug/app-debug.apk"
  echo "Done. Debug APK:"
  echo "$APK_PATH"
  exit 0
fi

echo "4) Building release APK (unsigned)..."
"$GRADLEW" assembleRelease

UNSIGNED_APK="$ANDROID_DIR/app/build/outputs/apk/release/app-release-unsigned.apk"
ALIGNED_APK="$ANDROID_DIR/app/build/outputs/apk/release/app-release-aligned.apk"
SIGNED_APK="$ANDROID_DIR/app/build/outputs/apk/release/app-release-signed.apk"

if [[ ! -f "$UNSIGNED_APK" ]]; then
  echo "Unsigned release APK not found at: $UNSIGNED_APK"
  exit 1
fi

: "${KEYSTORE_PATH:?KEYSTORE_PATH is required in release mode}"
: "${KEYSTORE_PASSWORD:?KEYSTORE_PASSWORD is required in release mode}"
: "${KEY_ALIAS:?KEY_ALIAS is required in release mode}"
: "${KEY_PASSWORD:?KEY_PASSWORD is required in release mode}"

if [[ -z "${ANDROID_HOME:-}" ]]; then
  echo "ANDROID_HOME is not set."
  exit 1
fi

BUILD_TOOLS_DIR="$(ls -d "$ANDROID_HOME"/build-tools/* 2>/dev/null | sort -V | tail -n 1 || true)"
if [[ -z "$BUILD_TOOLS_DIR" ]]; then
  echo "Android build-tools not found under ANDROID_HOME/build-tools"
  exit 1
fi

ZIPALIGN="$BUILD_TOOLS_DIR/zipalign"
APKSIGNER="$BUILD_TOOLS_DIR/apksigner"

if [[ ! -x "$ZIPALIGN" || ! -x "$APKSIGNER" ]]; then
  echo "zipalign/apksigner not executable in: $BUILD_TOOLS_DIR"
  exit 1
fi

echo "5) Aligning APK..."
"$ZIPALIGN" -f 4 "$UNSIGNED_APK" "$ALIGNED_APK"

echo "6) Signing APK..."
"$APKSIGNER" sign \
  --ks "$KEYSTORE_PATH" \
  --ks-key-alias "$KEY_ALIAS" \
  --ks-pass "pass:$KEYSTORE_PASSWORD" \
  --key-pass "pass:$KEY_PASSWORD" \
  --out "$SIGNED_APK" \
  "$ALIGNED_APK"

echo "7) Verifying signed APK..."
"$APKSIGNER" verify "$SIGNED_APK"

echo "Done. Signed APK:"
echo "$SIGNED_APK"
