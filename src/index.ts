import { writeFile } from 'fs';

import { getLatestBlock } from './data';
import { Addresses, Block } from './types';

const addresses: Addresses = {};

async function main() {
  const block = await getLatestBlock();

  const smallerBlock: Partial<Block> = {
    hash: block.hash,
    tx: block.tx.slice(0, 3),
  };

  console.log(JSON.stringify(smallerBlock, null, 2));

  await writeFile('../tests/fixtures/block.json', JSON.stringify(smallerBlock, null, 2), { encoding: 'utf-8' }, () => null);
}

main();
