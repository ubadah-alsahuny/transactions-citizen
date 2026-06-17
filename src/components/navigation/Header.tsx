import styles from '@/styles/navigation/header_and_footer.module.css'

import SyrianLogo from '@/assets/images/svg/Syrian_Government_Logo.svg'
import {Button} from "@/components/ui/button/Button.tsx";
import {IoMdNotifications} from "react-icons/io";
import {MdAccountCircle} from "react-icons/md";
import {AiFillMoon, AiFillSun} from "react-icons/ai";

import { toggleTheme } from '@/theme/theme.ts';
import {useState} from "react";
import {BsLayoutSidebarInset} from "react-icons/bs";
import {useNavigate} from "react-router-dom";
import {useAuth} from "@/data/auth/auth.ts";

export function Header() {
    const navigate = useNavigate();

    const { logout } = useAuth();

    const headerItems = [
        {id: 'dashboard', label: 'الرئيسية'},
        {id: 'services', label: 'دليل الخدمات'},
        {id: 'documents', label: 'معاملاتي'},
        {id: 'payments', label: 'الدفع الإلكتروني'}
    ];

    const [theme, setTheme] = useState(
        localStorage.getItem('theme') ?? 'light'
    )

    const handleToggleTheme = () => {
        toggleTheme()
        setTheme(prev => (prev === 'dark-theme' ? 'light' : 'dark-theme'))
    }

    return (
        <header className={styles.header_settings}>
            <div className={styles.header_items_container}>
                <div className={styles.toggle_settings}>
                    <Button variant={'header'}>
                        <BsLayoutSidebarInset size={22}/>
                    </Button>
                </div>
                <img src={SyrianLogo} alt="syrian_logo" className={styles.syrian_logo}/>
                <nav className={`${styles.navigation_header_buttons} ${styles.header_buttons}`}>{headerItems.map((item) => (
                    <Button variant={'header'} key={item.id} onClick={() => {navigate(`/citizen/${item.id}`)}}>
                        {item.label}
                    </Button>
                ))}
                    <Button variant={'header'} onClick={() => { logout(); }}>
                        تسجيل خروج
                    </Button>
                </nav>
                <div className={styles.left_panel}>
                    {theme === 'dark-theme'
                        ?
                        <AiFillSun className={`${styles.header_icons} ${styles.theme_icons}`} onClick={handleToggleTheme}/>
                        :
                        <AiFillMoon className={`${styles.header_icons} ${styles.theme_icons}`} onClick={handleToggleTheme}/>}
                    <IoMdNotifications className={styles.header_icons}/>
                    <MdAccountCircle className={styles.header_icons} onClick={() => {navigate("/citizen/account")}}/>
                </div>
            </div>
        </header>
    )
}