import styles from '@/styles/ui/organization-card/organizationcard.module.css';
import InstitutionPlaceholder from '@/assets/images/png/institution-placeholder.png';

type organizationProps = {
    name: string;
    description?: string;
    image?: string;
    onClick?: () => void;
}

export default function OrganizationCard( { name = 'اسم الدائرة الحكومية', description, image, onClick}: organizationProps ) {
    return (
        <div className={styles.cardLayout} onClick={onClick}>
            <div className={styles.imageSettings}>
                <img src={image ? image : InstitutionPlaceholder} alt={""}/>
            </div>
            <div style={{padding: '0 2rem'}}>
                <h4 style={{height: '2rem', width: '100%'}}>
                    {name}
                </h4>

                {description ?
                <p style={{
                    fontSize: '0.85rem',
                    textOverflow: 'ellipsis',
                    width: '100%',
                    marginBottom: '0.5rem',
                    overflow: 'hidden'
                }}>
                    {description}
                </p> : null}
            </div>
        </div>
    )
}