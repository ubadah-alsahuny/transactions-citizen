import {PageContainer} from "@/layouts/PageContainer.tsx";
import {Section} from "@/layouts/Section.tsx";
import {useEffect, useState} from "react";
import {apiRequest} from "@/data/api/api.ts";
import {Navigate, useLocation, useNavigate} from "react-router-dom";
import {LoadingCircle} from "@/components/ui/loading-circle/LoadingCircle.tsx";
import {MdArrowBackIos} from "react-icons/md";
import Input from "@/components/ui/input/Input.tsx";
import {IoMdCard} from "react-icons/io";
import {Button} from "@/components/ui/button/Button.tsx";
import StepCard from "@/components/ui/step-card/StepCard.tsx";
import {mapInputType} from "@/data/utils/mapInputType.ts";

type TransactionSteps = {
    order: number;
    sectionId: string;
    sectionName: string;
}

type RequiredInitialData = {
    id: string;
    keyName: string;
    keyType: string;
    isRequired: boolean;
}

type TransactionDetails = {
    id: string;
    name: string;
    description: string;
    steps: TransactionSteps[];
    requiredIntialData: RequiredInitialData[];
}

export default function TransactionDetailsPage() {
    const [transactionDetails, setTransactionDetails] = useState<TransactionDetails | null>(null);
    const [formData, setFormData] = useState<Record<string, string>>({});

    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitLoading, setIsSubmitLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();

    useEffect(() => {
        const handleTransaction = async () => {
            setIsLoading(true);

            try{
                const data = await apiRequest(`/citizen/transactions/${transactionID}`);
                setTransactionDetails(data.data);
            } catch (e: any) {
                setError(e.message);
            }
            finally {
                setIsLoading(false);
            }
        }

        handleTransaction();
    }, []);

    const handleInputChange = (keyName: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [keyName]: value
        }));
    };

    const handleSubmitTransaction = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitLoading(true);
        setError(null);

        try{
            const payload = {
                transactionId: transactionID,
                intialData: formData,
            };

            const data = await apiRequest(`/citizen/transactions/${transactionID}/request`, {
                method: 'POST',
                bodyData: payload,
            });

            if (data && data.success) {
                navigate('/citizen/documents', { replace: true });
            } else {
                setError("حدث خطأ ما أثناء إرسال الطلب.");
            }

        } catch (e: any) {
            setError(e.message);
        } finally {
            setIsSubmitLoading(false);
        }
    }

    const location = useLocation();
    const transactionID = location.pathname.split("/")[4];
    console.log(transactionID);

    if (isLoading) {
        return (
            <LoadingCircle color={'white'}></LoadingCircle>
        )
    }

    if (error) {
        return (
            <PageContainer>
                <h2>
                    حدث خطأ ما، أعد المحاولة لاحقاً
                </h2>
                <p>
                    {error}
                </p>
            </PageContainer>
        )
    }

    return (
        <PageContainer>
            <Section title={`تفاصيل معاملة ` + transactionDetails?.name}>
                <div>
                    <h3 style={{placeSelf: 'start'}}>خطوات المعاملة</h3>
                    <ul style={{display: 'flex', gap: '2rem', flexWrap: 'wrap'}}>
                        {transactionDetails?.steps.map((step) => (
                            <div style={{display: 'flex', placeItems: 'center', gap: '2rem'}}>
                                <li key={step.order}>
                                    <StepCard stepOrder={step.order} sectionName={step.sectionName}></StepCard>
                                </li>
                                {step.order == transactionDetails?.steps.length ? null :
                                    <MdArrowBackIos color={'var(--color-text)'}/>}
                            </div>
                        ))}
                    </ul>
                </div>

                <div style={{width: '100%', display: 'flex', flexDirection: 'column'}}>
                    <h3 style={{placeSelf: 'start'}}>متطلبات المعاملة</h3>
                    <form style={{width: '40%'}} onSubmit={handleSubmitTransaction}>
                        <ul>
                            {transactionDetails?.requiredIntialData.map((data) => (
                                <div key={data.id} style={{display: 'flex', placeItems: 'center', gap: '2rem', width: '100%'}}>
                                    <Input onChange={(value: string) => handleInputChange(data.keyName, value)}
                                           label={data.keyName} icon={<IoMdCard size={22}/>}
                                           required={data.isRequired} value={formData[data.keyName] || ''}
                                           type={mapInputType(data.keyType)}></Input>
                                </div>
                            ))}
                        </ul>
                        <Button type={'submit'} variant={'submit'}>
                            {isSubmitLoading ?
                                <div>
                                    يتم إنشاء المعاملة
                                </div>
                                :
                                <div>
                                    التقديم على المعاملة <MdArrowBackIos/>
                                </div>
                            }
                        </Button>
                    </form>
                </div>
            </Section>
        </PageContainer>
    )
}
