import TrezorConnect, { DEVICE_EVENT, DEVICE } from 'trezor-connect';

const SAMPLE_INPUTS = {
  simple_input: {
    path: "m/1852'/1815'/0'/0/0",
    prev_hash:
      '3b40265111d8bb3c3c608d95b3a0bf83461ace32d79336579a1939b3aad1c0b7',
    prev_index: 0,
  },
};

const SAMPLE_OUTPUTS = {
  simple_output: {
    address:
      '61a6274badf4c9ca583df893a73139625ff4dc73aaa3082e67d6d5d08e0ce3daa4',
    amount: '1',
  },
  simple_change_output: {
    addressParameters: {
      address_type: 0,
      address_n: "m/1852'/1815'/0'/0/0",
    },
    amount: '7120787',
  },
  staking_key_hash_output: {
    addressParameters: {
      address_type: 0,
      address_n: "m/1852'/1815'/0'/0/0",
      stakingKeyHash:
        '32c728d3861e164cab28cb8f006448139c8f1740ffb8e7aa9e5232dc',
    },
    amount: '7120787',
  },
  pointer_address_output: {
    addressParameters: {
      address_type: 1,
      address_n: "m/1852'/1815'/0'/0/0",
      pointer: { block_index: 1, tx_index: 2, certificate_index: 3 },
    },
    amount: '7120787',
  },
};

const SAMPLE_CERTIFICATES = {
  stake_registration: {
    type: 17,
    path: "m/1852'/1815'/0'/2/0",
  },
  stake_deregistration: {
    type: 34,
    path: "m/1852'/1815'/0'/2/0",
  },
  stake_delegation: {
    type: 51,
    path: "m/1852'/1815'/0'/2/0",
    pool: 'f61c42cbf7c8c53af3f520508212ad3e72f674f957fe23ff0acb49733c37b8f6',
  },
};

const testTrx = [
  {
    inputs: [SAMPLE_INPUTS['simple_input']],
    outputs: [SAMPLE_OUTPUTS['simple_output']],
    fee: 42,
    ttl: 10,
    // certificates: [],
    protocol_magic: 0,
  },
];

const getInput = (i) => {
  return {
    path: `m/1852'/1815'/0'/0/${i}`,
    prev_hash:
      '3b40265111d8bb3c3c608d95b3a0bf83461ace32d79336579a1939b3aad1c0b7',
    prev_index: 0,
  };
};

export const TrezorConnectTest = () => {
  const init = () => {
    TrezorConnect.init({
      connectSrc: 'https://localhost:8088/',
      lazyLoad: false, // this param will prevent iframe injection until TrezorConnect.method will be called
      manifest: {
        email: 'test@test.com',
        appUrl: 'http://example.com',
      },
      // iframeSrc: 'https://localhost:8088/'
      debug: true,
    });

    console.log(TrezorConnect);
  };

  const verifyAddress = async () => {
    let response = await TrezorConnect.cardanoGetAddress({
      bundle: [
        {
          addressParameters: {
            addressType: 0,
            path: "m/1852'/1815'/4'/0/0",
            stakingPath: "m/1852'/1815'/4'/2/0",
            // stakingKeyHash: '1bc428e4720732ebd5dab4fb175324c192dc9bb76cc5da956e3c8dff',
            // certificate_pointer: {
            //   block_index: 24157,
            //   tx_index: 177,
            //   certificate_index: 42,
            // },
            //staking_key_hash: "0000000000000000000000000000000000000000000000000000000000000000"
          },
          protocolMagic: 764824073,
          networkId: 1,
        },
        {
          addressParameters: {
            addressType: 8,
            path: "m/44'/1815'/4'/0/0",
          },
          protocolMagic: 764824073,
          networkId: 1,
        },
      ],
    });
    // let response = await TrezorConnect.cardanoGetAddress({
    //   path: "m/44'/1815'/4'/0/0",
    //   protocolMagic: 764824073,
    // });
    // let response = await TrezorConnect.cardanoGetAddress({
    //   path: "m/44'/1815'/0'/0/0",
    //   protocolMagic: 42,
    //   showOnTrezor: true,
    // });
    console.log(response);
    return response;
  };

  const signTransaction = async () => {
    var tx = {
      inputs: [],
      outputs: [
        // {
        //   path: "m/44'/1815'/0'/0/0",
        //   amount: "10"
        // },
        {
          address:
            'Ae2tdPwUPEZCanmBz5g2GEwFqKTKpNJcGYPKfDxoNeKZ8bRHr8366kseiK2',
          amount: '200012313111',
        },
        {
          addressParameters: {
            addressType: 0,
            path: "m/1852'/1815'/0'/0/0",
            stakingPath: "m/1852'/1815'/0'/2/0",
          },
          amount: '7120787',
        },
      ],
      certificates: [
        // {
        //   type: 0,
        //   path: "m/1852'/1815'/0'/2/0",
        // },
      ],
      withdrawals: [
        // {
        //   path: "m/1852'/1815'/0'/2/0",
        //   amount: '7120787',
        // },
      ],
      // metadata:
      //   'a200a11864a118c843aa00ff01a119012c590100aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
      fee: '4000',
      ttl: '1233',
      protocolMagic: 764824073,
      networkId: 1,
    };

    const NUMBER_OF_INPUTS = 25;

    for (var i = 0; i < NUMBER_OF_INPUTS; i++) {
      tx.inputs.push(getInput(i));
    }
    console.log(tx);

    let response = await TrezorConnect.cardanoSignTransaction(tx);
    return response;
  };

  return {
    init,
    signTransaction,
    verifyAddress,
  };
};
