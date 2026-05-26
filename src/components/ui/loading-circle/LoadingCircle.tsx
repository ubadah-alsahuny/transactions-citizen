import styles from '@/styles/ui/loading-circle/loadingcircle.module.css';

type LoadingCircleProps = {
    color: string;
}

export function LoadingCircle ( { color = 'white' }: LoadingCircleProps ) {
    return (
        <div className={styles.loadingCircle} style={{border: `${color} dashed 0.5rem`}}>
        </div>
    )
}