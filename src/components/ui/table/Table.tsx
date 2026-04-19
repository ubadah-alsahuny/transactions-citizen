import styles from '@/styles/ui/table/table.module.css'

interface TableProps<T>{
    headers: string[];
    data: T[];
    renderRow: (item: T) => React.ReactNode;
}

export function Table<T>({ headers, data, renderRow }: TableProps<T>) {
    return (
        <div className={styles.tableContainer}>
            <table className={styles.customTable}>
                <thead>
                <tr>
                    {headers.map((header, index) => (
                        <th key={index}>{header}</th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {data.map((item, index) => (
                    <tr key={index}>
                        {renderRow(item)}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}