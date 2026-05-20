import {PageContainer} from "@/layouts/PageContainer.tsx";
import {Section} from "@/layouts/Section.tsx";
import OrganizationCard from "@/components/ui/organization-card/OrganizationCard.tsx";

export default function ServicesPage() {
    return (
        <PageContainer>
            <Section title={"الدوائر الحكومية"}>
                <ul style={{listStyle: 'none', display: 'flex', flexDirection: 'row', gap: '2.5rem', flexWrap: 'wrap', placeContent: 'space-between'}}>
                    <li>
                        <OrganizationCard></OrganizationCard>
                    </li>
                    <li>
                        <OrganizationCard></OrganizationCard>
                    </li>
                    <li>
                        <OrganizationCard></OrganizationCard>
                    </li>
                    <li>
                        <OrganizationCard></OrganizationCard>
                    </li>
                    <li>
                        <OrganizationCard></OrganizationCard>
                    </li>
                    <li>
                        <OrganizationCard></OrganizationCard>
                    </li>
                </ul>
            </Section>
        </PageContainer>
    )
}