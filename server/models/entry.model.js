import mongoose, { Schema } from "mongoose";

// Define the schema for the entries collection
const entrySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 5,
        trim: true,
    },
    value: {
        type: Number,
        required: true,
        min: 0, // Ensures the value is positive
    },
    type: {
        type: String,
        enum: ['income', 'expense'],
        required: true,
    },
    cattitle: {
        type: String,
        required: true,
        minlength: 5,
        trim: true,
    },
});

// Create a model from the schema
const Entry = mongoose.model('Entry', entrySchema);

export default Entry;
