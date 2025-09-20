# EV Analytics Dashboard

A lightweight, responsive Electric Vehicle analytics dashboard built with React, Vite, TailwindCSS, PapaParse, and Recharts.

## Features

- **Interactive Dashboard**: Clean navigation between Overview, Charts, and Data Table sections
- **Beautiful Visualizations**: Pie charts, bar charts, and key statistics
- **Data Exploration**: Searchable and paginated data table with filtering
- **Responsive Design**: Built with TailwindCSS for all screen sizes
- **Electric Theme**: Modern dark theme with electric blue/green accents

## Setup Instructions

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Clone/Download the project**
   ```bash
   git clone <your-repo-url>
   cd ev-analytics-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:8080`

4. **Build for production**
   ```bash
   npm run build
   ```

5. **Preview production build**
   ```bash
   npm run preview
   ```

## Data Source

The dashboard analyzes Electric Vehicle population data from Washington State Department of Licensing. The CSV file is automatically loaded from the public folder using PapaParse.

## Technologies Used

- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **TypeScript** - Type-safe JavaScript
- **TailwindCSS** - Utility-first CSS framework
- **PapaParse** - CSV parsing library
- **Recharts** - React charting library
- **React Router** - Client-side routing

## Dashboard Sections

### Overview
- Total vehicle count
- BEV vs PHEV distribution
- Most popular make and model year
- Key insights and dataset information

### Charts
- Vehicle type distribution (pie chart)
- Top 5 vehicle makes (bar chart)
- Model year distribution (bar chart)

### Data Table
- Searchable table with all vehicle data
- Filter by model year
- Pagination for large datasets
- Responsive design

## Deployment

The built application is a static site that can be deployed to any static hosting service like:
- Netlify
- Vercel
- GitHub Pages
- AWS S3 + CloudFront

Simply run `npm run build` and deploy the `dist` folder.