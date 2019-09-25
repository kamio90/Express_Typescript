import HttpException from './HttpException';

class UserWithThatEmailAlreadyExistsException extends HttpException {
    constructor(email: string) {
        super(400, `Użytkownik z emialem: ${email} już istnieje`);
    }
}

export default UserWithThatEmailAlreadyExistsException;