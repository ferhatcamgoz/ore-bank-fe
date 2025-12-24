import React, {useEffect, useState} from "react";
import { useDispatch } from "react-redux";
import { loginSuccess, setUser } from "../../features/auth/authSlice";
import { useNavigate, Link } from "react-router-dom";
import styles from "./AuthForm.module.css";
import {loginUser} from "../../thunks/authThunk";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        document.title = "OreDataBank - Login";
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const data = await dispatch(loginUser({ username, password })).unwrap();

            dispatch(loginSuccess(data.token));
            dispatch(setUser({
                email: data.email,
                id: data.id,
                username: data.username
            }));

            navigate("/dashboard/home");
        } catch (err) {
            setError(err);
        }
    };

    return (
        <div className="pageWrapper">
        <div className={styles.container}>
            <h2 className={styles.title}>Login</h2>
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
                <button type="submit" className={styles.button}>Login</button>
                {error && <p className={styles.error}>{error}</p>}
            </form>
            <div className={styles.switchLink}>
                Don't have an account yet? <Link to="/register">Register</Link>
            </div>
        </div>
        </div>
    );
};

export default Login;
