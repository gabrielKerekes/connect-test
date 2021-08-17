import TrezorConnect, {
  DEVICE_EVENT,
  DEVICE,
  CardanoAddressType,
  CardanoNativeScriptType,
  CardanoNativeScriptHashDisplayFormat
} from "trezor-connect";

// import TrezorConnect, * as TrezorTypes from 'trezor-connect';

const SAMPLE_INPUTS = {
  simple_input: {
    path: "m/1852'/1815'/0'/0/0",
    prev_hash:
      "3b40265111d8bb3c3c608d95b3a0bf83461ace32d79336579a1939b3aad1c0b7",
    prev_index: 0,
  },
};

const SAMPLE_OUTPUTS = {
  simple_output: {
    address:
      "61a6274badf4c9ca583df893a73139625ff4dc73aaa3082e67d6d5d08e0ce3daa4",
    amount: "1",
  },
  simple_change_output: {
    addressParameters: {
      address_type: 0,
      address_n: "m/1852'/1815'/0'/0/0",
    },
    amount: "7120787",
  },
  staking_key_hash_output: {
    addressParameters: {
      address_type: 0,
      address_n: "m/1852'/1815'/0'/0/0",
      stakingKeyHash:
        "32c728d3861e164cab28cb8f006448139c8f1740ffb8e7aa9e5232dc",
    },
    amount: "7120787",
  },
  pointer_address_output: {
    addressParameters: {
      address_type: 1,
      address_n: "m/1852'/1815'/0'/0/0",
      pointer: { block_index: 1, tx_index: 2, certificate_index: 3 },
    },
    amount: "7120787",
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
    pool: "f61c42cbf7c8c53af3f520508212ad3e72f674f957fe23ff0acb49733c37b8f6",
  },
};

const testTrx = [
  {
    inputs: [SAMPLE_INPUTS["simple_input"]],
    outputs: [SAMPLE_OUTPUTS["simple_output"]],
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
      "3b40265111d8bb3c3c608d95b3a0bf83461ace32d79336579a1939b3aad1c0b7",
    prev_index: 0,
  };
};

