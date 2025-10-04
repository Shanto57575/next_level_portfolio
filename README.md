# Portfolio Website - Frontend

A modern, responsive portfolio website built with Next.js, TypeScript, and Tailwind CSS. Features dynamic blog management, project showcases, and an admin dashboard for content management.

## 🚀 Live Demo

**Frontend:** [https://your-portfolio-frontend.vercel.app](https://your-portfolio-frontend.vercel.app)  
**Backend API:** [https://your-portfolio-backend.vercel.app](https://your-portfolio-backend.vercel.app)

## ✨ Features

### Public Features
- 📝 **Blog Section** - View all published blogs with ISR for dynamic content updates
- 👨‍💻 **About Me** - Personal information, work experience, and skills showcase
- 🚀 **Projects Showcase** - Display of personal projects with live demos and details
- 📱 **Responsive Design** - Fully responsive UI across all devices
- ⚡ **Optimized Performance** - ISR and SSG for fast page loads

### Admin Features (Owner Only)
- 🔐 **Secure Authentication** - JWT-based authentication system
- 📊 **Dashboard** - Centralized content management interface
- ✍️ **Blog Management** - Create, read, update, and delete blog posts
- 🎨 **Project Management** - Add, update, and remove projects
- 🖼️ **Image Upload** - Upload and manage project/blog images

## 🛠️ Tech Stack

- **Framework:** Next.js 15+ (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **State Management:** React Hooks
- **Form Handling:** React Hook Form
- **Notifications:** react-hot-toast
- **HTTP Client:** Axios
- **Deployment:** Vercel

## 🚦 Getting Started

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Shanto57575/next_level_portfolio.git
   cd portfolio-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   SERVER_URL=""
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔑 Features Implementation

### ISR (Incremental Static Regeneration)
- **All Blogs Page:** Revalidates after adding new blog to fetch new content
- **Individual Blog Pages:** Dynamic generation with on-demand revalidation
- **Projects Page:** Revalidates after adding new project to fetch new content

### SSG (Static Site Generation)
- **About Page:** Pre-rendered at build time for optimal performance

## 🚀 Build & Deployment

### Build for production
```bash
npm run build
npm start
```

### Deploy to Vercel
```bash
vercel --prod
```

Or connect your GitHub repository to Vercel for automatic deployments.

## 👨‍💻 Author

**Your Name**
- GitHub: [Shanto57575](https://github.com/Shanto57575)
- Email: shanto57575@gmail.com
