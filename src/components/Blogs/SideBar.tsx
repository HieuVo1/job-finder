import SearchBar from './SearchBar';
import BlogTag from './BlogTag';
import RecentPost from './RecentPost';
import './SideBar.css';
import SortBar from './SortBar';

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