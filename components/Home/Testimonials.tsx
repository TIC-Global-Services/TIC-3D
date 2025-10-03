import { Client1, Client2, Client3, Client4, Client5, Client6, Client7, Client8 } from '@/assets/Home'
import React from 'react'
import Image, { StaticImageData } from 'next/image'
import Container from '../Reusbale/Container'

const Testimonials = () => {
    const TestimonialContents = [
        {
            image: Client1,
            name: 'Brett',
            username: '@thebrett',
            review: 'I like this a lot. This is the best thing since sliced bread. I like this a lot. Signed up!',
        },
        {
            image: Client2,
            name: 'Alex Prokhorov',
            username: '@alex_pro_dsg',
            review: 'Stunning. I can finally make this link in bio website haha',
        },
        {
            image: Client3,
            name: 'Hewar',
            username: '@hewarsaber',
            review: 'If Linktree had taste, itd look like this🔥',
        },
        {
            image: Client4,
            name: 'Lamaan',
            username: '@lamaandesign',
            review: 'Love the work on this one. Waitlisted and excited to see where it goes!',
        },
        {
            image: Client5,
            name: 'Chinaa',
            username: '@chinwechinaa',
            review: 'this is so good🥹❤️💯',
        },
        {
            image: Client6,
            name: 'Jagdev Soni',
            username: '@SoniJagdev',
            review: 'Visually popsite looks better',
        },
        {
            image: Client7,
            name: 'Brian',
            username: '@iambrianoconnor',
            review: 'Its sooooo good',
        },
        {
            image: Client8,
            name: 'ӓli',
            username: '@aaalixyz',
            review: 'Let me innnnnnnn',
        },
    ]

    const TestimonialCard = ({ image, name, username, review }: { image: StaticImageData, name: string, username: string, review: string }) => {
        return (
            <div className='flex flex-col space-y-5 p-5 rounded-[10px] bg-[#1A1B1C] mb-2'>
                <div className='flex items-center space-x-3'>
                    <Image src={image} alt={name} width={500} height={500} className='w-12 h-12 rounded-full object-cover' />
                    <div className='flex flex-col'>
                        <span className='font-medium text-[16px] leading-[24px] tracking-[-0.4px] text-white'>{name}</span>
                        <span className='font-normal text-[14px] leading-[20px] tracking-[-0.4px] text-gray-500'>{username}</span>
                    </div>
                </div>
                <p className='font-normal text-[14px] leading-[20px] tracking-[-0.4px] text-white'>{review}</p>
            </div>
        )
    }

    // Create enough testimonials for seamless infinite scroll
    // Duplicate testimonials multiple times to ensure smooth looping
    const duplicatedTestimonials = [
        ...TestimonialContents, 
        ...TestimonialContents, 
        ...TestimonialContents,
        ...TestimonialContents
    ]

    // Split testimonials into 3 columns for vertical scrolling
    const getColumnTestimonials = (columnIndex: number) => {
        return duplicatedTestimonials.filter((_, index) => index % 3 === columnIndex)
    }

    return (
        <Container>
<div className="max-w-5xl mx-auto pb-10 overflow-hidden relative">
            <style dangerouslySetInnerHTML={{
                __html: `
                    @keyframes infinite-scroll {
                        0% {
                            transform: translateY(0);
                        }
                        100% {
                            transform: translateY(-50%);
                        }
                    }
                    .animate-infinite-scroll {
                        animation: infinite-scroll 30s linear infinite;
                    }
                    .animate-infinite-scroll-delayed-1 {
                        animation: infinite-scroll 30s linear infinite;
                        animation-delay: -10s;
                    }
                    .animate-infinite-scroll-delayed-2 {
                        animation: infinite-scroll 30s linear infinite;
                        animation-delay: -20s;
                    }
                `
            }} />
            
            {/* Top gradient fade */}
            <div className="absolute top-0 left-0 right-0 h-[110px] bg-gradient-to-b from-black to-transparent z-10 pointer-events-none"></div>
            
            {/* Bottom gradient fade */}
            <div className="absolute bottom-10 left-0 right-0 h-[110px] bg-gradient-to-t from-black to-transparent z-10 pointer-events-none"></div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 h-[800px] overflow-hidden">
                <div className="flex flex-col p">
                    <div className="animate-infinite-scroll flex flex-col">
                        {getColumnTestimonials(0).map((testimonial, index) => (
                            <TestimonialCard
                                key={`col1-${testimonial.name}-${index}`}
                                image={testimonial.image}
                                name={testimonial.name}
                                username={testimonial.username}
                                review={testimonial.review}
                            />
                        ))}
                    </div>
                </div>
                
                <div className="flex flex-col">
                    <div className="animate-infinite-scroll-delayed-1 flex flex-col">
                        {getColumnTestimonials(1).map((testimonial, index) => (
                            <TestimonialCard
                                key={`col2-${testimonial.name}-${index}`}
                                image={testimonial.image}
                                name={testimonial.name}
                                username={testimonial.username}
                                review={testimonial.review}
                            />
                        ))}
                    </div>
                </div>
                
                <div className="flex flex-col">
                    <div className="animate-infinite-scroll-delayed-2 flex flex-col">
                        {getColumnTestimonials(2).map((testimonial, index) => (
                            <TestimonialCard
                                key={`col3-${testimonial.name}-${index}`}
                                image={testimonial.image}
                                name={testimonial.name}
                                username={testimonial.username}
                                review={testimonial.review}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
        </Container>
        
    )
}

export default Testimonials