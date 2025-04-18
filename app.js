// ==============================
// 📦 Imports
// ==============================
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');

const pool = require('./src/models/UserDB.js');
const loginRoutes = require('./src/routes/loginRoute.js');
const propertyRoutes = require('./src/routes/propertyRoutes.js');
const propertySearch = require('./src/routes/propertysearchwithoutpooling.js');
const dotenv = require('dotenv')
dotenv.config()

// ==============================
// 🚀 App Initialization
// ==============================
const allowedOrigin = 'https://easystay-sigma.vercel.app/';
const app = express();
// CORS Configuration
app.use(cors({
  origin: allowedOrigin,
  credentials: true
}));
const basePath = '/homeaway';

// ==============================
// 🛡️ Middleware
// ==============================


// Body Parsers
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Static Files
app.use('/uploads', express.static(path.join(__dirname, '/uploads/')));
app.use(express.static('public'));

// ==============================
// 📂 Routes
// ==============================
app.use(basePath, loginRoutes);
app.use(basePath, propertyRoutes);
app.use(basePath, propertySearch);

// Test Route
app.get('/', (req, res) => {
  res.json({ message: "EasyStay is running!" });
});

// ==============================
// 🛢️ DB Connection Check
// ==============================
pool.query('SELECT * FROM users', (err) => {
  if (err) throw err;
  console.log("✅ Connected to DB");
});

// ==============================
// 🟢 Start Server
// ==============================
app.listen(process.env.PORT, () => {
  console.log(`🚀 EasyStay Backend running on port ${process.env.PORT}`);
});
