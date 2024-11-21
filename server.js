import express from 'express';
import routes from './src/routes/postsRoutes.js';

const port = 3000; // Port that server will listen

const app = express(); // Start express in 'app'
routes(app); // Call routes function from postsRoutes.js

// Start server
app.listen(port, () => {
    console.log(`Listen to port ${port}`);
});

// const posts = await getPosts();
// console.log(posts);

// const posts = await getPosts();
// const description = posts.map(post => post.description);
// console.log(posts.map (post => post.description));

// Function and Route to GET posts by filter
// function getPostByFilter(filter) {
//     const posts = getPosts();
//     const description = posts.map(post => post.description);
//     return description.filter((txt) => {
//         const normalDescription =
//             txt && txt.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
//         const normalFilter =
//             filter.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
//         return normalDescription && normalDescription.includes(normalFilter);
//     });
// };

// app.get('/posts/search/:filter', (req, res) => {
//     const result = getPostByFilter(req.params.filter);
//     res.status(200).json(result);
// });
