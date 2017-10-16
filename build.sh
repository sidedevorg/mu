# Requirements:
#
# npm install -g electron-packager
# npm install -g appdmg
#
# sh build.sh
#
electron-packager ./ --platform=darwin --arch=x64 --overwrite --version=0.0.1 --icon=mu.icns --out=bin &&
appdmg appdmg.json bin/mu-darwin-x64/mu.dmg &&
rm -r bin/mu-darwin-x64/mu.app