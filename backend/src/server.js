// your-main-server-file.js
import express from 'express';
import notesRoutes from './routes/notesRoutes.js';
import connectDB from './config/db.js';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

// --- Middleware ---
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000', 'https://skribbly-olive.vercel.app'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));
app.use(express.json());

// --- Routes ---
app.get('/', (req, res) => {
  res.send('API is working');
});

app.use("/api/notes", notesRoutes);

// --- Start Server Function ---
const startServer = async () => {
  try {

    console.log('Attempting to connect with MONGO_URI:', process.env.MONGO_URI ? 'Loaded' : 'NOT FOUND');
    

    await connectDB();
    console.log('MongoDB connected successfully.');
    

    app.listen(PORT, () => {
      console.log('Server is running on port', PORT);
    });
    
  } catch (error) {

    console.error('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
    console.error('!!! FAILED TO START SERVER !!!');
    console.error('Error:', error.message);
    console.error('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
    process.exit(1); // Exit with a failure code
  }
};

// --- Run the server ---
startServer();