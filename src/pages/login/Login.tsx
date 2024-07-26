import { useState } from "react";
import { login } from "./Login.api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import TokenService, { tokenKey } from "../../services/TokenService";
import { setHttpClientHeader } from "../../services/api";

function Login() {
    const navigate = useNavigate();

    const [inputs, setInputs] = useState({
        username: '',
        password: '',
    });

    const handleChange = (event: any) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }
    const handleSubmit = async (event: any) => {
        event.preventDefault();
        var response = await login(inputs);

        if (response.isSuccess && response.data) {
            TokenService.setToken(tokenKey, response.data);
            toast.success('Login successfully');
            setHttpClientHeader();
            return navigate('/');
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
                        <h2 className='text-3xl text-center font-semibold mb-6'>Login</h2>
                        <div className='mb-4'>
                            <label className='block text-gray-700 font-bold mb-2'>
                                Enter your name
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
                                Login
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}
export default Login