import HomeCards from "../../components/HomeCards"
import Introduction from "../../components/Introduction"
import JobList from "../../components/JobList"
import ViewAllJobs from "../../components/ViewAllJobs"

function Home() {
    return <>
        <Introduction />
        <HomeCards />
        <JobList isHome={true}></JobList>
        <ViewAllJobs></ViewAllJobs>
    </>
}
export default Home