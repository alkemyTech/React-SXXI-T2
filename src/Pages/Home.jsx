import React from 'react'
import { Card, types } from '../Components/Card'
// import { Slider } from '../Components/Slider'

export function Home() {
    return (
        <>
            {/* <Slider /> */} 
            <Card 
                type={types.staff}
            />
        </>
    )
}
