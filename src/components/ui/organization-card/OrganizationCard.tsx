import styles from '@/styles/ui/organization-card/organizationcard.module.css';

export default function OrganizationCard() {
    return (
        <div className={styles.cardLayout}>
            <div className={styles.imageSettings}>
                <img src={""} alt={""}/>
            </div>
            <div style={{height: '5rem', padding: '0.25rem 2rem'}}>
                <h4 style={{height: '2rem'}}>
                    دائرة خدمة الزبائن
                </h4>
                <p style={{
                    fontSize: '0.85rem',
                    textOverflow: 'ellipsis',
                    width: '100%',
                    height: '3rem',
                    overflow: 'hidden'
                }}>
                    للقيام بالخدمات المتعلقة بالهاتف الأرضي أو الانترنت
                </p>
            </div>
        </div>
    )
}