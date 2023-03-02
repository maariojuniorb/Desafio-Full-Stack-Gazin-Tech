import * as express from 'express';

const testRoute = express.Router();

testRoute.get('/', (_req, res) => {
  res.status(200).json({ message: 'ok' });
});

export default testRoute;
