# Abhigyan Saikia - Cinematic Portfolio

This is a premium, cinematic personal portfolio built with React, Vite, TailwindCSS, and Framer Motion. 

## 🔒 Security & Deployment Checklist

This repository has been structured securely so you can safely upload it to a public GitHub repository and deploy it to Vercel.

### Security Features Implemented:
1. **`.gitignore` Enforced:** All sensitive files (`.env`, `node_modules`, build outputs) are hidden from Git. Even if you accidentally create a `.env` file later with real API keys, it will never be uploaded to GitHub.
2. **No Hardcoded Secrets:** There are no hardcoded API keys in the source code.
3. **Security Headers:** The `vercel.json` file is configured with strict security headers (`X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`) to protect the live site against clickjacking and XSS attacks.

## 🚀 How to Upload to GitHub
1. Open your terminal in this folder (`my-portfolio`).
2. Run the following commands:
   ```bash
   git init
   git add .
   git commit -m "Initial cinematic portfolio commit"
   ```
3. Go to GitHub, create a new repository (can be Public).
4. Copy the "push an existing repository from the command line" code block and run it in your terminal. Example:
   ```bash
   git branch -M main
   git remote add origin https://github.com/abhigyansaikiaa/your-repo-name.git
   git push -u origin main
   ```

## 🌍 Deployment Options

### Option A: GitHub Pages (Automated via GitHub Actions)
The repository is optimized for GitHub Pages hosting with relative asset paths, Jekyll bypass (`.nojekyll`), and automated CI/CD:
1. Push your code to GitHub:
   ```bash
   git add .
   git commit -m "Optimize for GitHub Pages hosting"
   git push origin main
   ```
2. Navigate to your GitHub repository **Settings** &rarr; **Pages**.
3. Under **Build and deployment** &rarr; **Source**, select **GitHub Actions**.
4. GitHub Actions will automatically run the test suite, build the bundle, and publish the site to:
   `https://<username>.github.io/<repository-name>/`

### Option B: Deploy on Vercel
1. Go to [Vercel.com](https://vercel.com) and log in with your GitHub account.
2. Click **"Add New Project"**.
3. Import your GitHub repository (`portfolio-2`).
4. Vercel will automatically detect that this is a **Vite** project.
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
5. Click **Deploy**. Vercel will handle the rest!

Your site will be live securely in seconds.

