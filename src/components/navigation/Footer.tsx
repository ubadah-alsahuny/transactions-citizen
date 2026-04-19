import styles from '@/styles/navigation/header_and_footer.module.css'

export function Footer () {
    return (
        <footer>
            <div className={styles.footer_settings}>
                <h4><span>&copy;</span> syrian.transactions</h4>
                <h5>تم التطوير بواسطة أربعة طلاب في كلية الهندسة المعلوماتية - جامعة حلب</h5>
            </div>
        </footer>
    )
}