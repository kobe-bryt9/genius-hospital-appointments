const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Sample route for creating an appointment
app.post('/appointments', (req, res) => {
    const { patientName, doctorName, appointmentDate } = req.body;
    // Logic for creating an appointment goes here
    res.status(201).send({ message: 'Appointment created successfully', data: { patientName, doctorName, appointmentDate } });
});

// Sample route for getting appointments
app.get('/appointments', (req, res) => {
    // Logic for retrieving appointments goes here
    res.send({ message: 'List of appointments' });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
