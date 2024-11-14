import { FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { allTags, filterByTag } from "../state/todos/todoSlice";
import { useState } from "react";


const SortTodoByTags = () => {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const allTodoTags = useSelector(allTags);
  const dispatch = useDispatch();



  const handleChange = (e: any ) => {
    setSelectedTag(e.target.value);
    dispatch(filterByTag(e.target.value)); 
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Typography
        sx={{
          fontSize: 24,
          fontWeight: "bold",
          marginBottom: "1rem",
        }}
      >
        Sort Todo By Tags
      </Typography>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Tags</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedTag}
          label="Tags"
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {[] || allTodoTags && allTodoTags.map((tag: string) => (
            <MenuItem key={tag} value={tag}>
              {tag}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

export default SortTodoByTags