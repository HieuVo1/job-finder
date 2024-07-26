import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "./Register.api";
import { toast } from "react-toastify";

function Register() {
    const navigate = useNavigate();

    const [inputs, setInputs] = useState({
        username: '',
        password: '',
        fullName: '',
        email: '',
    });

    const handleChange = (event: any) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }
    const handleSubmit = async (event: any) => {
        event.preventDefault();
        var response = await register(inputs);

        if (response?.isSuccess) {
            toast.success("Sign up successfully!");
            return navigate('/login');
        }
        else {
            toast.error(response?.errorMessage);
        }
    }
    return (
        <section >
            <div className='container m-auto max-w-2xl py-24'>
                <div className='bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0'>
                    <form onSubmit={handleSubmit}>
                        <h2 className='text-3xl text-center font-semibold mb-6'>Sign Up</h2>
                        <div className='mb-4'>
                            <label className='block text-gray-700 font-bold mb-2'>
                                Enter your full name
                            </label>
                            <input
                                type='text'
                                id='fullName'
                                name='fullName'
                                className='border rounded w-full py-2 px-3 mb-2'
                                required
                                value={inputs.fullName}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='mb-4'>
                            <label className='block text-gray-700 font-bold mb-2'>
                                Enter your email
                            </label>
                            <input
                                type='text'
                                id='email'
                                name='email'
                                className='border rounded w-full py-2 px-3 mb-2'
                                required
                                value={inputs.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='mb-4'>
                            <label className='block text-gray-700 font-bold mb-2'>
                                Enter your username
                            </label>
                            <input
                                type='text'
                                id='username'
                                name='username'
                                className='border rounded w-full py-2 px-3 mb-2'
                                required
                                value={inputs.username}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='mb-4'>
                            <label className='block text-gray-700 font-bold mb-2'>
                                Enter your password
                            </label>
                            <input
                                type='password'
                                id='password'
                                name='password'
                                className='border rounded w-full py-2 px-3 mb-2'
                                required
                                value={inputs.password}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <button
                                className='bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline'
                                type='submit'
                            >
                                Sign Up
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}
export default Register