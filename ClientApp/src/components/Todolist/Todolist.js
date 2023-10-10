import './Todolist.css';
import React, {useState, useEffect} from 'react';
import TaskList from './TaskList';
import 'bootstrap';
import NewTaskButton from './NewTaskButton';
import TaskService from '../../services/TaskService'
import Navbar from './Navbar';
import TodoInfo from './TodoInfo';
import PageNav from './PageNav';
import DeleteAllButton from './DeleteAllButton';

//Overarching Todolist component containing the Tasklist,
//NewTaskButton, pageNav, and Navbar. Handles the core
//functionality of passing data between components 
export default function Todolist(props){
    const [taskListProp, updateTaskList] = useState(false);
    const [deleteAllState, deleteAllPressed] = useState(false);
    const [filterState, changeFilterState] = useState("");
    const [sortState, changeSortState] = useState("");
    const [searchText, changeSearchText] = useState("");
    const [globalTasks, setTasks] = useState([]);
    const [globalPage, setPage] = useState(1);
  
    let refreshPressed = function(){
      updateTaskList(!taskListProp);
      changeFilterState("");
      changeSortState("");
      changeSearchText("");
    }

    let searchTextCallbackHandler = function(childSearchText){
      changeSearchText(childSearchText);
    }

    let filterToggle = function(filtertype){
      changeFilterState(filtertype);
    }

    let sortToggle = function(sortType){
      changeSortState(sortType);
    }
  
    let submit = async function(task){
      TaskService.addTask(task).then((response) => {
        updateTaskList(!taskListProp);
      })
    }

    let updateGlobalTasks = function(tasks){
      setTasks(tasks);
    }

    let updateGlobalPage = function(page){
      setPage(page);
    }

    let deletePressed = function(){
      deleteAllPressed(!deleteAllState);
    }

    return ( 
    //Plenty of example of passing props to child components below
    //NOTE: NEVER pass in a props function with ()s, this will call it 
    //for every render and result in an infinite loop of renderings 
    <div className="App-div">
        <div className="content-div">
        <Navbar filterProp = {filterState} changeFilter = {filterToggle} searchTextCallback = {searchTextCallbackHandler} 
        sortProp = {sortState} changeSort = {sortToggle} changeRefresh = {refreshPressed}/>
        <div className='table_div'>
            <TaskList deleteProp = {deleteAllState} submitProp = {taskListProp} filterProp = {filterState} 
            sortProp = {sortState} searchText = {searchText} currPage = {globalPage} updateTasks = {updateGlobalTasks}/>
        </div>
        <div style={{display:'flex', flexDirection:'row'}}>
          <div className='pagesDiv'>
            <PageNav taskProp = {globalTasks} changeGlobalPage = {updateGlobalPage}/>
            <DeleteAllButton deleteAll = {deletePressed}/>
          </div>
          <div className='newTaskDiv'>
              <NewTaskButton submitTask = {submit} />
          </div>
        </div>
        </div>
        <div className = 'info-div'>
          <TodoInfo/>
        </div>
    </div>
    )
}
