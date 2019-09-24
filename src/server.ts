//mongodb+srv://<username>:<password>@typescriptapi-e2rda.mongodb.net/test?retryWrites=true&w=majority

import App from './app';
import PostController from './posts/posts.controller';
import validateEnv from './utils/validateEnv';

validateEnv();

// const {MONGO_USER, MONGO_PASSWORD} = process.env;

const app = new App(
    [
        new PostController()
    ]
);

app.listen();