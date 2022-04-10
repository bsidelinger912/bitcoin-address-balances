export interface VInFromNowhere {
  coinbase: string,
  txinwitness: string[],
  sequence: number
}

export interface VInFromOut {
  txid: string,
  vout: number,
  scriptSig: {
    asm: string,
    hex: string,
  },
  sequence: number
}

export type VIn = VInFromNowhere | VInFromOut;

export interface VOut {
  value: number,
  n: number,
  scriptPubKey: {
    asm: string,
    hex: string,
    address: string,
    type: string,
  }
}

export interface Transaction {
  txid: string,
  hash: string,
  version: number,
  size: number,
  vsize: number,
  weight: number,
  locktime: number,
  fee: number,
  hex: string;
  vin: VIn[],
  vout: VOut[],
}

export interface Block {
  hash: string,
  confirmations: number,
  height: number,
  version: number,
  versionHex: string,
  merkleroot: string,
  time: number,
  mediantime: number,
  nonce: number,
  bits: string,
  difficulty: number,
  chainwork: string,
  nTx: number,
  previousblockhash: string,
  strippedsize: number,
  size: number,
  weight: number,
  tx: Transaction[],
}

export interface AddressInfo {
  address: string;
  // key is the transaction id, value is the VOut
  unspentOutputs: Record<string, VOut>;

  // balance??? maybe?? if so we need to re-calculate this when we add or subtract
}

// the Key is the address string
export type Addresses = Record<string, AddressInfo>;  
