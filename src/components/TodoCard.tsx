import { Box, Button, Card, CardActions, CardContent, Chip, Typography } from '@mui/material';
import { ITodo } from '../types';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import { Draggable } from '@hello-pangea/dnd';
import moment from 'moment';
import { deleteTodo, setAllTodoTags } from '../state/todos/todoSlice';
import { useDispatch } from 'react-redux';
import { BaseServices } from '../services/baseServices';


interface TodoCardProps {
  todo: ITodo | undefined,
  showActions?: boolean
  index?: number
}

const TodoCardWithActions = ({ todo }: TodoCardProps) => {
    const dispatch = useDispatch();
  const { pathname } = useLocation();
  const navigate = useNavigate();
    const formatedCreatedAt = moment(todo?.createdAt).format(
      "MMMM Do YYYY, h:mm:ss a"
    );
  const formattedUpdatedAt = moment(todo?.updatedAt).format(
    "MMMM Do YYYY, h:mm:ss a"
  );
 const formattedDeadline = moment(todo?.deadline).format(
   "MMMM Do YYYY, h:mm:ss a"
 );

  return (
    <Card
      sx={{ maxWidth: 450 }}
      style={{
        marginBottom: "1rem",
      }}
    >
      <CardContent>
        <Typography
          sx={{ fontSize: 19 }}
          variant="h5"
          color="text.secondary"
          gutterBottom
        >
          Deadline: {formattedDeadline}
        </Typography>
        <Typography
          sx={{ fontSize: 18 }}
          variant="h5"
          color="text.secondary"
          gutterBottom
        >
          Title: {todo?.title}
        </Typography>
        <Typography component="div">
          Description: {todo?.description}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Done: &nbsp; &nbsp;
          {todo?.done ? "Yes" : "No"}
        </Typography>
        <Typography>Creation Time: {formatedCreatedAt}</Typography>
        <br />
        <Typography> Last Updated: {formattedUpdatedAt}</Typography>
        <br />
        <div>
          {todo?.tags?.length!! > 0 && (
            <>
              Tags: &nbsp;
              {todo?.tags?.map((tag) => (
                <Chip sx={{ margin: ".2rem" }} key={tag} label={tag} />
              ))}
            </>
          )}
        </div>
      </CardContent>
      <CardActions>
        <div className="action-btn">
          <div>
            <Link to="/">
              <Button type="button" size="small">
                Back
              </Button>
            </Link>
            &nbsp; &nbsp;
            <Link to={`${pathname}/edit`}>
              <Button type="button" size="small">
                Edit
              </Button>
            </Link>
          </div>
          <div>
            <Button
              color="error"
              onClick={async () => {
                if (confirm("Are you sure you want to delete this todo?")) {
                  dispatch(deleteTodo(todo?.id!!));
                  await BaseServices.deleteTodo(todo?.id!!);
                  const tagsFromLs = await BaseServices.getAllTags();
                  dispatch(setAllTodoTags(tagsFromLs));
                  navigate("/");
                }
              }}
              type="button" // Use type="button" to prevent form submission
              size="small"
            >
              Delete
            </Button>
          </div>
        </div>
      </CardActions>
    </Card>
  );
}

const TodoCardWithoutActions = ({ todo, index }: TodoCardProps) => { // add tags here
  const formatedCreatedAt = moment(todo?.createdAt).format("MMMM Do YYYY, h:mm:ss a");
   const formattedUpdatedAt = moment(todo?.updatedAt).format(
     "MMMM Do YYYY, h:mm:ss a"
   );
  const formattedDeadline = moment(todo?.deadline).format(
    "MMMM Do YYYY, h:mm:ss a"
  );

  return (
    <Draggable draggableId={todo?.id.toString()!!} index={index!!}>
      {(provided) => (
        <div
          style={{ margin: "1rem" }}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          //draggable
        >
          <Card
            sx={{ maxWidth: 450 }}
            style={{
              marginBottom: "1rem",
            }}
          >
            <DragIndicatorIcon />
            <Typography
              sx={{ fontSize: 18, padding: "1rem" }}
              variant="h5"
              color="text.secondary"
              gutterBottom
            >
              Deadline: {formattedDeadline}
            </Typography>
            <CardContent>
              <Typography
                sx={{ fontSize: 18 }}
                variant="h5"
                color="text.secondary"
                gutterBottom
              >
                Title: {todo?.title}
              </Typography>
              <Typography component="div">
                Description: {todo?.description}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                Done: &nbsp; &nbsp;
                {todo?.done ? "Yes" : "No"}
              </Typography>
              <Typography>Creation Time: {formatedCreatedAt}</Typography>
              <br />
              <Typography>Last Updated : {formattedUpdatedAt}</Typography>
              <br />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  flexWrap: "wrap",
                  alignItems: "center",
                  component: "ul",
                }}
              >
                <div>
                  {todo?.tags?.length!! > 0 && (
                    <>
                      Tags: &nbsp;
                      {todo?.tags?.map((tag) => (
                        <Chip sx={{ margin: ".2rem" }} key={tag} label={tag} />
                      ))}
                    </>
                  )}
                </div>
              </Box>
            </CardContent>
          </Card>
        </div>
      )}
    </Draggable>
  );
 }


const TodoCard = ({ todo,showActions, index}: TodoCardProps) => {
  return (
    <div
    >
      {showActions ? (
        <TodoCardWithActions todo={todo} />
      ) : (
        <TodoCardWithoutActions todo={todo} index={index} />
      )}
    </div>
  );
}

export default TodoCard