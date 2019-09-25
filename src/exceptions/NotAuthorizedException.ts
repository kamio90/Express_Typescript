import HttpException from './HttpException';

class NotAuthorizedException extends HttpException {
    constructor() {
        super(403, "Nie jesteś autoryzowany");
    }
}

export default NotAuthorizedException;
