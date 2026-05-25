import styles from '@/styles/ui/organization-card/organizationcard.module.css';

type organizationProps = {
    name: string;
    description: string;
}

export default function OrganizationCard( { name = 'اسم الدائرة الحكومية', description = 'وصف عن أهم المعاملات الحكومية التي تقدمها الدائرة' }: organizationProps ) {
    return (
        <div className={styles.cardLayout}>
            <div className={styles.imageSettings}>
                <img src={""} alt={""}/>
            </div>
            <div style={{height: '5rem', padding: '0.25rem 2rem'}}>
                <h4 style={{height: '2rem'}}>
                    {name}
                </h4>
                <p style={{
                    fontSize: '0.85rem',
                    textOverflow: 'ellipsis',
                    width: '100%',
                    height: '3rem',
                    overflow: 'hidden'
                }}>
                    {description}
                </p>
            </div>
        </div>
    )
}