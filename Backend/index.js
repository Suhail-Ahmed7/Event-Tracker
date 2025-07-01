const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const AuthRouter = require('./routes/authRouter');
const eventRoute = require('./routes/eventRoute');
const connectDB = require('./config/dbConnection');

dotenv.config();
connectDB();

const corsOptions = {
  origin: [
    'http://localhost:5173',
    'https://event-tracker-mauve.vercel.app', 
  ],
  credentials: true,
};

app.use(cors(corsOptions)); 
app.use(express.json());

app.use('/auth', AuthRouter);
app.use('/events', eventRoute);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
