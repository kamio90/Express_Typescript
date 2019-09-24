import * as express from 'express';
import Post from './post.interface';
import Controller from '../interfaces/controller.interface';
import postModel from './posts.model';
import { runInNewContext } from 'vm';
import PostNotFoundException from '../exceptions/PostNotFoundException';

class PostsController {
    public path = '/posts';
    public router = express.Router();
    private post = postModel;

    private posts: Post[] = [
        {
            author: 'Kamil',
            content: 'Twoja stara',
            title: 'Lorem'
        }
    ];

    constructor() {
        this.intializeRoutes();
    }

    public intializeRoutes() {
        this.router.get(this.path, this.getAllPosts);
        this.router.post(this.path, this.createAPost);
        this.router.get(`${this.path}/:id`,this.getPostById);
        this.router.put(`${this.path}:id`, this.modifyPost);
        this.router.delete(`${this.path}:id`, this.deletePost);
    }

    private getAllPosts = (request: express.Request, response: express.Response, next: express.NextFunction) => {
        this.post.find()
        .then(posts => {
            response.send(posts)
        });
    }

    private getPostById = (request: express.Request, response: express.Response, next: express.NextFunction) => {
        const id = request.params.id;
        this.post.findById(id)
        .then(post => {
            if(post){
                response.send(post);
            }else {
                next(new PostNotFoundException(id));
            }
            
        });
    }

    private modifyPost = (request: express.Request, response: express.Response, next: express.NextFunction) => {
        const id = request.params.id;
        const postData: Post = request.body;
        this.post.findByIdAndUpdate(id, postData, {new: true})
        .then(post => {
            if(post) {
                response.send(post);
            }else {
                next(new PostNotFoundException(id));
            }
            
        });
    }
    
    private createAPost = (request: express.Request, response: express.Response, next: express.NextFunction) => {
        const postData: Post = request.body;
        const createdPost = new this.post(postData);
        createdPost.save()
        .then(savedPost => {
            response.send(savedPost);
        });
    }

    private deletePost = (request: express.Request, response: express.Response, next: express.NextFunction) => {
        const id = request.params.id;
        this.post.findByIdAndDelete(id)
        .then(successResponse => {
            if(successResponse) {
                response.send(200);
            }else{
                next(new PostNotFoundException(id));
            }
        });
    }
}

export default PostsController;