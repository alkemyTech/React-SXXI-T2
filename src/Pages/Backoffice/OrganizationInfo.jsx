import React from 'react'
import { BackOfficeNavbar, OrganizationData } from '../../Components/Backoffice'

export function OrganizationInfo() {
    return (
        <main className='organization-data'>
            <BackOfficeNavbar />
            <OrganizationData />
        </main>
    )
}
