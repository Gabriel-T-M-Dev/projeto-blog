import {getPosts, createPost, putPost} from "../models/postsModel.js";
import fs from "fs";
import gerarDescricaoComGemini from "../services/geminiService.js";

export async function listPostsById(req, res) {
    const posts = await getPosts()
    const index = req.params.id;
    res.status(200).json(posts[index]);
};

export async function listPosts(req, res) {
    const posts = await getPosts();
    res.status(200).json(posts);
};

export async function postNewPost(req, res) {
    const newPost = req.body;
    try{
        const createdPost = await createPost(newPost);
        res.status(200).json(createdPost);
    } catch(error) {
        console.error(error.message);
        res.status(500).json({"Error": "Request Fail"});
    }
};

export async function uploadNewImage(req, res) {
    const newPost = {
        description: '',
        imgUrl: req.file.originalname,
        alt: ""
    };
    try{
        const createdPost = await createPost(newPost);
        const updatedImg = `uploads/${createdPost.insertedId}.png`;
        fs.renameSync(req.file.path, updatedImg);
        res.status(200).json(createdPost);
    } catch(error) {
        console.error(error.message);
        res.status(500).json({"Error": "Request Fail"});
    }
};

export async function putNewPost(req, res){
    const id = req.params.id;
    const urlImg = `http://localhost:3000/${id}.png`;
    try{
        const imgBuffer = fs.readFileSync(`uploads/${id}.png`);
        const description = await gerarDescricaoComGemini(imgBuffer);
        const post = {
            imgUrl: urlImg,
            description: description,
            alt: req.body.alt
        };
        const createdPost = await putPost(id, post);
        res.status(200).json(createdPost);
    } catch(error) {
        console.error(error.message);
        res.status(500).json({"Error": "Request Fail"});
    }
};

// export async function deletePostsById(req, res) {
//     const index = req.params.id;
//     try{
//         const deletedPost = await deletePost(index);
//         if (deletedPost.deletedCount === 1) {
//             res.status(200).json({ message: "Post deleted successfully!" });
//         } else {
//             res.status(404).json({ message: "Post not found." });
//         }
//     } catch(error) {
//       console.error(error.message);
//       res.status(500).json({ "Error": "Error deleting post." });
//     }
// };