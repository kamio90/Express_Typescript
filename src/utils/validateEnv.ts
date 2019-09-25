import {cleanEnv, port, str} from 'envalid';

function validateEnv():void{
    cleanEnv(process.env, {
        MONGO_USER: str(),
        MONGO_PASSWORD: str(),
        MONGO_PATH: str(),
        JWT_SECRET: str(),
        PORT: port()
    });
}

export default validateEnv;