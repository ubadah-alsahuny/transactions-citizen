import styles from '@/styles/ui/transaction-card/transactioncard.module.css';
import StatusBadge from "@/components/ui/status-badge/StatusBadge.tsx";

type CardVariant = 'في حالة انتظار' | 'مقبول' | 'مرفوض' | 'مُفعّل' | 'غير مُفعّل';

type transactionProps = {
    name: string;
    description: string;
    status: CardVariant | string;
    onClick: () => void;
}

export function TransactionCard ( {name, description, status, onClick }: transactionProps ) {
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

            {status ? <StatusBadge status={status}></StatusBadge>
                :
                <StatusBadge status={'لا يوجد حالة'}></StatusBadge>
            }
        </div>
    )
}