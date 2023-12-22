import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import bodyParser from 'body-parser'

//routes
import AuthRoutes from './routes/auth.js'

dotenv.config();

const PORT = process.env.PORT;
const DATABASE = `${process.env.DB}`;
const SERVER_PREFIX = `/api/v1`;

mongoose
    .connect(DATABASE)
    .then(() => console.log("DB is started!"))
    .catch((err) => console.log("DB error", err));

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use("/uploads", express.static("uploads"));
app.use(`${SERVER_PREFIX}`, AuthRoutes);

app.listen(PORT, (err) => {
    if (err) {
        return console.log(err);
    }
    console.log(`Server started on port localhost:${PORT}...`);
});


