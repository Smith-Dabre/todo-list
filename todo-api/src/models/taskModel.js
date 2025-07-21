const mongoose = require ('mongoose');

const taskSchema = new mangoose.Schema({
    title: { type: String, required: true },
});

module.exports = mongoose.model('Task',taskSchema);