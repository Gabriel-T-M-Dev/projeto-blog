import getPosts from "../models/postsModel.js";

async function listPostsById(req, res) {
    const posts = await getPosts()
    const index = req.params.id;
    res.status(200).json(posts[index]);
};

async function listPosts(req, res) {
    const posts = await getPosts();
    res.status(200).json(posts);
};

export {listPosts, listPostsById};