import express from 'express';
import AccessRouter from './routes/AccessRouter';
import {PORT} from './config/config';
import ContractRouter from "./routes/ContractRouter";


const app: express.Application = express();
// app.use(cors());
app.use('/access', AccessRouter);
app.use('/contract', ContractRouter);

app.listen(PORT, function () {
    console.log(`App is listening on port ${PORT}!`);
})
