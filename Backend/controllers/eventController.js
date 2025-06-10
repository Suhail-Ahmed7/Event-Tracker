const Event = require('../models/eventSchema')

const createEvent = async (req, res) => {
    try {
        const { title, description, date, location } = req.body;

        const event = await Event.create({
            title,
            description,
            date,
            location
        });

        res.status(201).json({ message: "Event created successfully", event });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
