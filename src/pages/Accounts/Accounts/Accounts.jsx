import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAccounts } from '../../../thunks/accountThunk';
import styles from './Accounts.module.css';
import { useNavigate } from 'react-router-dom';

const Accounts = () => {
    const dispatch = useDispatch();
    const { accounts, loading, error } = useSelector((state) => state.accounts);

    const [number, setNumber] = useState('');
    const [name, setName] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        document.title = "OreDataBank - Accounts";
    }, []);

    useEffect(() => {
        dispatch(fetchAccounts({ number: '', name: '' }));
    }, [dispatch]);

    const handleSearch = (e) => {
        e.preventDefault();
        dispatch(fetchAccounts({ number, name }));
    };

    const handleReset = () => {
        setNumber('');
        setName('');
        dispatch(fetchAccounts({ number: '', name: '' }));
    };

    const handleEdit = (account) => {
        navigate(`/dashboard/accounts/${account.id}`);
    };

    const handleTransactionHistory = (account) => {
        navigate(`/dashboard/transaction-history/${account.id}`);
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>My Accounts</h2>
            <form onSubmit={handleSearch} className={styles.form}>
                <div className={styles.leftGroup}>
                    <input
                        type="text"
                        placeholder="Account Number"
                        value={number}
                        onChange={(e) => setNumber(e.target.value)}
                        className={styles.input}
                    />
                    <input
                        type="text"
                        placeholder="Account Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className={styles.input}
                    />
                    <button type="submit" className={styles.button}>Search</button>
                    <button
                        type="button"
                        onClick={handleReset}
                        className={`${styles.button} ${styles.resetButton}`}
                    >
                        Reset
                    </button>
                </div>

                <div className={styles.rightGroup}>
                    <button
                        type="button"
                        className={styles.createButton}
                        onClick={() => navigate('/dashboard/accounts/new')}
                    >
                        Create New Account
                    </button>
                </div>
            </form>

            {loading && <p>Loading...</p>}
            {error && <p className={styles.error}>{error}</p>}

            <table className={styles.table}>
                <thead className={styles.thead}>
                <tr>
                    <th className={styles.th}>Account Number</th>
                    <th className={styles.th}>Account Name</th>
                    <th className={styles.th}>Balance</th>
                    <th className={styles.th}>Actions</th>
                </tr>
                </thead>
                <tbody>
                {accounts.map((acc) => (
                    <tr key={acc.id} className={styles.tr}>
                        <td className={styles.td}>{acc.number}</td>
                        <td className={styles.td}>{acc.name}</td>
                        <td className={`${styles.td} ${styles.balance}`}>
                            {acc.balance.toLocaleString('tr-TR', {
                                style: 'currency',
                                currency: 'TRY',
                            })}
                        </td>
                        <td className={styles.td}>
                            <button
                                className={styles.editButton}
                                onClick={() => handleEdit(acc)}
                                title="View Details"
                            >
                                View Details
                            </button>
                            <button
                                className={styles.transactionButton}
                                onClick={() => handleTransactionHistory(acc)}
                                title="View Transaction History"
                            >
                                Transaction History
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default Accounts;
