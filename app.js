import { TrezorConnectTest } from './TrezorConnectTest'

const trezorConnectTest = TrezorConnectTest()
trezorConnectTest.init()
document.getElementById('sign-transaction-btn').onclick = async () => {
  const response = await trezorConnectTest.signTransaction()
  document.getElementById('result').innerHTML = '<p>Tx hash: ' +  response.payload.hash + '</p><p>Tx body: ' + response.payload.serializedTx + '</p>'
}
document.getElementById('verify-address-btn').onclick = async () => {
  const response = await trezorConnectTest.verifyAddress()
  document.getElementById('result').innerHTML = '<p>Address: ' +  response.payload.address
}
