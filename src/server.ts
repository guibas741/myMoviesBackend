import express from 'express';

import './database';

const app = express();

app.use(express.json());
// app.use(routes);

app.get('/', (request, response) => {
  return response.json({ message: 'Ola enfermeira' });
});

app.listen(3333, () => {
  console.log('📺 server started');
});
