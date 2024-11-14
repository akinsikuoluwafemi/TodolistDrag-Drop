import { useForm, Controller} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { Button, TextField, Checkbox, FormControlLabel, Typography } from "@mui/material";
import DatePicker from "react-date-picker";
import {  useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { BaseServices } from "../services/baseServices";
import { addTodo, setAllTodoTags, updateTodo } from "../state/todos/todoSlice";
import { ITodo } from "../types";
import RenderTags from "./RenderTags";


interface TodoFormProps {
  todo?: ITodo;
  action: string;
  type?: "edit" | "create";
}
//create schema for validation
const schema = yup.object().shape({
  title: yup.string().required('Title is required'),
  description: yup.string().required('Description is required'),
  done: yup.boolean()
})

type ValuePiece = Date | null
// type Value = ValuePiece | [ValuePiece, ValuePiece]

const TodoForm = ({ todo, action, type }: TodoFormProps) => {
  const dispatch = useDispatch();
  const [value, onChange] = useState<any>(new Date());
  const [dateVal, setDateVal] = useState<ValuePiece>(todo?.deadline ? new Date(todo?.deadline) : new Date());
  const [tags, setTags] = useState<string[]>([]);
  const [allTags, setAllTags] = useState<string[]>([]);
  const [editedTags, setEditedTags] = useState(todo?.tags!);
  const [editedUniqueTags, setEditedUniqueTags] = useState<string[]>(todo?.tags!);

  const { control, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: todo?.title || "",
      description: todo?.description || "",
      done: todo?.done || false
    }
  })

  const formRef = useRef<HTMLFormElement>(null);
  const navigate = useNavigate();

   const onSubmit = handleSubmit(async (data) => {
    // form submission logic
    const currentISODate = new Date().toISOString() as string;
    if (type === "create") {
      // add tags here
      const newTodo = {
        ...data,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        deadline: value?.toISOString() as string,
        tags: [...allTags],
        id: Math.random().toString(36).substring(2, 9),
      } as ITodo;
      dispatch(addTodo(newTodo)); // add to redux store
      await BaseServices.createTodo(newTodo);
      await BaseServices.getTodos();
      reset();
      navigate("/");
    } else {
      const editedTodo = {
        ...todo,
        ...data,
        deadline: dateVal,
        tags: editedUniqueTags,
        updatedAt: currentISODate,
      } as ITodo;
      dispatch(updateTodo(editedTodo)); // update in redux store
      await BaseServices.updateTodo(editedTodo);
      navigate(`/todos/${todo?.id}`);
    }
    // dispatch(getAllTags());
    const tagsFromLs = await BaseServices.getAllTags();
    dispatch(setAllTodoTags(tagsFromLs));
  })
  const handleTagDelete = (tag: string, type?: string) => {
    if (type === "edit") {
      const AllTags = editedUniqueTags.filter((t) => t !== tag);
      setEditedUniqueTags(AllTags);
      setEditedTags(AllTags);
      // const editedTodo = {
      //   ...todo,
      //   tags: AllTags,
      //   updatedAt: new Date().toISOString(),
      // } as ITodo;
    } else if (type === "create") { 
      const AllTag = allTags.filter((t) => t !== tag);
      setAllTags(AllTag);
      setTags(AllTag);
    }
}

  const addTag = (newTag: string, type?: string) => {
    if (type === "edit") {
      const newTags = newTag.split(",");
      const combinedTags = [...editedTags, ...newTags].filter((tag) => tag !== "");
      const uniqueTags = [...new Set(combinedTags)];
      setEditedUniqueTags(uniqueTags);
    } else if (type === "create") { 
      const newTags = newTag.split(",");
      const combinedTags = [...tags, ...newTags];
      const uniqueTags = [...new Set(combinedTags)];
      setAllTags(uniqueTags);
      // setTags([]);
    }
  }



  return (
    <div>
      <form
        data-testid="todo-form"
        ref={formRef} onSubmit={onSubmit} className="form" action={action}>
        <Controller
          name="title"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Title"
              variant="outlined"
              error={!!errors.title}
              helperText={errors.title ? errors.title.message : ""}
              fullWidth
              margin="normal"
            />
          )}
        />
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Description"
              variant="outlined"
              error={!!errors.description}
              helperText={errors.description ? errors.description.message : ""}
              fullWidth
              margin="normal"
            />
          )}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Controller
            name="done"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                control={
                  <Checkbox
                    {...field}
                    checked={field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                    color="primary"
                  />
                }
                label="Done"
              />
            )}
          />
          {/* deadline  start*/}
          <Typography
            component="span"
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            {type === "edit" ? (
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                <span>Edit Deadline</span>
                <DatePicker
                  onChange={(val: any) => {
                    setDateVal(val?.toISOString());
                  }}
                  value={dateVal}
                  clearIcon={null}
                  calendarIcon={null}
                  format="dd-MM-y"
                />
              </span>
            ) : (
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                <span>Set Deadline</span>

                <DatePicker
                  onChange={onChange}
                  value={value}
                  clearIcon={null}
                  calendarIcon={null}
                  format="dd-MM-y"
                />
              </span>
            )}
          </Typography>
        </div>
        {/* tags starts */}
        <RenderTags
          type={type}
          editedTags={editedTags}
          editedUniqueTags={editedUniqueTags}
          setEditedTags={setEditedTags}
          tags={tags}
          setTags={setTags}
          allTags={allTags}
          addTag={addTag}
          handleTagDelete={handleTagDelete}
        />
        {/* tags end */}
        {/* deadline end */}
        <br />
        {type === "edit" ? (
          <>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ marginTop: "1rem", marginBottom: "1rem" }}
            >
              Edit Todo
            </Button>
            &nbsp; &nbsp;
            <Button
              type="button"
              variant="contained"
              color="primary"
              sx={{ marginTop: "1rem", marginBottom: "1rem" }}
              onClick={() => navigate(-1)}
            >
              Cancel
            </Button>
          </>
        ) : (
          <Button
            type="submit"
            variant="contained"
            color="primary"
              sx={{ marginTop: "1rem", marginBottom: "1rem" }}
              data-testid="add-todo-btn"
          >
            Add Todo
          </Button>
        )}
      </form>
    </div>
  );
};

export default TodoForm;
