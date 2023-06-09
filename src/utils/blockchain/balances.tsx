import { REACT_APP_NODE_URL } from '../contants';
import { balancesEndpoint } from '@tharsis/provider';
import { ethToBlackfury } from '@fanfury/blackfury-address-converter';

export async function getAllBalances(address: string) {
    if (address === null) {
        return { balances: [] };
    }
    if (address.split('0x').length == 2) {
        address = ethToBlackfury(address);
    }
    let balance = await fetch(
        `${REACT_APP_NODE_URL}${balancesEndpoint}${address}`
    );
    console.log(balance);
    let a = await balance.json();
    console.log(a);
    return a;
}
