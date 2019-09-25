import HttpException from './HttpException';

class WrongAuthenticationTokenException extends HttpException {
    constructor() {
        super(401, 'Zły token do autoryzacji użytkownika');
    }
}

export default WrongAuthenticationTokenException;