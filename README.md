# HashGen

HashGen is a simple React + Vite application for generating hashes of strings using different algorithms and exporting them in multiple programming languages. The app is designed to be deployed as a static site on GitHub Pages.

## Supported Hash Algorithms
- MurmurHash3
- CRC32
- Jenkins
- FNV-1a
- xxHash32
- CityHash32
- DJB2

## Supported Output Formats
- C
- C++
- Python
- Java
- C#
- Go
- Rust

## Scripts

- `npm run dev` – start the development server
- `npm run build` – build the production bundle
- `npm run deploy` – publish the `dist` folder to the `gh-pages` branch

## Tech Stack

- React + Vite + TypeScript
- Tailwind CSS
- Minimal shadcn-style UI components

## Deploying to GitHub Pages

Update `base` in `vite.config.ts` if your repository name differs, then run:

```bash
npm run build
npm run deploy
```
