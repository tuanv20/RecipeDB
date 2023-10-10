import 'bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css'
import './RecipePage.css';
import { React, useState, useEffect } from 'react';
import { NavItem } from 'reactstrap';
import { useNavigate, Outlet } from 'react-router-dom';
import SidebarButton from './SidebarButton';
import RecipeHome from './RecipeHome';

export default function RecipePage() {
    const navigate = useNavigate();
    const [sidebarWidth, changeWidth] = useState(0);
    const [page, changePage] = useState("");
    let toggleSidebar = function () {
        if (sidebarWidth !== 0) {
            changeWidth(0);
        }
        else {
            changeWidth(250);
        }
    }

    let displayPage = function (pageName) {
        changePage(pageName);
        navigate("/recipepage/" + pageName)
        toggleSidebar();
    }

    return (
        <div>
            <div className="contentDiv">
                <nav className='sidebar' style={{ width: sidebarWidth }}>
                    <div className='sideheader'> Resources </div>
                    <ul className='sidecontent'>
                        {/* Highlights selected resource when clicked and toggles sidebar */}
                        {page == 'recipes' ?
                            <NavItem className="resourcelink" onClick={() => displayPage("recipes")} style={{ color: "#E0E2DB", fontWeight: 'bold' }}> Recipes </NavItem> :
                            <NavItem value="Recipes" className="resourcelink" onClick={() => displayPage("recipes")}> Recipes </NavItem>
                        }
                        {page == 'ingredients' ?
                            <NavItem value="Ingredients" className="resourcelink" onClick={() => displayPage("ingredients")} style={{ color: "#E0E2DB", fontWeight: 'bold' }}> Ingredients </NavItem> :
                            <NavItem value="Ingredients" className="resourcelink" onClick={() => displayPage("ingredients")}> Ingredients </NavItem>
                        }
                    </ul>
                </nav>
                {window.location.href.includes('home') ?
                    <RecipeHome openSidebar={toggleSidebar} /> : 
                <Outlet />
                }
            </div>
            <SidebarButton togglePressed={toggleSidebar} width={sidebarWidth} />
        </div>
    )
}