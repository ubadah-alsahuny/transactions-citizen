import {Outlet, useLocation} from 'react-router-dom'
import {Header} from "@/components/navigation/Header.tsx";
import {Footer} from "@/components/navigation/Footer.tsx";
import styles from '@/styles/layouts/layouts.module.css'

export default function CitizenLayout() {
    const location = useLocation();

    const isProfilePage = location.pathname.includes('/account');

    return (
        <div className={styles.layouts_container}>
            <Header/>
            <div className={styles.title_container}>
                <h1 className={styles.settings}>
                    {isProfilePage ? "ملف المواطن" : "ساحة المواطن"}
                </h1>
                {isProfilePage ?
                    <p>
                        ملف المواطن هو مكان تخزين جميع معلوماتك
                        <br/>
                        عدل معلوماتك عن طريق قسمي
                        &nbsp;
                        <a href={"#personal-account"} className={styles.navLink}>
                            حسابك الشخصي
                        </a>
                        &nbsp;
                        أو
                        &nbsp;
                        <a href={"#personal-information"} className={styles.navLink}>
                            معلوماتك الشخصية
                        </a>
                    </p>
                    :
                    <p>
                        ساحة المواطن هي المكان الذي يمكّنك من متابعة معاملاتك وإنشاء معاملات جديدة
                        <br/>
                        أنشأ معاملة جديدة عبر قسم
                        &nbsp;
                        <a href={"#control-panel"} className={styles.navLink}>
                            لوحة التحكم
                        </a>
                        &nbsp;
                        أو راقب حركة معاملاتك عبر قسمي
                        &nbsp;
                        <a href={"#transactions-summary"} className={styles.navLink}>
                            ملخص المعاملات
                        </a>
                        &nbsp;
                        أو
                        &nbsp;
                        <a href={"#recent-transactions"} className={styles.navLink}>
                            المعاملات الأخيرة
                        </a>
                    </p>
                }
            </div>
            <Outlet/>
            <Footer/>
        </div>
    );
}
