const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const AuthRouter = require('./routes/authRouter');

const connectDB = require('./config/dbConnection');
dotenv.config();
connectDB();

const PORT = process.env.PORT || 8080;


app.use(cors());
app.use(express.json());
app.use('/auth', AuthRouter);


app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
