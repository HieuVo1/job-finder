import { Link } from 'react-router-dom';
import './BlogCard.css'
import { Blog } from '../../data/blog';

function BlogCard({ blog }: { blog: Blog }) {
    return (
        <div className="blog-card hover:cursor-pointer">
            <Link to={`/blogs/${blog.id}`}>
                <div className="blog-image overflow-hidden mb-4 relative">
                    <div className="background-image" style={{ backgroundImage: 'url("' + blog.backgroundUrl + '")' }}></div>
                </div >
            </Link>

            <div className="blog-info  text-gray-400">
                <Link to={`/blogs/${blog.id}`}>
                    <p className="text-black text-lg mb-1 duration-300 font-semibold  hover:cursor-pointer hover:text-blue-600">{blog.title}</p>
                </Link>
                <p className="author text-gray-400">
                    By
                    <span className="text-black"> {blog.authorName} </span>
                    on
                    <span className="text-black"> {new Date(blog.createdAt).toDateString()} </span>
                </p>
                {blog.tags.map((tag, index) => (
                    <span className='text-black' key={index}>#{tag} </span>
                ))}
                <p className="short-content">{blog.summary}</p>

            </div >
        </div >
    )
}
export default BlogCard