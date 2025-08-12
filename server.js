import express from 'express';
import cors from 'cors';
import path from "path";
import { fileURLToPath } from "url";
import cookieParser from 'cookie-parser';

import { userRoutes } from './api/user/user.routes.js';
import { authRoutes } from './api/auth/auth.routes.js';
import { houseRoutes } from './api/house/house.routes.js';
import { vehicleRoutes } from './api/vehicle/vehicle.routes.js';
import { yad2Routes } from './api/yad2/yad2.routes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



const app = express();

const corsOptions = {
    origin: ['http://127.0.0.1:4200', 'http://localhost:4200'],
    credentials: true
};

app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));

// API routes
app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/house', houseRoutes);
app.use('/api/vehicle', vehicleRoutes);
app.use('/api/yad2', yad2Routes);

app.get('/ping', (req, res) => {
    res.json({ justForTesting: "this is the value! and it changessss" });
});

app.get("/geocode", async (req, res) => {
    const address = req.query.address;
    if (!address) return res.status(400).json({ error: "Missing address" });

    try {
        const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`;
        const response = await fetch(url, { headers: { "User-Agent": "MyApp/1.0" } });
        const data = await response.json();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.use(express.static(path.join(__dirname, "public", "gal-yad2", "browser")));

app.get(/.*/, (req, res) => {
    res.sendFile(path.join(__dirname, "public", "gal-yad2", "browser", "index.html"));
});




// Start server 
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
