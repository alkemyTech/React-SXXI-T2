import React from 'react'
import Activities from './Activities/Activities'
import Testimonials from './Testimonial/Testimonial'
import Members from './Staff/Staff'
import WelcomeText from './WelcomeText'
import { Slider } from 'antd'
import { News } from './News/News'

export function Home() {
    return (
            <div className=" flex flex-col w-full">
                <div className=" flex flex-row justify-start align-items-center">
                    <div className=" w-1/2">
                        <WelcomeText />
                    </div>
                    <div className=" w-1/2">
                        <Slider />
                    </div>
                </div>
                <Members />
                <Testimonials />
                <News />
                <Activities />
            </div>
        );
}