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

// ==============================
// 🚀 App Initialization
// ==============================
const app = express();
const basePath = '/homeaway';
const port = 3001;
const allowedOrigin = 'https://easystay-sigma.vercel.app';

// ==============================
// 🛡️ Middleware
// ==============================

// Session Configuration
app.use(session({
  secret: 'cmpe273_homeaway_mysql',
  resave: false,
  saveUninitialized: false,
  duration: 60 * 60 * 1000,
  activeDuration: 5 * 60 * 1000
}));

// CORS Configuration
app.use(cors({
  origin: allowedOrigin,
  credentials: true
}));

// Custom Access-Control Headers
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', allowedOrigin);
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Origin,Accept,X-Requested-With,Content-Type,Access-Control-Request-Method,Access-Control-Request-Headers');
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

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
app.listen(port, () => {
  console.log(`🚀 EasyStay Backend running on port ${port}`);
});
