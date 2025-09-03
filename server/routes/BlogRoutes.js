import express from 'express'
import { addBlog, addComment, deleteBlogByID, generateContent, getallBlogs, getBlogByID, getBlogComment, togglePublish } from '../controllers/BlogController.js'
import upload from '../middlewares/Multer.js';
import auth from '../middlewares/auth.js';
 
 
const blogRouter = express.Router();
blogRouter.post("/add", upload.single('image'), auth , addBlog);
blogRouter.get('/all' , getallBlogs );
blogRouter.get('/:blogId' , getBlogByID );
blogRouter.post('/delete' , auth ,  deleteBlogByID );
blogRouter.post('/toggle-publish' , auth , togglePublish);
blogRouter.post('/add-comment' ,addComment )
blogRouter.post('/comments' , getBlogComment )
blogRouter.post('/generate' , auth ,  generateContent )

export default blogRouter;