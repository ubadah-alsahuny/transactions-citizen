import styles from '@/styles/ui/transaction-card/transactioncard.module.css';
import StatusBadge from "@/components/ui/status-badge/StatusBadge.tsx";

type transactionProps = {
    name: string;
    description: string;
    isActive: boolean;
    onClick: () => void;
}

export function TransactionCard ( {name, description, isActive, onClick }: transactionProps ) {
    return (
        <div onClick={onClick} className={styles.card_container}>
            <div>
                <h3>
                    {name}
                </h3>
            </div>

            <div>
                <h4>
                    {description}
                </h4>
            </div>

            {isActive ? <StatusBadge status={'مُفعّل'}></StatusBadge>
                :
                <StatusBadge status={'غير مُفعّل'}></StatusBadge>
            }
        </div>
    )
}