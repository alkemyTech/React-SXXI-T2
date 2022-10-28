import { BackOfficeLayout, SectionCard } from "../Components/BackOffice";

export function BackOfficeDashboard() {
    return (
        <BackOfficeLayout>
            <SectionCard 
                title={"Productos"}
                image={{
                    url: 'asdasd',
                    description: 'lol'
                }}
            />
        </BackOfficeLayout>
    )
}
