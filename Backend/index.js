const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const AuthRouter = require('./routes/authRouter');
const eventRoute = require('./routes/eventRoute');
const connectDB = require('./config/dbConnection');

dotenv.config();
connectDB();

// ✅ Recommended CORS Options
const corsOptions = {
  origin: 'http://localhost:5173', // Replace or add frontend URLs as needed
  credentials: true, // Allow cookies, authorization headers, etc.
  
};

app.use(cors(corsOptions)); // ✅ Secure CORS with options
app.use(express.json());

app.use('/auth', AuthRouter);
app.use('/events', eventRoute);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