export const TrezorConnectTest = () => {
  const init = () => {
    TrezorConnect.init({
      connectSrc: "https://localhost:8088/",
      lazyLoad: false, // this param will prevent iframe injection until TrezorConnect.method will be called
      iframeSrc: "https://localhost:8088/",
      debug: true,
      manifest: {
        email: "gabriel.kerekes@vacuumlabs.com",
        appUrl: "http://example.com",
      },
    });
    // TrezorConnect.manifest({
    //   email: 'gabriel.kerekes@vacuumlabs.com',
    //   appUrl: 'http://example.com',
    // })

    console.log(TrezorConnect);
  };

  const getNativeScriptHash = async () => {
    let response = await TrezorConnect.cardanoGetNativeScriptHash({
      script: {
        type: CardanoNativeScriptType.ALL,
        scripts: [
          {
            type: CardanoNativeScriptType.PUB_KEY,
            keyHash: "c4b9265645fde9536c0795adbcc5291767a0c61fd62448341d7e0386",
          },
          {
            type: CardanoNativeScriptType.PUB_KEY,
            keyPath: "m/1854'/1815'/0'/0/0",
          },
          {
            type: CardanoNativeScriptType.ANY,
            scripts: [
              {
                type: CardanoNativeScriptType.PUB_KEY,
                keyPath: "m/1854'/1815'/0'/0/0",
              },
              {
                type: CardanoNativeScriptType.PUB_KEY,
                keyHash:
                  "0241f2d196f52a92fbd2183d03b370c30b6960cfdeae364ffabac889",
              },
            ],
          },
          {
            type: CardanoNativeScriptType.N_OF_K,
            requiredSignaturesCount: 2,
            scripts: [
              {
                type: CardanoNativeScriptType.PUB_KEY,
                keyPath: "m/1854'/1815'/0'/0/0",
              },
              {
                type: CardanoNativeScriptType.PUB_KEY,
                keyHash:
                  "0241f2d196f52a92fbd2183d03b370c30b6960cfdeae364ffabac889",
              },
              {
                type: CardanoNativeScriptType.PUB_KEY,
                keyHash:
                  "cecb1d427c4ae436d28cc0f8ae9bb37501a5b77bcc64cd1693e9ae20",
              },
            ],
          },
          {
            type: CardanoNativeScriptType.INVALID_BEFORE,
            invalidBefore: 100,
          },
          {
            type: CardanoNativeScriptType.INVALID_HEREAFTER,
            invalidHereafter: 200,
          },
        ],
      },
      displayFormat: CardanoNativeScriptHashDisplayFormat.POLICY_ID,
    });
    return response;
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
          showOnTrezor: false,
        },
        // {
        //   addressParameters: {
        //     addressType: 8,
        //     path: "m/44'/1815'/4'/0/0",
        //   },
        //   protocolMagic: 764824073,
        //   networkId: 1,
        // },
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
      inputs: [
        {
          path: "m/44'/1815'/0'/0/0",
          prev_hash:
            "3b40265111d8bb3c3c608d95b3a0bf83461ace32d79336579a1939b3aad1c0b7",
          prev_index: 0,
        },
      ],
      outputs: [
        // {
        //   path: "m/44'/1815'/0'/0/0",
        //   amount: "10"
        // },
        {
          address:
            "addr1q84sh2j72ux0l03fxndjnhctdg7hcppsaejafsa84vh7lwgmcs5wgus8qt4atk45lvt4xfxpjtwfhdmvchdf2m3u3hlsd5tq5r",
          amount: "1",
        },
        {
          address:
            "addr1q84sh2j72ux0l03fxndjnhctdg7hcppsaejafsa84vh7lwgmcs5wgus8qt4atk45lvt4xfxpjtwfhdmvchdf2m3u3hlsd5tq5r",
          amount: "1",
          tokenBundle: [
            {
              policyId:
                "95a292ffee938be03e9bae5657982a74e9014eb4960108c9e23a5b39",
              tokenAmounts: [
                {
                  assetNameBytes: "74652474436f696e",
                  amount: "7878754",
                },
                {
                  assetNameBytes: "74652474436f696f",
                  amount: "1200",
                },
              ],
            },
            {
              policyId:
                "95a292ffee938be03e9bae5657982a74e9014eb4960108c9e23a5b38",
              tokenAmounts: [
                {
                  assetNameBytes: "75652474436f696a",
                  amount: "7878754",
                },
                {
                  assetNameBytes: "75652474436f696f",
                  amount: "1300",
                },
              ],
            },
          ],
        },
        // {
        //   addressParameters: {
        //     addressType: 0,
        //     path: "m/1852'/1815'/0'/0/0",
        //     stakingPath: "m/1852'/1815'/0'/2/0",
        //   },
        //   amount: '7120787',
        // },
      ],
      certificates: [
        // {
        //   type: 0,
        //   path: "m/1852'/1815'/0'/2/0",
        // },
        // {
        //   type: 3,
        //   poolParameters: {
        //     poolId: "f61c42cbf7c8c53af3f520508212ad3e72f674f957fe23ff0acb4973",
        //     vrfKeyHash:
        //       "198890ad6c92e80fbdab554dda02da9fb49d001bbd96181f3e07f7a6ab0d0640",
        //     pledge: "500000000",
        //     cost: "340000000",
        //     margin: {
        //       numerator: "1",
        //       denominator: "2",
        //     },
        //     rewardAccount:
        //       "stake1uya87zwnmax0v6nnn8ptqkl6ydx4522kpsc3l3wmf3yswygwx45el",
        //     owners: [
        //       { stakingKeyPath: "m/1852'/1815'/0'/2/0" },
        //       {
        //         stakingKeyHash:
        //           "3a7f09d3df4cf66a7399c2b05bfa234d5a29560c311fc5db4c490711",
        //       },
        //     ],
        //     relays: [
        //       {
        //         type: 0,
        //         ipv4Address: "192.168.0.1",
        //         ipv6Address: "2001:0db8:85a3:0000:0000:8a2e:0370:7334",
        //         port: 1234,
        //       },
        //       {
        //         type: 0,
        //         ipv6Address: "2001:0db8:85a3:0000:0000:8a2e:0370:7334",
        //         port: 1234,
        //       },
        //       { type: 0, ipv4Address: "192.168.0.1", port: 1234 },
        //       { type: 1, hostName: "www.test.test", port: 1234 },
        //       { type: 2, hostName: "www.test2.test" },
        //     ],
        //     metadata: {
        //       url: "https://www.test.test",
        //       hash: "914c57c1f12bbf4a82b12d977d4f274674856a11ed4b9b95bd70f5d41c5064a6",
        //     },
        //   },
        // },
      ],
      // withdrawals: [
      //   {
      //     path: "m/1852'/1815'/0'/2/0",
      //     amount: '7120787',
      //   },
      // ],
      // auxiliaryData: {
      //   hash:
      //     'ea4c91860dd5ec5449f8f985d227946ff39086b17f10b5afb93d12ee87050b6a',
      // },
      auxiliaryData: {
        // blob:
        //   'a100a201590960aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa1864a118c8430a141e',
        catalystRegistrationParameters: {
          votingPublicKey:
            "1af8fa0b754ff99253d983894e63a2b09cbb56c833ba18c3384210163f63dcfc",
          stakingPath: "m/1852'/1815'/0'/2/0",
          rewardAddressParameters: {
            addressType: 0,
            path: "m/1852'/1815'/0'/0/0",
            stakingPath: "m/1852'/1815'/0'/2/0",
          },
          nonce: "10",
        },
      },
      fee: "42",
      ttl: "10",
      protocolMagic: 764824073,
      networkId: 1,
      signingMode: 0,
    };

    const NUMBER_OF_INPUTS = 1;

    // console.log({
    //   // a: TrezorTypes.CardanoAddressType.BASE,
    //   b: TrezorTypes.CARDANO.CERTIFICATE_TYPE,
    // });

    // for (var i = 0; i < NUMBER_OF_INPUTS; i++) {
    //   tx.inputs.push(getInput(i));
    // }
    // console.log(tx);

    let response = await TrezorConnect.cardanoSignTransaction(tx);
    // let response = await TrezorConnect.getFeatures()
    console.log({ response });
    return response;
    // return null;
  };

  return {
    init,
    signTransaction,
    verifyAddress,
    getNativeScriptHash,
  };
};
