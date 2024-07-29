import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { getBlogTagsAsync } from "../blog.api";

function BlogTag() {
  const [searchParams] = useSearchParams();
  const [tags, setTags] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const navigate = useNavigate();

  const handleSelectTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      const tagStr = selectedTags.filter((t) => t !== tag).join(",");
      if (tagStr) searchParams.set("tags", tagStr);
      else searchParams.delete("tags");
    } else {
      const tagStr = [...selectedTags, tag].join(",");
      searchParams.set("tags", tagStr);
    }

    navigate({ pathname: "/blogs", search: `?${searchParams}` });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getBlogTagsAsync();
        if (response.isSuccess) {
          setTags(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (searchParams.get("tags")) {
      setSelectedTags([...(searchParams.get("tags") ?? "").split(",")]);
    } else {
      setSelectedTags([]);
    }
  }, [searchParams]);

  return (
    <>
      <div className="filter-section">
        <div className="title text-lg mb-2 font-semibold relative pb-5">
          Blog Tags
        </div>
        <div className="blog-tag pr-8">
          <ul>
            {tags.map((tag) => (
              <li
                className={
                  selectedTags.indexOf(tag.toLocaleLowerCase()) !== -1
                    ? "active inline-block p-0 mb-1"
                    : "inline-block p-0 mb-1"
                }
                key={tag}
              >
                <button
                  className="border-gray-500 border rounded-3xl text-sm cursor-pointer py-1 px-4 duration-300 mr-1 mb-1 hover:bg-blue-600 hover:border-blue-600 hover:text-white"
                  onClick={() => handleSelectTag(tag)}
                >
                  {tag}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default BlogTag;
