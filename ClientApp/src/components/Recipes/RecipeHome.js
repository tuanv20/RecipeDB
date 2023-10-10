import "./recipehomepage.css";

export default function RecipeHome(props) {
    return (
        <div className="homeheader">
            <div class="wrapper">
                <h1>Recipe Manager</h1>
                <p class="bio"> Recipe Manager is a project I made to organize all of the recipes
                    I've been working on recently. It is fully comprised of Bootstrap + React components
                    and the routing and business logic is handled by the react-router-dom library and React hooks. You can
                    access all of the resources pages through the sidebar on the left.
                </p>
                <div class="buttonBox">
                    <a class="myButton" onClick={props.openSidebar}>Get Started</a>
                </div>
            </div>
        </div>
    )
}