import React from 'react'
import { InfiniteMovingCards } from './InfiniteMovingCards'
import { testimonials } from '@/constant/home-page'

export const Testimonials = () => {
    return (
        <>
            <section className="bg-gradient-to-b from-white to-purple-50">
                <div className="container py-16 overflow-hidden">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-indigo-900">What Our Patients Say</h2>
                    </div>
                    <div className="flex flex-col antialiased items-center justify-center relative overflow-hidden">
                        <InfiniteMovingCards
                            items={testimonials}
                            direction="left"
                            speed="slow"
                        />
                        <InfiniteMovingCards
                            items={[...testimonials].reverse()}
                            direction="right"
                            speed="slow"
                        />
                    </div>
                </div>
            </section>
        </>
    )
}
