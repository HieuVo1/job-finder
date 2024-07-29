import { loginAsync, LoginPayload } from "./Login.api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import TokenService, { tokenKey } from "../../services/TokenService";
import { setHttpClientHeader } from "../../services/api";
import { Controller, useForm } from "react-hook-form";
import { TextField } from "@mui/material";

function Login() {
  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
  } = useForm<LoginPayload>({
    defaultValues: {
      username: '',
      password: ''
    }
  });

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
