require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');
const muvyRoutes = require('./routes/muvyRoutes');

const app = express();
const port = 5000;

// Configure CORS middleware
const allowedOrigins = [
    'http://localhost:3000',
    'https://muvyz-frontend-hqnihf0rx-izerques-projects.vercel.app',
];

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: 'GET,POST,PUT,DELETE',
    credentials: true,
    allowedHeaders: 'Content-Type,Authorization',
}));

 
// Parse JSON bodies 
app.use(bodyParser.json());

// Database connection
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false,
        sslMode: 'prefer',
    },
});


pool.connect((err, client, release) => {
    if (err) {
        return console.error('Error acquiring client', err.stack);
    }
    console.log('Connected to PostgreSQL database');
    release();
});

// Use muvy routes
app.use('/muvies', muvyRoutes);

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});