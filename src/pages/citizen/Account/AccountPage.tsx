import {PageContainer} from "@/layouts/PageContainer.tsx";
import {Section} from "@/layouts/Section.tsx";
import {Card} from "@/components/ui/card/Card.tsx";

import ProfilePicture from '@/assets/images/jpg/Profile_Picture.jpg'
import IDFront from '@/assets/images/jpg/ID.jpg'
import IDBack from '@/assets/images/jpg/ID_Back.jpg'

import {FaUserEdit} from "react-icons/fa";
import {BiEdit} from "react-icons/bi";

export default function AccountPage() {
    return(
        <PageContainer>
            <Section title={"حسابك الشخصي"} id={"personal-account"}>
                <div style={{placeItems: "center", display: "flex", flexDirection: "row", gap: "3rem"}}>
                    <div style={{width: '18%'}}>
                        <Card
                            type="vertical"
                            width={"100%"}
                            height={"100%"}
                            image={ProfilePicture}
                            buttonIcon={<FaUserEdit/>}
                            buttonLabel={<p>تغيير الصورة الشخصية</p>}
                            variant={'user'}
                            children={
                                <div>
                                    <h4>عباده مختار الصهيوني</h4>
                                    <p style={{fontSize: "0.7rem"}}>صورة بخلفية بيضاء معتمدة لصاحب الحساب</p>
                                </div>
                            }
                        />
                    </div>

                    <div style={{width: '82%', display: "grid", gap: "1rem"}}>
                        <Card
                            width={"100%"}
                            height={"6rem"}
                            image={IDFront}
                            type='horizontal'
                            children={
                                <div>
                                    <h5>صورة الهوية الشخصية (من الأمام)</h5>
                                    <p style={{fontSize: "0.7rem"}}>
                                        سوف يتم استعمال هذه الصورة عند إرسالك طلب بخصوص أي معاملة تحتاجها
                                    </p>
                                </div>
                            }
                            buttonIcon={<BiEdit/>} buttonLabel={"تغيير"}>
                        </Card>

                        <Card
                            width={"100%"}
                            height={"6rem"}
                            image={IDBack}
                            type='horizontal'
                            children={
                                <div>
                                    <h5>صورة الهوية الشخصية (من الخلف)</h5>
                                    <p style={{fontSize: "0.7rem"}}>
                                        سوف يتم استعمال هذه الصورة عند إرسالك طلب بخصوص أي معاملة تحتاجها
                                    </p>
                                </div>
                            }
                            buttonIcon={<BiEdit/>} buttonLabel={"تغيير"}>
                        </Card>

                    </div>

                </div>
            </Section>
        </PageContainer>
    )
}