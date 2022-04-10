import React from 'react';

import { useContext, useEffect } from 'react';
import { getAllERC20Balances } from './backend';
import { echelonPubKey } from './blockchain/account';
import { getAllBalances } from './blockchain/balances';
import {
    getProvider,
    getPubKey,
    getWalletEth,
    getWalletEchelon,
    unsetProvider,
    setPubKey,
    unsetPubKey,
    unsetWalletEth,
    unsetWalletEchelon,
} from './db';
import { BalanceCosmos, GlobalState, store, BalanceERC20Item } from './state';

export function disconnectWallet(state: GlobalState) {
    unsetWalletEth();
    unsetWalletEchelon();
    unsetPubKey();
    unsetProvider();
    state.dispatch({ type: 'cleanup', payload: {} });
    return true;
}

export async function reconnectWallet(state: GlobalState) {
    const walletEth = getWalletEth();
    if (walletEth !== null) {
        const walletEchelon = getWalletEchelon();
        const pubkey = getPubKey();
        const provider = getProvider();
        state.dispatch({
            type: 'wallet',
            payload: {
                walletEth: walletEth,
                walletEchelon: walletEchelon,
            },
        });
        state.dispatch({ type: 'pubkey', payload: { pubkey } });
        state.dispatch({ type: 'provider', payload: { provider } });
        await queryBalances(state);
    }
}

export async function queryBalances(store: GlobalState) {
    const wallet = getWalletEchelon();
    let balance: BalanceCosmos[] = [];
    if (wallet !== null) {
        balance = await getAllBalances(wallet);
        // var pubkey = await echelonPubKey(wallet);
        // setPubKey(pubkey);
    }
    store.dispatch({ type: 'cosmosCoins', payload: balance });
}

export function WalletInitializer() {
    const globalState = useContext(store);
    useEffect(() => {
        reconnectWallet(globalState);
    }, []);
    return <></>;
}
