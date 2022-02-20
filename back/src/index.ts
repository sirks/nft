import express from 'express';
import PageRouter from './routes/AccessRouter';
import {PORT} from '../config';


const app: express.Application = express();
// app.use(cors());
app.use('/mint', PageRouter);

app.listen(PORT, function () {
    console.log(`App is listening on port ${PORT}!`);
})
