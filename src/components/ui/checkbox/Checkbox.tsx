import styles from './checkbox.module.css';

type CheckboxProps = {
    label?: string;
    checked: boolean;
    onChange: (value: boolean) => void;
    required?: boolean;
    error?: string;
    id?: string;
};

export default function Checkbox({ label, checked, onChange, required = false, error, id }: CheckboxProps) {
    const inputId = id ?? `checkbox-${label}`;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            <label htmlFor={inputId} className={styles.checkbox_wrapper}>
                <input
                    id={inputId}
                    type="checkbox"
                    className={styles.hidden_input}
                    checked={checked}
                    onChange={(e) => onChange(e.target.checked)}
                />
                <div className={`${styles.custom_box} ${checked ? styles.checked : ''}`}>
                    <span className={styles.checkmark}>✓</span>
                </div>
                {label && (
                    <span className={styles.label_text}>
                        {label}
                        {required && <span className={styles.required_star}>*</span>}
                    </span>
                )}
            </label>
            {error && <p className={styles.error_text}>{error}</p>}
        </div>
    );
}
