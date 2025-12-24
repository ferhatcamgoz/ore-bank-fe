import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAccounts } from '../../thunks/accountThunk';
import { useNavigate } from 'react-router-dom';
import styles from './Transfer.module.css';
import {ArrowLeftIcon} from "@heroicons/react/24/solid";

const Transfer = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { accounts, loading, error } = useSelector(state => state.accounts);

    useEffect(() => {
        document.title = "OreDataBank - Transfer";
    }, []);

    useEffect(() => {
        dispatch(fetchAccounts({ number: '', name: '' }));
    }, [dispatch]);

    const handleSelect = (account) => {
        navigate('/dashboard/transfer/details', { state: { fromAccount: account } });
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p className={styles.error}>{error}</p>;

    const handleBack = () => {
        navigate('/dashboard/accounts');
    };

    return (
        <div className={styles.container}>
            <button onClick={handleBack} className={styles.backButton}>
                <ArrowLeftIcon className={styles.backIcon} />
                Back to Accounts
            </button>
            <h2 className={styles.title}>Select the Account You Want to Transfer From</h2>
            <ul className={styles.accountGrid}>
                {accounts.map((acc) => (
                    <li
                        key={acc.id}
                        className={styles.accountCard}
                        onClick={() => handleSelect(acc)}
                    >
                        <div className={styles.cardHeader}>
                            <span className={styles.accountNumber}>{acc.number}</span>
                            <span className={styles.accountName}>{acc.name}</span>
                        </div>
                        <div className={styles.cardBalance}>
                            {acc.balance.toLocaleString('tr-TR', {
                                style: 'currency',
                                currency: 'TRY',
                            })}
                        </div>
                    </li>
                ))}
            </ul>

        </div>
    );
};

export default Transfer;
