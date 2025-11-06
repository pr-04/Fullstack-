# react-ci-cd-app

Real React app scaffold with GitHub Actions CI that builds, tests, and deploys to GitHub Pages.

## How to use locally
1. Install dependencies:
```bash
npm install
```

2. Run locally:
```bash
npm start
```

3. Build:
```bash
npm run build
```

## GitHub Actions
The workflow at `.github/workflows/main.yml` runs on every push to `main`, executes tests, builds, and deploys to GitHub Pages automatically using `peaceiris/actions-gh-pages`.
