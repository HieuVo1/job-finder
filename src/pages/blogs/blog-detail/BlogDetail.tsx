import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Blog } from "../../../data/blog";
import { getBlogByIdAsync } from "../blog.api";
import { CircularProgress } from "@mui/material";

function BlogDetail() {
  const { blogId } = useParams();
  const [blog, setBlog] = useState<Blog>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async (blogId: number) => {
      setLoading(true);
      try {
        const response = await getBlogByIdAsync(blogId);
        if (response.isSuccess) {
          setBlog(response.data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    if (blogId) {
      fetchData(parseInt(blogId));
    }
  }, [blogId]);

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-full">
          <CircularProgress />{" "}
        </div>
      ) : (
        <>
          <div className="blog-image">
            <img className="w-full" src={blog?.backgroundUrl} alt="" />
          </div>
          <div className="pt-5 pb-8">
            <div className="text-2xl hover:cursor-pointer ">{blog?.title}</div>
            <div className="sub-info flex">
              <div className="text-gray-400">
                {blog?.createdAt
                  ? new Date(blog?.createdAt).toDateString()
                  : ""}
              </div>
            </div>
          </div>
          <div className="blog-content">
            <div
              dangerouslySetInnerHTML={{ __html: blog?.content ?? "" }}
            ></div>
          </div>
          <div className="blog-tag"></div>
        </>
      )}
    </>
  );
}
export default BlogDetail;
