import {Button} from "@/components/ui/button/Button.tsx";
import {useNavigate} from "react-router-dom";

function isTokenExpired(token: string | null): boolean {
    if (!token || token === 'undefined' || token === 'null') return true;

    try {
        const base64Url = token.split('.')[1];
        if (!base64Url) return true;

        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
            window.atob(base64)
                .split('')
                .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                .join('')
        );

        const { exp } = JSON.parse(jsonPayload);

        if (!exp) return false;

        const currentTime = Math.floor(Date.now() / 1000);
        return exp < currentTime;
    } catch {
        return true;
    }
}

export default function NotFound() {
    const navigate = useNavigate();

    const token = localStorage.getItem('citizenToken');
    const hasValidToken = !isTokenExpired(token);

    return (
        <div style={{display: "flex", flexDirection: "column", placeItems: "center", gap: "1.7rem", padding: '1rem', width: '100%'}}>
            <h1 style={{fontSize: "14rem", fontWeight: 'bold'}}>404</h1>
            <p style={{marginTop: "-5rem"}}>لا يوجد شيء هُنا... في حال أردت أن تُنشئ معاملة حكومية يرجى زيارة رابط الموقع الأساسي</p>
            <div>
                <Button
                    variant={'danger'}
                    onClick={() => {
                        if (!hasValidToken) {
                            localStorage.removeItem('citizenToken');
                        }

                        navigate(hasValidToken ? '/citizen/dashboard' : '/', {replace: true});
                    }}
                >
                    العودة الى الرابط الرئيسي
                </Button>
            </div>
        </div>
    )
}
