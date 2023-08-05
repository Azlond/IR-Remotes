// @ts-nocheck
import express from 'express';
import { fanControlBinaryMapping } from '../data/fan-mapping.js';
import path from 'node:path';

const port = 8002;

const app = express();

app.get('/api/fan/*', (req, res) => {
    const { url } = req;
    if (url.includes('KEY_')) {
        const key = url.substring('/api/fan/'.length);
        if (Object.keys(fanControlBinaryMapping).includes(key)) {
            const command = `sudo dist/fan ${fanControlBinaryMapping[key]}`;
            childProcess.exec(command);
            res.status(200).send(key);
        } else {
            res.status(404).send(`Unrecognised API call - unknown key: ${key}`);
        }
    } else {
        res.status(404).send('Unrecognised API call');
    }
});

app.get('/', (req, res) => {
    res.status(200).sendFile(path.join('/app/dist', 'index.html'));
});

app.get('/assets/*', (req, res) => {
    res.status(200).sendFile(path.join('/app/dist/', req.originalUrl));
});

app.get('/fan-remote.svg', (req, res) => {
    res.status(200).sendFile(path.join('/app/dist/', req.originalUrl));
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});