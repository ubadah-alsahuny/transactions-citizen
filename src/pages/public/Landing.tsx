import { PageContainer } from "@/layouts/PageContainer.tsx";
import { Card } from "@/components/ui/card/Card.tsx";
import {
    MdFingerprint,
    MdHealthAndSafety,
    MdSchool,
    MdAccountBalanceWallet,
    MdBusinessCenter,
    MdDirectionsCar
} from "react-icons/md";
import { GiGothicCross } from "react-icons/gi"; // Accent visual component layer

import styles from '@/styles/pages/public/ladning.module.css';
import {Button} from "@/components/ui/button/Button.tsx";
import {useNavigate} from "react-router-dom";

export default function Landing() {

    const navigate = useNavigate();
    const scrollToServices = () => {
        const servicesSection = document.getElementById("#services");
        if (servicesSection) {
            servicesSection.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    const infrastructureServices = [
        {
            title: "الهوية والجوازات",
            description: "البوابة الموحدة للمعاملات والخدمات الحكومية السورية المتعلقة بالوثائق الشخصية الجوازات.",
            icon: <MdFingerprint size={26} />
        },
        {
            title: "الرعاية الصحية",
            description: "الوصول إلى مئات الخدمات المدعومة عبر الإنترنت وحجز المواعيد وإدارة التأمين.",
            icon: <MdHealthAndSafety size={26} />
        },
        {
            title: "التعليم",
            description: "الوصول إلى مئات المعاملات والخدمات عبر المنصات التعليمية والمدارس والجامعات الحكومية.",
            icon: <MdSchool size={26} />
        },
        {
            title: "الخدمات المالية",
            description: "الوصول الآمن إلى قنوات الدفع والمدفوعات الإلكترونية والخدمات المصرفية الرقمية الموحدة.",
            icon: <MdAccountBalanceWallet size={26} />
        },
        {
            title: "التراخيص التجارية",
            description: "الوصول إلى مئات الخدمات والمنصات عبر الإنترنت للشركات والمستثمرين ورواد الأعمال.",
            icon: <MdBusinessCenter size={26} />
        },
        {
            title: "المرور والمركبات",
            description: "الوصول إلى مئات المعاملات والخدمات عن بعد لإدارة رخص القيادة ووثائق المركبات المختلفة.",
            icon: <MdDirectionsCar size={26} />
        }
    ];

    return (
        <PageContainer>
            <div className={styles.landing_wrapper}>

                {/* --- Core Presentation Split Hero Header Container --- */}
                <main className={styles.hero_section}>
                    <div className={styles.hero_content}>
                        <h1 className={styles.hero_title}>
                            البوابة الرسمية للخدمات الحكومية الإلكترونية في سورية
                        </h1>
                        <p className={styles.hero_subtitle}>
                            الوصول إلى مئات الخدمات الحكومية عبر الإنترنت بكل سهولة وأمان دون الحاجة لمراجعة المراكز شخصياً.
                        </p>
                        <div className={styles.hero_actions} onClick={() => {navigate('/login')}}>
                            <Button className={styles.btn_primary} onClick={scrollToServices}>
                                استكشف الخدمات
                            </Button>
                            <Button className={styles.btn_secondary}>تسجيل دخول</Button>
                        </div>
                    </div>

                    <div className={styles.hero_graphic_container}>
                        <div className={styles.hero_graphic_fallback}>
                            <GiGothicCross size={90} color="var(--color-action)" style={{ opacity: 0.12 }} />
                        </div>
                    </div>
                </main>

                {/* --- Adaptive Grid Layout Directory Container --- */}
                <section className={styles.services_section}>
                    <h2 className={styles.section_title}>دليل الخدمات</h2>

                    <div className={styles.services_grid} id={'#services'}>
                        {infrastructureServices.map((service, idx) => (
                            <Card
                                key={idx}
                                type="vertical"
                                width="100%"
                                height="auto"
                                variant="service"
                            >
                                <div className={styles.service_card_inner}>
                                    <div className={styles.service_icon_box}>
                                        {service.icon}
                                    </div>
                                    <h3 className={styles.service_title}>{service.title}</h3>
                                    <p className={styles.service_desc}>{service.description}</p>
                                </div>
                            </Card>
                        ))}
                    </div>
                </section>

            </div>
        </PageContainer>
    );
}