import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { CircularProgress, Pagination } from "@mui/material";
import { Blog } from "../../data/blog";
import { ListRequest } from "../../data/list-request";
import { getAllBlogAsync } from "../../services/blog.api";
import { defaultPageSize } from "../../data/job";
import BlogCard from "./BlogCard";

function BlogList() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [pageIndex, setPageIndex] = useState(1);
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const pageCount = useRef<number>();

  const getBlogs = async (
    requestParams: ListRequest,
    tags: string,
    title: string
  ) => {
    setLoading(true);
    try {
      const response = await getAllBlogAsync(requestParams, tags, title);
      if (response.isSuccess) {
        setBlogs(response.data.data);
        pageCount.current = Math.ceil(
          response.data.count / requestParams.pageSize
        );
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const tagFilter = searchParams.get("tags");
    const title = searchParams.get("title");
    const page = parseInt(searchParams.get("page") ?? "1");

    const requestParam: ListRequest = {
      pageIndex: page,
      pageSize: defaultPageSize,
      sortField: searchParams.get("sortField") ?? "",
      sortOrder: searchParams.get("sortOrder") ?? "",
    };
    setPageIndex(page);

    getBlogs(requestParam, tagFilter ?? "", title ?? "");
  }, [searchParams]);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    searchParams.set("page", `${page}`);
    navigate({ pathname: "/blogs", search: `?${searchParams}` });
  };

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-full">
          <CircularProgress />{" "}
        </div>
      ) : (
        <>
          {blogs.length === 0 ? (
            <p className="text-center">No content</p>
          ) : (
            <>
              <div className="grid md:grid-cols-1 gap-6 lg:grid-cols-2">
                {blogs.map((blog) => (
                  <BlogCard key={blog.id} blog={blog}></BlogCard>
                ))}
              </div>
              <div className="flex justify-center pb-12">
                {pageCount.current && pageCount.current > 0 && (
                  <Pagination
                    count={pageCount.current}
                    page={pageIndex}
                    onChange={handlePageChange}
                    color="primary"
                  />
                )}
              </div>
            </>
          )}
        </>
      )}
    </>
  );
}

export default BlogList;
