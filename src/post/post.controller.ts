import * as express from 'express';
//
import PostNotFoundException from '../exceptions/PostNotFoundException';
import Controller from '../interfaces/controller.interface';
import RequestWithUser from '../interfaces/requestWithUser.interface';
import authMiddleware from '../middleware/auth.middleware';
import validationMiddleware from '../middleware/validation.middleware';
import CreatePostDto from './post.dto';
import Post from './post.interface';
import postModel from './post.model';

class PostController implements Controller {
    public path = '/posts';
    public router = express.Router();
    private post = postModel;

    constructor() {
        this.initRoutes();
    }

    private initRoutes() {
        this.router.get(this.path, this.getAllPosts);
        this.router.get(`${this.path}/:id`, this.getPostById);
        this.router
            .all(`${this.path}/*`, authMiddleware)
            .patch(`${this.path}/:id`, validationMiddleware(CreatePostDto, true), this.modifyPost)
            .delete(`${this.path}/:id`, this.deletePost)
            .post(this.path, authMiddleware, validationMiddleware(CreatePostDto), this.createPost);
    }

    private getAllPosts = async (req: express.Request, res: express.Response) => {
        const posts = await this.post.find()
        .populate('userId', '-password');
        res.send(posts);
    }

    private getPostById = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        const id = req.params.id;
        const post = await this.post.findById(id);
        if (post) {
            res.send(post);
        } else {
            next(new PostNotFoundException(id));
        }
    }

    private modifyPost = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        const id = req.params.id;
        const postData: Post = req.body;
        const post = await this.post.findByIdAndUpdate(id, postData, {new: true});
        if (post) {
            res.send(post);
        } else {
            next(new PostNotFoundException(id));
        }
    }

    private createPost =  async (req: RequestWithUser, res: express.Response) => {
        const postData: CreatePostDto = req.body;
        const createdPost = new this.post({
            ...postData,
            userId: req.user._id
        });
        const savedPost = await createdPost.save();
        res.send(savedPost);
    }

    private deletePost = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        const id = req.params.id;
        const successResponse = await this.post.findByIdAndDelete(id);
        if (successResponse) {
            res.send(200);
        } else {
            next(new PostNotFoundException(id));
        }
    }
}

export default PostController;