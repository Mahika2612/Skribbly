import express from 'express';
//const express= require('express');
import notesRoutes from './routes/notesRoutes.js';
import connectDB from './config/db.js';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import rateLimiter from './middleware/rateLimiter.js';

console.log(process.env.MONGO_URI);
const app=express()
const PORT=process.env.PORT || 3000;
app.get('/', (req, res) => {
  res.send('API is working');
});

app.use(express.json());// Middleware to parse JSON bodies
// app.use(rateLimiter); 

app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000','https://skribbly-olive.vercel.app'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

app.use("/api/notes",notesRoutes);

connectDB().then(() => {
    app.listen(PORT, () => {
  console.log('Server is running on port', PORT);
});

});

