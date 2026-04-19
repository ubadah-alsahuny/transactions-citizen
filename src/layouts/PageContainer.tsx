import type {ReactNode} from 'react'
import styles from '@/styles/layouts/pagecontainer.module.css'

type PageContainerProps = {
    children: ReactNode
}

export function PageContainer({ children }: PageContainerProps) {
    return (
        <div className={styles.page_container_settings}>
            {children}
        </div>
    )
}
