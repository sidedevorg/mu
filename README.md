# mu - mac utilities

![mu - mac utilities](https://raw.githubusercontent.com/sidedevorg/mu/master/muTemplate32x32%402x.png)

## Installation

Download [last version](https://github.com/sidedevorg/mu/raw/master/bin/mu-darwin-x64/mu.dmg) of mu.dmg, mount and move mu.app to **/Applications** folder.

## Run and build from source

Clone repo, and install dependencies:

```shell
npm install
```

Run app:

```shell
npm start
```

Build process need **electron-packager** and **appdmg** to run:

```shell
npm install -g electron-packager
npm install -g appdmg
```

Exec build script on root folder:

```shell
sh build.sh
```

mu.dmg is generate on **bin/mu-darwin-x64/mu.dmg** route.

## License
This software is released under the [MIT license](https://github.com/sidedevorg/mu/blob/master/LICENSE)

