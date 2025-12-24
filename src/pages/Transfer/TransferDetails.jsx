import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import styles from './Transfer.module.css';
import {ArrowLeftIcon} from "@heroicons/react/24/solid";
import { transferMoney } from '../../thunks/transactionThunk';

const TransferDetails = () => {

    const dispatch = useDispatch();

    const navigate = useNavigate();
    const location = useLocation();

    const allAccounts = useSelector(state => state.accounts.accounts);

    const [toAccountNumber, setToAccountNumber] = useState('');
    const [amount, setAmount] = useState('');
    const [message, setMessage] = useState('');

    const fromAccount = location.state?.fromAccount;

    useEffect(() => {
        document.title = "OreDataBank - Transfer";
    }, []);

    useEffect(() => {
        if (!fromAccount) {
            navigate('/transfer');
        }
    }, [fromAccount, navigate]);

    const otherAccounts = fromAccount
        ? allAccounts.filter(acc => acc.number !== fromAccount.number)
        : [];

    const handleQuickSelect = (accNumber) => {
        setToAccountNumber(accNumber);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        if (!toAccountNumber) {
            setMessage('Please select or enter the account number to which you want to transfer money.');
            return;
        }
        if (toAccountNumber === fromAccount?.number) {
            setMessage('The sender and recipient accounts cannot be the same.');
            return;
        }
        if (!amount || Number(amount) <= 0) {
            setMessage('Please enter a valid amount.');
            return;
        }
        if (fromAccount && Number(amount) > fromAccount.balance) {
            setMessage('Insufficient balance.');
            return;
        }

        try {
            await dispatch(transferMoney({
                sendingAccountNumber: fromAccount.number,
                receivingAccountNumber: toAccountNumber,
                amount: parseFloat(amount)
            })).unwrap();

            setMessage(`Successfully transferred ${amount} TL from account ${fromAccount.number} to account ${toAccountNumber}.`);
            setAmount('');
            setToAccountNumber('');
            setTimeout(() => {
                navigate('/dashboard/transfer');
            }, 1000);
        } catch (err) {
            setMessage(err || 'An error occurred during the transfer.');
        }
    };

    if (!fromAccount) {
        return null;
    }

    const handleBack = () => {
        navigate('/dashboard/transfer');
    };

    return (
        <div className={styles.container}>
            <button onClick={handleBack} className={styles.backButton}>
                <ArrowLeftIcon className={styles.backIcon} />
                Back to Transfer
            </button>
            <h2 className={styles.title}>Transfer Details</h2>

            <form onSubmit={handleSubmit} className={styles.form}>
                <label className={styles.label}>
                    Sender Account Number
                    <input
                        type="text"
                        value={fromAccount.number}
                        readOnly
                        className={styles.input}
                    />
                </label>

                <label className={styles.label}>
                    Recipient Account Number
                    <input
                        type="text"
                        value={toAccountNumber}
                        onChange={(e) => setToAccountNumber(e.target.value)}
                        placeholder="Enter account number or select from below"
                        className={styles.input}
                    />
                </label>

                <div className={styles.quickSelectContainer}>
                    <span>My Other Accounts:</span>
                    <ul className={styles.quickSelectList}>
                        {otherAccounts.map((acc) => (
                            <li
                                key={acc.id}
                                onClick={() => handleQuickSelect(acc.number)}
                                className={styles.quickSelectItem}
                            >
                                {acc.number} - {acc.name}
                            </li>
                        ))}
                    </ul>
                </div>

                <label className={styles.label}>
                    Amount (TL)
                    <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="e.g. 1000"
                        className={styles.input}
                    />
                </label>

                <button type="submit" className={styles.button}>
                    Transfer
                </button>

                {message && (
                    <p style={{ color: message.includes('Successfully') ? 'green' : 'red', marginTop: '1rem' }}>
                        {message}
                    </p>
                )}
            </form>
        </div>
    );
};

export default TransferDetails;
