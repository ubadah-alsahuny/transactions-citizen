import styles from '@/styles/navigation/header_and_footer.module.css'

import SyrianLogo from '@/assets/images/svg/Syrian_Government_Logo.svg'
import {Button} from "@/components/ui/button/Button.tsx";
import {IoMdClose} from "react-icons/io";
import {MdAccountCircle} from "react-icons/md";
import {AiFillMoon, AiFillSun} from "react-icons/ai";

import { toggleTheme } from '@/theme/theme.ts';
import {useEffect, useState} from "react";
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
    ];

    const [theme, setTheme] = useState(
        localStorage.getItem('theme') ?? 'light'
    )

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleToggleTheme = () => {
        toggleTheme()
        setTheme(prev => (prev === 'dark-theme' ? 'light' : 'dark-theme'))
    }

    useEffect(() => {
        if (!isMobileMenuOpen) return;

        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setIsMobileMenuOpen(false);
            }
        };

        document.addEventListener('keydown', onKeyDown);
        document.body.style.overflow = 'hidden';

        return () => {
            document.removeEventListener('keydown', onKeyDown);
            document.body.style.overflow = '';
        };
    }, [isMobileMenuOpen]);

    const handleNavigate = (path: string) => {
        navigate(path);
        setIsMobileMenuOpen(false);
    };

    const handleLogout = () => {
        setIsMobileMenuOpen(false);
        logout();
    };

    return (
        <header className={styles.header_settings}>
            <div className={styles.header_items_container}>
                <div className={styles.toggle_settings}>
                    <Button variant={'header'} onClick={() => setIsMobileMenuOpen(true)}>
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
                  <MdAccountCircle className={styles.header_icons} onClick={() => {navigate("/citizen/account")}}/>
                </div>
            </div>

            {isMobileMenuOpen && (
                <div
                    className={styles.mobile_menu_overlay}
                    onClick={() => setIsMobileMenuOpen(false)}
                >
                    <div
                        className={styles.mobile_menu_panel}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className={styles.mobile_menu_top}>
                            <div className={styles.mobile_menu_top_actions}>
                                <Button
                                    variant={'header'}
                                    className={styles.mobile_menu_icon_button}
                                    onClick={() => handleNavigate('/citizen/account')}
                                >
                                    <MdAccountCircle size={24}/>
                                </Button>

                                <Button
                                    variant={'header'}
                                    className={styles.mobile_menu_icon_button}
                                    onClick={handleToggleTheme}
                                >
                                    {theme === 'dark-theme' ? <AiFillSun size={20}/> : <AiFillMoon size={20}/>}
                                </Button>
                            </div>

                            <Button
                                variant={'header'}
                                className={styles.mobile_menu_close}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <IoMdClose size={22} />
                            </Button>
                        </div>

                        <div className={styles.mobile_menu_nav}>
                            {headerItems.map((item) => (
                                <Button
                                    key={item.id}
                                    variant={'header'}
                                    className={styles.mobile_menu_item}
                                    onClick={() => handleNavigate(`/citizen/${item.id}`)}
                                >
                                    {item.label}
                                </Button>
                            ))}
                        </div>

                        <div className={styles.mobile_menu_actions}>
                            <Button
                                variant={'header'}
                                className={styles.mobile_menu_item}
                                onClick={handleLogout}
                            >
                                تسجيل خروج
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </header>
    )
}
