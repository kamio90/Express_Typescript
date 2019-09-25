import * as mongoose from 'mongoose';
import User from './user.interface';

const reviewSchema = new mongoose.Schema({
    client: Number,
    provider: Number
});

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    phoneNumber: String,
    review: reviewSchema,
    activate: Boolean,
    regulationsAcceptance: Boolean
});

const userModel = mongoose.model<User & mongoose.Document>('User', userSchema);

export default userModel;