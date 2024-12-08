import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../lib/store";
import Task from "../components/Task";
import { selectTasks, updateTaskState, selectStatus } from "../lib/store";





const TaskList = () => {

  const dispatch = useDispatch<AppDispatch>();
  const allTasks = useSelector(selectTasks);
  const status = useSelector(selectStatus);

  // get the tasks in order of state (get pinned tasks first)
  // and return only the task in the inbox or pinned
  const filteredTask = [
    ...allTasks.filter((task) => task.state === "TASK_PINNED"),
    ...allTasks.filter((task) => task.state !== "TASK_PINNED")
  ].filter((t => t.state === "TASK_INBOX" || t.state === "TASK_PINNED"));


  const pinTask = (value: string) => {
    dispatch(updateTaskState({id: value, newTaskState: "TASK_PINNED"}))
  }

  const archiveTask = (value: string) => {
    dispatch(updateTaskState({id: value, newTaskState: "TASK_ARCHIVED"}))
  }


  const LoadingRow = (
    <div className="loading-item">
      <span className="glow-checkbox" />
      <span className="glow-text">
        <span>Loading</span> <span>cool</span> <span>state</span>
      </span>
    </div>
  );

 if (status === "loading") {
   return (
     <div className="list-items" data-testid="loading" key={"loading"}>
       {LoadingRow}
       {LoadingRow}
       {LoadingRow}
       {LoadingRow}
       {LoadingRow}
       {LoadingRow}
     </div>
   );
 }

 if (filteredTask.length === 0) {
   return (
     <div className="list-items" key={"empty"} data-testid="empty">
       <div className="wrapper-message">
         <span className="icon-check" />
         <p className="title-message">You have no tasks</p>
         <p className="subtitle-message">Sit back and relax</p>
       </div>
     </div>
   );
 }

  return (
    <div className="list-item">
      {filteredTask.map((task) => (
        <Task
          key={task.id}
          task={task}
          onPinTask={pinTask}
          onArchiveTask={archiveTask}
        />
      ))}
    </div>
  );

}

export default TaskList;