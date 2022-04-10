import getAddressBalance from '../src/addressBalance';
import processBlock from '../src/processBlock';
import { Block } from '../src/types';
import addresses from './fixtures/addresses.json';
import block from './fixtures/block1.json';
import block2 from './fixtures/block2.json';

const firstAddress = Object.keys(addresses)[0];
const secondAddress = Object.keys(addresses)[1];

describe('processBlock', () => {
  it('should pick up new unused outputs', () => {
    const updatedAddresses = processBlock(addresses, block as any as Block);
    const balance = getAddressBalance(updatedAddresses[firstAddress]);

    expect(balance).toEqual(12.36);
  });

  it('should clean up old outputs when spent', () => {
    const updatedAddresses = processBlock(addresses, block as any as Block);

    const balance = getAddressBalance(updatedAddresses[firstAddress]);
    expect(balance).toEqual(12.36);

    const updatedAddressesAgain = processBlock(updatedAddresses, block2 as any as Block);

    const balance2 = getAddressBalance(updatedAddressesAgain[firstAddress]);
    expect(balance2).toEqual(6.1);
  });

  it('should decrement correctly when a previous output is partially used', () => {
    const updatedAddresses = processBlock(addresses, block as any as Block);

    const balance = getAddressBalance(updatedAddresses[secondAddress]);
    expect(balance).toEqual(0.2);

    const updatedAddressesAgain = processBlock(updatedAddresses, block2 as any as Block);

    const balance2 = getAddressBalance(updatedAddressesAgain[secondAddress]);
    expect(balance2).toEqual(0.1);
  });
});
