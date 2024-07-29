import { Controller, useForm } from "react-hook-form";
import "react-quill/dist/quill.snow.css";
import { Blog } from "../../data/blog";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/userSlice";
import { AddBlogAsync, getBlogTagsAsync } from "./blog.api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  Autocomplete,
  AutocompleteChangeDetails,
  Checkbox,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { FormInputText } from "../../components/FormTextInput";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

function AddBlogPage() {
  const user = useSelector(selectUser);
  const [blogTags, setBlogTags] = useState<string[]>([]);
  const navigate = useNavigate();
  let selectedTags: string[] = [];

  const handChange = (
    event: React.SyntheticEvent,
    value: Value | Array,
    reason: string,
    details?: AutocompleteChangeDetails<string>
  ) => {
    selectedTags = [...value];
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getBlogTagsAsync();
        if (response.isSuccess) {
          setBlogTags(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Blog>({
    defaultValues: {
      tags: [],
      title: "",
      backgroundUrl: "",
      content: "",
      summary: "",
    },
  });

  const onSubmit = async (data: Blog) => {
    console.log(data);

    data.tags = selectedTags;
    data.authorName = user.username;
    const response = await AddBlogAsync(data);

    if (response.isSuccess && response.data) {
      toast.success("Add Blog successfully");
      return navigate("/blogs");
    } else {
      toast.error(response?.errorMessage);
    }
  };

  return (
    <section>
      <div className="container m-auto max-w-2xl py-24">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <form onSubmit={handleSubmit(onSubmit)}>
            <h2 className="text-3xl text-center font-semibold mb-6">
              Add Blog
            </h2>
            <div className="mb-4">
              <Controller
                name="title"
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
                name="content"
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
                    multiline
                    rows={4}
                    label="Content"
                    variant="outlined"
                  />
                )}
              />
            </div>

            <div className="mb-4">
              <Controller
                name="summary"
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
                    multiline
                    rows={2}
                    label="Summary"
                    variant="outlined"
                  />
                )}
              />
            </div>

            {/* <div className="mb-4">
              <Controller
                name="tags"
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
                    label="tags"
                    variant="outlined"
                  />
                )}
              />
            </div> */}
            <div className="mb-4">
              <Autocomplete
                fullWidth
                multiple
                id="checkboxes-tags-demo"
                options={blogTags}
                sx={{ width: 1000, maxWidth: "100%" }}
                disableCloseOnSelect
                onChange={handChange}
                getOptionLabel={(option) => option}
                renderOption={(props, option, { selected }) => {
                  const { key, ...optionProps } = props;
                  return (
                    <li key={key} {...optionProps}>
                      <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8 }}
                        checked={selected}
                      />
                      {option}
                    </li>
                  );
                }}
                renderInput={(params) => (
                  <TextField {...params} label="Tags" placeholder="Tags" />
                )}
              />
            </div>

            <div className="mb-4">
              <Controller
                name="backgroundUrl"
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
                    label="Background Image"
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
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default AddBlogPage;
