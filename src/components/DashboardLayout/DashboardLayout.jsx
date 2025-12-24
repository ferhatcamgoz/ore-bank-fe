import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/auth/authSlice";
import styles from "./DashboardLayout.module.css";
import {UserCircleIcon} from "@heroicons/react/16/solid";
import Footer from "../Footer/Footer";

const DashboardLayout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector((state) => state.auth.user);

    const handleLogout = () => {
        dispatch(logout());
        navigate("/login");
    };

    return (
        <div>
            <nav className={styles.navbar}>
                <div className={styles.brand}>OreDataBank</div>

                <div className={styles.navLinks}>
                    <NavLink
                        to="/dashboard/home"
                        className={({ isActive }) =>
                            isActive ? `${styles.navLink} ${styles.navLinkActive}` : styles.navLink
                        }
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to="/dashboard/accounts"
                        className={({ isActive }) =>
                            isActive ? `${styles.navLink} ${styles.navLinkActive}` : styles.navLink
                        }
                    >
                        Accounts
                    </NavLink>
                    <NavLink
                        to="/dashboard/transfer"
                        className={({ isActive }) =>
                            isActive ? `${styles.navLink} ${styles.navLinkActive}` : styles.navLink
                        }
                    >
                        Transfer
                    </NavLink>
                </div>

                <div className={styles.userSection}>
                    <div className={styles.usernameAndLogo}>
                    <UserCircleIcon className={styles.userIcon} />
                    {user?.username && <span className={styles.username}>{user.username}</span>}
                    </div>
                    <button onClick={handleLogout} className={styles.logoutButton}>
                        Logout
                    </button>
                </div>
            </nav>

            <main className={styles.main}>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default DashboardLayout;
