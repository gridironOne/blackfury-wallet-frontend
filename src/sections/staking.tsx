import { useColorModeValue } from '@chakra-ui/color-mode';
import Icon from '@chakra-ui/icon';
import { Flex, Heading, SimpleGrid, VStack } from '@chakra-ui/layout';
import { chakra } from '@chakra-ui/system';
import { useContext } from 'react';
import { AiOutlineSend, AiOutlineTransaction } from 'react-icons/ai';
import { MdOutlineSendAndArchive, MdScheduleSend } from 'react-icons/md';
import { FaReact } from 'react-icons/fa';
import MsgSend from '../messages/msgsend';
import MyIcon from '../messages/messagesIcon';
import { store, Balance } from '../utils/state';
import General, { GeneralCards } from './general';
import MessagesIcon from '../messages/messagesIcon';
import DelegateAphotons from '../messages/delegate';
import UndelegateAphotons from '../messages/undelegate';
import WithdrawAphotons from '../messages/withdraw';
import { TransactionsIconFooter } from './send';
import TitleH2 from '../template/heading2';
import Strong from '../template/strong';

function TransactionsSubtitle() {
    return (
        <TitleH2
            content={
                <>
                    <Strong content={'Validator'} />
                    {' transactions.'}
                    <br />
                    {''}
                    <Strong content={'Delegate'} />
                    {/* {' and '}
                    <Strong content={'undelegate'} /> */}
                    {' your coins.'}
                </>
            }
        />
    );
}

function ValidatorGrid() {
    return (
        <VStack w="full" key="vstack">
            <chakra.h1
                py={5}
                fontSize={35}
                fontFamily={'Work Sans'}
                fontWeight={'bold'}
                color={useColorModeValue('gray.700', 'gray.50')}
            >
                Staking & Delegation
            </chakra.h1>

            <p>You may find an Echelon validator address (echelonvaloper1...) to stake aka delegate to from <a href="https://ping.pub/echelon/staking" target="_blank">Ping.pub</a>
            <br />
            1000000000000000000 aechelon = 1 ECH
            </p><br />

            <SimpleGrid
                columns={[1, 1, 2]}
                spacing={'20'}
                mt={16}
                mx={'auto'}
            >
                <GeneralCards
                    key={'withdraw'}
                    name={'Withdraw'}
                    role="Withdraw your rewards."
                    content={[<WithdrawAphotons key="withdrawcontent" />]}
                    iconComponents={[
                        <MessagesIcon
                            key="withdrawicon"
                            icon={
                                <MdOutlineSendAndArchive
                                    key="icon"
                                    size={'25'}
                                />
                            }
                        />,
                    ]}
                /> 
                <GeneralCards
                    key={'delegate'}
                    name={'Delegate'}
                    role="Delegate your aechelons to a validator"
                    content={[<DelegateAphotons key="delegatecontent" />]}
                    iconComponents={[
                        <MessagesIcon
                            key="delegateicon"
                            icon={<MdScheduleSend key="icon" size={'25'} />}
                        />,
                    ]}
                />

                <GeneralCards
                    key={'undelegate'}
                    name={'Undelegate'}
                    role="Undelegate your aechelons."
                    content={[<UndelegateAphotons key="undelegatecontent" />]}
                    iconComponents={[
                        <MessagesIcon
                            key="undelegateicon"
                            icon={
                                <MdOutlineSendAndArchive
                                    key="icon"
                                    size={'25'}
                                />
                            }
                        />,
                    ]}
                /> 
            </SimpleGrid>
        </VStack>
    );
}

export const TransactionsValidatorSection = () => {
    return (
        <General
            title="Validator & Staking Tools"
            subtitle={[<TransactionsSubtitle key="sub" />]}
            content={[<ValidatorGrid key="grid" />]}
            icon={[<TransactionsIconFooter key="footer" />]}
        ></General>
    );
};
