import fetch from 'node-fetch';
import { Block } from './types';

interface RPCResp<T> {
  result: T | null;
  error: { code: number, message: string } | null;
  id: string;
}

interface RPCBody {
  method: string;
  params: (string | number)[];
}



async function callRPC<T>(body: RPCBody): Promise<T | null> {
  const result = await fetch('https://btc.getblock.io/mainnet/', {
    method: 'POST',
    headers: {
      'x-api-key': '070a2510-055e-471a-a791-cb4020480dc5',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      jsonrpc: "2.0",
      method: body.method,
      params: body.params,
      id: "getblock.io"
    }),
  });

  const json = await result.json() as RPCResp<T>;

  if (json.error) {
    throw new Error(json.error.message);
  }

  return json.result;
}

export async function getLatestBlock(): Promise<Block> {
  const blockId = await callRPC<string>({
    method: 'getbestblockhash',
    params:[],
  });

  if (!blockId) {
    throw new Error('Failed to get bestblockhash');
  }

  const block = await callRPC<Block>({
    method: 'getblock',
    params: [blockId, 2],
  });

  if (!block) {
    throw new Error('Failed to get block');
  }

  return block;
}

// export async function getTxOut(transactionId: string, outNumber: number): Promise<void> {
//   const transactionOuts = await callRPC<string>({
//     method: 'gettxout',
//     params:[transactionId, outNumber],
//   });

//   console.log('******');
//   console.log(JSON.stringify(transactionOuts, null, 2));
// }