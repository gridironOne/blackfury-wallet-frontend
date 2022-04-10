import { Button } from '@chakra-ui/button';
import { FormControl, FormLabel } from '@chakra-ui/form-control';

import { Input } from '@chakra-ui/input';
import {
    Center,
    GridItem,
    Heading,
    SimpleGrid,
    VStack,
} from '@chakra-ui/layout';
import { Divider } from '@chakra-ui/react';
import { ethToEchelon } from 'ethermint-address-converter';
import { useState } from 'react';
import { FiSend } from 'react-icons/fi';
import { fireError, fireSuccess } from '../landing/alert';
import { signTransaction, delegateAphoton, broadcast } from '../utils/backend';
import { getAccount } from '../utils/blockchain/account';

import { createTxMsgDelegate } from '@tharsis/transactions';
import { BaseFee, chain } from '../utils/blockchain/chain';
import { signCosmosAndBroadcastWithMetamask } from '../utils/signers/metamask';

async function execute(
    dest: string,
    amount: string,
    memo: string,
    feeAmount: string,
    feeDenom: string,
    feeGas: string
) {
    if (dest.split('echelonvaloper1').length != 2) {
        fireError('Delegate Aechelon', 'Invalid destination!');
        return false;
    }

    let parsedAmount = Number(amount);
    if (parsedAmount === NaN) {
        fireError('Delegate Aechelon', 'Invalid amount!');
        return false;
    }

    if (parsedAmount < 100000000000000) {
        fireError(
            'Delegate Aechelon',
            'Invalid amount, minimum value is 100000000000000!'
        );
        return false;
    }

    if (feeAmount == '') {
        feeAmount = BaseFee;
    }
    if (Number(feeAmount) === NaN) {
        fireError('Type error', 'Invalid feeAmount!');
        return false;
    }

    if (feeDenom == '') {
        feeDenom = 'aechelon';
    }

    if (feeGas == '') {
        feeGas = '200000';
    }

    const sender = await getAccount();
    if (sender == null) {
        return;
    }

    const fee = {
        amount: feeAmount,
        denom: feeDenom,
        gas: feeGas,
    };

    let res = await createTxMsgDelegate(chain, sender, fee, memo, {
        validatorAddress: dest,
        amount: amount,
        denom: 'aechelon',
    });

    return signCosmosAndBroadcastWithMetamask(chain, sender, res);
}

const DelegateAphotons = () => {
    const [dest, setDest] = useState('');
    const [amount, setAmount] = useState('');

    const [memo, setMemo] = useState('');
    const [feeAmount, setFeeAmount] = useState('');
    const [feeDenom, setFeeDenom] = useState('');
    const [feeGas, setFeeGas] = useState('');
    return (
        <VStack
            w="full"
            h="full"
            p={10}
            alignItems="flex-start"
            border="1px"
            borderRadius={25}
        >
            <Heading size="md">Delegate Aechelon</Heading>
            <Divider />
            <SimpleGrid columns={1} columnGap={3} rowGap={6} w="full">
                <GridItem colSpan={[1, 2]}>
                    <FormControl id="destDelegateControl">
                        <FormLabel id="destDelegate">Destination</FormLabel>
                        <Input
                            placeholder="echelonvaloper1t703ccll8shpkhwnvmtu5nzrvcaw52u8an2708"
                            type="text"
                            onChange={(e) => setDest(e.target.value)}
                        />
                    </FormControl>
                </GridItem>
                <GridItem colSpan={[1, 2]}>
                    <FormControl id="amountDelegateControl">
                        <FormLabel id="amountDelegate">
                            Amount (Aechelon)
                        </FormLabel>
                        <Input
                            placeholder="1000000000000"
                            type="number"
                            onChange={(e) => setAmount(e.target.value)}
                        ></Input>
                    </FormControl>
                </GridItem>

                <GridItem colSpan={[1, 2]}>
                    <FormControl id="memoSendControl">
                        <FormLabel id="memoSend">Memo</FormLabel>
                        <Input
                            placeholder=""
                            type="text"
                            onChange={(e) => setMemo(e.target.value)}
                        />
                    </FormControl>
                </GridItem>

                <h1>Fees:</h1>

                <GridItem colSpan={[1, 2]}>
                    <FormControl id="memoSendControl">
                        <FormLabel id="memoSend">
                            Fee Amount(optional)
                        </FormLabel>
                        <Input
                            placeholder={BaseFee}
                            type="text"
                            onChange={(e) => setFeeAmount(e.target.value)}
                        />
                    </FormControl>
                </GridItem>
                <GridItem colSpan={[1, 2]}>
                    <FormControl id="memoSendControl">
                        <FormLabel id="memoSend">Fee Denom(optional)</FormLabel>
                        <Input
                            placeholder="aechelon"
                            type="text"
                            onChange={(e) => setFeeDenom(e.target.value)}
                        />
                    </FormControl>
                </GridItem>
                <GridItem colSpan={[1, 2]}>
                    <FormControl id="memoSendControl">
                        <FormLabel id="memoSend">Fee Gas(optional)</FormLabel>
                        <Input
                            placeholder="200000"
                            type="text"
                            onChange={(e) => setFeeGas(e.target.value)}
                        />
                    </FormControl>
                </GridItem>

                <GridItem colSpan={1} h="full">
                    <Center h="full">
                        <FormControl id="buttonDelegateControl">
                            <Button
                                bg="purple.300"
                                color="white"
                                w="full"
                                onClick={() => {
                                    execute(
                                        dest,
                                        amount,
                                        memo,
                                        feeAmount,
                                        feeDenom,
                                        feeGas
                                    );
                                }}
                            >
                                Delegate Coins{' '}
                                <FiSend style={{ marginLeft: '5px' }} />
                            </Button>
                        </FormControl>
                    </Center>
                </GridItem>
            </SimpleGrid>
        </VStack>
    );
};

export default DelegateAphotons;
