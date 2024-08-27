import express from "express";
const  router = express.Router();
import Entry from "../models/entry.model.js";
//const Entry = require('./entryModel'); // Adjust the path as needed

router.get("/", async function (req, res) {
    try {
        // Fetch data from MongoDB
        const entries = await Entry.find(); // This finds all documents in the `entries` collection

        // Send the data as response
        res.status(200).send(entries);
    } catch (err) {
        // Handle errors
        res.status(500).send({
            errorType: "SERVER_ERROR",
            message: err.message,
        });
    }
});


router.post("/", async function (req, res) {
    // Read data from client
    const { title, value, type, cattitle } = req.body;

    const errors1 = [];
    if (title.length < 1) {
        errors1.push("Title is too short");
    }
    if (cattitle.length < 1) {
        errors1.push("Category title is too short");
    }
    if (value < 0) {
        errors1.push("Value must be positive");
    }
    if (!["income", "expense"].includes(type)) {
        errors1.push("Invalid type - please use expense or income");
    }

    if (errors1.length > 0) {
        return res.status(400).send({
            errorType: "VALIDATION_ERROR",
            errors1,
        });
    }

    try {
        // Create a new entry
        const newEntry = new Entry({ title, value, type, cattitle });
        // Save it to the database
        await newEntry.save();
        res.status(201).send(newEntry);
    } catch (err) {
        res.status(500).send({
            errorType: "SERVER_ERROR",
            message: err.message,
        });
    }
});

export default router; 
