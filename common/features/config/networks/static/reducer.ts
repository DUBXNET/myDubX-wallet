import {
  ethPlorer,
  ETHTokenExplorer,
  gasPriceDefaults,
  InsecureWalletName,
  SecureWalletName
} from 'config/data';
import {
  ETH_DEFAULT,
  ETH_LEDGER,
  ETH_TESTNET,
  ETH_TREZOR,
  ETH_SAFE_T
} from 'config/dpaths';
import { makeExplorer } from 'utils/helpers';
// import { TAB } from 'components/Header/components/constants';
import * as types from './types';

const testnetDefaultGasPrice = {
  min: 0.1,
  max: 40,
  initial: 4
};

export const STATIC_NETWORKS_INITIAL_STATE: types.ConfigStaticNetworksState = {
  DUBX: {
    id: 'DUBX',
    name: 'DubXNet',
    unit: 'DUBX',
    chainId: 1,
    isCustom: false,
    color: '#11cc11',
    blockExplorer: makeExplorer({
      name: 'Explorer',
      origin: 'http://explorer.dubxnet.com'
    }),
    tokenExplorer: {
      name: ethPlorer,
      address: ETHTokenExplorer
    },
    tokens: require('config/tokens/mainnet.json'),
    contracts: require('config/contracts/mainnet.json'),
    dPathFormats: {
      [SecureWalletName.TREZOR]: ETH_TREZOR,
      [SecureWalletName.SAFE_T]: ETH_SAFE_T,
      [SecureWalletName.LEDGER_NANO_S]: ETH_LEDGER,
      [InsecureWalletName.MNEMONIC_PHRASE]: ETH_DEFAULT
    },
    gasPriceSettings: gasPriceDefaults,
    shouldEstimateGasPrice: true
  },
  DUBT: {
    id: 'DUBT',
    name: 'DubXTest',
    unit: 'DUBT',
    chainId: 3,
    isCustom: false,
    color: '#adc101',
    blockExplorer: makeExplorer({
      name: 'Explorer testnet',
      origin: 'http://explorer.testnet.dubxnet.com'
    }),
    tokens: require('config/tokens/testnet.json'),
    contracts: require('config/contracts/testnet.json'),
    isTestnet: true,
    dPathFormats: {
      [SecureWalletName.TREZOR]: ETH_TESTNET,
      [SecureWalletName.SAFE_T]: ETH_TESTNET,
      [SecureWalletName.LEDGER_NANO_S]: ETH_LEDGER,
      [InsecureWalletName.MNEMONIC_PHRASE]: ETH_TESTNET
    },
    gasPriceSettings: testnetDefaultGasPrice
  }
};

export function staticNetworksReducer(
  state: types.ConfigStaticNetworksState = STATIC_NETWORKS_INITIAL_STATE,
  action: any
) {
  switch (action.type) {
    default:
      return state;
  }
}
