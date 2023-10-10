import React from 'react';
import {useState} from 'react';
import {
    Dropdown,
    DropdownItem,
    DropdownToggle,
    DropdownMenu,
} from 'reactstrap';


//Navbar for todolist: Handles Refresh, Filtering, and Searching functionality 
export default function Navbar(props){
    const [searchText, changeSearchText] = useState("");

    let refreshData = function(){
        changeSearchText("");
        props.changeRefresh();
    }

    let toggleFilterState = function(filter_type){
        props.changeFilter(filter_type);
    }

    let toggleSortState = function(sort_type){
        props.changeSort(sort_type);
    }

    const [filterDropdownOpen, setFilterDropdownOpen] = useState(false);
    const toggleFilterDropdown = () => setFilterDropdownOpen(!filterDropdownOpen);

    const [sortDropdownOpen, setSortDropdownOpen] = useState(false);
    const toggleSortDropdown = () => setSortDropdownOpen(!sortDropdownOpen);

    let searchHandler = function(){
        props.searchTextCallback(searchText);
    }
    return(
        <nav class="navbar navbar-expand-lg navbar-light bg-secondary border border-dark border-2 rounded-top">
            <ul class="navbar-nav">
                <li class="nav-link active">
                    <a class="nav-link text-light px-4" href = "#/todolist" onClick={refreshData}>Refresh</a>
                </li>
                {/* Calls the props callback function which tells Todolist to re-render */}
                <li class="nav-link">
                <Dropdown nav isOpen={sortDropdownOpen} toggle={toggleSortDropdown}>
                        <DropdownToggle nav caret style={{color: 'white', textDecoration: 'none'}}>
                        {props.sortProp == ""? "Sort": props.sortProp}
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem value = "Task Item" onClick={ (e) => toggleSortState(e.target.value) }>Task Item</DropdownItem>
                                <DropdownItem divider />
                                
                            <DropdownItem value = "Due Date" onClick={ (e) => toggleSortState(e.target.value) }>Due Date</DropdownItem>
                            <DropdownItem divider />

                            <DropdownItem value = "Complete Date" onClick={ (e) => toggleSortState(e.target.value) }>Complete Date</DropdownItem>
                        </DropdownMenu>
                </Dropdown>
                </li>
                <li class = "nav-link">
                    <Dropdown nav isOpen={filterDropdownOpen} toggle={toggleFilterDropdown}>
                        <DropdownToggle nav caret style={{color: 'white', textDecoration: 'none'}}>
                        {/* Filter dropdown says filter by default, changes to whatever is selected */}
                        {props.filterProp == "" ? "Filter" : props.filterProp}
                        </DropdownToggle>
                        {/* Calls TaskService object (Axios request) depending on value of Dropdown item selected*/}
                        <DropdownMenu>
                            <DropdownItem value = "All" onClick={ (e) => toggleFilterState(e.target.value) }>All</DropdownItem>
                            <DropdownItem divider />

                            <DropdownItem value = "Completed" onClick={ (e) => toggleFilterState(e.target.value) }>Completed</DropdownItem>
                            <DropdownItem divider />

                            <DropdownItem value = "Unfinished" onClick={ (e) => toggleFilterState(e.target.value) }>Unfinished</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </li>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <li>
                    <div class = "searchbar">
                        <input value = {searchText} class="form-control" type="search" placeholder="Search" aria-label="Search" onChange={ (e) => changeSearchText(e.target.value)} style={{width:'20vh'}}></input>
                        <button class="btn btn-outline-light" type="submit" onClick={searchHandler}>Search</button>
                    </div>
                </li>
            </ul>
            {/* Calls prop callback to search based on search text and re-render Todolist */}
        </nav>
    )   
}