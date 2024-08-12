import express from 'express';
import mongoose from 'mongoose';
import methodOverride from 'method-override';
import path from 'path';
import { fileURLToPath } from 'url';
import carsRouter from './carsRouter.js'; 

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Routes
app.get('/', (req, res) => {
    res.redirect('/cars');
});

app.use('/cars', carsRouter);

mongoose.connect('mongodb://localhost:27017/carDb')
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Connection error', err));

const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});