import styles from '@/styles/ui/organization-card/organizationcard.module.css';
import InstitutionPlaceholder from '@/assets/images/png/institution-placeholder.png';

type OrganizationProps = {
    name: string;
    description?: string;
    image?: string;
    status?: string;
    onClick?: () => void;
}

export default function OrganizationCard({
                                             name = 'اسم الدائرة الحكومية',
                                             description,
                                             image,
                                             status,
                                             onClick
                                         }: OrganizationProps) {
    const isActive = status?.toLowerCase() === 'active';

    return (
        <div className={styles.cardLayout} onClick={onClick}>
            <div className={styles.imageSettings}>
                <img src={image ? image : InstitutionPlaceholder} alt={name} />
            </div>

            <div className={styles.textContainer}>
                <div className={styles.cardHeader}>
                    <h4 className={styles.cardTitle}>
                        {name}
                    </h4>

                    {status && (
                        <span
                            className={styles.statusIndicator}
                            title={isActive ? 'نشطة' : 'غير نشطة'}
                            aria-label={isActive ? 'نشطة' : 'غير نشطة'}
                        >
                            <span
                                className={`${styles.statusDot} ${isActive ? styles.statusDotActive : styles.statusDotInactive}`}
                            />
                        </span>
                    )}
                </div>

                {description && (
                    <p className={styles.cardDescription}>
                        {description}
                    </p>
                )}
            </div>
        </div>
    )
}
