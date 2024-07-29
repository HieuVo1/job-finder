import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Blog } from "../../data/blog";
import { getAllBlogAsync } from "../../services/blog.api";
import { ListRequest } from "../../data/list-request";

function RecentPost() {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllBlogAsync(new ListRequest(), "", "");
        if (response.isSuccess) {
          setBlogs(response.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="recent-post mb-12 mt-12">
      <div className="title text-lg mb-2 font-semibold relative pb-5 ">
        Recent Post
      </div>
      {blogs.map((blog) => (
        <div key={blog.id} className="flex mb-6 pr-8">
          <Link to={`/blogs/${blog.id}`}>
            <div className="mr-3 cursor-pointer">
              <img
                className="h-20 w-28 max-w-none"
                src={blog.backgroundUrl}
                alt=""
              />
            </div>
          </Link>
          <div>
            <Link to={`/blogs/${blog.id}`}>
              <div className="mt-1 font-semibold text-sm text-hover hover:text-blue-600">
                {blog.title}
              </div>
            </Link>
            <div className="text-sm text-gray-400">
              {new Date(blog.createdAt).toDateString()}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
export default RecentPost;
