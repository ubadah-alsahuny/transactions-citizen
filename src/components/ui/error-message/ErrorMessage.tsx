import styles from '@/styles/ui/error-message/errormessage.module.css';

export function ErrorMessage ( {children} ) {
    return (
        <div className={styles.errorMessageContainer}>
            {children}
        </div>
    )
}