import React from 'react';
import {useState} from 'react';
import UpdateButton from './UpdateButton';
import TaskService from '../../services/TaskService'
import 'bootstrap-icons/font/bootstrap-icons.css'

//Component that represents a single task item 
//Makes up the rows of the taskList component 
export default function TaskItem(props){
    let task = props.task;
    let title = task.taskItem;
    if(title.length > 26){
        title = title.substring(0,25) + "...";
    }
    let dueDate = task.dueDate;
    let completeDate = task.completeDate;

    let  [updatePressed, changeUpdateStatus] = useState(false);
    let  [taskComplete, changeComplete] = useState(false);
    

    //When the row is double clicked, change the update status
    let pressUpdate = function(){
        changeUpdateStatus(!updatePressed)
        props.updateTask();
    }

    let deleteTask = function(){
        TaskService.deleteTask(task.id).then((response) =>{
            props.updateTask();
        })
    }

    let completeTask = function() {
        let updateTask = {
            taskItem: title,
            dueDate: dueDate,
            completeDate: task.completeDate == 0 ? Date.now() : 0,
            completed: !task.completed
        }
        TaskService.updateTask(task.id, updateTask).then((response) =>{
            changeComplete(!taskComplete)
            props.updateTask();
            })
    }

    //Returns either an update button or task item depending on updatePressed status
    if(updatePressed == false){
        return(
            //Switches out the task info for an updateButton item on double click
            <tr onDoubleClick={pressUpdate} className="border border-2 border-secondary">
                {/* Strikes through completed task titles */}
                {task.completed ? <td className="text-left" ><s>{title}</s></td>
                : <td className="text-left overflow-auto">{title}</td>}
                <td className="text-center">{TaskService.EpochtoDate(dueDate)}</td>
                {/* Displays complete date if task is completed, empty string otherwise */}
                <td className="text-center">{task.completed ? TaskService.EpochtoDate(completeDate) : " "}</td>
                <td className="text-center">
                    <button type="button" className="btn btn-danger btn-xs" alt="Delete the task" onClick = {deleteTask}>
                    Delete <i class="bi bi-trash"></i>
                    </button>
                    &nbsp;
                    {task.completed ? <button type="button" className="btn btn-secondary btn-xs" alt="Undo Complete" onClick = {completeTask}> Undo </button>
                    : <button type="button" className="btn btn-success btn-xs" alt="Complete the task" onClick = {completeTask}> Complete </button>}
                </td>
            </tr>
        )
    }
    else{
        return(
            <UpdateButton task = {task} pressUpdateCallback = {pressUpdate}/>
        )
    }
}