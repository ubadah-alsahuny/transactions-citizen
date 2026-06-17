import styles from '@/styles/ui/organization-card/organizationcard.module.css';
import InstitutionPlaceholder from '@/assets/images/png/institution-placeholder.png';

type OrganizationProps = {
    name: string;
    description?: string;
    image?: string;
    onClick?: () => void;
}

export default function OrganizationCard({
                                             name = 'اسم الدائرة الحكومية',
                                             description,
                                             image,
                                             onClick
                                         }: OrganizationProps) {
    return (
        <div className={styles.cardLayout} onClick={onClick}>
            <div className={styles.imageSettings}>
                <img src={image ? image : InstitutionPlaceholder} alt={name} />
            </div>

            <div className={styles.textContainer}>
                <h4 className={styles.cardTitle}>
                    {name}
                </h4>

                {description && (
                    <p className={styles.cardDescription}>
                        {description}
                    </p>
                )}
            </div>
        </div>
    )
}