import React from 'react';
import {useState} from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import TaskService from '../../services/TaskService'

//Component that allows for updates to task item
export default function UpdateButton(props){
    let task = props.task;
    const [date, changeDate] = useState(new Date(TaskService.EpochtoDate(task.dueDate)));
    const [title, setTitle] = useState(task.taskItem);

    let updateTask = function(){
        console.log(date)
        let updateTask = {
            taskItem: title,
            dueDate: TaskService.dateToEpoch(date),
            completeDate: 0,
            completed: task.completed
        }
        TaskService.updateTask(task.id, updateTask).then((response) =>{
            props.pressUpdateCallback();
        })
    }
    return(
        //Uses standard form text input for changes to title and react-date-picker for changes to due date
        <tr>
            <td className="text-center">
                <input type="text" value = {title} className = "form-control"  placeholder="Type your task here. (Required)" onChange = {(e) => {setTitle(e.target.value)}}/>
            </td>
            <td className="text-center" >
                <DatePicker selected = {new Date(TaskService.EpochtoDate(date))} onChange={date => changeDate(date)} />
            </td>
            <td className="text-end">

            </td>
            <td className="text-end">
                <button type="button" className="btn btn-default btn-warning" alt="Update Task" onClick = {updateTask}>
                    <i className="bi bi-pencil-square" ></i> Update
                </button>
            </td>
        </tr>
    )
}
