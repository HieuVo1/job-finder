import './BlogSideBar.css';
import RecentPost from '../recent-post/RecentPost';
import SearchBar from '../search-bar/SearchBar';
import BlogTag from '../blog-tag/BlogTag';
import SortBar from '../sort-bar/SortBar';

function SideBar() {
    return (
        <>
            <SearchBar></SearchBar>
            <SortBar></SortBar>
            <RecentPost></RecentPost>
            <BlogTag></BlogTag>
        </>
    )
}

export default SideBar