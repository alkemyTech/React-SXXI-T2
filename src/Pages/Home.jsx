import React from 'react'
import { Card, types } from '../Components/Card'
import { Carousel } from '../Components/Carousel'
import { useCard } from '../Hooks'
// import { Slider } from '../Components/Slider'

export function Home() {
    const { data: datastaff } = useCard(types.staff)

    const renderStaff = datastaff?.map(staff => (
        <>
            <Card 
                key={staff.id}
                type={types.staff}
                item={staff}
            />
        </>
    )) 

    return (
        <>
            {/* <Slider /> */} 
            {/* <Card 
                type={types.news}
            /> */}
            <Carousel>
                {renderStaff?.length >= 0
                    ? renderStaff
                    : <div>loading...</div>
                }
            </Carousel>
        </>
    )
}
