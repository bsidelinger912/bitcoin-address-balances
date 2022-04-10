import { AddressInfo } from "./types";

export default function getAddressBalance(address: AddressInfo): number {
  return Object.keys(address.unspentOutputs).reduce<number>((acc, key) => {
    const unspentBalance = address.unspentOutputs[key];

    return acc + unspentBalance.value;
  }, 0);
}