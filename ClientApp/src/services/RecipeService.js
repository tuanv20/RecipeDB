import axios from 'axios' 
const NET_API_URL = 'https://localhost:44475/';
class RecipeService {
    getRecipes() {
        return axios.get(NET_API_URL + "recipe/recipes");
    }

    addRecipe(recipe) {
        return axios.post(NET_API_URL + "recipe/addRecipe", {
            Name: recipe.Name,
            Instructions: recipe.Instructions
        });
    }

    deleteRecipe(id) {
        return axios.post(NET_API_URL + "recipe/delRecipe/" + id);
    }

    getIngredients() {
        return axios.get(NET_API_URL + "recipe/ingredients");
    }

    addIngredient(ingredient) { 
        return axios.post(NET_API_URL + "recipe/addIngredient", {
            IngredientID: ingredient.IngredientID,
            Name: ingredient.Name,
            Cost: ingredient.Cost
        });
    }

    deleteIngredient(id) {
        return axios.post(NET_API_URL + "recipe/delIngredient/" + id);
    }

    updateIngredient(ingredient) {
        return axios.post(NET_API_URL + "recipe/updateIngredient", {
            IngredientID: ingredient.IngredientID,
            Name: ingredient.Name,
            Cost: ingredient.Cost
        });
    }

    getRecipeItems(recipeID) {
        return axios.get(NET_API_URL + "recipe/getRecipeItems/" + recipeID);
    }

    addRecipeItem(recipeItem) {
        return axios.post(NET_API_URL + "recipe/addRecipeItem", {
            ItemID: recipeItem.ItemID,
            IngredientID: recipeItem.IngredientID,
            Quantity: recipeItem.Quantity
        });
    }
}
export default new RecipeService();
