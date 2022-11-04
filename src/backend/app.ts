import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import router from './infrastructure/router';
import ClientCtrl from './infrastructure/controller/client.ctrl';
import container from './infrastructure/ioc';
import { ClientCreate } from './application/client.create';

const port = process.env.PORT || 3001;

const app = express();
app.use(cors());
app.use(express.json());
app.use('/', router);

app.on('exit', () => {
  const clientCreator = <ClientCreate>container.get('client.creator');
  clientCreator.logOut().then(() => {
    console.log('Session closed successfuly')
  });
});

app.listen(port, () => {
  console.log(`Listening to port: ${port}`);
});

