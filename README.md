# Ravi Chaudhary — Personal Portfolio Site

A professional portfolio and learning journal built with [Astro](https://astro.build) and [Starlight](https://starlight.astro.build). Documents my professional background, MBA journey, and lifelong learning.

## What This Site Contains

### Resume
A structured, interactive resume built with Starlight components:
- **Overview** — Professional summary, skills (tabbed by category with colour-coded badges), and key achievements (card grid)
- **Experience** — Full career timeline (2015–present) using the Steps component, with quantified bullet points for each of 8 roles
- **Education & Certifications** — Three academic degrees and 20+ professional certifications, organised by category

### Learnings
A growing knowledge base of notes from formal and informal learning:
- **MBA Subjects** — Notes from the Technology Management MBA at TUHH / NIT Hamburg (modules include Generative AI for Managers, Digital Transformation, Supply Chain Digitization, Sustainable Innovation, and more)
- **Non-Fiction Books** — Key takeaways from books on leadership, strategy, and decision-making
- **Online Courses** — Structured notes from certifications in data science, AI, finance, and project management

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Astro](https://astro.build) v6 |
| Docs theme | [@astrojs/starlight](https://starlight.astro.build) v0.38 |
| Content format | Markdown (`.md`) for plain notes · MDX (`.mdx`) for pages using Starlight components |
| Styling | Starlight default + custom CSS (`src/styles/custom.css`) |
| Image processing | [sharp](https://sharp.pixelplumbing.com) |

## Project Structure

```
ravi-chaudhary/
├── public/
│   ├── favicon.svg
│   └── ravi_passport.jpg        # Profile photo (referenced by resume pages)
├── src/
│   ├── assets/                  # Astro-optimised static assets
│   ├── content/
│   │   └── docs/
│   │       ├── index.mdx        # Home landing page (splash template)
│   │       ├── resume/
│   │       │   ├── index.mdx    # Resume overview — summary, skills, achievements
│   │       │   ├── experience.mdx  # Career timeline (Steps component)
│   │       │   └── education.mdx   # Degrees + certifications
│   │       └── learnings/
│   │           ├── mba/         # MBA subject notes (.md)
│   │           ├── books/       # Book notes (.md)
│   │           └── online/      # Online course notes (.md)
│   ├── styles/
│   │   └── custom.css           # Brand colour overrides and component tweaks
│   └── content.config.ts        # Astro content collection config
├── astro.config.mjs             # Starlight theme config + sidebar structure
├── package.json
└── tsconfig.json
```

## Why `.md` vs `.mdx`

Starlight supports both formats:
- **`.md`** — standard Markdown, processed by remark. Supports Starlight asides (`:::note`, `:::tip`, `:::caution`). Used for all learnings/notes content.
- **`.mdx`** — MDX (Markdown + JSX). Required for Starlight UI components like `<Steps>`, `<Badge>`, `<Card>`, `<CardGrid>`, and `<Tabs>`. Used for all resume and home pages.

## Local Development

```bash
# Install dependencies
npm install

# Start the dev server (http://localhost:4321)
npm run dev

# Build for production
npm run build

# Preview the production build
npm run preview
```

## Sidebar Navigation

Configured in `astro.config.mjs`. The Resume section is auto-generated from the `resume/` directory; order and labels are controlled via frontmatter (`sidebar.order` and `sidebar.label`).
