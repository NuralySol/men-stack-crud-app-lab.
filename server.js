import express from 'express';
import mongoose from 'mongoose';
import methodOverride from 'method-override';
import path from 'path';
import { fileURLToPath } from 'url';
import carsRouter from './models/cars.js'; // Import your cars routes

// Initialize Express application
const app = express();

// Middleware setup
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// Set EJS as the templating engine
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Use the cars router for all routes starting with /cars
app.use('/cars', carsRouter);

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/carDb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('Connection error', err));

// Start the server on port 3000
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});