// StatusBadge.tsx
import styles from '@/styles/ui/status-badge/statusbadge.module.css';

type Status = 'في حالة انتظار' | 'مقبول' | 'مرفوض' | 'مُفعّل' | 'غير مُفعّل' | 'لا يوجد حالة';

type StatusBadgeProps = {
    status: Status | string;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
    const normalizedStatus = status || 'لا يوجد حالة';

    return (
        <div className={styles.badge_container} data-status={normalizedStatus}>
            <span>{normalizedStatus}</span>
        </div>
    )
}