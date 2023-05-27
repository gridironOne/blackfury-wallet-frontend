import { useColorModeValue } from '@chakra-ui/color-mode';
import Icon from '@chakra-ui/icon';
import { Image } from '@chakra-ui/image';
import { Flex, SimpleGrid } from '@chakra-ui/layout';
import { chakra } from '@chakra-ui/system';
import { useContext } from 'react';
import { BsFillWalletFill } from 'react-icons/bs';
import TitleH2 from '../template/heading2';
import Strong from '../template/strong';
import TextSpan from '../theme/textSpan';
import { store } from '../utils/state';
import General, { GeneralCards } from './general';

import Web3 from 'web3';

function WalletSubtitle() {
    return (
        <TitleH2
            content={
                <>
                    {'Basic wallet information with your '}
                    <Strong content={'addresses'} />
                    {', '}
                    <Strong content={'public key'} />
                    {' used for signing and '}
                    <Strong content={'balance'} />
                    {'.'}
                </>
            }
        />
    );
}

function WalletIconFooter() {
    return (
        <Icon viewBox="0 0 40 35" mt={14} boxSize={10} color={'purple.200'}>
            <BsFillWalletFill fill={'currentColor'} size="40px" />
        </Icon>
    );
}

function WalletGrid() {
    const globalState = useContext(store);

    const web3 = new Web3('https://draco.fury.black');

    const data = [
        {
            name: 'Blackfury',
            role: '(Bech32) Blackfury encoded wallet',
            content: [
                <TextSpan
                    content={globalState.state.walletBlackfury}
                    key="evmotext"
                />,
            ],
            avatar: useColorModeValue('./blackfury.gif', './blackfury.gif'), // black and then white
        },
        {
            name: 'Hex',
            role: '(0x) Ethereum encoded wallet',
            content: [
                <TextSpan
                    content={globalState.state.walletEth}
                    key="hextext"
                />,
            ],
            avatar: useColorModeValue(
                './ethereum-1.svg',
                './ethereum-1-white.svg'
            ),
        },
        {
            name: 'Public Key',
            role: '(Base64) Value used for signing the transactions',
            content: [
                <TextSpan
                    content={globalState.state.pubkey}
                    key="pubkeytext"
                />,
            ],
            avatar: useColorModeValue('./selfkey.svg', './selfkey-white.svg'),
        },
        {
            name: 'Balance',
            role: 'Current Blackfury (FURY) coin balance',
            content: [
                <TextSpan
                    content={`≈${(globalState.state.aphoton/1e18).toString()} FURY`}
                    key="balancetext"
                />,
                <TextSpan
                content={`(${globalState.state.aphoton} afury)`}
                key="balancetext"
            />,
            ],
            avatar: useColorModeValue('./coins.png', './coins-white.png'),
        },
        {
            name: 'Rewards',
            role: 'Current Blackfury (FURY) coin rewards',
            content: [
                <TextSpan
                    content={`≈${(globalState.state.rewards/1e18).toString()} FURY`}
                    key="rewardstext"
                />,
            //     <TextSpan
            //     content={`(≈${globalState.state.rewards} afury)`}
            //     key="rewardstext"
            // />,
            ],
            avatar: useColorModeValue('./coins.png', './coins-white.png'),
        },
    ];
    return (
        <SimpleGrid
            columns={{ base: 1, xl: 2 }}
            spacing={'20'}
            mt={16}
            mx={'auto'}
        >
            {data.map((cardInfo, index) => (
                <GeneralCards key={index} {...cardInfo} />
            ))}
        </SimpleGrid>
    );
}

export const Wallet = () => {
    return (
        <General
            icon={[<WalletIconFooter key="walletfooter" />]}
            title="Your Wallet Details"
            subtitle={[<WalletSubtitle key="walletsub" />]}
            content={[<WalletGrid key="walletgrid" />]}
        ></General>
    );
};
