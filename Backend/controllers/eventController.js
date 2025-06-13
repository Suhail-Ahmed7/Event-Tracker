const Event = require('../models/eventSchema');

const createEvent = async (req, res) => {
    try {
        const { title, description, date, location } = req.body;
        const userId = req.user._id;

        const event = await Event.create({
            title,
            description,
            date,
            location,
            userId
        });

        res.status(201).json({ message: "Event created successfully", event });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getAllEvents = async (req, res) => {
    try {
        const events = await Event.find({ userId: req.user._id });
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getEventById = async (req, res) => {
    try {
        const { id } = req.params;
        const event = await Event.findOne({ _id: id, userId: req.user._id });

        if (!event) {
            return res.status(404).json({ message: 'Event not found or not authorized' });
        }

        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateEventById = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, date, location } = req.body;

        const event = await Event.findOneAndUpdate(
            { _id: id, userId: req.user._id },
            { title, description, date, location },
            { new: true }
        );

        if (!event) {
            return res.status(404).json({ message: 'Event not found or not authorized' });
        }

        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteEventById = async (req, res) => {
    try {
        const { id } = req.params;
        const event = await Event.findOneAndDelete({ _id: id, userId: req.user._id });

        if (!event) {
            return res.status(404).json({ message: 'Event not found or not authorized' });
        }

        res.status(200).json({ message: 'Event deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createEvent,
    getAllEvents,
    getEventById,
    updateEventById,
    deleteEventById
};