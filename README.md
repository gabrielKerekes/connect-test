# connect-test

This is a project meant mainly for testing out the functionality of Trezor Connect. I've also used it to test the memory limits of the Trezor device.

## Setup

You need a local copy of [Trezor Connect](https://github.com/trezor/connect).

### In the Trezor Connect folder

Build it as npm package:

```
yarn
yarn build:npm
```

### In this project folder

Update the `trezor-connect` dependency path in `package.json`. E.g.:

```
"trezor-connect": "file:/home/gabriel/repos/cardano/connect/npm",
```

Finally initialize yarn:

```
yarn
```

## Running

Trezor Connect needs to be running locally on port `8080`:

```
cd [LOCAL_TREZOR_CONNECT_PATH]
yarn dev
```

Then you can simply run in this project's folder:

```
yarn build
```

Navigating to `localhost:3000` should reveal the app.

In order to work with an emulator `trezord` needs to be running with the 21324 port:

```
trezord -e 21324
```

## Modifying

The amount of inputs added to the transaction is controlled by the `NUMBER_OF_INPUTS` variable in `TrezorConnectTest.js`.
