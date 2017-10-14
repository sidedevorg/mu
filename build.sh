# Requirements:
# npm install -g electron-packager
#
# sh build.sh
#
electron-packager ./ --platform=darwin --arch=x64 --overwrite --version=0.0.1 --icon=./mu.icns &&
mkdir mu-darwin-x64/dmg &&
ln -s /Applications mu-darwin-x64/dmg/Applications &&
mv mu-darwin-x64/mu.app mu-darwin-x64/dmg/mu.app &&
hdiutil create mu-darwin-x64/mu.dmg -srcfolder mu-darwin-x64/dmg &&
rm -r mu-darwin-x64/dmg