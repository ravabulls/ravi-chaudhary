import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
	integrations: [
		starlight({
			title: 'Ravi Chaudhary',
			locales: {
				root: { label: 'English', lang: 'en' },
				de: { label: 'Deutsch', lang: 'de' },
			},
			customCss: [
				'./src/styles/custom.css',
			],
			head: [
				{
					tag: 'link',
					attrs: {
						rel: 'manifest',
						href: '/manifest.webmanifest',
					},
				},
				{
					tag: 'meta',
					attrs: {
						name: 'theme-color',
						content: '#2563eb',
					},
				},
				{
					tag: 'script',
					content: `if ('serviceWorker' in navigator) { window.addEventListener('load', () => { navigator.serviceWorker.register('/sw.js'); }); }`,
				},
			],
			sidebar: [
				{
					label: 'Home', translations: { de: 'Startseite' },
					link: '/',
				},
				{
					label: 'Resume', translations: { de: 'Lebenslauf' },
					collapsed: true,
					autogenerate: { directory: 'resume' },
				},
				{
					label: 'Learnings', translations: { de: 'Lernmaterial' },
					collapsed: true,
					items: [
						{
							label: 'MBA Subjects', translations: { de: 'MBA-Fächer' },
							collapsed: true,
							items: [
								{ label: 'Overview', link: 'learnings/mba', translations: { de: 'Übersicht' } },
								{
									label: 'Generative AI for Managers', translations: { de: 'Generative KI für Manager' },
									collapsed: true,
									items: [
										{ label: 'Overview', link: 'learnings/mba/generative-ai-for-managers', translations: { de: 'Übersicht' } },
										{ label: 'Setup — Colab & Gemini', link: 'learnings/mba/generative-ai-for-managers/00-setup', translations: { de: 'Einrichtung — Colab & Gemini' } },
										{ label: '1 · LLMs & Transformers', link: 'learnings/mba/generative-ai-for-managers/01-llms-and-transformers', translations: { de: '1 · LLMs & Transformer' } },
										{ label: '2 · Prompting & Extraction', link: 'learnings/mba/generative-ai-for-managers/02-prompting-and-extraction', translations: { de: '2 · Prompting & Extraktion' } },
										{ label: '3 · RAG', link: 'learnings/mba/generative-ai-for-managers/03-retrieval-augmented-generation', translations: { de: '3 · RAG' } },
										{ label: '4 · GenAI Agents', link: 'learnings/mba/generative-ai-for-managers/04-genai-agents', translations: { de: '4 · GenAI-Agenten' } },
										{ label: '5 · GenAI-Assisted ML', link: 'learnings/mba/generative-ai-for-managers/05-genai-assisted-ml', translations: { de: '5 · GenAI-gestütztes ML' } },
										{ label: '6 · Business Cases', link: 'learnings/mba/generative-ai-for-managers/06-genai-business-cases', translations: { de: '6 · Business Cases' } },
											{ label: 'Applied Project · Venture Clienting & AI', link: 'learnings/mba/generative-ai-for-managers/venture-clienting-ai', translations: { de: 'Anwendungsprojekt · Venture Clienting & KI' } },
									],
								},
								{
									label: 'Applied Market & Business Strategy', translations: { de: 'Angewandte Markt- & Unternehmensstrategie' },
									collapsed: true,
									items: [
										{ label: 'Overview', link: 'learnings/mba/applied-market-and-business-strategy', translations: { de: 'Übersicht' } },
											{ label: '1 · Strategy & Analysis', link: 'learnings/mba/applied-market-and-business-strategy/01-strategy-and-strategic-analysis', translations: { de: '1 · Strategie & Analyse' } },
											{ label: '2 · Segmentation & Positioning', link: 'learnings/mba/applied-market-and-business-strategy/02-segmentation-targeting-positioning', translations: { de: '2 · Segmentierung & Positionierung' } },
											{ label: '3 · Market Selection', link: 'learnings/mba/applied-market-and-business-strategy/03-market-selection-and-internationalization', translations: { de: '3 · Marktauswahl' } },
											{ label: '4 · Routes to Market', link: 'learnings/mba/applied-market-and-business-strategy/04-routes-to-market', translations: { de: '4 · Wege zum Markt' } },
											{ label: '5 · Pricing & Performance', link: 'learnings/mba/applied-market-and-business-strategy/05-strategic-pricing-and-performance', translations: { de: '5 · Preis & Performance' } },
											{ label: '6 · Pitching', link: 'learnings/mba/applied-market-and-business-strategy/06-pitching-and-structured-communication', translations: { de: '6 · Pitching' } },
											{ label: '7 · PM Foundations', link: 'learnings/mba/applied-market-and-business-strategy/07-project-management-foundations', translations: { de: '7 · PM-Grundlagen' } },
											{ label: '8 · Planning & Control', link: 'learnings/mba/applied-market-and-business-strategy/08-project-planning-and-control', translations: { de: '8 · Planung & Steuerung' } },
											{ label: '9 · Agile PM', link: 'learnings/mba/applied-market-and-business-strategy/09-agile-project-management', translations: { de: '9 · Agiles PM' } },
									],
								},
								{
									label: 'Global Innovation Management', translations: { de: 'Global Innovation Management' },
									collapsed: true,
									items: [
										{ label: 'Overview', link: 'learnings/mba/global-innovation-management', translations: { de: 'Übersicht' } },
										{ label: '1 · Innovation Foundations', link: 'learnings/mba/global-innovation-management/01-foundations-of-innovation-management', translations: { de: '1 · Grundlagen der Innovation' } },
										{ label: '2 · Sources & Process', link: 'learnings/mba/global-innovation-management/02-sources-and-innovation-process', translations: { de: '2 · Quellen & Prozess' } },
										{ label: '3 · Globalization & Megatrends', link: 'learnings/mba/global-innovation-management/03-globalization-and-megatrends', translations: { de: '3 · Globalisierung & Megatrends' } },
										{ label: '4 · Managing Global Innovation', link: 'learnings/mba/global-innovation-management/04-managing-global-innovation', translations: { de: '4 · Globale Innovation steuern' } },
										{ label: '5 · Lead Markets & Footprint', link: 'learnings/mba/global-innovation-management/05-lead-markets-and-innovation-footprint', translations: { de: '5 · Leitmärkte & Footprint' } },
										{ label: '6 · Transnational Model', link: 'learnings/mba/global-innovation-management/06-the-transnational-model', translations: { de: '6 · Transnationales Modell' } },
										{ label: '7 · Frugal — Concept', link: 'learnings/mba/global-innovation-management/07-frugal-innovation-concept', translations: { de: '7 · Frugal — Konzept' } },
										{ label: '8 · Frugal in Practice', link: 'learnings/mba/global-innovation-management/08-frugal-innovation-in-practice', translations: { de: '8 · Frugal in der Praxis' } },
									],
								},
							],
						},
						{ label: 'Non-Fiction Books', translations: { de: 'Sachbücher' }, collapsed: true, autogenerate: { directory: 'learnings/books' } },
						{
							label: 'Workshops & Programmes', translations: { de: 'Workshops & Programme' },
							collapsed: true,
							items: [
								{ label: 'ReDI School — Creative Communication', translations: { de: 'ReDI School — Kreative Kommunikation' }, link: 'learnings/workshops/redi-school-creative-communication' },
							],
						},
						{
						label: 'Online Courses', translations: { de: 'Online-Kurse' },
						collapsed: true,
						items: [
							{ label: 'Overview', link: 'learnings/online', translations: { de: 'Übersicht' } },
							{
								label: 'Supply Chain Digitization',
								collapsed: true,
								translations: { de: 'Supply Chain Digitalisierung' },
								items: [
									{ label: 'Overview', link: 'learnings/online/supply-chain-digitization', translations: { de: 'Übersicht' } },
									{
										label: 'Week 1', collapsed: true, translations: { de: 'Woche 1' },
										items: [
											{ label: 'Session 1', link: 'learnings/online/supply-chain-digitization/sc-digitization-week1-session1-notes', translations: { de: 'Sitzung 1' } },
											{ label: 'Session 2', link: 'learnings/online/supply-chain-digitization/sc-digitization-week1-session2-notes', translations: { de: 'Sitzung 2' } },
											{ label: 'Session 3', link: 'learnings/online/supply-chain-digitization/sc-digitization-week1-session3-notes', translations: { de: 'Sitzung 3' } },
											{ label: 'Session 4', link: 'learnings/online/supply-chain-digitization/sc-digitization-week1-session4-notes', translations: { de: 'Sitzung 4' } },
											{ label: 'Session 5', link: 'learnings/online/supply-chain-digitization/sc-digitization-week1-session5-notes', translations: { de: 'Sitzung 5' } },
										],
									},
									{
										label: 'Week 2', collapsed: true, translations: { de: 'Woche 2' },
										items: [
											{ label: 'Session 1', link: 'learnings/online/supply-chain-digitization/sc-digitization-week2-session1-notes', translations: { de: 'Sitzung 1' } },
											{ label: 'Session 2', link: 'learnings/online/supply-chain-digitization/sc-digitization-week2-session2-notes', translations: { de: 'Sitzung 2' } },
											{ label: 'Session 3', link: 'learnings/online/supply-chain-digitization/sc-digitization-week2-session3-notes', translations: { de: 'Sitzung 3' } },
											{ label: 'Session 4', link: 'learnings/online/supply-chain-digitization/sc-digitization-week2-session4-notes', translations: { de: 'Sitzung 4' } },
											{ label: 'Session 5', link: 'learnings/online/supply-chain-digitization/sc-digitization-week2-session5-notes', translations: { de: 'Sitzung 5' } },
										],
									},
									{
										label: 'Week 3', collapsed: true, translations: { de: 'Woche 3' },
										items: [
											{ label: 'Session 1', link: 'learnings/online/supply-chain-digitization/sc-digitization-week3-session1-notes', translations: { de: 'Sitzung 1' } },
											{ label: 'Session 2', link: 'learnings/online/supply-chain-digitization/sc-digitization-week3-session2-notes', translations: { de: 'Sitzung 2' } },
											{ label: 'Session 3', link: 'learnings/online/supply-chain-digitization/sc-digitization-week3-session3-notes', translations: { de: 'Sitzung 3' } },
											{ label: 'Session 4', link: 'learnings/online/supply-chain-digitization/sc-digitization-week3-session4-notes', translations: { de: 'Sitzung 4' } },
											{ label: 'Session 5', link: 'learnings/online/supply-chain-digitization/sc-digitization-week3-session5-notes', translations: { de: 'Sitzung 5' } },
										],
									},
									{
										label: 'Week 4', collapsed: true, translations: { de: 'Woche 4' },
										items: [
											{ label: 'Session 1', link: 'learnings/online/supply-chain-digitization/sc-digitization-week4-session1-notes', translations: { de: 'Sitzung 1' } },
											{ label: 'Session 2', link: 'learnings/online/supply-chain-digitization/sc-digitization-week4-session2-notes', translations: { de: 'Sitzung 2' } },
											{ label: 'Session 3', link: 'learnings/online/supply-chain-digitization/sc-digitization-week4-session3-notes', translations: { de: 'Sitzung 3' } },
											{ label: 'Session 4', link: 'learnings/online/supply-chain-digitization/sc-digitization-week4-session4-notes', translations: { de: 'Sitzung 4' } },
											{ label: 'Session 5', link: 'learnings/online/supply-chain-digitization/sc-digitization-week4-session5-notes', translations: { de: 'Sitzung 5' } },
										],
									},
									{
										label: 'Week 5', collapsed: true, translations: { de: 'Woche 5' },
										items: [
											{ label: 'Session 1', link: 'learnings/online/supply-chain-digitization/sc-digitization-week5-session1-notes', translations: { de: 'Sitzung 1' } },
											{ label: 'Session 2', link: 'learnings/online/supply-chain-digitization/sc-digitization-week5-session2-notes', translations: { de: 'Sitzung 2' } },
											{ label: 'Session 3', link: 'learnings/online/supply-chain-digitization/sc-digitization-week5-session3-notes', translations: { de: 'Sitzung 3' } },
											{ label: 'Session 4', link: 'learnings/online/supply-chain-digitization/sc-digitization-week5-session4-notes', translations: { de: 'Sitzung 4' } },
											{ label: 'Session 5', link: 'learnings/online/supply-chain-digitization/sc-digitization-week5-session5-notes', translations: { de: 'Sitzung 5' } },
										],
									},
									{
										label: 'Week 6', collapsed: true, translations: { de: 'Woche 6' },
										items: [
											{ label: 'Session 1', link: 'learnings/online/supply-chain-digitization/sc-digitization-week6-session1-notes', translations: { de: 'Sitzung 1' } },
											{ label: 'Session 2', link: 'learnings/online/supply-chain-digitization/sc-digitization-week6-session2-notes', translations: { de: 'Sitzung 2' } },
											{ label: 'Session 3', link: 'learnings/online/supply-chain-digitization/sc-digitization-week6-session3-notes', translations: { de: 'Sitzung 3' } },
											{ label: 'Session 4', link: 'learnings/online/supply-chain-digitization/sc-digitization-week6-session4-notes', translations: { de: 'Sitzung 4' } },
											{ label: 'Session 5', link: 'learnings/online/supply-chain-digitization/sc-digitization-week6-session5-notes', translations: { de: 'Sitzung 5' } },
										],
									},
									{
										label: 'Week 7', collapsed: true, translations: { de: 'Woche 7' },
										items: [
											{ label: 'Session 1', link: 'learnings/online/supply-chain-digitization/sc-digitization-week7-session1-notes', translations: { de: 'Sitzung 1' } },
											{ label: 'Session 2', link: 'learnings/online/supply-chain-digitization/sc-digitization-week7-session2-notes', translations: { de: 'Sitzung 2' } },
											{ label: 'Session 3', link: 'learnings/online/supply-chain-digitization/sc-digitization-week7-session3-notes', translations: { de: 'Sitzung 3' } },
											{ label: 'Session 4', link: 'learnings/online/supply-chain-digitization/sc-digitization-week7-session4-notes', translations: { de: 'Sitzung 4' } },
											{ label: 'Session 5', link: 'learnings/online/supply-chain-digitization/sc-digitization-week7-session5-notes', translations: { de: 'Sitzung 5' } },
										],
									},
									{
										label: 'Week 8', collapsed: true, translations: { de: 'Woche 8' },
										items: [
											{ label: 'Session 1', link: 'learnings/online/supply-chain-digitization/sc-digitization-week8-session1-notes', translations: { de: 'Sitzung 1' } },
											{ label: 'Session 2', link: 'learnings/online/supply-chain-digitization/sc-digitization-week8-session2-notes', translations: { de: 'Sitzung 2' } },
											{ label: 'Session 3', link: 'learnings/online/supply-chain-digitization/sc-digitization-week8-session3-notes', translations: { de: 'Sitzung 3' } },
											{ label: 'Session 4', link: 'learnings/online/supply-chain-digitization/sc-digitization-week8-session4-notes', translations: { de: 'Sitzung 4' } },
											{ label: 'Session 5', link: 'learnings/online/supply-chain-digitization/sc-digitization-week8-session5-notes', translations: { de: 'Sitzung 5' } },
										],
									},
									{
										label: 'Week 9', collapsed: true, translations: { de: 'Woche 9' },
										items: [
											{ label: 'Session 1', link: 'learnings/online/supply-chain-digitization/sc-digitization-week9-session1-notes', translations: { de: 'Sitzung 1' } },
											{ label: 'Session 2', link: 'learnings/online/supply-chain-digitization/sc-digitization-week9-session2-notes', translations: { de: 'Sitzung 2' } },
											{ label: 'Session 3', link: 'learnings/online/supply-chain-digitization/sc-digitization-week9-session3-notes', translations: { de: 'Sitzung 3' } },
											{ label: 'Session 4', link: 'learnings/online/supply-chain-digitization/sc-digitization-week9-session4-notes', translations: { de: 'Sitzung 4' } },
											{ label: 'Session 5', link: 'learnings/online/supply-chain-digitization/sc-digitization-week9-session5-notes', translations: { de: 'Sitzung 5' } },
										],
									},
									{
										label: 'Week 10', collapsed: true, translations: { de: 'Woche 10' },
										items: [
											{ label: 'Session 1', link: 'learnings/online/supply-chain-digitization/sc-digitization-week10-session1-notes', translations: { de: 'Sitzung 1' } },
											{ label: 'Session 2', link: 'learnings/online/supply-chain-digitization/sc-digitization-week10-session2-notes', translations: { de: 'Sitzung 2' } },
											{ label: 'Session 3', link: 'learnings/online/supply-chain-digitization/sc-digitization-week10-session3-notes', translations: { de: 'Sitzung 3' } },
											{ label: 'Session 4', link: 'learnings/online/supply-chain-digitization/sc-digitization-week10-session4-notes', translations: { de: 'Sitzung 4' } },
											{ label: 'Session 5', link: 'learnings/online/supply-chain-digitization/sc-digitization-week10-session5-notes', translations: { de: 'Sitzung 5' } },
										],
									},
									{
										label: 'Week 11', collapsed: true, translations: { de: 'Woche 11' },
										items: [
											{ label: 'Session 1', link: 'learnings/online/supply-chain-digitization/sc-digitization-week11-session1-notes', translations: { de: 'Sitzung 1' } },
											{ label: 'Session 2', link: 'learnings/online/supply-chain-digitization/sc-digitization-week11-session2-notes', translations: { de: 'Sitzung 2' } },
											{ label: 'Session 3', link: 'learnings/online/supply-chain-digitization/sc-digitization-week11-session3-notes', translations: { de: 'Sitzung 3' } },
											{ label: 'Session 4', link: 'learnings/online/supply-chain-digitization/sc-digitization-week11-session4-notes', translations: { de: 'Sitzung 4' } },
											{ label: 'Session 5', link: 'learnings/online/supply-chain-digitization/sc-digitization-week11-session5-notes', translations: { de: 'Sitzung 5' } },
										],
									},
									{
										label: 'Week 12', collapsed: true, translations: { de: 'Woche 12' },
										items: [
											{ label: 'Session 1', link: 'learnings/online/supply-chain-digitization/sc-digitization-week12-session1-notes', translations: { de: 'Sitzung 1' } },
											{ label: 'Session 2', link: 'learnings/online/supply-chain-digitization/sc-digitization-week12-session2-notes', translations: { de: 'Sitzung 2' } },
											{ label: 'Session 3', link: 'learnings/online/supply-chain-digitization/sc-digitization-week12-session3-notes', translations: { de: 'Sitzung 3' } },
											{ label: 'Session 4', link: 'learnings/online/supply-chain-digitization/sc-digitization-week12-session4-notes', translations: { de: 'Sitzung 4' } },
											{ label: 'Session 5', link: 'learnings/online/supply-chain-digitization/sc-digitization-week12-session5-notes', translations: { de: 'Sitzung 5' } },
										],
									},
								],
							},
							{
								label: 'Google Project Management', translations: { de: 'Google Projektmanagement' },
								collapsed: true,
								items: [
									{ label: 'Overview', link: 'learnings/online/project-management', translations: { de: 'Übersicht' } },
									{
										label: 'Course 1 — Foundations', translations: { de: 'Kurs 1 — Grundlagen' },
										collapsed: true,
										items: [
											{ label: 'M1 · Embarking', translations: { de: 'M1 · Einstieg' }, link: 'learnings/online/project-management/foundations-1-embarking' },
											{ label: 'M2 · Effective PM', translations: { de: 'M2 · Wirksame PM' }, link: 'learnings/online/project-management/foundations-2-effective-pm' },
											{ label: 'M3 · Life Cycle & Methods', translations: { de: 'M3 · Lebenszyklus & Methoden' }, link: 'learnings/online/project-management/foundations-3-life-cycle' },
											{ label: 'M4 · Structure & Culture', translations: { de: 'M4 · Struktur & Kultur' }, link: 'learnings/online/project-management/foundations-4-org-structure' },
										],
									},
									{
										label: 'Course 2 — Project Initiation', translations: { de: 'Kurs 2 — Projektinitiierung' },
										collapsed: true,
										items: [
											{ label: '1 · Initiation Components', translations: { de: '1 · Initiierungskomponenten' }, link: 'learnings/online/project-management/initiation-1-components' },
											{ label: '2 · Goals, Scope & Success', translations: { de: '2 · Ziele, Umfang & Erfolg' }, link: 'learnings/online/project-management/initiation-2-goals-scope' },
											{ label: '3 · Stakeholders & RACI', translations: { de: '3 · Stakeholder & RACI' }, link: 'learnings/online/project-management/initiation-3-stakeholders' },
											{ label: '4 · Resources & Tools', translations: { de: '4 · Ressourcen & Tools' }, link: 'learnings/online/project-management/initiation-4-resources-tools' },
										],
									},
								],
							},
							{
								label: 'SAP Implementation & ERP', translations: { de: 'SAP-Implementierung & ERP' },
								collapsed: true,
								items: [
									{ label: 'Overview', link: 'learnings/online/sap-erp-consulting', translations: { de: 'Übersicht' } },
									{
										label: 'Block I — Foundations', translations: { de: 'Block I — Grundlagen' },
										collapsed: true,
										items: [
											{ label: '1 · SAP & ERP Foundations', link: 'learnings/online/sap-erp-consulting/01-sap-erp-foundations', translations: { de: '1 · SAP- & ERP-Grundlagen' } },
											{ label: '2 · Industry & Roles', link: 'learnings/online/sap-erp-consulting/02-software-industry-and-roles', translations: { de: '2 · Branche & Rollen' } },
											{ label: '3 · Computers & Internet', link: 'learnings/online/sap-erp-consulting/03-computers-and-internet', translations: { de: '3 · Computer & Internet' } },
											{ label: '4 · Digital Safety & Citizenship', link: 'learnings/online/sap-erp-consulting/04-digital-safety-and-citizenship', translations: { de: '4 · Digitale Sicherheit & Verantwortung' } },
											{ label: '5 · Developer Environment', link: 'learnings/online/sap-erp-consulting/05-developer-environment', translations: { de: '5 · Entwicklungsumgebung' } },
											{ label: '6 · Git & GitHub', link: 'learnings/online/sap-erp-consulting/06-git-and-github', translations: { de: '6 · Git & GitHub' } },
											{ label: '7 · HTML Essentials', link: 'learnings/online/sap-erp-consulting/07-html-essentials', translations: { de: '7 · HTML-Grundlagen' } },
											{ label: '8 · CSS Essentials', link: 'learnings/online/sap-erp-consulting/08-css-essentials', translations: { de: '8 · CSS-Grundlagen' } },
											{ label: '9 · JavaScript Core', link: 'learnings/online/sap-erp-consulting/09-javascript-core', translations: { de: '9 · JavaScript-Grundlagen' } },
											{ label: '10 · JS Data & DOM', link: 'learnings/online/sap-erp-consulting/10-javascript-data-and-dom', translations: { de: '10 · JS: Daten & DOM' } },
											{ label: '11 · System Design', link: 'learnings/online/sap-erp-consulting/11-system-design', translations: { de: '11 · Systemdesign' } },
											{ label: '12 · Agile, Scrum & AI', link: 'learnings/online/sap-erp-consulting/12-agile-scrum-ai', translations: { de: '12 · Agile, Scrum & KI' } },
											{ label: '13 · Enterprise Environment', link: 'learnings/online/sap-erp-consulting/13-enterprise-environment', translations: { de: '13 · Unternehmensumfeld' } },
										],
									},
								],
							},
							{
								label: 'Shipping',
								collapsed: true,
								items: [
									{ label: 'Maritime CII Dashboard', link: 'learnings/online/shipping/maritime-cii-dashboard' },
									{ label: 'Ship Engine Digital Twin', link: 'learnings/online/shipping/ship-engine-digital-twin' },
								],
							},
						],
					},
					],
				},
			],
		}),
	],
});