import { useEffect } from "react";
import { useTransactions } from "@/data/transactions/useTransactions.ts";
import { useParams } from "react-router-dom";
import { LoadingCircle } from "@/components/ui/loading-circle/LoadingCircle.tsx";
import { PageContainer } from "@/layouts/PageContainer.tsx";
import { Section } from "@/layouts/Section.tsx";
import { mapStatus } from "@/data/utils/mapStatus.ts";
import { formatDateAndTime } from "@/data/utils/formatDateAndTime.ts";
import StatusBadge from "@/components/ui/status-badge/StatusBadge.tsx";

export default function SubmittedTransactionDetails() {
    const { id } = useParams<{ id: string }>();
    const { fetchSubmittedTransactionDetails, transaction, isLoading, error } = useTransactions();

    useEffect(() => {
        if (id) {
            fetchSubmittedTransactionDetails(id);
        }
    }, [id]);

    if (isLoading) {
        return <LoadingCircle/>;
    }

    if (error) {
        return (
            <PageContainer>
                <h2 style={{ color: 'var(--color-danger)', marginTop: '2rem', textAlign: 'center' }}>
                    حدث خطأ ما، أعد المحاولة لاحقاً
                </h2>
                <p style={{ textAlign: 'center' }}>{error}</p>
            </PageContainer>
        );
    }

    const currentStepOrder = transaction?.currentStep || 1;

    return (
        <PageContainer>
            {transaction ? (
                <Section title={transaction.transactionName || "تفاصيل المعاملة"}>

                    {/* Embedded Responsive Stepper Rules */}
                    <style>{`
                        .stepper-responsive-container {
                            display: flex;
                            flex-direction: row;
                            justify-content: space-between;
                            align-items: center;
                            position: relative;
                            width: 100%;
                            margin: 3rem 0;
                            padding: 0 1rem;
                            direction: rtl;
                        }
                        .step-line-back {
                            position: absolute;
                            top: 25px;
                            right: 0;
                            left: 0;
                            height: 4px;
                            background-color: var(--color-outine);
                            z-index: 0;
                        }
                        .step-item {
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                            z-index: 1;
                            flex: 1;
                            position: relative;
                        }
                        
                        @media (max-width: 680px) {
                            .stepper-responsive-container {
                                flex-direction: column !important;
                                align-items: flex-start !important;
                                gap: 1.75rem;
                                margin: 1.5rem 0;
                                padding-right: 0.5rem;
                            }
                            .step-line-back {
                                display: none !important;
                            }
                            .step-item {
                                flex-direction: row !important;
                                width: 100%;
                                justify-content: flex-start !important;
                                gap: 1.25rem;
                            }
                            .step-label {
                                margin-top: 0 !important;
                                text-align: right !important;
                            }
                        }
                    `}</style>

                    {/* Stepper Flow Section */}
                    <div className="stepper-responsive-container">

                        {/* Desktop Horizontal Connecting Line */}
                        <div className="step-line-back" />

                        {transaction.steps?.map((step: any) => {
                            // Backend alignment logic checks
                            const isRejectedStep = transaction.status === 'rejected';
                            const isCompletedStep = step.order < currentStepOrder || step.status === 'approved' || transaction.status === 'completed';
                            const isActiveStep = step.status === 'pending' || step.status === 'waiting';

                            // Visual Configurations based on State
                            let circleBg = 'var(--color-primary)';
                            let circleBorder = '2px solid var(--color-outine)';
                            let circleColor = 'var(--color-sub-text)';
                            let symbol: React.ReactNode = step.order;

                            if (isRejectedStep) {
                                circleBg = 'var(--color-danger)';
                                circleBorder = '2px solid var(--color-danger)';
                                circleColor = '#ffffff';
                                symbol = '✕';
                            } else if (isCompletedStep) {
                                circleBg = 'var(--color-action)';
                                circleBorder = '2px solid var(--color-action)';
                                circleColor = '#ffffff';
                                symbol = '✓';
                            } else if (isActiveStep) {
                                circleBg = 'var(--color-primary)';
                                circleBorder = '2px solid #bfa15f';
                                circleColor = '#bfa15f';
                                symbol = '~'
                            }

                            return (
                                <div key={step.id || step.order} className="step-item">

                                    {/* Visual Status Indicator Node */}
                                    <div style={{
                                        width: '50px',
                                        height: '50px',
                                        borderRadius: '50%',
                                        backgroundColor: circleBg,
                                        border: circleBorder,
                                        color: circleColor,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontWeight: 'bold',
                                        fontSize: '1.2rem',
                                        boxShadow: 'rgba(0, 0, 0, 0.05) 0 0.15rem 0.3rem'
                                    }}>
                                        {symbol}
                                    </div>

                                    {/* Section Information Label */}
                                    <div className="step-label" style={{
                                        marginTop: '0.75rem',
                                        fontSize: '1rem',
                                        fontWeight: isActiveStep || isRejectedStep ? 'bold' : 'normal',
                                        color: isRejectedStep ? 'var(--color-danger)'
                                            : isCompletedStep || isActiveStep ? 'var(--color-text)'
                                                : 'var(--color-sub-text)',
                                        textAlign: 'center',
                                        whiteSpace: 'nowrap'
                                    }}>
                                        {step.sectionName}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Metadata Summary Info Cards */}
                    <div style={{
                        border: '1px solid var(--color-outine)',
                        padding: '1.5rem',
                        borderRadius: '0.75rem',
                        marginTop: '2rem',
                        direction: 'rtl',
                        backgroundColor: 'var(--color-section)'
                    }}>
                        <h3 style={{ marginBottom: '1rem', color: 'var(--color-text)', textAlign: 'right' }}>معلومات المعاملة:</h3>
                        <p style={{ margin: '0.5rem 0', color: 'var(--color-text)', textAlign: 'right' }}>
                            <strong>رقم الطلب:</strong> <span style={{ color: 'var(--color-sub-text)', marginRight: '0.5rem' }}>{transaction.id}</span>
                        </p>
                        <p style={{ margin: '0.5rem 0', color: 'var(--color-text)', textAlign: 'right' }}>
                            <strong>تاريخ الطلب:</strong> <span style={{ color: 'var(--color-sub-text)', marginRight: '0.5rem' }}>{formatDateAndTime(transaction.updatedAt)}</span>
                        </p>
                        <p style={{ margin: '0.5rem 0', color: 'var(--color-text)', textAlign: 'right' }}>
                            <strong>حالة المعاملة الكلية:</strong>
                            <span style={{
                                fontWeight: 'bold',
                                marginRight: '0.5rem'
                            }}>
                                <StatusBadge status={mapStatus(transaction.status)}></StatusBadge>
                            </span>
                        </p>
                    </div>

                </Section>
            ) : (
                <p style={{ textAlign: 'center', marginTop: '2rem', color: 'var(--color-sub-text)' }}>
                    تعذر العثور على بيانات المعاملة المطلوبة.
                </p>
            )}
        </PageContainer>
    );
}