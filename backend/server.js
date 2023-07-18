const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const port = 5000 || process.env.PORT;
const connectDB = require('./config/db');
const reviewRoutes = require("./routes/reviewRoutes");
const authRoutes = require("./routes/userRoutes");
app.use(express.json());
app.use(cors());
connectDB();

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.send('Ecommerse Reviews and Rating System - Backend');
});

app.use("/api/reviews", reviewRoutes);
app.use("/api/user", authRoutes);

app.listen(port, () => {
    console.log(`Server listening at PORT ${port}`);
});