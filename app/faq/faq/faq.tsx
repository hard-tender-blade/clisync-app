import Separator from '@/app/components/separator'
import React from 'react'
import './faq.css'

// const li = languageInterface.interfaces.openGraph

const faqData = [
    {
        title: 'What is a Client Management System for Psychologists?',
        desc: 'A Client Management System helps psychologists manage client records, schedule appointments, track session progress, and maintain secure and organized documentation.',
    },
    {
        title: 'How secure is the system for sensitive client data?',
        desc: 'The system uses state-of-the-art encryption and follows data protection regulations like GDPR and HIPAA to ensure the confidentiality of client information.',
    },
    {
        title: 'Can I customize the system to suit my practice’s needs?',
        desc: 'Yes, the system allows for customization of fields, workflows, and reports to align with your specific requirements.',
    },
    {
        title: 'Is the system accessible on mobile devices?',
        desc: 'Yes, the system is fully optimized for use on smartphones, tablets, and desktops for convenience and flexibility.',
    },
    {
        title: 'Does the system support appointment scheduling?',
        desc: 'Absolutely, it includes an integrated calendar for scheduling appointments, sending reminders, and preventing double-booking.',
    },
    {
        title: 'Can I integrate the system with teletherapy platforms?',
        desc: 'Yes, the system supports integration with popular teletherapy platforms, enabling seamless online sessions.',
    },
    {
        title: 'Is it possible to generate invoices and accept payments through the system?',
        desc: 'Yes, the system includes features for generating invoices, tracking payments, and offering multiple payment options for clients.',
    },
    {
        title: 'How does the system handle progress tracking and session notes?',
        desc: 'The system allows you to document session notes, set goals, and track progress over time in an organized and secure manner.',
    },
    {
        title: 'Does the system offer data backups?',
        desc: 'Yes, the system provides automated backups to ensure data is safely stored and recoverable in case of an issue.',
    },
    {
        title: 'What kind of customer support is available?',
        desc: 'Customer support is available via email, chat, and phone, with options for training sessions to help you get started.',
    },
    {
        title: 'Can I import existing client data into the system?',
        desc: 'Yes, the system offers tools for importing data from spreadsheets or other client management platforms.',
    },
    {
        title: 'Is there a limit to the number of clients I can add?',
        desc: 'No, the system is scalable, allowing you to manage as many clients as your practice requires.',
    },
    {
        title: 'Does the system comply with ethical and legal standards for psychologists?',
        desc: 'Yes, the system is designed with ethical and legal standards in mind, ensuring compliance with guidelines for documentation and confidentiality.',
    },
    {
        title: 'Can multiple psychologists in a practice use the system?',
        desc: 'Yes, the system supports multi-user functionality, enabling collaboration within a practice.',
    },
    {
        title: 'What are the system’s subscription or pricing options?',
        desc: 'The system offers tiered subscription plans based on features and the size of your practice, with options for monthly or annual billing.',
    },
]

export default function Faq() {
    return (
        <section>
            <h2 className=" text-3xl font-bold  md:text-4xl">FAQ</h2>

            <Separator size="sm" />

            <div className="grid grid-cols-1 gap-12 md:grid-cols-2 2xl:grid-cols-3">
                {faqData.map((item, index) => (
                    <div key={index} className="faq">
                        <h3 className="text-xl font-semibold">{item.title}</h3>
                        {item.desc}
                    </div>
                ))}
            </div>

            <Separator size="sm" />
        </section>
    )
}
