import {useSelector} from "react-redux";
import Card from "../components/Card/Card";
import {useEffect} from "react";

const Home = () => {

    useEffect(() => {
        document.title = "OreDataBank - Home";
    }, []);

    const user = useSelector((state) => state.auth.user);

    return (
        <div>
            <p>Welcome, {user ? user.username : "Guest"}</p>

            <div style={{display: "flex"}}>
            <Card
                title="Accounts"
                description="View your all accounts"
                route="/dashboard/accounts"
            />
            <Card
                title="Transfer"
                description="Transfer to another account"
                route="/dashboard/transfer"
            />
            </div>
        </div>
    );
};

export default Home;
