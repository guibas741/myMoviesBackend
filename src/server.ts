import express from 'express';

const app = express();

app.get('/', (request, response) => {
  return response.json({ message: 'Ola enfermeira' });
});

app.listen(3333, () => {
  console.log("📺 server started")
});