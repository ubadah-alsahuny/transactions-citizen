import {useLocation} from "react-router-dom";

type servicesType = {
    id: number;
    type: string;
    name: string;
    description: string;
}

export default function ServiceDetailsPage () {
    const location = useLocation();

    const organization = location.state as servicesType | null;

    if (!organization) {
        return <div>
            لم يتم العثور على الخدمة!
        </div>
    }

    return (
        <>
            <h2>
                {organization.name}
            </h2>
            <p>
                {organization.description}
            </p>
        </>
    )
}