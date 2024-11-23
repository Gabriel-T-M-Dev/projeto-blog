import 'dotenv/config';
import { ObjectId } from "mongodb";
import connectDb from "../config/dbConfig.js";

const conection = await connectDb(process.env.STRING_CONECTION); // DB Connect

// Function to get Posts from mongoDB - blog-database - posts
export async function getPosts() {
    const db = conection.db('blog-database');
    const collection = db.collection('posts');
    return collection.find().toArray();
};

export async function createPost(newPost) {
    const db = conection.db('blog-database');
    const collection = db.collection('posts');
    return collection.insertOne(newPost);
};

export async function putPost(id, newPost) {
    const db = conection.db('blog-database');
    const collection = db.collection('posts');
    const objectId = ObjectId.createFromHexString(id);
    return collection.updateOne({_id: new ObjectId(objectId)}, {$set: newPost} );
};

// export async function deletePost(id) {
//     const db = conection.db('blog-database');
//     const collection = db.collection('posts');
//     const result = await collection.deleteOne({ _id: ObjectId(id) });
//     return result;
// };