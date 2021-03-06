import express from 'express';
import cors from 'cors';
import AccessRouter from './routes/AccessRouter';
import {PORT} from './config/config';
import ContractRouter from "./routes/ContractRouter";
import EventRouter from "./routes/EventRouter";


const app: express.Application = express();
app.use(cors());
app.use('/access', AccessRouter);
app.use('/contract', ContractRouter);
app.use('/event', EventRouter);

app.listen(PORT, function () {
    console.log(`App is listening on port ${PORT}!`);
})
