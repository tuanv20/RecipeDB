import React, { useEffect } from 'react';
import {useState} from 'react';

//Implements pagination for Todolist 
export default function PageNav(props) {
    const [pages, setPages] = useState(0);
    //Array used for mapping of page number to frontend bootstrap pagination component 
    const [pageArray, setPageArray] = useState([]);
    const [currPage, setCurrPage] = useState(1);
 
    //Updates page count when tasks are updated
    useEffect( () => {
        //Maximum of 5 tasks per page
        setPages(parseInt(props.taskProp.length / 6) + 1);
    }, [props.taskProp])

    //Updates page array when page count is updated
    //Note: We need two separate useEffect hooks since 
    //useState React hook updates are not synchronous 
    useEffect( () =>{
        let setArr = [];
        for(let i = 0; i < pages; i++){
            setArr.push(i+1);
        }
        setPageArray(setArr);
    }, [pages])

    let togglePage = function(page){
        props.changeGlobalPage(parseInt(page));
        setCurrPage(parseInt(page));
    }

    return(
        <nav aria-label="Page navigation example">
            <ul class="pagination pagination-sm">
                {/* Disables previous button if on first page; otherwise, decrement page number and re-render accordingly */}
                {currPage == 1 ?
                <li class="page-item disabled">
                    <a class="page-link" onClick={() => togglePage(currPage - 1)} aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                    </a>
                </li> 
                :
                <li class="page-item">
                    <a class="page-link" onClick={() => togglePage(currPage - 1)} aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                    </a>
                </li> 
                }
                
                {/* Creates an array from 1 to pages to map to the pages in the pagination nav*/}
                { pageArray.map(function(element){
                    {/* Highlights the currently selected page number */}
                    if(currPage == element){
                        return <li class="page-item active"><a class="page-link" onClick={ (e) => togglePage(e.target.innerHTML)}>{element}</a></li>
                    }
                    else{
                        return <li class="page-item"><a class="page-link" onClick={ (e) => togglePage(e.target.innerHTML)}>{element}</a></li>
                    }
                })}

                {/* Disables next button if on last page; otherwise increment page number and re-render accordingly */}
                {currPage == pages ? 
                <li class="page-item disabled">
                    <a class="page-link" onClick={() => togglePage(currPage + 1)} aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                    </a>
                </li>
                :
                <li class="page-item">
                    <a class="page-link" onClick={() => togglePage(currPage + 1)} aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                    </a>
                </li>}
            </ul>
        </nav>
    )
}