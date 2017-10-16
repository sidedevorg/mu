# Requirements:
# npm install -g electron-packager
#
# sh build.sh
#
electron-packager ./ --platform=darwin --arch=x64 --overwrite --version=0.0.1 --icon=mu.icns --out=bin &&
mkdir bin/mu-darwin-x64/dmg &&
ln -s /Applications bin/mu-darwin-x64/dmg/Applications &&
mv bin/mu-darwin-x64/mu.app bin/mu-darwin-x64/dmg/mu.app &&
hdiutil create bin/mu-darwin-x64/mu.dmg -srcfolder bin/mu-darwin-x64/dmg &&
rm -r bin/mu-darwin-x64/dmg