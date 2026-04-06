import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
	integrations: [
		starlight({
			title: 'Ravi Chaudhary',
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
					autogenerate: { directory: 'resume' },
				},
				{
					label: 'Learnings',
					items: [
						{ label: 'MBA Subjects', autogenerate: { directory: 'learnings/mba' } },
						{ label: 'Non-Fiction Books', autogenerate: { directory: 'learnings/books' } },
						{ label: 'Online Courses', autogenerate: { directory: 'learnings/online' } },
					],
				},
			],
		}),
	],
});