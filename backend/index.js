const express = require('express');
const cors = require('cors');
const sequelize = require('./config/db');
const bcrypt = require('bcryptjs'); // Import bcrypt for password hashing

// Import Routes
const productRoutes = require('./routes/productRoutes');
const inboundRoutes = require('./routes/inboundRoutes');
const outboundRoutes = require('./routes/outboundRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const authRoutes = require('./routes/authRoutes');
const logRoutes = require('./routes/logRoutes');

// Import models
const User = require('./models/User');
const Product = require('./models/Product');
const Batch = require('./models/Batch');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Register Routes
app.use('/api/products', productRoutes);
app.use('/api/inbound', inboundRoutes);
app.use('/api/outbound', outboundRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/logs', logRoutes);

app.get('/', (req, res) => {
  res.send('ArtisElite WMS Backend is Running');
});

// Retry logic to wait for MySQL
const connectWithRetry = async () => {
  const maxRetries = 10;
  let retries = 0;

  while (retries < maxRetries) {
    try {
      await sequelize.authenticate();
      console.log('Database connected successfully.');
      
      // Sync database structure
      await sequelize.sync({ alter: true });
      console.log('Database synced.');

      // --- NEW: AUTO-CREATE ADMIN ---
      // --- NEW: AUTO-CREATE ADMIN ---
      try {
        const adminExists = await User.findOne({ where: { role: 'Admin' } });
        if (!adminExists) {
          console.log('No Admin found. Creating default Admin...');
          
          // 1. Hash the password you want (Test123)
          const hashedPassword = await bcrypt.hash('Test123', 10); 

          await User.create({
            username: 'admin',      
            email: 'admin@system.com',
            password: hashedPassword, // 2. SAVE THE HASH, not the text
            role: 'Admin'           
          });
          console.log('✅ Default Admin Created: admin / Test123');
        }
      } catch (adminError) {
        console.error('Error checking/creating admin:', adminError);
      }
      // -----------------------------
      // -----------------------------
      
      return; // Connection successful, exit loop
    } catch (error) {
      retries++;
      console.log(`Database connection failed (Attempt ${retries}/${maxRetries}). Retrying in 5 seconds...`);
      console.error(error.message);
      // Wait 5 seconds before retrying
      await new Promise(res => setTimeout(res, 5000));
    }
  }
  throw new Error('Unable to connect to database after multiple attempts');
};

const startServer = async () => {
  try {
    await connectWithRetry();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Server startup failed:', error);
    process.exit(1);
  }
};

startServer();