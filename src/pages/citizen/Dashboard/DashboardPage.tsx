import { PageContainer } from '@/layouts/PageContainer'
import { Section } from '@/layouts/Section'
import { Button } from '@/components/ui/button/Button.tsx'
import { Table } from '@/components/ui/table/Table.tsx'
import {IoMdAdd} from "react-icons/io";
import {IoSearch} from "react-icons/io5";

export default function DashboardPage() {
    /* Tables' headers */
    const overviewHeaders = ["قيد الانتظار", "مقبول", "مرفوض", "الكلي"]
    const previousTransactionsHeaders = ["رقم المعاملة", "الخدمة", "التاريخ", "الحالة"];

    /* Tables' contents */
    const overviewData = [3, 8, 1, 12];
    const previousTransactionsData = [
        {id: 1, service: "إخراج قيد", date: "16 - 11 - 2025", status: "قيد الإنتظار"},
        {id: 2, service: "تصديق حياة جامعية", date: "14 - 1 - 2025", status: "مقبول"},
        {id: 3, service: "توثيق جواز سفر", date: "1 - 2 - 2025", status: "مرفوض"},
        {id: 4, service: "سحب اشتراك من SahedTV", date: "5 - 4 - 2025", status: "مقبول"},
        {id: 5, service: "لا حكم عليه", date: "11 - 11 - 2025", status: "قيد الانتظار"},
        {id: 6, service: "طلب جواز سفر", date: "1 - 1 - 2025", status: "مقبول"},
    ];

    return (
        <PageContainer>
            <Section title="لوحة التحكم" id={"control-panel"}>
                <div style={{display: 'flex', gap: '1rem'}}>
                    <Button variant="primary">
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
                <Table headers={overviewHeaders}
                       data={[overviewData]}
                       renderRow={(row) => (
                           <>
                               {row.map((item, index) => (
                                   <td key={index}>{item}</td>
                               ))}
                           </>
                       )}></Table>
            </Section>

            <Section title="المعاملات الأخيرة" id={"recent-transactions"}>
                <Table headers={previousTransactionsHeaders}
                       data={previousTransactionsData}
                       renderRow={(item) => (
                           <>
                               <td>{item.id}</td>
                               <td>{item.service}</td>
                               <td>{item.date}</td>
                               <td>{item.status}</td>
                           </>
                       )}></Table>
            </Section>
        </PageContainer>
    )
}
