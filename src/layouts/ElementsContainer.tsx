import type {ReactNode} from "react";
import styles from '@/styles/layouts/elementscontainer.module.css';

type ElementsContainerProps = {
    children: ReactNode
}

export function ElementsContainer ({ children }: ElementsContainerProps) {
    return (
        <div className={styles.container_settings}>
            {children}
        </div>
    )
}