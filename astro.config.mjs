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
					label: 'Home',
					link: '/',
				},
				{
					label: 'Resume',
					collapsed: true,
					autogenerate: { directory: 'resume' },
				},
				{
					label: 'Learnings',
					collapsed: true,
					items: [
						{
							label: 'MBA Subjects',
							collapsed: true,
							items: [
								{ label: 'Overview', link: 'learnings/mba' },
								{
									label: 'Application',
									collapsed: true,
									items: [
										{ label: 'Venture Clienting and AI', link: 'learnings/mba/application/venture-clienting-ai' },
									],
								},
							],
						},
						{ label: 'Non-Fiction Books', collapsed: true, autogenerate: { directory: 'learnings/books' } },
						{
						label: 'Online Courses',
						collapsed: true,
						items: [
							{ label: 'Overview', link: 'learnings/online' },
							{
								label: 'Supply Chain Digitization',
								collapsed: true,
								translations: { de: 'Supply Chain Digitalisierung' },
								items: [
									{ label: 'Overview', link: 'learnings/online/supply-chain-digitization', translations: { de: 'Übersicht' } },
									{
										label: 'Week 1', collapsed: true, translations: { de: 'Woche 1' },
										items: [
											{ label: 'Session 1', link: 'learnings/online/supply-chain-digitization/sc-digitization-week1-session1-notes' },
											{ label: 'Session 2', link: 'learnings/online/supply-chain-digitization/sc-digitization-week1-session2-notes' },
											{ label: 'Session 3', link: 'learnings/online/supply-chain-digitization/sc-digitization-week1-session3-notes' },
											{ label: 'Session 4', link: 'learnings/online/supply-chain-digitization/sc-digitization-week1-session4-notes' },
											{ label: 'Session 5', link: 'learnings/online/supply-chain-digitization/sc-digitization-week1-session5-notes' },
										],
									},
									{
										label: 'Week 2', collapsed: true, translations: { de: 'Woche 2' },
										items: [
											{ label: 'Session 1', link: 'learnings/online/supply-chain-digitization/sc-digitization-week2-session1-notes' },
											{ label: 'Session 2', link: 'learnings/online/supply-chain-digitization/sc-digitization-week2-session2-notes' },
											{ label: 'Session 3', link: 'learnings/online/supply-chain-digitization/sc-digitization-week2-session3-notes' },
											{ label: 'Session 4', link: 'learnings/online/supply-chain-digitization/sc-digitization-week2-session4-notes' },
											{ label: 'Session 5', link: 'learnings/online/supply-chain-digitization/sc-digitization-week2-session5-notes' },
										],
									},
									{
										label: 'Week 3', collapsed: true, translations: { de: 'Woche 3' },
										items: [
											{ label: 'Session 1', link: 'learnings/online/supply-chain-digitization/sc-digitization-week3-session1-notes' },
											{ label: 'Session 2', link: 'learnings/online/supply-chain-digitization/sc-digitization-week3-session2-notes' },
											{ label: 'Session 3', link: 'learnings/online/supply-chain-digitization/sc-digitization-week3-session3-notes' },
											{ label: 'Session 4', link: 'learnings/online/supply-chain-digitization/sc-digitization-week3-session4-notes' },
											{ label: 'Session 5', link: 'learnings/online/supply-chain-digitization/sc-digitization-week3-session5-notes' },
										],
									},
									{
										label: 'Week 4', collapsed: true, translations: { de: 'Woche 4' },
										items: [
											{ label: 'Session 1', link: 'learnings/online/supply-chain-digitization/sc-digitization-week4-session1-notes' },
											{ label: 'Session 2', link: 'learnings/online/supply-chain-digitization/sc-digitization-week4-session2-notes' },
											{ label: 'Session 3', link: 'learnings/online/supply-chain-digitization/sc-digitization-week4-session3-notes' },
											{ label: 'Session 4', link: 'learnings/online/supply-chain-digitization/sc-digitization-week4-session4-notes' },
											{ label: 'Session 5', link: 'learnings/online/supply-chain-digitization/sc-digitization-week4-session5-notes' },
										],
									},
									{
										label: 'Week 5', collapsed: true, translations: { de: 'Woche 5' },
										items: [
											{ label: 'Session 1', link: 'learnings/online/supply-chain-digitization/sc-digitization-week5-session1-notes' },
											{ label: 'Session 2', link: 'learnings/online/supply-chain-digitization/sc-digitization-week5-session2-notes' },
											{ label: 'Session 3', link: 'learnings/online/supply-chain-digitization/sc-digitization-week5-session3-notes' },
											{ label: 'Session 4', link: 'learnings/online/supply-chain-digitization/sc-digitization-week5-session4-notes' },
											{ label: 'Session 5', link: 'learnings/online/supply-chain-digitization/sc-digitization-week5-session5-notes' },
										],
									},
									{
										label: 'Week 6', collapsed: true, translations: { de: 'Woche 6' },
										items: [
											{ label: 'Session 1', link: 'learnings/online/supply-chain-digitization/sc-digitization-week6-session1-notes' },
											{ label: 'Session 2', link: 'learnings/online/supply-chain-digitization/sc-digitization-week6-session2-notes' },
											{ label: 'Session 3', link: 'learnings/online/supply-chain-digitization/sc-digitization-week6-session3-notes' },
											{ label: 'Session 4', link: 'learnings/online/supply-chain-digitization/sc-digitization-week6-session4-notes' },
											{ label: 'Session 5', link: 'learnings/online/supply-chain-digitization/sc-digitization-week6-session5-notes' },
										],
									},
									{
										label: 'Week 7', collapsed: true, translations: { de: 'Woche 7' },
										items: [
											{ label: 'Session 1', link: 'learnings/online/supply-chain-digitization/sc-digitization-week7-session1-notes' },
											{ label: 'Session 2', link: 'learnings/online/supply-chain-digitization/sc-digitization-week7-session2-notes' },
											{ label: 'Session 3', link: 'learnings/online/supply-chain-digitization/sc-digitization-week7-session3-notes' },
											{ label: 'Session 4', link: 'learnings/online/supply-chain-digitization/sc-digitization-week7-session4-notes' },
											{ label: 'Session 5', link: 'learnings/online/supply-chain-digitization/sc-digitization-week7-session5-notes' },
										],
									},
									{
										label: 'Week 8', collapsed: true, translations: { de: 'Woche 8' },
										items: [
											{ label: 'Session 1', link: 'learnings/online/supply-chain-digitization/sc-digitization-week8-session1-notes' },
											{ label: 'Session 2', link: 'learnings/online/supply-chain-digitization/sc-digitization-week8-session2-notes' },
											{ label: 'Session 3', link: 'learnings/online/supply-chain-digitization/sc-digitization-week8-session3-notes' },
											{ label: 'Session 4', link: 'learnings/online/supply-chain-digitization/sc-digitization-week8-session4-notes' },
											{ label: 'Session 5', link: 'learnings/online/supply-chain-digitization/sc-digitization-week8-session5-notes' },
										],
									},
									{
										label: 'Week 9', collapsed: true, translations: { de: 'Woche 9' },
										items: [
											{ label: 'Session 1', link: 'learnings/online/supply-chain-digitization/sc-digitization-week9-session1-notes' },
											{ label: 'Session 2', link: 'learnings/online/supply-chain-digitization/sc-digitization-week9-session2-notes' },
											{ label: 'Session 3', link: 'learnings/online/supply-chain-digitization/sc-digitization-week9-session3-notes' },
											{ label: 'Session 4', link: 'learnings/online/supply-chain-digitization/sc-digitization-week9-session4-notes' },
											{ label: 'Session 5', link: 'learnings/online/supply-chain-digitization/sc-digitization-week9-session5-notes' },
										],
									},
									{
										label: 'Week 10', collapsed: true, translations: { de: 'Woche 10' },
										items: [
											{ label: 'Session 1', link: 'learnings/online/supply-chain-digitization/sc-digitization-week10-session1-notes' },
											{ label: 'Session 2', link: 'learnings/online/supply-chain-digitization/sc-digitization-week10-session2-notes' },
											{ label: 'Session 3', link: 'learnings/online/supply-chain-digitization/sc-digitization-week10-session3-notes' },
											{ label: 'Session 4', link: 'learnings/online/supply-chain-digitization/sc-digitization-week10-session4-notes' },
											{ label: 'Session 5', link: 'learnings/online/supply-chain-digitization/sc-digitization-week10-session5-notes' },
										],
									},
									{
										label: 'Week 11', collapsed: true, translations: { de: 'Woche 11' },
										items: [
											{ label: 'Session 1', link: 'learnings/online/supply-chain-digitization/sc-digitization-week11-session1-notes' },
											{ label: 'Session 2', link: 'learnings/online/supply-chain-digitization/sc-digitization-week11-session2-notes' },
											{ label: 'Session 3', link: 'learnings/online/supply-chain-digitization/sc-digitization-week11-session3-notes' },
											{ label: 'Session 4', link: 'learnings/online/supply-chain-digitization/sc-digitization-week11-session4-notes' },
											{ label: 'Session 5', link: 'learnings/online/supply-chain-digitization/sc-digitization-week11-session5-notes' },
										],
									},
									{
										label: 'Week 12', collapsed: true, translations: { de: 'Woche 12' },
										items: [
											{ label: 'Session 1', link: 'learnings/online/supply-chain-digitization/sc-digitization-week12-session1-notes' },
											{ label: 'Session 2', link: 'learnings/online/supply-chain-digitization/sc-digitization-week12-session2-notes' },
											{ label: 'Session 3', link: 'learnings/online/supply-chain-digitization/sc-digitization-week12-session3-notes' },
											{ label: 'Session 4', link: 'learnings/online/supply-chain-digitization/sc-digitization-week12-session4-notes' },
											{ label: 'Session 5', link: 'learnings/online/supply-chain-digitization/sc-digitization-week12-session5-notes' },
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