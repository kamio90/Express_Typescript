import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';
import * as mongoose from 'mongoose';
//
import errorMiddleware from './middleware/error.middleware';
import Controller from './interfaces/controller.interface';

class App {
    public app: express.Application;

    constructor(controllers: Controller[]){
        this.app = express();

        this.connectToDatabase();
        this.initMiddleware();
        this.initControllers(controllers);
        this.initErrorHandling();
    }

    public listen():void {
        this.app.listen(process.env.PORT || 3000, () => {
            console.log(`App is listen on port: ${process.env.PORT}`);
        });
    }

    public getServer():express.Application{
        return this.app;
    }

    private initMiddleware():void {
        this.app.use(bodyParser.json());
        this.app.use(cookieParser());
    }

    private initErrorHandling():void {
        this.app.use(errorMiddleware);
    }

    private initControllers(controllers: Controller[] ):void {
        controllers.forEach(controller => {
            this.app.use('/', controller.router);
        });
    }

    private connectToDatabase():void {
        const  {
            MONGO_USER,
            MONGO_PASSWORD,
            MONGO_PATH
        } = process.env;
        mongoose.connect(`mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}${MONGO_PATH}`);
    }
}

export default App;