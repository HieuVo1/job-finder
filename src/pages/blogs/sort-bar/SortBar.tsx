import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material"
import { useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom";

enum SortItem {
    None = '',
    A_Z = 'A_Z',
    Z_A = 'Z_A',
    OldToNew = 'OldToNew',
    NewToOld = 'NewToOld',
}
function SortBar() {
    const [sortValue, setSortValue] = useState('');
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const handleChange = (event: SelectChangeEvent) => {
        setSortValue(event.target.value);

        switch (event.target.value) {
            case SortItem.A_Z:
                searchParams.set('sortField', 'title');
                searchParams.set('sortOrder', 'ascend');
                break;
            case SortItem.Z_A:
                searchParams.set('sortField', 'title');
                searchParams.set('sortOrder', 'descend');
                break;
            case SortItem.NewToOld:
                searchParams.set('sortField', 'createdAt');
                searchParams.set('sortOrder', 'ascend');
                break;
            case SortItem.OldToNew:
                searchParams.set('sortField', 'createdAt');
                searchParams.set('sortOrder', 'descend');
                break;

            default:
                searchParams.delete('sortField');
                searchParams.delete('sortOrder');
                break;
        }
        navigate({ pathname: '/blogs', search: `?${searchParams}` });
    };

    return (
        <>
            <div className="mr-8 mt-12">
                <FormControl fullWidth  >
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={sortValue}
                        displayEmpty
                        onChange={handleChange}
                    >
                        <MenuItem value={SortItem.None}>
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={SortItem.A_Z}>Alphabetically, A-Z</MenuItem>
                        <MenuItem value={SortItem.Z_A}>Alphabetically, Z-A</MenuItem>
                        <MenuItem value={SortItem.OldToNew}>Old To New</MenuItem>
                        <MenuItem value={SortItem.NewToOld}>New To Old</MenuItem>
                    </Select>
                </FormControl>
            </div>

        </>
    )

}
export default SortBar