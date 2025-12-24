import React, {useEffect, useState} from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "./AuthForm.module.css";
import {registerUser} from "../../thunks/authThunk";
import {useDispatch} from "react-redux";

const Register = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        document.title = "OreDataBank - Register";
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        const passwordRegex = /^(?=.*\d).{8,}$/;
        if (!passwordRegex.test(password)) {
            setError("Password must be at least 8 characters long and contain at least one number.");
            return;
        }

        try {
            const result = await dispatch(registerUser({ username, email, password })).unwrap();
            navigate("/login");
        } catch (err) {
            setError(err);
        }
    };


    return (
        <div className="pageWrapper">
        <div className={styles.container}>
            <h2 className={styles.title}>Register</h2>
            <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className={styles.input}
                        placeholder="Username"
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={styles.input}
                        placeholder="yourmail@mail.com"
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={styles.input}
                        placeholder="**************"
                        required
                    />
                </div>
                <button type="submit" className={styles.button}>Register</button>
                {error && <p className={styles.error}>{error}</p>}
            </form>
            <div className={styles.switchLink}>
                Already have an account? <Link to="/login">Login</Link>
            </div>
        </div>
        </div>
    );
};

export default Register;
