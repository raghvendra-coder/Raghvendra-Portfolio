# Raghvendra Yadav — Full-Stack Developer Portfolio

A modern, responsive personal portfolio built with Next.js and designed to showcase my projects, skills, certifications, and development experience.

## 🚀 Features

- Modern responsive portfolio design
- GSAP animations and scroll-based interactions
- Projects showcase with project data
- Skills and certifications sections
- Working contact form
- Contact messages stored in MongoDB
- Email notifications using Resend
- Password-protected admin dashboard
- GitHub projects integration
- Command palette
- Resume download
- Responsive UI for desktop and mobile

## 🛠️ Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- GSAP
- MongoDB
- Resend
- Font Awesome
- Git & GitHub

## 📁 Project Structure

```text
Raghvendra-Portfolio/
│
├── app/
│   ├── admin/
│   │   └── page.tsx
│   │
│   ├── api/
│   │   ├── admin/
│   │   │   ├── login/
│   │   │   └── messages/
│   │   ├── contact/
│   │   └── projects/
│   │
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
│
├── data/
│   └── projects.json
│
├── lib/
│   └── mongodb.ts
│
├── public/
│   ├── assets/
│   │   └── images/
│   └── Resume.pdf
│
├── package.json
├── package-lock.json
├── next.config.ts
└── tsconfig.json
```

## ⚙️ Environment Variables

Create a `.env.local` file in the root directory:

```env
MONGODB_URI=your_mongodb_connection_string
RESEND_API_KEY=your_resend_api_key
EMAIL_TO=your_email
EMAIL_FROM=your_sender_email
ADMIN_PASSWORD=your_admin_password
```

> Never commit `.env.local` or expose API keys, database credentials, or passwords publicly.

## 💻 Run Locally

Clone the repository:

```bash
git clone https://github.com/raghvendra-coder/Raghvendra-Portfolio.git
```

Go to the project directory:

```bash
cd Raghvendra-Portfolio
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the application:

```text
http://localhost:3000
```

## 🔨 Production Build

Create a production build:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

## 🔐 Admin Dashboard

The portfolio includes a password-protected admin dashboard for viewing contact form submissions.

```text
http://localhost:3000/admin
```

The admin password is configured through the `ADMIN_PASSWORD` environment variable.

## 📬 Contact System

The contact form:

1. Validates user input
2. Saves messages to MongoDB
3. Sends an email notification through Resend
4. Displays submitted messages in the admin dashboard

## 📌 Projects

The portfolio showcases projects including:

- NetSage AI
- Swasth-AI
- CareerBridge
- E-Commerce Project
- Other development projects

Project information is managed through:

```text
data/projects.json
```

## 👨‍💻 About

I'm a software developer interested in full-stack development, JavaScript, React, Node.js, Python, AI/ML, and problem solving.

## 🔗 Connect With Me

- GitHub: https://github.com/raghvendra-coder
- LinkedIn: https://linkedin.com/in/raghvendra-yadav-tech

## 🚀 Deployment

This project can be deployed using platforms such as Vercel.

Before deployment, configure all required environment variables in the deployment platform:

- `MONGODB_URI`
- `RESEND_API_KEY`
- `EMAIL_TO`
- `EMAIL_FROM`
- `ADMIN_PASSWORD`

Do not upload `.env.local` to GitHub.

## 📄 License

This project is for personal portfolio and demonstration purposes.