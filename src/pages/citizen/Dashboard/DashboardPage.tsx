import { PageContainer } from '@/layouts/PageContainer'
import { Section } from '@/layouts/Section'
import { Button } from '@/components/ui/button/Button.tsx'
import { Table } from '@/components/ui/table/Table.tsx'
import {IoMdAdd} from "react-icons/io";
import {IoSearch} from "react-icons/io5";
import {useEffect} from "react";
import {useTransactions} from "@/data/transactions/useTransactions.ts";
import {LoadingCircle} from "@/components/ui/loading-circle/LoadingCircle.tsx";
import {mapStatus} from "@/data/utils/mapStatus.ts";
import {formatDate, formatTime} from "@/data/utils/formatDateAndTime.ts";
import {useNavigate} from "react-router-dom";

export default function DashboardPage() {
    const navigate = useNavigate();
    const { myDocuments, fetchTransactions, isLoading, error } = useTransactions();

    useEffect(() => {
        fetchTransactions();
    }, []);

    /* Tables' headers */
    const overviewHeaders = ["قيد الانتظار", "مقبول", "مرفوض", "الكلي"]
    const previousTransactionsHeaders = ["المعاملة", "التاريخ", "الوقت", "الحالة"];

    const acceptedTransactions = myDocuments.filter(
        (doc) => doc.status === 'completed',
    ).length;

    const rejectedTransaction = myDocuments.filter(
        (doc) => doc.status === 'rejected',
    ).length;

    const pendingTransactions = myDocuments.filter(
        (doc) => doc.status === 'pending',
    ).length;

    const totalTransactions = myDocuments.length;

    const overviewData = [pendingTransactions, acceptedTransactions, rejectedTransaction, totalTransactions];

    return (
        <PageContainer>
            <Section title="لوحة التحكم" id={"control-panel"}>
                <div style={{display: 'flex', gap: '1rem'}}>
                    <Button variant="primary" onClick={() => {navigate('/citizen/services')}}>
                        <IoMdAdd size={17}/>
                        معاملة جديدة
                    </Button>
                    <Button variant="primary">
                        <IoSearch size={17}/>
                        البحث عن معاملة
                    </Button>
                </div>
            </Section>

            <Section title="ملخص المعاملات" id={"transactions-summary"}>
                {error && <p style={{color: 'red', textAlign: 'center'}}>{error}</p>}

                {isLoading ?
                    <div>
                        <LoadingCircle color={'white'}/>
                    </div>
                    :
                    <Table headers={overviewHeaders}
                           data={[overviewData]}
                           renderRow={(item) => (
                               <>
                                   {item.map((item, index) => (
                                       <td key={index}>{item}</td>
                                   ))}
                               </>
                           )}>
                    </Table>
                }
            </Section>

            <Section title="المعاملات الأخيرة" id={"recent-transactions"}>
                {error && <p style={{color: 'red', textAlign: 'center'}}>{error}</p>}

                {isLoading ? (
                        <div>
                        <LoadingCircle color={'white'}/>
                    </div>
                ) :
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <Table headers={previousTransactionsHeaders}
                               data={myDocuments.slice(0, 5)}
                               renderRow={(item) => (
                                   <>
                                       <td>{item.transactionName}</td>
                                       <td>{formatDate(item.createdAt)}</td>
                                       <td>{formatTime(item.createdAt)}</td>
                                       <td>{mapStatus(item.status)}</td>
                                   </>
                               )}>
                        </Table>

                        <Button
                            variant={'primary'}
                            onClick={() => {navigate('/citizen/documents');}}>
                            رؤية كافة معاملاتك
                        </Button>
                    </div>
                }
            </Section>
        </PageContainer>
    )
}
