# 🛍️ demo-store-frontend
This repository contains the frontend application for the Demo Store, built with React and Vite. It serves as the user interface for adding products to a shopping cart, and than sending it to the order service.

Url: https://lemon-plant-0e3b51d03.1.azurestaticapps.net

# ✨ Features
Category Browsing: Allows users to view all product categories.

API Integration: Communicates with the demo-store-product-service (.NET API) and demo-store-order-service (NestJS API) to fetch data and process orders.

Responsive Design: Optimized for various screen sizes.

Modern Tooling: Leverages Vite for fast development and optimized builds.

# 🚀 Getting Started (Local Development)
To get this application up and running on your local machine, follow these steps:

## Prerequisites
Node.js (v22.x or later): Download & Install Node.js

npm (comes with Node.js) or Yarn

Git: Download & Install Git

## Installation
Clone the repository:

git clone https://github.com/dannyshr/demo-store-frontend.git

cd demo-store-frontend

Install dependencies:

npm install
OR
yarn install

Configure Environment Variables for Local Development:
Create a .env.local file in the root of your project. 
This file will hold environment variables specific to your local setup.
Place the following entries in the file:

VITE_MAX_PRODUCT_QUANTITY=10

VITE_BACKEND_BASE_API_URL: https://demostore-apim.azure-api.net

VITE_APIM_SUBSCRIPTION_KEY: 4b5a45f0ed784cbda875def1d3284eb9

### Note: Variables prefixed with VITE_ are automatically exposed to your client-side code by Vite.

## Running Locally
To start the development server:

npm run dev
OR
yarn dev

The application will typically be available at http://localhost:3001.

# ☁️ Deployment (CI/CD)
This application is deployed to Azure Static Web Apps using a GitHub Actions pipeline for Continuous Integration and Continuous Deployment (CI/CD).

Azure Services Used
Azure Static Web Apps: Hosts the static frontend assets.

CI/CD Pipeline Overview: 
The deployment pipeline is defined in .github/workflows/azure-static-web-apps-lemon-plant-0e3b51d03.yml

Trigger: The pipeline automatically triggers on pushes to the main branch and on pull request events.

Build: Node.js dependencies are installed, and the Vite application is built (npm run build). The compiled static assets are placed in the dist folder.

### Environment Variables: Environment variables (prefixed with VITE_) required by the frontend are injected directly into the GitHub Actions workflow's env block at the job level.
This ensures they are available during the Vite build process and embedded into the final JavaScript bundle.

These are the environment variables defined by the GitHub Actions pipeline:

VITE_MAX_PRODUCT_QUANTITY=10

VITE_BACKEND_BASE_API_URL: https://demostore-apim.azure-api.net

VITE_APIM_SUBSCRIPTION_KEY: 4b5a45f0ed784cbda875def1d3284eb9

Deploy: The Azure/static-web-apps-deploy@v1 action uploads the contents of the dist folder to Azure Static Web Apps. Authentication is handled securely via OpenID Connect (OIDC).

### Environment Variables in Azure: Azure does NOT pass environment variables to the build process (done by GitHub) for static web applications.

# 📂 Project Structure
.

├── public/                # Static assets

├── src/                   # Source code

│   ├── assets/

│   ├── components/

│   ├── App.jsx

│   ├── main.jsx

│   └── ...

├── .github/

│   └── workflows/         # GitHub Actions workflow file

├── node_modules/

├── package.json

├── vite.config.js

├── .env.local             # Local environment variables (ignored by Git)

└── README.md

# 📄 License
Public