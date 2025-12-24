import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchTransactionsByAccountId } from '../../thunks/transactionThunk'; // sadece thunk
import { useParams, useNavigate } from 'react-router-dom';
import styles from './TransactionHistory.module.css';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import {fetchAccount} from "../../thunks/accountThunk";

const TransactionHistory = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();

    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [account, setAccount] = useState(null);

    useEffect(() => {
        document.title = "OreDataBank - Transaction History";
    }, []);

    useEffect(() => {
        setLoading(true);
        setError("");
        dispatch(fetchAccount(id))
            .unwrap()
            .then((acc) => {
                setAccount(acc);
            })
            .catch((err) => {
                setError(err);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [dispatch, id]);

    useEffect(() => {
        if (!id) return;

        setLoading(true);
        setError(null);

        dispatch(fetchTransactionsByAccountId(id))
            .unwrap()
            .then((data) => {
                setTransactions(data);  // thunk’dan gelen veriyi local state’e atıyoruz
                setLoading(false);
            })
            .catch((err) => {
                setError(err || 'Transaction history could not be loaded.');
                setLoading(false);
            });
    }, [dispatch, id]);

    const handleBack = () => {
        navigate('/dashboard/accounts');
    };

    if (loading) return <p className={styles.loading}>Loading transaction history...</p>;
    if (error) return <p className={styles.error}>{error}</p>;
    if (transactions.length === 0) return <p className={styles.noData}>No transactions found for this account.</p>;

    const formatDate = (dateString) => {
        const date = new Date(dateString);

        const pad = (num) => num.toString().padStart(2, '0');

        const hours = pad(date.getHours());
        const minutes = pad(date.getMinutes());
        const day = pad(date.getDate());
        const month = pad(date.getMonth() + 1);
        const year = date.getFullYear();

        return `${hours}:${minutes} ${day}.${month}.${year}`;
    };

    return (
        <div className={styles.container}>
            <button onClick={handleBack} className={styles.backButton}>
                <ArrowLeftIcon className={styles.backIcon} />
                Back to Accounts
            </button>

            <h2 className={styles.title}>Transaction History</h2>
            <p><span style={{fontWeight : "bold"}}>Account Name: </span>{account.name}</p>
            <p><span style={{fontWeight : "bold"}}>Account Number: </span>{account.number}</p>

            <table className={styles.table}>
                <thead>
                <tr>
                    <th>Date</th>
                    <th>From</th>
                    <th>To</th>
                    <th>Amount (TRY)</th>
                    <th>Status</th>
                </tr>
                </thead>
                <tbody>
                {transactions.map(tx => {
                    const isOutgoing = tx.fromAccountNumber === account?.number;
                    const isFromAccountMatch = tx.fromAccountNumber === account?.number;
                    const isToAccountMatch = tx.toAccountNumber === account?.number;

                    const sign = isOutgoing ? '-' : '+';
                    const amountColor = isOutgoing ? 'red' : 'green';

                    const statusColor =
                        tx.status === 'SUCCESS'
                            ? 'green'
                            : tx.status === 'FAILED'
                                ? 'red'
                                : 'inherit';

                    const fromAccountColor = isFromAccountMatch ? '#0077ff' : 'inherit';
                    const toAccountColor = isToAccountMatch ? '#0077ff' : 'inherit';

                    return (
                        <tr key={tx.id}>
                            <td>{formatDate(tx.transactionDate)}</td>
                            <td style={{ color: fromAccountColor }}>{tx.fromAccountNumber}</td>
                            <td style={{ color: toAccountColor }}>{tx.toAccountNumber}</td>
                            <td style={{ color: amountColor }}>
                                {sign}
                                {tx.amount.toLocaleString('tr-TR', {
                                    style: 'currency',
                                    currency: 'TRY'
                                })}
                            </td>
                            <td style={{ color: statusColor }}>
                                {tx.status || '-'}
                            </td>
                        </tr>
                    );
                })}




                </tbody>
            </table>
        </div>
    );
};

export default TransactionHistory;
