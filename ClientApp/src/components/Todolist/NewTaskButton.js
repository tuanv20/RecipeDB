
import React from 'react';
import {useState} from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import TaskService from '../../services/TaskService'

//Button for submitting a new task to the tasklist
export default function NewTaskButton(props){

    const [title, setTitle] = useState("");
    const [date, changeDate] = useState(new Date());

    //Generates task data based on inputted values --> adds task to db --> tell Todolist to re-render
    let addTask = async function(){
        let task = {
            taskItem: null,
            dueDate: 0,
            completeDate: 0,
            completed: false

        }
        task.taskItem = title;
        task.dueDate = TaskService.dateToEpoch(date);
        setTitle("");
        changeDate(new Date());
        props.submitTask(task);
    }

    return(
        <div>
            <tr>
                <td className="text-center">
                    <input type="text" value = {title} className = "form-control"  placeholder="Type your task here. (Required)" onChange = {(e) => {setTitle(e.target.value)}}/>
                </td>
            </tr>
            <tr>
                <td className="text-center" >
                    <DatePicker value = {date} onChange={changeDate} selected = {date} />
                </td>
                <td className="text-center" >
                    <button type="button" className="btn btn-default btn-success" alt="Add New Task" onClick = {addTask} style={{fontSize: '12px'}}>
                    Submit
                    </button>
                </td>
            </tr>
        </div>
    )
}
