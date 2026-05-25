import {PageContainer} from "@/layouts/PageContainer.tsx";
import {Section} from "@/layouts/Section.tsx";
import OrganizationCard from "@/components/ui/organization-card/OrganizationCard.tsx";
import {useNavigate} from "react-router-dom";

export default function ServicesPage() {
    const organizations = [
        {id: 1, type: 'o', name: 'دائرة السجل المدني', description: 'بيانات ولادة ووفيات، قيد عائلية وفردية، هوية شخصية'},
        {id: 2, type: 'o', name: 'دائرة السجل العقاري', description: 'بيع ورهن وهبة، بيان قيد عقاري'},
        {id: 3, type: 'o', name: 'دائرة النقل', description: 'بين وإفراغ السيارات والمركبات، بيان إطلاع عن المركبة'},
        {id: 4, type: 'o', name: 'دائرة الهاتف', description: 'بين وإفراغ السيارات والمركبات، بيان إطلاع عن المركبة'},
        {id: 5, type: 'u', name: 'جامعة حلب', description: 'براءة ذمة، كشف علامات، بطاقة جامعية'},
        {id: 6, type: 'u', name: 'جامعة دمشق', description: 'براءة ذمة، كشف علامات، بطاقة جامعية'},
        {id: 7, type: 'u', name: 'جامعة حمص', description: 'براءة ذمة، كشف علامات، بطاقة جامعية'},
        {id: 8, type: 'u', name: 'جامعة اللاذقية', description: 'براءة ذمة، كشف علامات، بطاقة جامعية'},
        {id: 9, type: 'u', name: 'جامعة حماه', description: 'براءة ذمة، كشف علامات، بطاقة جامعية'},
        {id: 10, type: 'u', name: 'جامعة إدلب', description: 'براءة ذمة، كشف علامات، بطاقة جامعية'},
    ]

    const navigation = useNavigate();

    return (
        <PageContainer>
            {/*<Input label={"ابحث عن معاملة"} icon={<FaSearch/>} ></Input>*/}
            <Section title={"الدوائر الحكومية"}>
                <ul style={{listStyle: 'none', display: 'flex', flexDirection: 'row', gap: '2.5rem', flexWrap: 'wrap', placeContent: 'space-between'}}>
                    {organizations.map((organization) => (
                        organization.type == 'o' ?
                        <li key={organization.id} onClick={() => {navigation(`organization/${organization.id}`, {state: organization})}}>
                            <OrganizationCard name={organization.name} description={organization.description}></OrganizationCard>
                        </li> : ''
                    ))}
                </ul>
            </Section>
            <Section title={"الجامعات"}>
                <ul style={{listStyle: 'none', display: 'flex', flexDirection: 'row', gap: '2.5rem', flexWrap: 'wrap', placeContent: 'space-between'}}>
                    {organizations.map((organization) => (
                        organization.type == 'u' ?
                            <li key={organization.id} onClick={() => {navigation(`organization/${organization.id}`, {state: organization})}}>
                                <OrganizationCard name={organization.name} description={organization.description}></OrganizationCard>
                            </li> : ''
                    ))}
                </ul>
            </Section>
        </PageContainer>
    )
}