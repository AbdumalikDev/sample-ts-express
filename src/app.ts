import express, { Application, Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import routes from './routes/index';

const app: Application = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(routes);

app.get('/status', (req: Request, res: Response) => {
  res.json({
    stats: 'OK',
  });
});

export default app;
