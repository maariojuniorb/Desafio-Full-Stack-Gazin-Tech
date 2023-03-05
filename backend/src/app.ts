import * as express from 'express';
import { developersRoute, levelRoute, testRoute } from './Routes';
import errorMiddleware from './Config/middlewares/errorHandling';
import { AccessDeniedError } from 'sequelize';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();
    this.app.use('/test', testRoute);
    this.app.use('/developers', developersRoute);
    this.app.use('/levels', levelRoute);
    this.app.use(errorMiddleware);
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

export const { app } = new App();
