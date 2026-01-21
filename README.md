
# Artiselite WMS (Warehouse Management System)

A full-stack, enterprise-grade Warehouse Management System designed to modernize inventory tracking and operations. This application features role-based security, real-time analytics, and automated workflows for inbound and outbound stock.

![Dashboard Preview](https://via.placeholder.com/800x400.png?text=ArtisElite+WMS+Dashboard)
*(Note: Replace this link with a screenshot of your actual dashboard later)*

## 🚀 Features

### Core Modules
- **🔐 Secure Authentication:** JWT-based login with hashed passwords (Bcrypt).
- **📦 Inventory Management:** Full CRUD capabilities with real-time stock tracking.
- **🚚 Stock Operations:** Dedicated workflows for **Inbound** (receiving) and **Outbound** (shipping) with validation.
- **👥 Role-Based Access Control (RBAC):**
  - **Admin:** Full system access (Manage Users, Delete Products, View Logs).
  - **Operator:** Restricted access (View Inventory, Process Orders only).

### 🌟 Advanced Features (Internship Requirements)
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
* **Frontend Dashboard:** [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000) (or port 5173 depending on your vite config)
* **Backend API:** [http://localhost:5000](https://www.google.com/search?q=http://localhost:5000)



## 🔐 Default Admin Credentials

When the system starts for the first time, it automatically creates a Super Admin account:

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

*Developed by Ali Sena Danishwer for the Artiselite Internship Assessment.*

```


