
import JobCard from "./JobCard";
import { useEffect, useState } from "react";
import { GetJobs } from "../pages/jobs/job.api";
import { Job } from "../data/job";
import { Box, CircularProgress } from "@mui/material";

function JobList({ isHome }: { isHome: boolean }) {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const pageSize = isHome ? 3 : 10;
                const res = await GetJobs(pageSize, 1);
                if (res?.isSuccess)
                    setJobs(res?.data);
                else
                    alert(res?.errorMessage);
            } catch (error) {
                alert(error);
            }
            finally {
                setLoading(false);
            }

        };
        fetchJobs();
    }, []);

    return (<section className='bg-blue-50 px-4 py-10'>
        <div className='lg:container m-auto'>
            <h2 className='text-3xl font-bold text-indigo-500 mb-6 text-center'>
                {isHome ? 'Recent Jobs' : 'Browse Jobs'}
            </h2>
            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <CircularProgress />
                </Box>
            ) : (
                <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                    {jobs.map((job) => (
                        <JobCard key={job.id} {...job} />))}
                </div>
            )}
        </div>
    </section>
    );
}
export default JobList