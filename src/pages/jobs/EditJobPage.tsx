import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Job, JobTypes } from "../../data/job";
import { toast } from "react-toastify";
import { Controller, useForm } from "react-hook-form";
import { CircularProgress, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { GetJobByIdAsync, UpdateJobAsync } from "../../services/job.api";

function EditJobPage() {
    const navigate = useNavigate();

    const { id } = useParams();
    const [loading, setLoading] = useState(true);

    const { control, handleSubmit, setValue } = useForm<Job>({
        defaultValues: {
            type: JobTypes.FullTime,
            title: '',
            description: '',
            location: '',
            salary: '',
            company: {
                description: '',
                email: '',
                name: '',
                phone: ''
            }
        }
    });

    useEffect(() => {
        const getJob = async (id: number) => {
            try {
                setLoading(true);
                const res = await GetJobByIdAsync(id);
                setValue("id", res.data.id);
                setValue("title", res.data.title);
                setValue("location", res.data.location);
                setValue("description", res.data.description);
                setValue("salary", res.data.salary);
                setValue("type", res.data.type);
                setValue("company.description", res.data.company.description);
                setValue("company.email", res.data.company.email);
                setValue("company.name", res.data.company.name);
                setValue("company.phone", res.data.company.phone);
            } catch (error) {
                console.log(error);
            }
            finally {
                setLoading(false);
            }
        }
        if (id)
            getJob(parseInt(id));
    }, [id]);

    const options = Object.entries(JobTypes).map(([key, value]) => ({
        value,
        label: key,
    })).filter(o => typeof o.value === 'number');

    const onSubmit = async (data: Job) => {
        const response = await UpdateJobAsync(data);

        if (response.isSuccess) {
            toast.success("Update job successfully");
            return navigate("/jobs");
        } else {
            toast.error(response?.errorMessage);
        }
    };

    return (<>
        {loading ? (
            <div className="flex justify-center items-center h-full">
                <CircularProgress />
            </div>
        ) : (
            <section className='bg-indigo-50'>
                <div className='container m-auto max-w-2xl py-24'>
                    <div className='bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0'>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <h2 className='text-3xl text-center font-semibold mb-6'>Edit Job</h2>
                            <div className="mb-4">
                                <Controller
                                    name="title"
                                    rules={{ required: 'Title is required' }}
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
                                            label="Title"
                                            variant="outlined"
                                        />
                                    )}
                                />
                            </div>

                            <div className="mb-4">
                                <Controller
                                    name="description"
                                    rules={{ required: 'Description is required' }}
                                    control={control}
                                    render={({
                                        field: { onChange, value },
                                        fieldState: { error },
                                    }) => (
                                        <TextField
                                            helperText={error ? error.message : null}
                                            error={!!error}
                                            multiline
                                            rows={4}
                                            onChange={onChange}
                                            value={value}
                                            fullWidth
                                            label="Description"
                                            variant="outlined"
                                        />
                                    )}
                                />
                            </div>

                            <div className="mb-4">
                                <Controller
                                    name="salary"
                                    rules={{ required: 'Salary is required' }}
                                    control={control}
                                    render={({
                                        field: { onChange, value },
                                        fieldState: { error },
                                    }) => (
                                        <>
                                            <FormControl fullWidth>
                                                <InputLabel id="salary-select-label">Salary</InputLabel>
                                                <Select
                                                    labelId="salary-select-label"
                                                    value={value}
                                                    label="Salary"
                                                    fullWidth
                                                    onChange={onChange}
                                                >
                                                    <MenuItem value=''>None</MenuItem>
                                                    <MenuItem value='Under $50K'>Under $50K</MenuItem>
                                                    <MenuItem value='$50K - 60K'>$50K - $60K</MenuItem>
                                                    <MenuItem value='$60K - 70K'>$60K - $70K</MenuItem>
                                                    <MenuItem value='$70K - 80K'>$70K - $80K</MenuItem>
                                                    <MenuItem value='$80K - 90K'>$80K - $90K</MenuItem>
                                                    <MenuItem value='$90K - 100K'>$90K - $100K</MenuItem>
                                                    <MenuItem value='$100K - 125K'>$100K - $125K</MenuItem>
                                                    <MenuItem value='$125K - 150K'>$125K - $150K</MenuItem>
                                                    <MenuItem value='$150K - 175K'>$150K - $175K</MenuItem>
                                                    <MenuItem value='$175K - 200K'>$175K - $200K</MenuItem>
                                                    <MenuItem value='Over $200K'>Over $200K</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </>

                                    )}
                                />
                            </div>

                            <div className="mb-4">
                                <Controller
                                    name="type"
                                    rules={{ required: 'Job Type is required' }}
                                    control={control}
                                    render={({
                                        field: { onChange, value },
                                        fieldState: { error },
                                    }) => (
                                        <>
                                            <FormControl fullWidth>
                                                <InputLabel id="job-type-select-label">Type</InputLabel>
                                                <Select
                                                    labelId="job-type-select-label"
                                                    value={value}
                                                    label="Type"
                                                    fullWidth
                                                    onChange={onChange}
                                                >
                                                    {options.map((option) => (
                                                        <MenuItem key={option.value} value={option.value}>
                                                            {option.label}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </>

                                    )}
                                />
                            </div>


                            <div className="mb-4">
                                <Controller
                                    name="location"
                                    rules={{ required: 'Location is required' }}
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
                                            label="Location"
                                            variant="outlined"
                                        />
                                    )}
                                />
                            </div>

                            <h3 className='text-2xl mb-5'>Company Info</h3>

                            <div className="mb-4">
                                <Controller
                                    name="company.name"
                                    rules={{ required: 'Company name is required' }}
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
                                            label="Company name"
                                            variant="outlined"
                                        />
                                    )}
                                />
                            </div>

                            <div className="mb-4">
                                <Controller
                                    name="company.description"
                                    rules={{ required: 'Company description is required' }}
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
                                            label="Company description"
                                            variant="outlined"
                                        />
                                    )}
                                />
                            </div>

                            <div className="mb-4">
                                <Controller
                                    name="company.email"
                                    rules={{ required: 'Company email is required' }}
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
                                            label="Contact email"
                                            variant="outlined"
                                        />
                                    )}
                                />
                            </div>

                            <div className="mb-4">
                                <Controller
                                    name="company.phone"
                                    rules={{ required: 'Company phone is required' }}
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
                                            label="Contact phone"
                                            variant="outlined"
                                        />
                                    )}
                                />
                            </div>


                            <div>
                                <button
                                    className='bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline'
                                    type='submit'
                                >
                                    Edit Job
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        )}
    </>)
}
export default EditJobPage