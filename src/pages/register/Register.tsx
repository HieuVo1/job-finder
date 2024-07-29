import { useNavigate } from "react-router-dom";
import { registerAsync, RegisterPayload } from "./Register.api";
import { toast } from "react-toastify";
import { SubmitHandler, useForm } from "react-hook-form";

function Register() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterPayload>();

  const onSubmit: SubmitHandler<RegisterPayload> = async (
    data: RegisterPayload
  ) => {
    const response = await registerAsync(data);
    if (response?.isSuccess) {
      toast.success("Sign up successfully!");
      return navigate("/login");
    } else {
      toast.error(response?.errorMessage);
    }
  };

  return (
    <section>
      <div className="container m-auto max-w-2xl py-24">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <form onSubmit={handleSubmit(onSubmit)}>
            <h2 className="text-3xl text-center font-semibold mb-6">Sign Up</h2>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Enter your fullname
              </label>
              <input
                type="text"
                {...register("fullname", { required: true })}
                className="border rounded w-full py-2 px-3 mb-2"
              />
              {errors.fullname?.type === "required" && (
                <p className="text-red-600" role="alert">
                  Fullname is required
                </p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Enter your email
              </label>
              <input
                type="text"
                {...register("email", {
                  required: true,
                  pattern:
                    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/i,
                })}
                className="border rounded w-full py-2 px-3 mb-2"
              />
              {errors.email?.type === "required" && (
                <p className="text-red-600" role="alert">
                  Email is required
                </p>
              )}
              {errors.email?.type === "pattern" && (
                <p className="text-red-600" role="alert">
                  Email format is invalid
                </p>
              )}
            </div>
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
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
export default Register;
