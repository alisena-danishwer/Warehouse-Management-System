


# Artiselite WMS (Warehouse Management System)

A full-stack, enterprise-grade Warehouse Management System designed to modernize inventory tracking and operations. This application features role-based security, real-time analytics, and is fully responsive for mobile and tablet devices.

![Dashboard Preview](![alt text](image.png))
*(Replace this link with a screenshot of your actual dashboard)*

## 🚀 Live Demo
**[Insert your AWS EC2 IP Address Here]**

## 🌟 Features

### Core Modules
- **🔐 Secure Authentication:** JWT-based login with hashed passwords (Bcrypt).
- **📦 Inventory Management:** Full CRUD capabilities with real-time stock tracking.
- **🚚 Stock Operations:** Dedicated workflows for **Inbound** (receiving) and **Outbound** (shipping) with validation.
- **👥 Role-Based Access Control (RBAC):**
  - **Admin:** Full system access (Manage Users, Delete Products, View Logs).
  - **Operator:** Restricted access (View Inventory, Process Orders only).

### 📱 Modern & Responsive UI
- **Responsive Sidebar:** Collapsible navigation menu optimized for mobile and tablets.
- **Mobile-First Tables:** Horizontal scrolling for complex data tables on small screens.
- **Enterprise Dashboard:** Gradient visuals, Chart.js analytics, and modern iconography.

### ⚙️ Advanced Capabilities
1.  **📊 Inventory Valuation:** Real-time calculation of total stock value based on dynamic pricing.
2.  **📜 System Audit Logs:** Automatically records critical actions (e.g., "Admin deleted iPhone 13") for security and accountability.
3.  **🏷️ Barcode Integration:** Auto-generates unique, scannable barcodes for every product SKU.

## 🛠️ Tech Stack

### Frontend
- **React.js (Vite):** Blazing fast UI development.
- **Tailwind CSS:** Professional, responsive styling.
- **Lucide React:** Modern, clean iconography.
- **Recharts:** Data visualization for the dashboard.

### Backend
- **Node.js & Express:** Robust REST API architecture.
- **Sequelize ORM:** Secure database interactions.
- **MySQL / SQLite:** Relational database management.

### DevOps
- **Docker & Docker Compose:** Containerized environment for consistent deployment.
- **AWS EC2:** Cloud-ready for production deployment.

## ⚙️ Installation & Setup

**Prerequisites:** Ensure you have [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed.

1. **Clone the Repository**
   ```bash
   git clone <your-github-repo-url>
   cd artiselite-wms

```

2. **Start the Application**
Run this single command to build the Frontend, Backend, and Database:
```bash
docker compose up -d --build

```


3. **Access the System**
* **Frontend Dashboard:** [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000)
* **Backend API:** [http://localhost:5000](https://www.google.com/search?q=http://localhost:5000)



## 🔐 Default Admin Credentials

When the system starts for the first time, it automatically creates a Super Admin account if one does not exist:

* **Username:** `admin`
* **Password:** `Test123`

*Note: New users registered via the signup page will default to the 'Operator' role.*

## 📂 Project Structure

```
artiselite-wms/
├── backend/            # Express Server & API Logic
│   ├── controllers/    # Business Logic (Products, Auth, Logs)
│   ├── models/         # Database Schema (Sequelize)
│   ├── routes/         # API Endpoints
│   └── index.js        # Server Entry Point
├── frontend/           # React Client Application
│   ├── src/
│   │   ├── components/ # UI Components (Sidebar, Forms, Charts)
│   │   └── pages/      # Views
│   └── package.json    # Frontend Dependencies
└── docker-compose.yml  # Container Orchestration

```

---

*Developed by Ali Sena Danishwer Software Engineer*

```
