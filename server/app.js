// Required modules
const path = require('path'); // Core module for working with file paths
const express = require('express'); // Express.js web application framework
const morgan = require('morgan'); // HTTP request logger middleware
const rateLimit = require('express-rate-limit'); // Middleware for rate limiting requests
const helmet = require('helmet'); // Middleware for setting HTTP security headers
const mongoSanitize = require('express-mongo-sanitize'); // Middleware for sanitizing MongoDB queries
const xss = require('xss-clean'); // Middleware for preventing XSS attacks
const cookieParser = require('cookie-parser'); // Middleware for parsing cookies
const cors = require('cors'); // Middleware for enabling Cross-Origin Resource Sharing (CORS)
const AppError = require('./utils/appError'); // Custom error handling utility
const globalErrorHandler = require('./controllers/errorController'); // Global error handling controller
const abuseProfileRoutes = require('./routes/abuseProfile'); // Routes for abuseProfiles
const reportRoutes = require('./routes/report'); // Routes for reports
const userRoutes = require('./routes/user'); // Routes for user-related operations

// Create an Express application
const app = express();

// Enable Cross-Origin Resource Sharing (CORS)
app.use(cors());

// Set the template engine to EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

/* === GLOBAL MIDDLEWARE === */

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Set security HTTP headers using Helmet middleware
app.use(helmet({ contentSecurityPolicy: false }));

// Development logging using Morgan only in 'development' environment
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Limit requests from the same API using express-rate-limit
const limiter = rateLimit({
  max: 999,
  windowMs: 60 * 60 * 1000, // 1 hour window
  message: 'Too many requests from this IP, please try again in an hour!',
});
app.use('/api', limiter);

// Parse JSON and URL-encoded data into req.body
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Parse cookies using cookie-parser middleware
app.use(cookieParser());

// Data sanitization against NoSQL query injection using express-mongo-sanitize
app.use(mongoSanitize());

// Data sanitization against XSS (Cross-site Scripting) attacks using xss-clean
// Commented out since it removes HTML tags
/* app.use(xss()); */

// Add the request timestamp to the req object
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

/* === ROUTES === */

// Default route
app.get('/', async (req, res, next) => {
  res.send('Hi!');
});

// API routes
app.use('/api/abuseprofiles', abuseProfileRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/users', userRoutes);

// If no routes are matched, send a 404 error
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Global error handler
app.use(globalErrorHandler);

// Export the app to be used by the server
module.exports = app;
