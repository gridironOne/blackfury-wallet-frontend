import { REACT_APP_NODE_URL } from '../contants';
import { balancesEndpoint } from '@tharsis/provider';
import { ethToEchelon } from 'ethermint-address-converter';

export async function getAllBalances(address: string) {
    if (address === null) {
        return { balances: [] };
    }
    if (address.split('0x').length == 2) {
        address = ethToEchelon(address);
    }
    let balance = await fetch(
        `${REACT_APP_NODE_URL}${balancesEndpoint}${address}`
    );
    console.log(balance);
    let a = await balance.json();
    console.log(a);
    return a;
}
