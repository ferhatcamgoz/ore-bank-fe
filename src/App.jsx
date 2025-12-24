import './App.css';
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import Home from "./pages/Home";
import { useSelector } from "react-redux";
import DashboardLayout from "./components/DashboardLayout/DashboardLayout";
import Accounts from "./pages/Accounts/Accounts/Accounts";
import Transfer from "./pages/Transfer/Transfer";
import CreateAccount from "./pages/Accounts/CreateAccount/CreateAccount";
import AccountDetails from "./pages/Accounts/AccountDetails/AccountDetails";
import TransferDetails from "./pages/Transfer/TransferDetails";
import TransactionHistory from "./pages/TransactionHistory/TransactionHistory";

const RedirectHandler = () => {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    return isAuthenticated ? <Navigate to="/dashboard/home" replace /> : <Navigate to="/login" replace />;
};


function App() {
    return (
        <Router>
            <Routes>
                <Route
                    path="/login"
                    element={
                        <PublicRoute>
                            <Login />
                        </PublicRoute>
                    }
                />
                <Route
                    path="/register"
                    element={
                        <PublicRoute>
                            <Register />
                        </PublicRoute>
                    }
                />

                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <DashboardLayout />
                        </ProtectedRoute>
                    }
                >
                    <Route path="home" element={<Home />} />
                    <Route path="accounts" element={<Accounts />} />
                    <Route path="accounts/new" element={<CreateAccount />} />
                    <Route path="accounts/:id" element={<AccountDetails />} />
                    <Route path="transfer" element={<Transfer />} />
                    <Route path="transfer/details" element={<TransferDetails />} />
                    <Route path="transaction-history/:id" element={<TransactionHistory />} />
                    <Route index element={<Home />} />
                </Route>

                <Route path="*" element={<RedirectHandler />} />
            </Routes>
        </Router>
    );
}


export default App;
