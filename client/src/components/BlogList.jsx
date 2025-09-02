import React, { useState } from 'react'
import { blog_data, blogCategories } from '../assets/assets'
import { motion } from 'framer-motion'
import BlogCard from './BlogCard'
import { useAppContext } from '../context/AppContext'
 

const BlogList = () => {
  const [menu, setMenu] = useState('All')  // "All" capital to match filter
const {blogs , input} = useAppContext()
const filteredBlogs = () => {
  if(input === ' '){  return blogs } 
  return blogs.filter((blog) => blog.title.toLowerCase().includes(input.toLowerCase())
  || blog.category.toLowerCase().includes(input.toLowerCase()))
}
  return (
    <div>
      {/* Category Filter Menu */}
      <div className="flex justify-center gap-4 sm:gap-8 my-10 relative">
        {blogCategories.map((item) => (
          <div key={item} className="relative">
            <button
              onClick={() => setMenu(item)}
              className={`cursor-pointer text-gray-500 ${
                menu === item && 'text-white px-4 pt-0.5'
              }`}
            >
              {item}
              {menu === item && (
                <motion.div
                  layoutId="underline"
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  className="absolute right-0 top-0 left-0 h-7 -z-1 rounded-full bg-primary"
                ></motion.div>
              )}
            </button>
          </div>
        ))}
      </div>

      {/* Blog Cards Section */}
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-=cols-4 gap-8 mb-24 mx-8 
      sm:mx-16 xl:mx-40 '>
        {filteredBlogs().filter((blog) => (menu === "All" ? true : blog.category === menu)).map((blog) => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
      </div>
    </div>
  )
}

export default BlogList
