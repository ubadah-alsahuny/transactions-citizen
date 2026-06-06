import styles from '@/styles/ui/status-badge/statusbadge.module.css';

type Status = 'في حالة انتظار' | 'مقبول' | 'مرفوض' | 'مُفعّل' | 'غير مُفعّل' | 'لا يوجد حالة';

type StatusBadgeProps = {
    status: Status
}

export default function StatusBadge({ status }: StatusBadgeProps) {
    return (
        <div className={styles.badge_container}>
            <p>
                {status}
            </p>
        </div>
    )
}
