import TrezorConnect, {
  DEVICE_EVENT,
  DEVICE,
  CardanoAddressType,
  CardanoNativeScriptType,
  CardanoNativeScriptHashDisplayFormat,
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

const ADDRESS_PARAMS = {
  base: {
    addressType: CardanoAddressType.BASE,
    path: "m/1852'/1815'/0'/0/0",
    stakingPath: "m/1852'/1815'/0'/2/0",
  },
  baseMismatch: {
    addressType: CardanoAddressType.BASE,
    path: "m/1852'/1815'/0'/0/0",
    stakingPath: "m/1852'/1815'/1'/2/0",
  },
  basePaymentUnusual: {
    addressType: CardanoAddressType.BASE,
    path: "m/1852'/1815'/101'/0/0",
    stakingPath: "m/1852'/1815'/0'/2/0",
  },
  baseStakingUnusual: {
    addressType: CardanoAddressType.BASE,
    path: "m/1852'/1815'/101'/0/0",
    stakingPath: "m/1852'/1815'/101'/2/0",
  },
  baseBothUnusualAndMismatch: {
    addressType: CardanoAddressType.BASE,
    path: "m/1852'/1815'/101'/0/0",
    stakingPath: "m/1852'/1815'/102'/2/0",
  },
  baseStakingKeyHash: {
    addressType: CardanoAddressType.BASE,
    path: "m/1852'/1815'/0'/0/0",
    stakingKeyHash: "1bc428e4720732ebd5dab4fb175324c192dc9bb76cc5da956e3c8dff",
  },
  baseKeyScript: {
    addressType: CardanoAddressType.BASE_KEY_SCRIPT,
    path: "m/1852'/1815'/0'/0/0",
    stakingScriptHash:
      "1bc428e4720732ebd5dab4fb175324c192dc9bb76cc5da956e3c8dff",
  },
  baseKeyScriptUnusual: {
    addressType: CardanoAddressType.BASE_KEY_SCRIPT,
    path: "m/1852'/1815'/101'/0/0",
    stakingScriptHash:
      "1bc428e4720732ebd5dab4fb175324c192dc9bb76cc5da956e3c8dff",
  },
  baseScriptKey: {
    addressType: CardanoAddressType.BASE_SCRIPT_KEY,
    paymentScriptHash:
      "1bc428e4720732ebd5dab4fb175324c192dc9bb76cc5da956e3c8dff",
    stakingPath: "m/1852'/1815'/0'/2/0",
  },
  baseScriptKey: {
    addressType: CardanoAddressType.BASE_SCRIPT_KEY,
    paymentScriptHash:
      "1bc428e4720732ebd5dab4fb175324c192dc9bb76cc5da956e3c8dff",
    stakingPath: "m/1852'/1815'/0'/2/0",
  },
  baseScriptKeyUnusual: {
    addressType: CardanoAddressType.BASE_SCRIPT_KEY,
    paymentScriptHash:
      "1bc428e4720732ebd5dab4fb175324c192dc9bb76cc5da956e3c8dff",
    stakingPath: "m/1852'/1815'/101'/2/0",
  },
  baseScriptScript: {
    addressType: CardanoAddressType.BASE_SCRIPT_SCRIPT,
    paymentScriptHash:
      "1bc428e4720732ebd5dab4fb175324c192dc9bb76cc5da956e3c8dff",
    stakingScriptHash:
      "2bc428e4720732ebd5dab4fb175324c192dc9bb76cc5da956e3c8dff",
  },
  pointer: {
    addressType: CardanoAddressType.POINTER,
    path: "m/1852'/1815'/0'/0/0",
    certificatePointer: {
      blockIndex: 24157,
      txIndex: 177,
      certificateIndex: 42,
    },
  },
  pointerUnusual: {
    addressType: CardanoAddressType.POINTER,
    path: "m/1852'/1815'/101'/0/0",
    certificatePointer: {
      blockIndex: 24157,
      txIndex: 177,
      certificateIndex: 42,
    },
  },
  pointerScript: {
    addressType: CardanoAddressType.POINTER_SCRIPT,
    paymentScriptHash:
      "1bc428e4720732ebd5dab4fb175324c192dc9bb76cc5da956e3c8dff",
    certificatePointer: {
      blockIndex: 24157,
      txIndex: 177,
      certificateIndex: 42,
    },
  },
  enterprise: {
    addressType: CardanoAddressType.ENTERPRISE,
    path: "m/1852'/1815'/0'/0/0",
  },
  enterpriseUnusual: {
    addressType: CardanoAddressType.ENTERPRISE,
    path: "m/1852'/1815'/101'/0/0",
  },
  enterpriseScript: {
    addressType: CardanoAddressType.ENTERPRISE_SCRIPT,
    paymentScriptHash:
      "1bc428e4720732ebd5dab4fb175324c192dc9bb76cc5da956e3c8dff",
  },
  reward: {
    addressType: CardanoAddressType.REWARD,
    stakingPath: "m/1852'/1815'/0'/2/0",
  },
  rewardUnusual: {
    addressType: CardanoAddressType.REWARD,
    stakingPath: "m/1852'/1815'/101'/2/0",
  },
  rewardScript: {
    addressType: CardanoAddressType.REWARD_SCRIPT,
    stakingScriptHash:
      "2bc428e4720732ebd5dab4fb175324c192dc9bb76cc5da956e3c8dff",
  },
  byron: {
    addressType: CardanoAddressType.BYRON,
    path: "m/44'/1815'/0'/0/0",
  },
  byronUnusual: {
    addressType: CardanoAddressType.BYRON,
    path: "m/44'/1815'/101'/0/0",
  },
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
    const bundle = Object.keys(ADDRESS_PARAMS).map((k) => {
      return {
        addressParameters: ADDRESS_PARAMS[k],
        protocolMagic: 764824073,
        networkId: 1,
        showOnTrezor: true,
      };
    });

    let response = await TrezorConnect.cardanoGetAddress({ bundle });

    console.log(response);
    return response;
  };

  const testAddressPolicies = async () => {
    const bundle = Object.keys(ADDRESS_PARAMS).map((k) => {
      return {
        addressParameters: ADDRESS_PARAMS[k],
        protocolMagic: 764824073,
        networkId: 1,
        showOnTrezor: true,
      };
    });

    let response = await TrezorConnect.cardanoGetAddress({ bundle });

    console.log(response);
    return response;
  };

  const signTransaction = async () => {
    // var tx = {
    //   inputs: [
    //     {
    //       path: "m/44'/1815'/0'/0/0",
    //       prev_hash:
    //         "3b40265111d8bb3c3c608d95b3a0bf83461ace32d79336579a1939b3aad1c0b7",
    //       prev_index: 0,
    //     },
    //   ],
    //   outputs: [
    //     // {
    //     //   path: "m/44'/1815'/0'/0/0",
    //     //   amount: "10"
    //     // },
    //     {
    //       address:
    //         "addr1q84sh2j72ux0l03fxndjnhctdg7hcppsaejafsa84vh7lwgmcs5wgus8qt4atk45lvt4xfxpjtwfhdmvchdf2m3u3hlsd5tq5r",
    //       amount: "1",
    //     },
    //     {
    //       address:
    //         "addr1q84sh2j72ux0l03fxndjnhctdg7hcppsaejafsa84vh7lwgmcs5wgus8qt4atk45lvt4xfxpjtwfhdmvchdf2m3u3hlsd5tq5r",
    //       amount: "1",
    //       tokenBundle: [
    //         {
    //           policyId:
    //             "95a292ffee938be03e9bae5657982a74e9014eb4960108c9e23a5b39",
    //           tokenAmounts: [
    //             {
    //               assetNameBytes: "74652474436f696e",
    //               amount: "7878754",
    //             },
    //             {
    //               assetNameBytes: "74652474436f696f",
    //               amount: "1200",
    //             },
    //           ],
    //         },
    //         {
    //           policyId:
    //             "95a292ffee938be03e9bae5657982a74e9014eb4960108c9e23a5b38",
    //           tokenAmounts: [
    //             {
    //               assetNameBytes: "75652474436f696a",
    //               amount: "7878754",
    //             },
    //             {
    //               assetNameBytes: "75652474436f696f",
    //               amount: "1300",
    //             },
    //           ],
    //         },
    //       ],
    //     },
    //     // {
    //     //   addressParameters: {
    //     //     addressType: 0,
    //     //     path: "m/1852'/1815'/0'/0/0",
    //     //     stakingPath: "m/1852'/1815'/0'/2/0",
    //     //   },
    //     //   amount: '7120787',
    //     // },
    //   ],
    //   certificates: [
    //     // {
    //     //   type: 0,
    //     //   path: "m/1852'/1815'/0'/2/0",
    //     // },
    //     // {
    //     //   type: 3,
    //     //   poolParameters: {
    //     //     poolId: "f61c42cbf7c8c53af3f520508212ad3e72f674f957fe23ff0acb4973",
    //     //     vrfKeyHash:
    //     //       "198890ad6c92e80fbdab554dda02da9fb49d001bbd96181f3e07f7a6ab0d0640",
    //     //     pledge: "500000000",
    //     //     cost: "340000000",
    //     //     margin: {
    //     //       numerator: "1",
    //     //       denominator: "2",
    //     //     },
    //     //     rewardAccount:
    //     //       "stake1uya87zwnmax0v6nnn8ptqkl6ydx4522kpsc3l3wmf3yswygwx45el",
    //     //     owners: [
    //     //       { stakingKeyPath: "m/1852'/1815'/0'/2/0" },
    //     //       {
    //     //         stakingKeyHash:
    //     //           "3a7f09d3df4cf66a7399c2b05bfa234d5a29560c311fc5db4c490711",
    //     //       },
    //     //     ],
    //     //     relays: [
    //     //       {
    //     //         type: 0,
    //     //         ipv4Address: "192.168.0.1",
    //     //         ipv6Address: "2001:0db8:85a3:0000:0000:8a2e:0370:7334",
    //     //         port: 1234,
    //     //       },
    //     //       {
    //     //         type: 0,
    //     //         ipv6Address: "2001:0db8:85a3:0000:0000:8a2e:0370:7334",
    //     //         port: 1234,
    //     //       },
    //     //       { type: 0, ipv4Address: "192.168.0.1", port: 1234 },
    //     //       { type: 1, hostName: "www.test.test", port: 1234 },
    //     //       { type: 2, hostName: "www.test2.test" },
    //     //     ],
    //     //     metadata: {
    //     //       url: "https://www.test.test",
    //     //       hash: "914c57c1f12bbf4a82b12d977d4f274674856a11ed4b9b95bd70f5d41c5064a6",
    //     //     },
    //     //   },
    //     // },
    //   ],
    //   // withdrawals: [
    //   //   {
    //   //     path: "m/1852'/1815'/0'/2/0",
    //   //     amount: '7120787',
    //   //   },
    //   // ],
    //   // auxiliaryData: {
    //   //   hash:
    //   //     'ea4c91860dd5ec5449f8f985d227946ff39086b17f10b5afb93d12ee87050b6a',
    //   // },
    //   auxiliaryData: {
    //     // blob:
    //     //   'a100a201590960aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa1864a118c8430a141e',
    //     catalystRegistrationParameters: {
    //       votingPublicKey:
    //         "1af8fa0b754ff99253d983894e63a2b09cbb56c833ba18c3384210163f63dcfc",
    //       stakingPath: "m/1852'/1815'/0'/2/0",
    //       rewardAddressParameters: {
    //         addressType: 0,
    //         path: "m/1852'/1815'/0'/0/0",
    //         stakingPath: "m/1852'/1815'/0'/2/0",
    //       },
    //       nonce: "10",
    //     },
    //   },
    //   fee: "42",
    //   ttl: "10",
    //   protocolMagic: 764824073,
    //   networkId: 1,
    //   signingMode: 0,
    // };

    // const tx = {
    //   inputs: [
    //     {
    //       address_n: [2147483692, 2147483649, 2147483648, 0, 0],
    //       prev_hash:
    //         "e5040e1bc1ae7667ffb9e5248e90b2fb93cd9150234151ce90e14ab2f5933bcd",
    //       prev_index: 0,
    //       amount: "31000000",
    //     },
    //   ],
    //   outputs: [
    //     {
    //       address: "msj42CCGruhRsFrGATiUuh25dtxYtnpbTx",
    //       amount: "30090000",
    //       script_type: "PAYTOADDRESS",
    //     },
    //     {
    //       address_n: [2147483692, 2147483649, 2147483648, 1, 0],
    //       amount: "900000",
    //       script_type: "PAYTOADDRESS",
    //     },
    //     {
    //       address_n: [2147483692, 2147483649, 2147483650, 1, 0],
    //       amount: "0",
    //       script_type: "PAYTOADDRESS",
    //     },
    //   ],
    //   refTxs: [
    //     {
    //       bin_outputs: [
    //         {
    //           amount: 31000000,
    //           script_pubkey:
    //             "76a914a579388225827d9f2fe9014add644487808c695d88ac",
    //         },
    //         {
    //           amount: 142920000,
    //           script_pubkey:
    //             "76a914dd597a4de23945b20a56446ce3a1b6e39cbf351c88ac",
    //         },
    //       ],
    //       inputs: [
    //         {
    //           prev_hash:
    //             "bb0bc570bbde0a0c06f33fa0bd2516149c35c566bf70e8e08861ad9f07400021",
    //           prev_index: 0,
    //           script_sig:
    //             "483045022100a484e6399d1c0e50b5a26716a0f9c51a2d9d7c0cd6dc41f25f56375e5d0c0b4d02200360655bf46a65688744c411783ed6f048efa238a591af716878af279bfbf66e012102dcd8d570036b1575605734359eff834e362bf2ac6463b27bd877b9cb4c6162d1",
    //           sequence: 4294967295,
    //         },
    //       ],
    //       lock_time: 0,
    //       version: 1,
    //       hash: "e5040e1bc1ae7667ffb9e5248e90b2fb93cd9150234151ce90e14ab2f5933bcd",
    //     },
    //   ],
    //   coin: "Testnet",
    // };

    const tx = {
      signingMode: 0,
      inputs: [
        {
          path: [2147485500, 2147485463, 2147483648, 0, 0],
          prev_hash:
            "3b40265111d8bb3c3c608d95b3a0bf83461ace32d79336579a1939b3aad1c0b7",
          prev_index: 0,
        },
      ],
      outputs: [
        {
          address:
            "addr1q84sh2j72ux0l03fxndjnhctdg7hcppsaejafsa84vh7lwgmcs5wgus8qt4atk45lvt4xfxpjtwfhdmvchdf2m3u3hlsd5tq5r",
          amount: "2000000",
          tokenBundle: [
            {
              policyId:
                "0d63e8d2c5a00cbcffbdf9112487c443466e1ea7d8c834df5ac5c425",
              tokenAmounts: [
                { assetNameBytes: "74657374436f696e", amount: "7878754" },
              ],
            },
          ],
        },
      ],
      protocolMagic: 764824073,
      fee: "42",
      networkId: 1,
      certificates: [],
      withdrawals: [],
      mint: [
        {
          policyId: "0d63e8d2c5a00cbcffbdf9112487c443466e1ea7d8c834df5ac5c425",
          tokenAmounts: [
            { assetNameBytes: "74657374436f696e", mintAmount: "7878754" },
            { assetNameBytes: "75657374436f696e", mintAmount: "-7878754" },
          ],
        },
      ],
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
    testAddressPolicies,
    getNativeScriptHash,
  };
};
