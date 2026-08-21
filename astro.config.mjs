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
									label: 'Application', translations: { de: 'Anwendung' },
									collapsed: true,
									items: [
										{ label: 'Venture Clienting and AI', translations: { de: 'Venture Clienting und KI' }, link: 'learnings/mba/application/venture-clienting-ai' },
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