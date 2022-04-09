import fetch from 'node-fetch';

async function main() {
  const result = await fetch('https://btc.getblock.io/mainnet/', {
    method: 'POST',
    headers: {
      'x-api-key': '070a2510-055e-471a-a791-cb4020480dc5',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      "jsonrpc": "2.0",
      "method": "getbestblockhash",
      "params": [],
      "id": "getblock.io"
    }),
  });

  const json = await result.json();

  console.log('**************');
    console.log(json);
}

main();
