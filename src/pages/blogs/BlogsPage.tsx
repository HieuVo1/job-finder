import BlogList from "../../components/Blogs/BlogList";
import SideBar from "../../components/Blogs/SideBar";

function BlogsPage() {
  return (
    <>
      <div className="container max-w-7xl m-auto grid grid-cols-4 gap-4 px-4">
        <div className="side-bar sm:col-span-4 md:col-span-2 lg:col-span-1">
          <SideBar></SideBar>
        </div>
        <div className="blog-list sm:col-span-4 md:col-span-2 lg:col-span-3 mt-12">
          <BlogList></BlogList>
        </div>
      </div>
    </>
  );
}
export default BlogsPage;
