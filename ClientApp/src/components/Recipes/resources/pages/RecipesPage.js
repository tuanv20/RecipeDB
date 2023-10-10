import ingredientpic from '../img/ingredient.jpg';
import { useState, useEffect } from 'react';
import RecipeService from "../../../../services/RecipeService";
import RecipeCard from './RecipeCard';  
import AddRecipeModal from './AddRecipeModal';

//Note: Should refactor to have a single page that parses
//the request path using window.location.href to display 
//resource page flexibly within a single component

//Component that represents a page for a specific resource.
//Comprised of several VideoSelect components, each linked to 
//a VideoPage component by a unique video_id 
export default function RecipesPage() {
    //Video data is predefined within this array which is mapped
    //to a collection of VideoSelect components where the data is
    //passed down via props 
    const [update, changeUpdate] = useState(false);
    const [recipes, changeRecipes] = useState([]);
    const [ingredientDict, changeDict] = useState({});

    let submit = function () {
        changeDict({});
    }

    useEffect(() => {
        RecipeService.getRecipes().then((response) => {
            changeRecipes(response.data);
            return response;
        }).catch((response) => console.log(response));
    }, [update, ingredientDict])

    return (
        <body>
            <header class="bg-dark py-3">
                <div class="container px-4 px-lg-5 my-5">
                    <div class="text-center text-white">
                        <h1 class="display-9 fw-bolder">Recipes</h1>
                    </div>
                </div>
            </header>

            <section class="py-5 bg-light">
                <div class="container px-4 px-lg-5 mt-5 bg-light">
                    <AddRecipeModal submitCallback={() => submit()} ingredientDict={ingredientDict} />
                    <div class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
                        {recipes.map(function (element) {
                            return <RecipeCard recipe={element} img={ingredientpic} changeCallback={() => changeUpdate(!update)} />
                        })}
                    </div>
                </div>
            </section>
        </body>
    )
}