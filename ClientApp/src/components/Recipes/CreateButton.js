
import React from 'react';
import {useState} from 'react';
import RecipeService from '../../services/RecipeService'

//Button for submitting a new task to the tasklist
export default function CreateButton(props){

    const [workoutName, setName] = useState("");
    const [workoutType, setType] = useState("");
    const [workoutReps, setReps] = useState("");

    //Generates task data based on inputted values --> adds task to db --> tell Todolist to re-render
    let addTask = async function () {
        let workout = {
            name: workoutName,
            type: workoutType,
            reps: workoutReps
        }
        RecipeService.addWorkout(workout).then(response => {
        props.addTask();
    });
    }

    let deleteAllWorkouts = async function () {
        RecipeService.deleteAllWorkouts().then(response => {
            props.deleteAllWorkoutsCallback();
        })
    }

    return(
        <div>
            <tr>
                <td className="text-center">
                    <input type="text" value={workoutName} className="form-control" placeholder="Enter Workout Name" onChange={(e) => { setName(e.target.value) }} />
                    <input type="text" value={workoutType} className="form-control" placeholder="Enter Workout Type" onChange={(e) => { setType(e.target.value) }} />
                    <input type="text" value={workoutReps} className="form-control" placeholder="Enter Workout Reps" onChange={(e) => { setReps(e.target.value) }} />
                </td>
            </tr>
            <tr>
                <td className="text-center" >
                    <button type="button" className="btn btn-default btn-success" alt="Add New Task" onClick = {addTask} style={{fontSize: '12px'}}>
                    Submit
                    </button>
                </td>
                <td className="text-center" >
                    <button type="button" className="btn btn-danger btn-xs" alt="Add New Task" onClick={deleteAllWorkouts} style={{ fontSize: '12px' }}>
                        Delete All
                    </button>
                </td>
            </tr>
        </div>
    )
}
