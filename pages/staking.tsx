import { useContext } from 'react';
import { TransactionsValidatorSection } from '../src/sections/staking';
import Template from '../src/template/template';
import { store } from '../src/utils/state';

const Transactions = () => {
    return (
        <Template
            section="staking"
            element={[<TransactionsValidatorSection key="section" />]}
        />
    );
};

export default Transactions;
