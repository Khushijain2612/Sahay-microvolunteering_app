// MICROVOLUNTEERING API - COMPLETE BACKEND
// NO PASSPORT - NO EXTERNAL FILES

const express = require('express');
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

console.log('✅ Server starting...');

// =====================
// SIMPLE SESSION SYSTEM
// =====================
let sessions = {};
let nextSessionId = 1;

function createSession(user) {
    const sessionId = nextSessionId++;
    const userCopy = { ...user };
    delete userCopy.password;
    sessions[sessionId] = userCopy;
    return sessionId;
}

function getSession(sessionId) {
    return sessions[sessionId];
}

function destroySession(sessionId) {
    delete sessions[sessionId];
}

// =====================
// MOCK DATABASE
// =====================
let users = [
    {
        id: 1,
        name: 'Admin User',
        email: 'admin@example.com',
        password: '123456',
        role: 'admin',
        totalHours: 50,
        badge: 'silver'
    }
];

let opportunities = [
    {
        id: 1,
        title: 'Beach Cleanup',
        description: 'Help clean up the local beach',
        category: 'environment',
        date: '2024-02-15',
        duration: 3,
        location: 'Main Beach',
        maxVolunteers: 10,
        currentVolunteers: [],
        status: 'active'
    }
];

// =====================
// MIDDLEWARE
// =====================
function requireAuth(req, res, next) {
    const sessionId = req.headers.authorization;
    const user = getSession(sessionId);
    
    if (user) {
        req.user = user;
        req.sessionId = sessionId;
        next();
    } else {
        res.status(401).json({
            success: false,
            message: 'Authentication required'
        });
    }
}

// =====================
// AUTHENTICATION ROUTES
// =====================

// Register
app.post('/api/auth/register', (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = users.find(user => user.email === email);
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'User already exists'
            });
        }

        const newUser = {
            id: users.length + 1,
            name,
            email,
            password,
            role: 'volunteer',
            totalHours: 0,
            badge: 'bronze'
        };

        users.push(newUser);
        const sessionId = createSession(newUser);

        res.status(201).json({
            success: true,
            message: 'Registration successful!',
            user: getSession(sessionId),
            sessionId
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Registration failed'
        });
    }
});

// Login
app.post('/api/auth/login', (req, res) => {
    try {
        const { email, password } = req.body;

        const user = users.find(u => u.email === email && u.password === password);
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }

        const sessionId = createSession(user);

        res.json({
            success: true,
            message: 'Login successful!',
            user: getSession(sessionId),
            sessionId
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Login failed'
        });
    }
});

// Get current user
app.get('/api/auth/me', requireAuth, (req, res) => {
    res.json({
        success: true,
        user: req.user
    });
});

// =====================
// OPPORTUNITIES ROUTES
// =====================

// Get all opportunities
app.get('/api/opportunities', (req, res) => {
    try {
        const opportunitiesWithDetails = opportunities.map(opp => ({
            ...opp,
            availableSpots: opp.maxVolunteers - opp.currentVolunteers.length
        }));

        res.json({
            success: true,
            opportunities: opportunitiesWithDetails
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch opportunities'
        });
    }
});

// =====================
// HOME ROUTE
// =====================
app.get('/', (req, res) => {
    res.json({
        message: '🚀 Microvolunteering API is running!',
        endpoints: [
            'POST /api/auth/register',
            'POST /api/auth/login',
            'GET  /api/auth/me',
            'GET  /api/opportunities'
        ]
    });
});

// =====================
// START SERVER
// =====================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log('✅ Server running on port', PORT);
    console.log('📍 http://localhost:' + PORT);
});