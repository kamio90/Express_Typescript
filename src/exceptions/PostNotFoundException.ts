import HttpException from './HttpException';

class PostNotFoundException extends HttpException {
    constructor(id: string) {
        super(404, `Ogłoszenie z id: ${id} nie zostało znalezione`);
    }
}

export default PostNotFoundException;