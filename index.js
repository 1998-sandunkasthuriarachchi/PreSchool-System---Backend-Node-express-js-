import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';


import userRoutes from './routes/users.js';
import admissionRoutes from './routes/admission.js';
import studentRoutes from './routes/student.js';

const app = express();

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))

app.use(cors());

app.use('/users',userRoutes);
app.use('/admission', admissionRoutes);
app.use('/students',studentRoutes);


const CONNECTION_URL = 'mongodb+srv://preschool:sYoQTl1H4wketigy@cluster0.ulpn7.mongodb.net/dbpreschool?retryWrites=true&w=majority';
const PORT = process.env.PORT|| 5000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));


mongoose.set('useFindAndModify', false);