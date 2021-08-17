import { TrezorConnectTest } from './TrezorConnectTest';

const trezorConnectTest = TrezorConnectTest();
trezorConnectTest.init();

document.getElementById('sign-transaction-btn').onclick = async () => {
  const response = await trezorConnectTest.signTransaction();
  document.getElementById('result').innerHTML =
    '<p>Tx hash: ' +
    response.payload.hash +
    '</p><p>Tx body: ' +
    response.payload.serializedTx +
    '</p>';
  document.getElementById('resultJSON').innerHTML = JSON.stringify(response, null, 2)
};

document.getElementById('verify-address-btn').onclick = async () => {
  const response = await trezorConnectTest.verifyAddress();
  document.getElementById('result').innerHTML =
    '<p>Address: ' + response.payload.address;
};

document.getElementById('get-native-script-hash-btn').onclick = async () => {
  const response = await trezorConnectTest.getNativeScriptHash();
  document.getElementById('result').innerHTML =
    '<p>Script hash: ' + response.payload.scriptHash;
};
