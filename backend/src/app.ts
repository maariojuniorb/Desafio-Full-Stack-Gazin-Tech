import * as express from 'express';
import { developersRoute, levelRoute, testRoute } from './Routes';
import errorMiddleware from './middlewares/errorHandling';

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
    this.app.use(express.json());
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

export const { app } = new App();
