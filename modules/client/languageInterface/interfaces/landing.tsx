import { CiCircleCheck } from 'react-icons/ci'

interface Landing {
    hero: {
        title: string
        subTitle: string
        heroButton: string
    }
    weOffer: {
        title: string
        cards: { number: string; title: string; text: string[] }[]
        features: Feature[]
    }
    video: {
        link: string
        title: string
        text: string
    }
    reviews: {
        title: string
        reviews: Review[]
    }
    pricing: PricingCard[]
}

interface Review {
    profilePicUrl: string
    name: string
    profesion: string
    text: string
    title: string
    stars: number
}
interface PricingCard {
    plan: string
    aboutPlan: string
    title: string
    features: string[]
    button?: string
}

interface Feature {
    title: string
    text: string
    icon: React.ReactNode
}
const navbar: {
    en: Landing
} = {
    en: {
        hero: {
            title: 'Welcome to Our Service',
            subTitle: 'Experience the best service with us',
            heroButton: 'Get Started',
        },
        weOffer: {
            title: 'What We Offer',
            cards: [
                {
                    number: '01',
                    title: 'All in One Place',
                    text: [
                        'Calendar with synchronization options with Google Calendar.',
                        'All clients in one place with all important information at one click.',
                        'Messages, files, anamnesis, notes, or reminders about consultation payments neatly in one place.',
                        'CliSync text editor for therapy notes connected with the calendar and files for clear notes and quick preparation.',
                    ],
                },
                {
                    number: '02',
                    title: 'Excellent Work Efficiency',
                    text: [
                        'Our application is designed by psychologists for the best work efficiency.',
                        'The application is designed according to how we think the work process of a psychologist looks like.',
                        'Every psychologist has different habits, so you can customize the application according to your preferences.',
                    ],
                },
                {
                    number: '03',
                    title: 'Security',
                    text: [
                        'Security is our top priority.',
                        'Fully encrypted information about you and your clients.',
                        'Two-factor authentication, so even if someone steals your password, your data is still safe.',
                        'Regular backups to ensure your data is never lost.',
                    ],
                },
                {
                    number: '04',
                    title: 'Free Trial Version',
                    text: [
                        'Try our application before you buy it.',
                        'Our trial version is not limited in features so you can easily decide.',
                        'See how much time CliSync saves you in the free version for 20 clients.',
                    ],
                },
            ],
            features: [
                {
                    title: 'CLiSync Text Editor',
                    text: 'Our team is available 24/7 to assist you with any queries.',
                    icon: <CiCircleCheck size={45} />,
                },
                {
                    title: 'Calendar Tailored for Psychologists',
                    text: 'Our team is available 24/7 to assist you with any queries.',
                    icon: <CiCircleCheck size={45} />,
                },
            ],
        },
        video: {
            link: 'https://www.youtube.com/embed/KqyGXt1CWBg?si=RMfJvwhPIgiCaJ8e&amp;controls=0',
            title: 'Watch Our Introduction Video',
            text: 'Learn more about our services through this video.',
        },
        reviews: {
            title: 'Reviews',
            reviews: [
                {
                    profilePicUrl:
                        'https://api.api-ninjas.com/v1/randomimage?category=nature',
                    name: 'John Doe',
                    profesion: 'Software Engineer',
                    text: 'Amazing service, highly recommend!',
                    title: 'Great Experience',
                    stars: 5,
                },
                {
                    profilePicUrl:
                        'https://api.api-ninjas.com/v1/randomimage?category=nature',
                    name: 'Jane Smith',
                    profesion: 'Graphic Designer',
                    text: "The best service I've ever used!",
                    title: 'Top Notch',
                    stars: 4,
                },
                {
                    profilePicUrl:
                        'https://api.api-ninjas.com/v1/randomimage?category=nature',
                    name: 'Jane Smith',
                    profesion: 'Graphic Designer',
                    text: "The best service I've ever used!",
                    title: 'Top Notch',
                    stars: 4,
                },
            ],
        },
        pricing: [
            {
                plan: 'Free Plan',
                aboutPlan: 'Perfect for individuals',
                title: 'Free $0 / month',
                features: ['1 GB Storage', 'Basic Support', 'Access to all features'],
            },
            {
                plan: 'Premium Plan',
                aboutPlan: 'Best for small teams',
                title: 'Premium $25 / month',
                features: ['10 GB Storage', 'Priority Support', 'Custom Features'],
                button: 'Choose Premium',
            },
        ],
    },
}

export default navbar
