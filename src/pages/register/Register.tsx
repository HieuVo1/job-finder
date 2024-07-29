import { useNavigate } from "react-router-dom";
import { registerAsync, RegisterPayload } from "./Register.api";
import { toast } from "react-toastify";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { TextField } from "@mui/material";

function Register() {
  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
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
              <Controller
                name="fullname"
                rules={{ required: 'FullName is required' }}
                control={control}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <TextField
                    helperText={error ? error.message : null}
                    error={!!error}
                    onChange={onChange}
                    value={value}
                    fullWidth
                    label="FullName"
                    variant="outlined"
                  />
                )}
              />
            </div>

            <div className="mb-4">
              <Controller
                name="email"
                rules={{
                  required: 'Email is required', pattern:
                    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/i,
                }}
                control={control}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <TextField
                    helperText={error ? (error.type === 'pattern' ? 'Email format is invalid' : error.message) : null}
                    error={!!error}
                    onChange={onChange}
                    value={value}
                    fullWidth
                    label="Email"
                    variant="outlined"
                  />
                )}
              />
            </div>


            <div className="mb-4">
              <Controller
                name="username"
                rules={{ required: 'Username is required' }}
                control={control}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <TextField
                    helperText={error ? error.message : null}
                    error={!!error}
                    onChange={onChange}
                    value={value}
                    fullWidth
                    label="Username"
                    variant="outlined"
                  />
                )}
              />
            </div>

            <div className="mb-4">
              <Controller
                name="password"
                rules={{ required: 'Password is required' }}
                control={control}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <TextField
                    helperText={error ? error.message : null}
                    error={!!error}
                    onChange={onChange}
                    value={value}
                    fullWidth
                    type="password"
                    label="Password"
                    variant="outlined"
                  />
                )}
              />
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
