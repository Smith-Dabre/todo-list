const express = require('express');
const mangoose = require('mangoose');
const cors = require('cors');
const taskRoutes = require('./routes/taskRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/tasks', taskRoutes)

// MongoDB Connection
mongoose.connection(process.env.MONGO_URI)
.then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
.catch((err) => console.error(err));