
import React from 'react';
import {useState, useEffect} from 'react';
import TaskItem from './TaskItem';
import 'bootstrap/dist/css/bootstrap.min.css';
import TaskService from '../../services/TaskService'
import './Todolist.css';

//Component that represents the entire task table
//Maps task array to task items that are displayed 
//as rows within the table

export default function TaskList(props){
    let [tasks, setTasks] = useState([]);
    let [fetchCount, incFetchCount] = useState(0);
    let currPage = props.currPage;

    //Sorts the tasks when the sort prop is changed and
    //then changes the task which forces a re-render of the list
    let sortTasks = function(){
      console.log(props.sortProp);
      let sortedTasks;

      switch(props.sortProp){
          case "Task Item": 
            sortedTasks = tasks.sort((a, b) => {
              if (a.taskItem < b.taskItem) {
                return -1;
              }
            });
            break;

          case "Due Date":
            sortedTasks = tasks.sort((a, b) => {
              if (a.dueDate < b.dueDate) {
                return -1;
              }
            });
            break;

          case "Complete Date":
            sortedTasks = tasks.sort((a, b) => {
              if (a.completeDate < b.completeDate) {
                return -1;
              }
            });  
            break;
          
          default:
            sortedTasks = tasks;
        }
        console.log(sortedTasks);
        return sortedTasks;
    }

    //currPage is passed in as a prop from pageNav component 
    //5 tasks per page are then rendered accordingly 
    let getTasksForPage = function(tasksArr, page){
      let pageTasks = [];
      for(let i = 0; i < tasksArr.length; i++){
        let pagelo = (page - 1) * 5;
        let pagehi = (page * 5);
        if(i >= pagelo && i < pagehi){
          pageTasks.push(tasksArr[i]);
        }
      }
      return pageTasks;
    }

    //Main functionality for re-rendering task list,
    //most components that force re-renders will call this 
    let update = function(){
      incFetchCount(fetchCount + 1);
    }

    //Fetch the tasks that are currently in the database
    //Depends on fetchCount which will be incremented whenever a change is 
    //made to the database and other props that indicate the need for a re-render

    useEffect(() => {
      switch (props.filterProp){
        case "Completed":
          TaskService.getAllCompletedTasks(props.searchText).then((response) =>{
            setTasks(response.data);
            return response;
          }).catch( (response) => console.log(response));
          break;

        case "Unfinished":
          TaskService.getAllUnfinishedTasks(props.searchText).then((response) =>{
            setTasks(response.data);
            return response;
          }).catch( (response) => console.log(response));
          break;

        default: //All case
          TaskService.getAllTasks(props.searchText).then((response) =>{
            setTasks(response.data);
            return response;
          }).catch( (response) => console.log(response));
          break;
      }
    }, [fetchCount, props.submitProp, props.filterProp, props.searchText, props.currPage, props.deleteProp, props.sortProp])

    //Updates the global task list whenever tasks are updated
    useEffect( () => {
      props.updateTasks(tasks);
    }, [tasks])


    //If the update is not fed, return the table row; otherwise, return the update button 
    return (
          <div className='tasklistcontainer'>
            <table className="table table-hover table-dark rounded-bottom overflow-hidden">
              <thead>
                <tr>  
                  <th className = "text-center">Task</th>
                  <th className = "text-center">Due Date</th>
                  <th className = "text-center">Complete Date</th>
                  <th className = "text-center">Tools</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  {(tasks.length === 0)?<td colSpan="5" className="text-center"> Nothing to do </td> : null}
                </tr>
                {/* Maps tasks for the current page (and sorts them if applicable) to TaskItems which are then displayed in the task list */}
                {sortTasks(getTasksForPage(tasks, currPage)).map(function(element){
                  return <TaskItem key = {element.id} updateTask = {update} task = {element}/>
                })}
              </tbody>
            </table>
          <
          </div>
      )
}