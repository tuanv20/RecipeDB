import TaskService from "../../services/TaskService"
export default function DeleteAllButton(props){
    let deleteAllTasks = function(){
        TaskService.deleteAllTasks().then(response => {
            props.deleteAll();
        });
    }
    return(
        <button onClick = {deleteAllTasks} className="btn btn-danger btn-xs" style={{fontSize:"11px", maxWidth: "12vh"}}>Delete All</button>
    )
}