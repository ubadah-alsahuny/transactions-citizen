import styles from '@/styles/ui/step-card/stepcard.module.css';

type StepCardProps = {
    stepOrder: number;
    sectionName: string;
}

export default function StepCard({ stepOrder, sectionName }: StepCardProps) {
    return (
        <div className={styles.card_container}>
            <div className={styles.badge}>
                {stepOrder}
            </div>

            <div className={styles.content_stack}>
                <span className={styles.step_label}>الخطوة المطلوبة</span>
                <h4 className={styles.section_name}>
                    {sectionName}
                </h4>
            </div>
        </div>
    )
}