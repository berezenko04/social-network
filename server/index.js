import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import bodyParser from 'body-parser'

dotenv.config();

const PORT = process.env.PORT;
const DATABASE = `${process.env.DB}`;

mongoose
    .connect(DATABASE)
    .then(() => console.log("DB is started!"))
    .catch((err) => console.log("DB error", err));

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.listen(PORT, (err) => {
    if (err) {
        return console.log(err);
    }
    console.log(`Server started on port localhost:${PORT}...`);
});


