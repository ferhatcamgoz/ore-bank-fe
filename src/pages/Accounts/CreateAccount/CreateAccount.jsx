import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import styles from "./CreateAccount.module.css";
import { useDispatch, useSelector } from "react-redux";
import { createAccount } from "../../../thunks/accountThunk";
import {ArrowLeftIcon} from "@heroicons/react/24/solid";

const CreateAccount = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [balance, setBalance] = useState("");
    const [error, setError] = useState("");

    const { loading } = useSelector((state) => state.accounts);

    useEffect(() => {
        document.title = "OreDataBank - Create Account";
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!name.trim()) {
            setError("Account name is mandatory.");
            return;
        }
        if (!balance || isNaN(balance) || Number(balance) < 0) {
            setError("Starting balance must be a positive number.");
            return;
        }

        try {
            const resultAction = await dispatch(
                createAccount({
                    name: name.trim(),
                    balance: parseFloat(balance),
                })
            );

            if (createAccount.fulfilled.match(resultAction)) {
                navigate("/dashboard/accounts");
            } else {
                setError(resultAction.payload || "An error occurred while creating account.");
            }
        } catch (err) {
            setError("An unexpected error occurred.");
        }
    };

    const handleBack = () => {
        navigate('/dashboard/accounts');
    };

    return (
        <div className={styles.container}>
            <button onClick={handleBack} className={styles.backButton}>
                <ArrowLeftIcon className={styles.backIcon} />
                Back to Accounts
            </button>
            <h2 className={styles.title}>Create New Account</h2>
            <form onSubmit={handleSubmit} className={styles.form}>
                <label className={styles.label}>
                    Account Name
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className={styles.input}
                        required
                        placeholder="e.g. Main Account"
                    />
                </label>
                <label className={styles.label}>
                    Starting Balance
                    <input
                        type="number"
                        step="0.01"
                        min="0"
                        value={balance}
                        onChange={(e) => setBalance(e.target.value)}
                        className={styles.input}
                        required
                        placeholder="e.g. 1000.00"
                    />
                </label>

                <button type="submit" className={styles.button} disabled={loading}>
                    {loading ? "Creating..." : "Create Account"}
                </button>
                {error && <p className={styles.error}>{error}</p>}
            </form>
        </div>
    );
};

export default CreateAccount;
