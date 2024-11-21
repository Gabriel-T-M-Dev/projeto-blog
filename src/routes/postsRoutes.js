import express from 'express';
import {listPosts, listPostsById} from '../controller/postsController.js';

const routes = (app) =>{
    app.use(express.json()); // Middleware to use JSON in request body
    // Route to GET all posts
    app.get('/posts', listPosts);
    // Route to GET posts by ID
    app.get('/posts/:id', listPostsById);
};

export default routes;

