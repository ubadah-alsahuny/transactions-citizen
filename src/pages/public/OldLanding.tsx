import {PageContainer} from "@/layouts/PageContainer.tsx";
import {Button} from "@/components/ui/button/Button.tsx";
import {Footer} from "@/components/navigation/Footer.tsx";
import {useNavigate} from "react-router-dom";

export default function OldLanding() {
    const navigate = useNavigate();

    return <>
        <PageContainer>
            <div style={{ display: "grid", justifyContent: "center", placeContent: "center", height: "100vh", width: "40%" }}>
                <h2>أهلاً بك في</h2>
                <h1>البوابة الرسمية للخدمات الحكومية الإلكترونية فــــــــــــــــــــي سورية</h1>
                <div style={{display: "flex", justifyContent: "space-between", padding: "1rem 4rem"}}>
                    <Button variant={"primary"} onClick={() => {navigate("/register")}}>
                        إنشاء حساب
                    </Button>
                    <Button variant={"primary"} onClick={() => {navigate("/login")}}>
                        تسجيل دخول
                    </Button>
                </div>
            </div>
        </PageContainer>
        <Footer></Footer>
    </>
}
