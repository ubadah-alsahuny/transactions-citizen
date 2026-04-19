import styles from '@/styles/navigation/header_and_footer.module.css'

import SyrianLogo from '@/assets/images/svg/Syrian_Government_Logo.svg'
import {Button} from "@/components/ui/button/Button.tsx";
import {IoMdNotifications} from "react-icons/io";
import {MdAccountCircle} from "react-icons/md";
import {FaMoon} from "react-icons/fa";
import {AiFillSun} from "react-icons/ai";

import { toggleTheme } from '@/theme/theme.ts';
import {useState} from "react";
import {BsLayoutSidebarInset} from "react-icons/bs";

export function Header() {
    const headerItems = [
        {id: 'home', label: 'الصفحة الرئيسية'},
        {id: 'services', label: 'الخدمات الالكترونية'},
        {id: 'about', label: 'عن الموقع'},
        {id: 'contact', label: 'تواصل معنا'}
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
                    <Button variant={'header'} key={item.id}>
                        {item.label}
                    </Button>
                ))}
                </nav>
                <div className={styles.left_panel}>
                    {theme === 'dark-theme'
                        ?
                        <AiFillSun size={24} className={`${styles.header_icons} ${styles.theme_icons}`} onClick={handleToggleTheme}/>
                        :
                        <FaMoon size={20} className={styles.header_icons + styles.theme_icons} onClick={handleToggleTheme}/>}
                    <IoMdNotifications size={25} className={styles.header_icons}/>
                    <MdAccountCircle size={25} className={styles.header_icons}/>
                </div>
            </div>
        </header>
    )
}