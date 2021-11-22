import { useColorModeValue } from '@chakra-ui/color-mode';
import Icon from '@chakra-ui/icon';
import { Image } from '@chakra-ui/image';
import { Flex, SimpleGrid } from '@chakra-ui/layout';
import { chakra } from '@chakra-ui/system';
import { useContext } from 'react';
import { BsFillWalletFill } from 'react-icons/bs';
import TextSpan from '../theme/textSpan';
import { store } from '../utils/state';
import General, { GeneralCards } from './general';

function WalletSubtitle() {
    return (
        <chakra.h2
            margin={'auto'}
            width={'70%'}
            fontFamily={'Inter'}
            fontWeight={'medium'}
            color={useColorModeValue('gray.500', 'gray.400')}
        >
            {'Basic wallet information with your '}
            <chakra.strong color={useColorModeValue('gray.700', 'gray.50')}>
                addresses
            </chakra.strong>
            {', '}
            <chakra.strong color={useColorModeValue('gray.700', 'gray.50')}>
                public key
            </chakra.strong>
            {' used for signing and '}
            <chakra.strong color={useColorModeValue('gray.700', 'gray.50')}>
                balance
            </chakra.strong>
            {'.'}
        </chakra.h2>
    );
}

function WalletIconFooter() {
    return (
        <Icon viewBox="0 0 40 35" mt={14} boxSize={10} color={'teal.200'}>
            <BsFillWalletFill fill={'currentColor'} size="40px" />
        </Icon>
    );
}

function WalletGrid() {
    const globalState = useContext(store);

    const data = [
        {
            name: 'Evmos',
            role: '(Bech32) Evmos encoded wallet',
            content: [
                <TextSpan
                    content={globalState.state.walletEvmos}
                    key="evmotext"
                />,
            ],
            avatar: useColorModeValue('./evmos-black.svg', './evmos-white.svg'),
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
            role: '(Aphotons) Current evmos coin balance',
            content: [
                <TextSpan
                    content={`${globalState.state.aphoton} Aphotons`}
                    key="balancetext"
                />,
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
