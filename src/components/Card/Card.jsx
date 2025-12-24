import { useNavigate } from "react-router-dom";
import styles from "./Card.module.css";

// Heroicons importları (outline versiyonları)
import { BanknotesIcon, ArrowsRightLeftIcon, ClockIcon } from "@heroicons/react/24/outline";

const iconMap = {
    accounts: <BanknotesIcon className={styles.icon} />,
    transfer: <ArrowsRightLeftIcon className={styles.icon} />
};

const Card = ({ title, description, route }) => {
    const navigate = useNavigate();

    let icon = null;

    if (title.toLowerCase().includes("account")) icon = iconMap.accounts;
    else if (title.toLowerCase().includes("transfer")) icon = iconMap.transfer;

    return (
        <div className={styles.card}>
            <div className={styles.iconWrapper}>
                {icon}
                <h2 className={styles.title}>{title}</h2>
            </div>

            <p className={styles.description}>{description}</p>
            <button onClick={() => navigate(route)} className={styles.button}>
                Go
            </button>
        </div>
    );
};

export default Card;
