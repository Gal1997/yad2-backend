// server.js
import express from 'express';      // If your package.json has "type": "module"
// OR const express = require('express');  // If you’re using CommonJS (no "type":"module")
import cors from 'cors';
import { petRoutes } from './api/pet/pet.routes.js'

const corsOptions = {
    origin: [
        'http://127.0.0.1:4200',
        'http://localhost:4200'
    ],
    credentials: true
};
const app = express();
app.use(express.json())
const port = 3000;
app.use(cors(corsOptions));
app.use('/api/pet', petRoutes)

// ----------------------------------------------------------------------


// Root route
// app.get('/', (req, res) => {
//     res.send('<h1>Hello World!</h1>');
// });

// Another simple route
// app.get('/bobo', (req, res) => {
//     res.send('<h1>Hello Bobo!</h1>');
// });

app.get('/ping', (req, res) => {
    res.json({ justForTesting: "this is the value! and it changessss" });
});


// Start the server
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
