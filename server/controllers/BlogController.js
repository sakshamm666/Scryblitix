import fs from 'fs';
import imagekit from '../configs/Imagekit.js';
import Blog from '../models/Blog.js';
import Comment from '../models/Comment.js';
import main from '../configs/gemini.js';


export const addBlog = async (req, res) =>{
    try {
        const {title, subTitle, description, category, isPublished} = JSON.parse
        (req.body.blog);
        const imageFile = req.file;

        // Check if all fields are present
        if(!title || !description || !category || !imageFile){
            return res.json({success: false, message: "Missing required fields" })
        }
        const fileBuffer = fs.readFileSync(imageFile.path)

        // image upload to
const response = await imagekit.upload({
    file : fileBuffer , 
    fileName : imageFile.originalname , 
    folder : "/blogs"
})

// Optimizing
const optimizedImageUrl = imagekit.url({
    path: response.filePath,
    transformation: [
        {quality: 'auto'},   // Auto compression
        {format: 'webp'},    // Convert to modern format
        {width: '1280'}      // Width resizing
    ]
});

const image = optimizedImageUrl;

await Blog.create({title, subTitle, description, category, image, isPublished})

res.json({success: true, message: "Blog added successfully"})

} catch (error) {
    res.json({success: false, message: error.message})
}}
export const getallBlogs = async(req , res) => {
try {
    const blogs = await Blog.find({isPublished : true})
    
res.json({success: true,  blogs})
} catch (error) {
    res.json({success: false, message: error.message})
}}

export const getBlogByID = async(req,res) => {
    try {
        const { blogId } = req.params
        const blog = await Blog.findById(blogId)
        if(!blog) {
            return  res.json({success: false, message: "Blog Not Found"  })
        }       
        res.json({success: true,  blog})
    } catch (error) {
          res.json({success: false, message: error.message})
    }
}

export const deleteBlogByID = async(req,res) => {
    try {
        const {  id } = req.body;
         await Blog.findByIdAndDelete(id); 
         // deleting comments Also 
         await Comment.deleteMany({ blog : id })

       res.json({success: true,  message : "Blog Deleted Successfully"})  ;
      
     
    } catch (error) {
          res.json({success: false, message: error.message});
        
    }
}

export const togglePublish = async(req,res) => {
    try {
           const {  id } = req.body;
           const blog = await Blog.findById(id);
           blog.isPublished = !blog.isPublished;
           await blog.save();
     res.json({success: true,  message : "Blog Status Updated"})  ;
    } catch (error) {
     res.json({success: false, message: error.message})
 

    }
}

export const addComment = async (req,res) => {
    try {
        const {blog , name , content }  = req.body;
        await Comment.create({blog, name , content });
    res.json({success: true, message: "Comment Added For Reveiw"})
    } catch (error) {
             res.json({success: false, message: error.message})
    }
}
 export const getBlogComment = async (req,res) => {
try {
    const {blogId} = req.body;
    const comments = await Comment.find({blog : blogId , isApproved : true}).sort({createdAt : -1});
    res.json({success : true , comments})
} catch (error) {
 res.json({success: false, message: error.message})  
}}
 
export const generateContent = async (req, res)  => {
    try {
        const { prompt } = req.body;
  const content = await main( prompt + 'Genarate a Blog Content For This Topic In Simple Text Format');
  res.json({ success : true , content})
    } catch (error) {
          res.json({ success : false , message : error.message})
    }
}