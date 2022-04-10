import { AddressInfo } from '../src/types';
import getAddressBalance from '../src/addressBalance';

const emptyAddress: AddressInfo = {
  address: '1FWQiwK27EnGXb6BiBMRLJvunJQZZPMcGd',
  unspentOutputs: {},
};

const fullAddress: AddressInfo = {
  address: '1FWQiwK27EnGXb6BiBMRLJvunJQZZPMcGd',
  unspentOutputs: {
    '0162d077058044803853e28dedc2e15b64c04d1b4512d8e14373fdd83e25eb51': {
      "value": 0.2,
      "n": 0,
      "scriptPubKey": {
        "asm": "OP_HASH160 c85e79e830972afd6c4a2e6881ae981449be9a0d OP_EQUAL",
        "hex": "a914c85e79e830972afd6c4a2e6881ae981449be9a0d87",
        "address": "1FWQiwK27EnGXb6BiBMRLJvunJQZZPMcGd",
        "type": "scripthash"
      }
    },
    '59cfe4bf958fb51dc7ad1f50bd1c7ddb1bd90688bad9b721f435063a1b94ab73': {
      "value": 0.1,
      "n": 1,
      "scriptPubKey": {
        "asm": "0 937926c0dbfadd717ecb2049a1142e32b55cf765",
        "hex": "0014937926c0dbfadd717ecb2049a1142e32b55cf765",
        "address": "1FWQiwK27EnGXb6BiBMRLJvunJQZZPMcGd",
        "type": "witness_v0_keyhash"
      }
    },
    'acf7e2f982029dd8b18fb20555cf1e8f4d1ea5aa20fa10e8e188f265c71d52ce': {
      "value": 0.5,
      "n": 2,
      "scriptPubKey": {
        "asm": "OP_HASH160 d146b8b6b3e0b840b59cd4f21f3d916bcb64c315 OP_EQUAL",
        "hex": "a914d146b8b6b3e0b840b59cd4f21f3d916bcb64c31587",
        "address": "1FWQiwK27EnGXb6BiBMRLJvunJQZZPMcGd",
        "type": "scripthash"
      }
    },
  }
}

describe('addressBalance', () => {
  it('should get the balance correctly for an address with no unspent outputs', () => {
    const balance = getAddressBalance(emptyAddress);
    expect(balance).toEqual(0);
  });

  it('should get the balance correctly when there are unspent outputs', () => {
    const balance = getAddressBalance(fullAddress);
    expect(balance).toEqual(0.8);
  });
});
