import type { ReactNode } from 'react';
import styles from '@/styles/ui/error-message/errormessage.module.css';

type ErrorMessageProps = {
    children: ReactNode;
}

export function ErrorMessage ( {children}: ErrorMessageProps ) {
    return (
        <div className={styles.errorMessageContainer}>
            {children}
        </div>
    )
}
