import { Link } from "react-router-dom"
import { useSelector } from "react-redux";
import { initialUser, selectUser } from "../redux/userSlice";
import { Roles } from "../pages/register/Register.api";

function HomeCards() {
    const user = useSelector(selectUser);

    return (<section className='py-4'>
        <div className='lg:container m-auto'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg'>
                <div className='bg-gray-100p-6 p-8 rounded-lg shadow-md'>
                    <h2 className='text-2xl font-bold'>For Developers</h2>
                    <p className='mt-2 mb-4'>
                        Browse our React jobs and start your career today
                    </p>
                    <Link
                        to='/jobs'
                        className='inline-block bg-black text-white rounded-lg px-4 py-2 hover:bg-gray-700'
                    >
                        Browse Jobs
                    </Link>
                </div>

                <div className='bg-indigo-100 p-8 rounded-lg shadow-md'>
                    <h2 className='text-2xl font-bold'>For Employers</h2>
                    <p className='mt-2 mb-4'>
                        List your job to find the perfect developer for the role
                    </p>
                    {user !== initialUser && user.role === Roles.Admin && (
                        <>
                            <Link
                                to='/add-job'
                                className='inline-block bg-indigo-500 text-white rounded-lg px-4 py-2 mr-3 hover:bg-indigo-600'
                            >
                                Add Job
                            </Link>

                            <Link
                                to='/add-blog'
                                className='inline-block bg-indigo-500 text-white rounded-lg px-4 py-2 hover:bg-indigo-600'
                            >
                                Add Blog
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </div>
    </section>)
}

export default HomeCards