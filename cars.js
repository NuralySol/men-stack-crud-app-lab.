import express from 'express';
import Car from './models/cars.js';

const router = express.Router();

// Displays a list of all cars
router.get('/', async (req, res) => {
    try {
        const cars = await Car.find();
        res.render('cars/index', { cars }); // Assuming you're using EJS as the template engine
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Shows a form to create a new car
router.get('/new', (req, res) => {
    res.render('cars/new'); // Render form to create a new car
});

// Creates a new car
router.post('/', async (req, res) => {
    try {
        const newCar = new Car(req.body);
        await newCar.save();
        res.redirect('/cars');
    } catch (err) {
        res.status(400).send(err.message);
    }
});

// Displays a specific car by its ID
router.get('/:id', async (req, res) => {
    try {
        const car = await Car.findById(req.params.id);
        if (!car) {
            res.status(404).send('Car not found');
        } else {
            res.render('cars/show', { car });
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Shows a form to edit an existing car
router.get('/:id/edit', async (req, res) => {
    try {
        const car = await Car.findById(req.params.id);
        if (!car) {
            res.status(404).send('Car not found');
        } else {
            res.render('cars/edit', { car });
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Updates a specific car by its ID
router.put('/:id', async (req, res) => {
    try {
        const updatedCar = await Car.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedCar) {
            res.status(404).send('Car not found');
        } else {
            res.redirect(`/cars/${updatedCar._id}`);
        }
    } catch (err) {
        res.status(400).send(err.message);
    }
});

// Deletes a specific car by its ID
router.delete('/:id', async (req, res) => {
    try {
        const car = await Car.findByIdAndDelete(req.params.id);
        if (!car) {
            res.status(404).send('Car not found');
        } else {
            res.redirect('/cars');
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
});

export default router;