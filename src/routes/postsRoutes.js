import express from 'express';
import multer from 'multer';
import cors from "cors";
import {listPosts, listPostsById, postNewPost, uploadNewImage, putNewPost} from '../controller/postsController.js';

const corsOptions = {
    origin:"http://localhost:8000",
    optionsSuccessStatus: 200
};

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'uploads/')
    },
    filename: function(req, file, cb){
        cb(null, file.originalname)
    }
});

const upload = multer({dest: "./uploads", storage});

const routes = (app) =>{
    app.use(express.json()); // Middleware to use JSON in request body
    app.use(cors(corsOptions));
    // Route to GET all posts
    app.get('/posts', listPosts);
    // Route to GET posts by ID
    app.get('/posts/:id', listPostsById);
    // Route to POST posts
    app.post('/posts', postNewPost)
    app.post('/upload', upload.single("imagem"), uploadNewImage)
    // Route to PUT posts
    app.put('/upload/:id', putNewPost)
    // Route to Delete posts by ID
    // app.delete('/posts/:id', deletePostsById)
    
};

export default routes;

