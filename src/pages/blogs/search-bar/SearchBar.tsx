import { IconButton, InputBase, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import useDebounce from "../../../hooks/useDebouce";

function SearchBar() {
  const [searchData, setSearchData] = useState("");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  // 1:
  const debounceValue = useDebounce(searchData, 500);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      setSearchParam(searchData);
    }
  };

  const setSearchParam = (searchData: string) => {
    if (searchData === "") {
      searchParams.delete("title");
    } else {
      searchParams.set("title", searchData.toLocaleLowerCase());
    }
    navigate({ pathname: "/blogs", search: `?${searchParams}` });
  };

  useEffect(() => {
    setSearchParam(debounceValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceValue]);

  useEffect(() => {
    setSearchData(searchParams.get("title") ?? "");
  }, [searchParams]);

  return (
    <Paper
      className="mr-8 mt-12"
      sx={{
        p: "2px 4px",
        height: "56px",
        display: "flex",
        alignItems: "center",
      }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        value={searchData}
        onChange={(event) => setSearchData(event.target.value)}
        onKeyDown={(event) => handleKeyDown(event)}
        placeholder="Search blogs"
        inputProps={{ "aria-label": "search blogs" }}
      />
      <IconButton
        onClick={() => setSearchData(searchData)}
        type="button"
        sx={{ p: "10px" }}
        aria-label="search"
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}

export default SearchBar;
