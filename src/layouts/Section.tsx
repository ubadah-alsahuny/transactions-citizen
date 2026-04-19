import type { ReactNode } from 'react'
import styles from '@/styles/layouts/section.module.css'

type SectionProps = {
    title: string
    children?: ReactNode
    id?: string
}

export function Section({ title, children, id }: SectionProps) {
    return (
        <section id={id} className={styles.section}>
            <div className={styles.titleContainer}>
                <h2 className={styles.sectionTitle}>{title}</h2>
                <div className={styles.line} />
            </div>
            {children}
        </section>
    )
}
