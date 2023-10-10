import { useState, useEffect } from 'react';
import RecipeService from '../../../../services/RecipeService';
import UpdateModal from './UpdateIngredientModal';
import AddRecipeModal from './AddRecipeModal';

//Component within every resource page that contains 
//titles and descriptions of videos (passed in as props from the resource page)
export default function RecipeCard(props) {
    let recipe = props.recipe;
    const [update, changeUpdate] = useState(false);

    useEffect(() => {
        props.changeCallback();
    }, [update])

    let deleteRecipe = function () {
        RecipeService.deleteRecipe(recipe.recipeID).then((response) => {
            return response;
        }).catch((response) => console.log(response));
        props.changeCallback();
    }

    //Video ID is passed from resource page --> VideoSelect --> VideoPage
    return (
        <div class="col mb-5">
            <div class="card h-100">
                <img class="card-img-top" src={props.img} alt="..." style={{ maxWidth: "275px", maxHeight: "150px" }} />
                <div class="card-body p-4">
                    <div class="text-center">
                        <h5 class="fw-bolder">{recipe.name}</h5>
                        {recipe.instructions}
                    </div>
                </div>
                <div class="card-footer p-4 pt-0 border-top-0 bg-transparent d-flex flex-row">
                    <AddRecipeModal recipe={recipe} changeCallback={() => changeUpdate(!update)} edit={true} />
                    <div class="text-center"><a class="btn btn-outline-dark mt-auto m-2" onClick={deleteRecipe}>Delete</a></div>
                </div>
            </div>
        </div>
    )
}