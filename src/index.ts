import express, { Request, Response, Application } from 'express';
import api from './api';
import figlet from 'figlet';
import dotenv from 'dotenv';
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 1337;
const print = (text: string) => figlet(text, (err, data) => err ? console.error(err) : console.log(data));

app.use('/api', api);
app.listen(port, () => {
    print('URL Shortener')
    console.log('Created by Edward Pasenidis');
});