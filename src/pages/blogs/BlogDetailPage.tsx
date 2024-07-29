import BlogDetail from "./blog-detail/BlogDetail";
import BlogTag from "./blog-tag/BlogTag";
import RecentPost from "./recent-post/RecentPost";

function BlogDetailPage() {
  return (
    <>
      <div className="container max-w-7xl m-auto grid grid-cols-4 gap-4">
        <div className="mt-12 pb-8 sm:col-span-4 md:col-span-2 lg:col-span-3">
          <BlogDetail></BlogDetail>
        </div>
        <div className="side-bar sm:col-span-4 md:col-span-2 lg:col-span-1">
          <RecentPost></RecentPost>
          <BlogTag></BlogTag>
        </div>
      </div>
    </>
  );
}

export default BlogDetailPage;
