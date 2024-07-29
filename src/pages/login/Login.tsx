import { loginAsync, LoginPayload } from "./Login.api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import TokenService, { tokenKey } from "../../services/TokenService";
import { setHttpClientHeader } from "../../services/api";
import { useForm } from "react-hook-form";

function Login() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginPayload>();

  const onSubmit = async (data: LoginPayload) => {
    const response = await loginAsync(data);

    if (response.isSuccess && response.data) {
      TokenService.setToken(tokenKey, response.data);
      toast.success("Login successfully");
      setHttpClientHeader();
      return navigate("/");
    } else {
      toast.error(response?.errorMessage);
    }
  };

  return (
    <section>
      <div className="container m-auto max-w-2xl py-24">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <form onSubmit={handleSubmit(onSubmit)}>
            <h2 className="text-3xl text-center font-semibold mb-6">Login</h2>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Enter your username
              </label>
              <input
                type="text"
                {...register("username", { required: true })}
                className="border rounded w-full py-2 px-3 mb-2"
              />
              {errors.username?.type === "required" && (
                <p className="text-red-600" role="alert">
                  Username is required
                </p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Enter your password
              </label>
              <input
                type="password"
                {...register("password", { required: true })}
                className="border rounded w-full py-2 px-3 mb-2"
              />
              {errors.password?.type === "required" && (
                <p className="text-red-600" role="alert">
                  Password is required
                </p>
              )}
            </div>
            <div>
              <button
                className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
export default Login;
