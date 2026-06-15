import { useEffect } from "react";
import { useTransactions } from "@/data/transactions/useTransactions.ts";
import { useParams } from "react-router-dom";
import { LoadingCircle } from "@/components/ui/loading-circle/LoadingCircle.tsx";
import { PageContainer } from "@/layouts/PageContainer.tsx";
import { Section } from "@/layouts/Section.tsx";
import {mapStatus} from "@/data/utils/mapStatus.ts";
import {formatDateAndTime} from "@/data/utils/formatDateAndTime.ts";

export default function SubmittedTransactionDetails () {
    const { id } = useParams<{ id: string }>();
    const { fetchSubmittedTransactionDetails, transaction, isLoading, error } = useTransactions();

    useEffect(() => {
        if (id) {
            fetchSubmittedTransactionDetails(id);
        }
    }, [id]);

    const GRAY_COLOR = "#e0e0e0";

    const stepsCount = transaction?.steps?.length || 0;
    const currentStepOrder = transaction?.currentStep || 1;

    const isTransactionClosed = transaction?.status !== "approved";
    const isTransactionRejected = transaction?.status === "rejected";

    const progressPercent = stepsCount > 1
        ? ((currentStepOrder - 1) / (stepsCount - 1)) * 100
        : 0;

    return (
        <PageContainer>
            {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

            {isLoading ? (
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '4rem' }}>
                    <LoadingCircle color="var(--color-text)" />
                </div>
            ) : transaction ? (
                <Section title={`${transaction.transactionName} - ${transaction.institutionName}`}>

                    <div style={{
                        position: 'relative',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: '100%',
                        margin: '3rem 0 4rem 0',
                        direction: 'rtl'
                    }}>

                        <div style={{
                            position: 'absolute',
                            top: '20px',
                            left: 0,
                            right: 0,
                            height: '4px',
                            backgroundColor: GRAY_COLOR,
                            zIndex: 0
                        }} />

                        <div style={{
                            position: 'absolute',
                            top: '20px',
                            right: 0,
                            width: `${progressPercent}%`,
                            height: '4px',
                            backgroundColor: 'var(--color-action)',
                            transition: 'width 0.4s ease',
                            zIndex: 0
                        }} />

                        {transaction.steps
                            ?.sort((a, b) => a.stepOrder - b.stepOrder)
                            .map((step) => {
                                const isCompleted = step.stepOrder < currentStepOrder || (step.stepOrder === currentStepOrder && step.status === 'approved');
                                const isCurrent = step.stepOrder === currentStepOrder && step.status !== 'approved';

                                const nodeColor = (isCompleted || isCurrent) && step.status !== 'rejected' ? 'var(--color-action)' : step.status === 'rejected' ? 'var(--color-danger)' : '#fff';
                                const borderColor = (isCompleted || isCurrent) && step.status !== 'rejected' ? 'var(--color-action)' : step.status === 'rejected' ? 'var(--color-danger)' : GRAY_COLOR;
                                const textColor = (isCompleted || isCurrent) ? '#fff' : '#888';

                                return (
                                    <div key={step.id} style={{
                                        position: 'relative',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        zIndex: 1,
                                        flex: 1
                                    }}>

                                        <div style={{
                                            width: '40px',
                                            height: '40px',
                                            borderRadius: '50%',
                                            backgroundColor: nodeColor,
                                            border: `3px solid ${borderColor}`,
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            fontWeight: 'bold',
                                            color: textColor,
                                            boxShadow: isCurrent && step.status !== 'rejected' ? `0 0 10px var(--color-action)` : step.status === 'rejected' ? `0 0 10px var(--color-danger-hover)` : 'none',
                                            transition: 'all 0.3s ease'
                                        }}>
                                            {isCompleted ? "✓" : step.status === 'rejected' ? '✗' : step.stepOrder}
                                        </div>

                                        <div style={{
                                            position: 'absolute',
                                            top: '50px',
                                            fontSize: '0.9rem',
                                            fontWeight: isCurrent ? 'bold' : 'normal',
                                            color: isCurrent && step.status !== 'rejected' ? 'var(--color-action)'
                                                : step.status === 'rejected' ? 'var(--color-danger)'
                                                    : 'var(--color-text)',
                                            textAlign: 'center',
                                            whiteSpace: 'nowrap'
                                        }}>
                                            {step.sectionName}
                                        </div>
                                    </div>
                                );
                            })}
                    </div>

                    <div style={{
                        border: '1px solid #eee',
                        padding: '1.5rem',
                        borderRadius: '8px',
                        marginTop: '2rem',
                        direction: 'rtl'
                    }}>
                        <h3>معلومات المعاملة:</h3>
                        <p style={{marginTop: '0.5rem'}}><strong>رقم الطلب:</strong> {transaction.id}</p>
                        <p><strong>تاريخ الطلب:</strong> {formatDateAndTime(transaction.updatedAt)}</p>
                        <p><strong>حالة المعاملة الكلية:</strong> {mapStatus(transaction.status)}</p>
                    </div>

                </Section>
            ) : (
                <p style={{textAlign: 'center', marginTop: '2rem' }}>تعذر العثور على بيانات المعاملة المطلوبة.</p>
            )}
        </PageContainer>
    );
}