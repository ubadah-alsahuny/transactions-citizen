import styles from '@/styles/ui/step-card/stepcard.module.css';

type stepCardProps = {
    stepOrder: number;
    sectionName: string;
}

export default function StepCard ( { stepOrder, sectionName }: stepCardProps ) {
    return (
        <div className={styles.card_container}>
            <h5 style={{fontWeight: 'bold'}}>الخطــوة {stepOrder}</h5>
            <h4>
                {sectionName}
            </h4>
        </div>
    )
}