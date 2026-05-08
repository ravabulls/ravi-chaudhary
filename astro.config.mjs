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
								autogenerate: { directory: 'learnings/online/Supply-Chain-Digitization' },
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