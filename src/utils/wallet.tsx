import { type } from 'os';
import React from 'react';

import { useContext, useEffect } from 'react';
import { getAllERC20Balances } from './backend';
import { blackfuryPubKey, getRewards } from './blockchain/account';
import { getAllBalances } from './blockchain/balances';
import {
    getProvider,
    getPubKey,
    getWalletEth,
    getWalletBlackfury,
    unsetProvider,
    setPubKey,
    unsetPubKey,
    unsetWalletEth,
    unsetWalletBlackfury,
} from './db';
import { BalanceCosmos, GlobalState, store, BalanceERC20Item } from './state';

export function disconnectWallet(state: GlobalState) {
    unsetWalletEth();
    unsetWalletBlackfury();
    unsetPubKey();
    unsetProvider();
    state.dispatch({ type: 'cleanup', payload: {} });
    return true;
}

export async function reconnectWallet(state: GlobalState) {
    const walletEth = getWalletEth();
    if (walletEth !== null) {
        const walletBlackfury = getWalletBlackfury();
        const pubkey = getPubKey();
        const provider = getProvider();
        state.dispatch({
            type: 'wallet',
            payload: {
                walletEth: walletEth,
                walletBlackfury: walletBlackfury,
            },
        });
        state.dispatch({ type: 'pubkey', payload: { pubkey } });
        state.dispatch({ type: 'provider', payload: { provider } });
        await queryBalances(state);
    }
}

export async function queryBalances(store: GlobalState) {
    const wallet = getWalletBlackfury();
    let balance: BalanceCosmos[] = [];
    var rewards;
    if (wallet !== null) {
        balance = await getAllBalances(wallet);
        // var pubkey = await blackfuryPubKey(wallet);
        rewards = await getRewards();
        console.log(rewards);
        // setPubKey(pubkey);
    }
    store.dispatch({ type: 'cosmosCoins', payload: balance });
    store.dispatch({ type: 'rewards', payload: {rewards: parseInt(rewards) }});
}

export function WalletInitializer() {
    const globalState = useContext(store);
    useEffect(() => {
        reconnectWallet(globalState);
    }, []);
    return <></>;
}
