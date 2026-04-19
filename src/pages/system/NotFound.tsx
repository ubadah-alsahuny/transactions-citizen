import {Button} from "@/components/ui/button/Button.tsx";

export default function NotFound() {
    return (
        <div style={{display: "flex", flexDirection: "column", placeItems: "center", gap: "1.7rem", padding: '1rem', width: '100%'}}>
            <h1 style={{fontSize: "14rem", fontWeight: 'bold'}}>404</h1>
            <p style={{marginTop: "-5rem"}}>لا يوجد شيء هُنا... في حال أردت أن تُنشئ معاملة حكومية يرجى زيارة رابط الموقع الأساسي</p>
            <div>
                <Button variant={'danger'}>
                    العودة الى الرابط الرئيسي
                </Button>
            </div>
        </div>
    )
}
