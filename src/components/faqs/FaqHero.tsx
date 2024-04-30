'use client';
import React from 'react';
import Navbar from '../home/Navbar';

import {
	Accordion,
	AccordionHeader,
	AccordionBody,
} from '@material-tailwind/react';

// arrays of questions and answers
const faqs = [
	{
		id: 1,
		question: 'Why should I go solar?',
		answer:
			'The benefits of solar energy range from significant financial savings in the long run to increasing the value of your home. You also get to enjoy these benefits while reducing your impact on environmental pollution. In addition to these, solar energy provides a less cumbersome source of electricity than diesel and petrol-powered generators.',
	},
	{
		id: 2,
		question: 'How do solar photovoltaic (PV) panels work?',
		answer:
			'Solar panels absorb the sun’s energy throughout the day and convert it into direct current (DC) electricity. This DC electricity is then passed through an inverter to convert it to usable AC electricity.',
	},
	{
		id: 3,
		question: 'Does Solar Financing Make Sense?',
		answer:
			'Solar loans are a great solar panel financing option when you want to purchase a system but don’t have the cash up front to buy. With Solar energy loans, you can finance the entire cost of your system in exchange for a lifetime of savings on your energy bills.',
	},
	{
		id: 4,
		question: 'How much maintenance does my solar system require?',
		answer:
			'A well-built system needs minimal maintenance to remain in its best shape for the next 25 to 35 years. An annual cleaning is generally all it needs.',
	},
	{
		id: 5,
		question: 'What are the requirements for my roof?',
		answer:
			'Solar panels may be installed on almost any kind of roof by us. Composition, standing seam metal, and flat roofs are the easiest types to install.  If your roof will need a renovation a few years down the road, it is better to replace it before the Solar PV system is installed. Your roof should be replaced before the solar PV system is installed if has less than 10 years of lifespan left.',
	},
	{
		id: 6,
		question: 'Will I be charged any prepayment penalty?',
		answer: 'No, we will not charge you any fee or penalty for prepayment.',
	},
	{
		id: 7,
		question: 'When does interest begin to accrue on my loan?',
		answer:
			'Interest begins to accrue from the date that we fund your loan. Please check your loan documents for more details.',
	},
	{
		id: 8,
		question: 'How do my panels generate electricity?',
		answer:
			'Sunlight is absorbed by solar panels, which then converts it into useful electricity for your house.',
	},
	{
		id: 9,
		question: 'What happens if it’s not sunny outside?',
		answer:
			"When the sun isn't shining as brightly, solar panels can still generate electricity.",
	},
	{
		id: 10,
		question: 'Is it a good idea to finance solar panels?',
		answer:
			'The answer varies on a case-by-case basis. For those who can swing the total cost of the solar energy system, financing adds interest costs, so it’s more expensive than buying the system outright with cash. However, when compared to leasing solar panels, financing is typically the better option.',
	},
	{
		id: 11,
		question: 'What will be my initial payment?',
		answer:
			'You will be charged a small part of the total system cost and you will be able to spread the rest across a 6 - 24-month period.',
	},
	{
		id: 12,
		question: 'What solar system sizes are available?',
		answer: 'We offer 1.5kVA, 3kVA, 5kVA, 10kVA, and 25kVA systems.',
	},
	{
		id: 13,
		question: 'How do I apply?',
		answer:
			"You can apply by filling out the Get Your 'Offer form', providing all the required details. This 'Offer form' will be a hyperlink.",
	},
	{
		id: 14,
		question: 'Do I need to be a salary earner?',
		answer:
			'No, but you have to share proof of a verifiable steady income source to get an offer.',
	},
	{
		id: 15,
		question: 'Is ENICOM available everywhere in Nigeria?',
		answer:
			"ENICOM currently operates in Lagos, Nigeria. Fill the 'Get Offer' form with the preferred location and we'll work to get you a solution. You can send us a message on Facebook, Twitter (X) and IG our (social media handles will be added) or send an email to (enicom.africa@yahoo.com) on our socials. Our contact numbers 0xooooooo.",
	},
	{
		id: 16,
		question: 'Are my financial details safe?',
		answer:
			'Yes, your security is at the heart of everything we do - details shared with us will be managed appropriately and safely.',
	},
];

// function to handle the material tailwind accordion icon
function Icon({ id, open }: { id: number; open: number }) {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			fill='none'
			viewBox='0 0 24 24'
			strokeWidth={2}
			stroke='currentColor'
			className={`${
				id === open ? 'rotate-180' : ''
			} h-5 w-5 transition-transform`}>
			<path
				strokeLinecap='round'
				strokeLinejoin='round'
				d='M19.5 8.25l-7.5 7.5-7.5-7.5'
			/>
		</svg>
	);
}

const FaqHero = () => {
	const [open, setOpen] = React.useState(0);

	const handleOpen = (value: React.SetStateAction<number>) =>
		setOpen(open === value ? 0 : value);

	return (
		<div className='w-full font-poppins text-dark'>
			<div className='relative'>
				{/* <div className=' absolute w-full h-screen bg-[#011D00]/60 z-0'></div> */}
				<div className='relative z-10 py-[2.5rem]'>
					{/* nav bar */}
					<Navbar />

					{/* Information */}
					<div>
						<h1 className='font-bold text-3xl my-10 px-4 md:px-[4rem]'>FAQS</h1>

						<div className='md:w-80% lg:w-[70%] px-4 mx-auto'>
							{faqs.map((faq) => (
								<Accordion
									key={faq.id}
									open={open === faq.id}
									icon={<Icon id={faq.id} open={open} />}>
									<AccordionHeader
										onClick={() => handleOpen(faq.id)}
										className=' text-base'>
										{faq.question}
									</AccordionHeader>
									<AccordionBody>{faq.answer}</AccordionBody>
								</Accordion>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default FaqHero;
