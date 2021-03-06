import 'dotenv/config';
//
import App from './app';
import validateEnv from './utils/validateEnv';
import PostController from './post/post.controller';
import AuthenticationController from './authentication/authentication.controller';
import UserController from './user/user.controller';

validateEnv();

const app = new App([
    new PostController(),
    new AuthenticationController(),
    new UserController()
]);

app.listen();