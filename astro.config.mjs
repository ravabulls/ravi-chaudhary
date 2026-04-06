import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
	integrations: [
		starlight({
			title: 'My Professional Journey',
			customCss: [
				'./src/styles/custom.css',
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