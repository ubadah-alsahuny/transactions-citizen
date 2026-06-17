// TransactionCard.tsx
import styles from '@/styles/ui/transaction-card/transactioncard.module.css';
import StatusBadge from "@/components/ui/status-badge/StatusBadge.tsx";

type CardVariant = 'في حالة انتظار' | 'مقبول' | 'مرفوض' | 'مُفعّل' | 'غير مُفعّل';

type TransactionProps = {
    name: string;
    description: string;
    status: CardVariant | string;
    onClick: () => void;
}

export function TransactionCard({ name, description, status, onClick }: TransactionProps) {
    return (
        <div onClick={onClick} className={styles.card_container}>
            <div className={styles.text_cluster}>
                <h3 className={styles.card_title}>
                    {name}
                </h3>
                <p className={styles.card_description}>
                    {description}
                </p>
            </div>

            <StatusBadge status={status} />
        </div>
    )
}