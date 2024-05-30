import React from 'react';
import { Footer, Navbar } from '@/components';
import Link from 'next/link';

const DisclosePage = () => {
	return (
		<div>
			<div className='w-full font-poppins text-dark'>
				<div className='relative'>
					{/* <div className=' absolute w-full h-screen bg-[#011D00]/60 z-0'></div> */}
					<div className='relative z-10 py-[2.5rem]'>
						<Navbar />
					</div>

					{/* hero */}
					<div className='max-w-6xl mx-auto px-4'>
						<h1 className='font-semibold text-4xl text-center mb-7'>
							NON - DISCLOSURE AGREEMENT BETWEEN ENERGY INFRA COMPANY LIMITED
							AND [•]
						</h1>

						<h1 className='font-semibold'>
							THIS NON-DISCLOSURE AGREEMENT (“Agreement”) is made this
							__________________ day of __________________, 2024
						</h1>

						<h1 className='font-semibold mt-4'>BETWEEN</h1>

						<p>
							<span className='font-medium'>ENERGY INFRA COMPANY LIMITED,</span>{' '}
							a private limited liability company registered under the laws of
							the Federal Republic of Nigeria with registration number 6875230
							and having its registered office at E9, Lekki County Homes, Ikota,
							Lekki, Lagos, Nigeria, (hereinafter referred to as “Disclosing
							Party” and where the context so admits include its
							successors-in-title and assigns);
						</p>

						<p className='mt-4'>
							[•], a private/public limited liability company registered under
							the laws of the Federal Republic of Nigeria with registration
							number [•] and having its registered office at [•], (hereinafter
							referred to as “Receiving Party” and where the context so admits
							include its successors-in-title and assigns);
						</p>

						<p className='mt-4'>
							The Receiving Party and the Disclosing Party may be referred to
							individually as “Party” or collectively as “Parties”.
						</p>

						<p className='font-semibold mt-4'>WHEREAS:</p>

						<ul className='list-disc pl-10 grid gap-2'>
							<li>
								The Disclosing Party is a renewable energy-focused company
								designed to provide renewable energy solutions and financing
								options for a wide range of clients.
							</li>
							<li>The Receiving Party is a [•].</li>
							<li>
								For the purpose of preventing the unauthorized disclosure of
								Confidential Information to be furnished by the Disclosing Party
								to the Receiving Party in contemplation of the Receiving Party
								offering a service to the Disclosing Party (“Transaction”), the
								Parties agree to enter into this Agreement concerning the
								disclosure of certain Confidential Information based on the
								following terms.
							</li>
						</ul>

						<p className='font-semibold mt-4'>
							NOW THIS AGREEMENT WITNESSES AS FOLLOWS:
						</p>
						<p className='font-medium mt-4'>⦁ Definitions</p>

						<p className='mt-4'>
							In this Agreement, the following capitalized words and phrases
							shall have the following meanings:
						</p>

						<p className='mt-4'>
							<span className='font-medium'>“Confidential Information”</span>{' '}
							means all information, email, contacts, surveys, reports, designs,
							drawing, documents and other data and knowledge, whether factual,
							interpretative, or otherwise, associated with or related to the
							Disclosing Party, its business and/or the Proposed Engagement
							(including confirmation that the Parties are in discussions
							concerning the Proposed Engagement) in any form (whether oral,
							written, machine-readable or otherwise) and whenever and howsoever
							obtained by the Receiving Party; provided however that
							“Confidential Information” shall not include any information which
							the Receiving Party can show:
						</p>

						<div>
							<p className='mt-4'>
								(i) was, at the time of its disclosure by the Disclosing Party
								to the Receiving Party, already in the public domain.
							</p>
							<p className='mt-4'>
								(i) entered the public domain after its disclosure by the
								Disclosing Party to the Receiving Party other than as a result
								of disclosure by the Receiving Party in violation of this
								Agreement or any of its past or present Employees.
							</p>
							<p className='mt-4'>
								(i) was lawfully in the Receiving Party’s possession at the time
								of its disclosure by the Disclosing Party to the Receiving Party
								and was not acquired by the Receiving Party: ⦁ on a confidential
								basis; or (B) to its knowledge, after reasonable inquiry, as a
								result of a breach by a Third Party of any obligation of
								confidence upon that Third Party.
							</p>
							<p className='mt-4'>
								(i) was lawfully received by the Receiving Party from a Third
								Party after disclosure to the Receiving Party by the Disclosing
								Party, and the Receiving Party received the information from
								that Third Party other than: ⦁ on a confidential basis; or (B)
								to its knowledge, after reasonable inquiry, because of a breach
								by the Third Party of any obligation of confidence upon that
								Third Party.
							</p>
						</div>

						<div>
							<p className='mt-4'>
								<span className='font-medium'>“Employee”</span>
								means any director, officer or other individual in an employee
								relationship with a Person.
							</p>
							<p className='mt-4'>
								<span className='font-medium'>“Person”</span>
								means any individual, corporation, partnership, branch, business
								unit, limited partnership, sole proprietorship, governmental or
								regulatory body, unincorporated organization or any other entity
								of any nature whatsoever.
							</p>
							<p className='mt-4'>
								<span className='font-medium'>“Proposed Engagement” </span>
								means the proposed engagement of the Receiving Party to provide
								[•] services to the Disclosing Party, and as may be contained in
								a formal agreement between the Parties.
							</p>
							<p className='mt-4'>
								<span className='font-medium'>“Third Party”</span>
								means any Person other than one that is a Party to this
								Agreement.
							</p>
							<p className='mt-4'>
								Derivations of any of the foregoing words and phrases shall have
								a corresponding meaning
							</p>
						</div>

						<div>
							<p className='font-semibold mt-4'>Obligation of Confidence</p>

							<ul className='list-disc pl-10 grid gap-2'>
								<li>
									Subject to Section 2.2 below, the Receiving Party shall
									preserve as strictly confidential and private the Confidential
									Information, and shall not disclose or reveal, or allow to be
									disclosed or revealed, the Confidential Information in any
									manner, directly or indirectly, to any Third Party except as
									expressly permitted below. The Receiving Party shall take all
									reasonable steps necessary to ensure compliance with this
									Agreement by such Persons.
								</li>
								<li>
									The Receiving Party may disclose the Confidential Information
									only to its current Employees and Employees of its affiliates
									who need to know the Confidential Information for the purpose
									of offering [•] services and only after each such current
									Employee acknowledges that the Confidential Information is
									being disclosed subject to the terms of this Agreement and the
									Employee agrees to fully comply with the provisions of this
									Agreement both during and after his/her employment with the
									Receiving Party or its affiliate (as applicable)
								</li>
							</ul>
						</div>

						<div>
							<p className='font-semibold mt-4'>Restricted Use</p>
							<p className='mt-4'>
								The Receiving Party shall ensure that the Confidential
								Information is used only for the purpose of offering [•]
								services as may be contained in the definitive agreement between
								the Parties and for no other purpose whatsoever.
							</p>
						</div>
						<div>
							<p className='font-semibold mt-4'>
								Notice of Unauthorized Disclosure
							</p>
							<p className='mt-4'>
								The Receiving Party shall immediately notify the Disclosing
								Party of any actual, threatened, or likely disclosure of
								Confidential Information (not expressly permitted by this
								Agreement) by it, any of its present or past Employees or any
								other Person which (to the Receiving Party’s knowledge) obtained
								the Confidential Information directly or indirectly from or
								through the Receiving Party.
							</p>
						</div>
						<div>
							<p className='font-semibold mt-4'>Disclosure Required by Law</p>
							<ul className='list-disc pl-10 grid gap-2'>
								<li>
									Subject to clause 5.2 below, no announcement or disclosure
									relating to the Proposed Engagement or their prospective
									interest in the Proposed Engagement will be made or solicited
									by either Party or on its behalf without the other Party’s
									prior written consent (which may be given on such terms as the
									other Party considers appropriate).
								</li>
								<li>
									The Receiving Party may disclose such Confidential Information
									as required under applicable law provided that, if such
									disclosure is required, the Receiving Party shall:
									<ol className=' list-decimal pl-10 grid gap-2 mt-2'>
										<li>
											promptly notify the Disclosing Party of the situation with
											all relevant details;
										</li>
										<li>
											take all reasonable steps to limit the amount and degree
											of disclosure and otherwise preserve the confidentiality
											of the applicable Confidential Information;
										</li>
										<li>
											to the extent reasonably possible, consult with the
											Disclosing Party prior to the disclosure and assist the
											Disclosing Party in seeking a protective order or other
											remedy to limit or restrict the disclosure or otherwise
											preserve the confidentiality of the applicable
											Confidential Information; and
										</li>
										<li>
											disclose only such portion of the Confidential Information
											as is required to be disclosed by applicable law and only
											to the extent required to be disclosed by applicable law.
										</li>
									</ol>
								</li>
							</ul>
						</div>

						<div>
							<p className='font-semibold mt-4'>Title</p>
							<p className='mt-4'>
								The Receiving Party shall obtain no right, title, estate, or
								other interest of any nature whatsoever in or to the
								Confidential Information.
							</p>
						</div>
						<div>
							<p className='font-semibold mt-4'>
								Return / Destruction of Confidential Information
							</p>
							<ul className='list-disc pl-10 grid gap-2'>
								<li>
									The Receiving Party shall, within five (5) days of written
									notice received from the Disclosing Party, return and deliver
									to the Disclosing Party or destroy, all Confidential
									Information directly or indirectly in its control including,
									without limitation, all documents, notes, extracts, summaries,
									memoranda, copies and other materials including computer,
									word-processor or other device containing any of the
									Confidential Information or which may have the effect of
									disclosing the Confidential Information whether in the form of
									writing, machine-readable data or any other format whatsoever.
									If the Confidential Information is in the form of materials
									generated internally by the Receiving Party, the Receiving
									Party may, instead of providing such materials to the
									Disclosing Party, destroy such materials.
								</li>
								<li>
									Notwithstanding the foregoing, the Party receiving the request
									may retain one legal archival copy of the Confidential
									Information, including materials prepared from the
									Confidential Information, provided that such Party and its
									Representatives continue to be bound by its obligations
									hereunder.
								</li>
								<li>
									The Receiving Party will if required by the Disclosing Party
									following receipt of a written notice under clause 7.1 confirm
									in writing (such confirmation to be signed by the authorised
									representative of the Receiving Party) its compliance and the
									compliance of its affiliates and/or employees with clause 7.1
									and if applicable 7.2 of this Agreement.
								</li>
							</ul>
						</div>

						<div>
							<ul className='list-disc pl-10 grid gap-2'>
								<p className='font-semibold mt-4'>Remedies</p>
								<li>
									The Receiving Party shall be liable, indemnify and hold the
									Disclosing Party harmless from and against all claims,
									expenses (including reasonable legal fees incurred) and other
									liabilities or damages of whatever nature suffered by the
									Disclosing Party as a result of any breach or threatened
									breach of this Agreement by the Receiving Party, its or its
									affiliate’s past or present Employees or any Person obtaining
									the Confidential Information directly or indirectly from or
									through the Receiving Party.
								</li>
								<li>
									Without prejudice to any other rights or remedies that the
									Disclosing Party may have under this Agreement, the Receiving
									Party acknowledges and agrees that damages alone would not be
									an adequate remedy for any breach of the terms of this
									Agreement by the Receiving Party. Accordingly, the Disclosing
									Party shall be entitled to the remedies of injunction,
									specific performance or other equitable reliefs for any
									threatened or actual breach of the terms of this Agreement.
								</li>
							</ul>
						</div>

						<div>
							<p className='font-semibold mt-4'>Term</p>
							<p>
								This Agreement shall terminate on the earlier of the execution
								of a definitive agreement between the Parties regarding the
								Proposed Engagement or One (1) year from the date of this
								Agreement.
							</p>
						</div>
						<div>
							<p className='font-semibold mt-4'>⦁ Miscellaneous</p>
							<ul className='list-disc pl-10 grid gap-2'>
								<li className='grid'>
									<span className='font-medium'>No Further Obligations</span>{' '}
									This Agreement shall not impose upon either Party any
									obligation to provide information (confidential or otherwise)
									to the other Party. This Agreement shall not oblige either
									Party to continue its pursuit of the Proposed Engagement or
									enter into any further agreement or document related thereto,
									it being agreed that either Party may stop disengaging each
									other in respect of the Proposed Engagement at any time or for
									any reason without any liability whatsoever to the other Party
									save as arising from this Agreement.
								</li>
								<li className='grid'>
									<span className='font-medium'>
										No Liability for Inaccuracy
									</span>
									The Receiving Party acknowledges that: (i) the information
									supplied by the Disclosing Party may not be accurate or
									complete; and (ii) if the Parties proceed to a binding and
									enforceable agreement, such agreement will contain the only
									representations and warranties upon which each Party will be
									entitled to rely in relation to the Proposed Engagement.
									Therefore, the Disclosing Party is not liable for or in
									relation to the information provided by it to the Receiving
									Party pursuant to this Agreement.
								</li>
								<li className='grid'>
									<span className='font-medium'>
										Entire Agreement / No Waiver
									</span>
									Any amendments to this Agreement must be in writing and
									executed by both Parties to be effective. No delay or failure
									to complain shall constitute a waiver of any rights of a Party
									or the obligations of the other Party, it being agreed that
									any waiver of any right of a Party or obligation of the other
									Party must also be in writing and signed by the waiving Party
									and such waiver shall impact only the right or obligation
									expressly noted in such waiver.
								</li>
								<li className='grid'>
									<span className='font-medium'>Assignment</span>
									Neither Party may assign any rights or obligations under this
									Agreement without the prior written consent of the other
									Party, such consent not to be unreasonably withheld or
									delayed. This Agreement shall be binding upon and ensure to
									the benefit of the Parties and their respective successors and
									permitted assigns.
								</li>
								<li className='grid'>
									<span className='font-medium'>Governing Law</span>
									The Agreement shall be governed by and interpreted in
									accordance with the Laws of the Federal Republic of Nigeria.
								</li>
								<li className='grid'>
									<span className='font-medium'>⦁ Dispute Resolution</span>
									In the event of any dispute, difference or claims arising out
									of or in connection with this Agreement, the matter shall be
									settled by Arbitration in accordance with the Arbitration and
									Mediation Act, 2023. The arbitration shall be conducted by a
									sole arbitrator to be appointed as agreed by the parties.
								</li>
								<li className='grid'>
									<span className='font-medium'>Severability</span>
									If individual provisions of this Agreement are determined by
									an authority with due jurisdiction to be legally invalid, void
									or unenforceable, such shall not affect the validity or
									enforceability of the remaining provisions of this Agreement.
									The Parties agree to replace the invalid, void or
									unenforceable provision with a valid and enforceable provision
									which comes as close as possible to the original provision as
									regards its commercial intent.
								</li>
							</ul>
						</div>

						<div className='mt-10 mb-20'>
							<p className=' font-semibold'>
								IN WITNESS OF WHICH the Parties hereto have caused their
								respective hands and common seals to be affixed hereto on the
								day and year first above written.
							</p>
							<p className=' font-semibold mt-4'>
								EXECUTED ON BEHALF OF ENERGY INFRA COMPANY LIMITED BY
							</p>
							<div className='flex items-center font-semibold justify-between mt-4'>
								<p className='grid items-center justify-center'>
									_____________________ <span>DIRECTOR</span>
								</p>
								<p className='grid items-center justify-center'>
									_____________________ <span>DIRECTOR</span>
								</p>
							</div>
							<p className=' font-semibold mt-4'>
								EXECUTED ON BEHALF OF [•] BY
							</p>
							<div className='flex items-center justify-between mt-4 font-semibold'>
								<p className='grid items-center justify-center'>
									_____________________ <span>DIRECTOR</span>
								</p>
								<p className='grid items-center justify-center'>
									_____________________ <span>DIRECTOR</span>
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default DisclosePage;
