import connectDb from "../config/dbConfig.js";


const conection = await connectDb(process.env.STRING_CONECTION); // DB Connect

// Function to get Posts from mongoDB - blog-database - posts
export default async function getPosts() {
    const db = conection.db('blog-database');
    const colecao = db.collection('posts');
    return colecao.find().toArray();
};