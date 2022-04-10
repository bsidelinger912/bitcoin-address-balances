import { Addresses, Block, VInFromOut, VOut } from "./types";

interface SavedTransaction {
  txid: string;
  outputs: Record<number, VOut>;
}

export type TransactionsWeCareAbout = Record<string, SavedTransaction>;

const transactionsWeCareAbout: TransactionsWeCareAbout = {};

export default function processBlock(input: Addresses, block: Block): Addresses {
  // Options
  // - keep track of all prev unspent outputs, then re-check them all to see if still unspent, then check all outputs in the block and add the unspents
       // possible issues, could be really expensive to check all the balances
       // how many unspent balances might there be though for each address?
  // - keep track of unspent balances and check the each transaction block to see if any of those end up as an input, then also check for new outputs
      // benefits: we don't need to make another rpc call for all the old inputs, we can just process the block object without IO 
      // crux - we need to be able to correlate an input to a previous output we care about, but searching every wallet for outputs would be expensive

  // attempt at logic for option 2

  // loop through transactions

  // first check the inputs and see if any of them spend an output we care about, this can be done quickly
  //    by looking up the transaction ID of the input in our map and the relevant output's index
  //    that will have an address and we can look up the output from that address and delete it
  // if we're spending one of our outputs, we'll delete it from the address, then we need to delete it from 
  //    the saved transaction and check if there's any more outputs left that we care about in that transaction
  //    if we don't care about any more outputs (the object has zero keys) then we can delete the transaction from our map
  block.tx.forEach(tx => {
    tx.vin.forEach(vin => {
      // is this in from an out with a txid? and if so, is it a txid we care about?
      if ((vin as VInFromOut).txid && transactionsWeCareAbout[(vin as VInFromOut).txid]) {
        const vInfromOut = vin as VInFromOut;
        const prevTxId = vInfromOut.txid;
        const pastTransaction = transactionsWeCareAbout[prevTxId];
        const prevOutput = pastTransaction.outputs[vInfromOut.vout];

        // remove this prevOutput from the relevant address
        const address = input[prevOutput.scriptPubKey.address];

        // NOTE: we're mutating the input here, might not be the best, but cheaper and easier than cloning
        delete address.unspentOutputs[prevTxId];

        // remove this output from the saved transaction
        delete pastTransaction.outputs[vInfromOut.vout];

        // check if there's anymore outputs we care about in this transaction, if not, delete if from our map
        if (Object.keys(pastTransaction.outputs).length < 1) {
          delete transactionsWeCareAbout[prevTxId];
        }
      }
    });

    tx.vout.forEach(vout => {
      // check all the outputs and see if they belong to any addresses we care about, if so add them
      const outAddress = vout.scriptPubKey.address;

      // did this go to one of our addresses, if so then add it to the unspentOutputs?
      if (input[outAddress]) {
        input[outAddress].unspentOutputs[tx.txid] = vout;

        // we also need to mark this as a transaction we care about so we can detect if/when this output is spent

        // save the transaction if we don't already have it
        if (!transactionsWeCareAbout[tx.txid]) {
          transactionsWeCareAbout[tx.txid] = {
            txid: tx.txid,
            outputs: {}
          };
        }

        // add the output to the saved transaction
        transactionsWeCareAbout[tx.txid].outputs[vout.n] = vout;
      }
    });
  });

  return input;
}