import * as mongoose from 'mongoose';
import Post from './post.interface';

const postSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: String,
    geolocation: String,
    userId: {
        ref: 'User',
        type: mongoose.Schema.Types.ObjectId
    },
    date: String,
    expired: Boolean,
    done: Boolean
});

const postModel = mongoose.model<Post & mongoose.Document>('Post', postSchema);

export default postModel;