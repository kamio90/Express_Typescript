import HttpException from './HttpException';

class AuthenticationTokenMissingException extends HttpException {
    constructor() {
        super(401, 'Brakuje tokena do autoryzacji użytkownika');
    }
}

export default AuthenticationTokenMissingException;