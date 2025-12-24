import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./AccountDetails.module.css";
import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import { deleteAccount, fetchAccount, updateAccount } from "../../../thunks/accountThunk";
import { useDispatch } from 'react-redux';
import ConfirmModal from "../../../components/ConfirmModal/ConfirmModal";

const AccountDetails = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const navigate = useNavigate();

    const [account, setAccount] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [editMode, setEditMode] = useState(false);
    const [name, setName] = useState("");

    const [showConfirm, setShowConfirm] = useState(false);

    useEffect(() => {
        document.title = "OreDataBank - Account Details";
    }, []);

    useEffect(() => {
        setLoading(true);
        setError("");
        dispatch(fetchAccount(id))
            .unwrap()
            .then((acc) => {
                setAccount(acc);
                setName(acc.name);
            })
            .catch((err) => {
                setError(err);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [dispatch, id]);

    const handleEdit = () => setEditMode(true);

    const handleSave = () => {
        if (!name.trim()) return;
        setLoading(true);
        setError("");
        dispatch(updateAccount({ id, name }))
            .unwrap()
            .then((updatedAccount) => {
                setAccount(updatedAccount);
                setEditMode(false);
            })
            .catch((err) => {
                setError(err);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handleDeleteClick = () => {
        setShowConfirm(true);
    };

    const handleConfirm = () => {
        setShowConfirm(false);
        dispatch(deleteAccount(id))
            .unwrap()
            .then(() => {
                navigate("/dashboard/accounts");
            })
            .catch((err) => {
                setError(err);
                setLoading(false);
            });
    };

    const handleCancel = () => {
        setShowConfirm(false);
    };

    const handleBack = () => {
        navigate('/dashboard/accounts');
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p className={styles.error}>{error}</p>;
    if (!account) return <p>Account not found.</p>;

    return (
        <div className={styles.container}>
            <button onClick={handleBack} className={styles.backButton}>
                <ArrowLeftIcon className={styles.backIcon} />
                Back to Accounts
            </button>
            <h2 className={styles.title}>Account Details</h2>

            <div className={styles.section}>
                <label className={styles.label}>Account Number</label>
                <div className={styles.value}>{account.number}</div>
            </div>

            <div className={styles.section}>
                <label className={styles.label}>Balance</label>
                <div className={styles.value}>
                    {account.balance.toLocaleString("tr-TR", {
                        style: "currency",
                        currency: "TRY",
                    })}
                </div>
            </div>

            <div className={styles.section}>
                <label className={styles.label}>Account Name</label>
                {editMode ? (
                    <input
                        className={styles.input}
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                ) : (
                    <div className={styles.value}>{account.name}</div>
                )}
            </div>

            {!editMode ? (
                <button title="Enables update mode" className={`${styles.button} ${styles.editButton}`} onClick={handleEdit}>
                    Update Account
                </button>
            ) : (
                <div className={styles.buttonGroup}>
                    <button className={`${styles.button} ${styles.saveButton}`} onClick={handleSave}>
                        Save
                    </button>
                    <button className={`${styles.button} ${styles.deleteButton}`} onClick={handleDeleteClick}>
                        Delete Account
                    </button>
                    <button
                        className={`${styles.button} ${styles.cancelButton}`}
                        onClick={() => {
                            setEditMode(false);
                            setName(account.name);
                            setError("");
                        }}
                    >
                        Cancel
                    </button>
                </div>
            )}
            {showConfirm && (
                <ConfirmModal
                    message="Are you sure you want to delete this account? This action cannot be undone."
                    onConfirm={handleConfirm}
                    onCancel={handleCancel}
                />
            )}
            {error && <p className={styles.error}>{error}</p>}
        </div>
    );
};

export default AccountDetails;
