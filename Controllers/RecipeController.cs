using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using NetReact.Data;
using NetReact.Models;
using System.Linq;

namespace NetReact.Controllers
{
    [ApiController]
    [Route("[controller]/[action]/{id?}")]
    public class RecipeController : ControllerBase
    {
        private recipeDBContext context;
        public RecipeController(recipeDBContext recipeContext)
        {
            context = recipeContext;
        }

        [HttpGet]
        public IEnumerable<Recipe> recipes()
        {
            return context.recipes.ToArray();
        }

        [HttpPost]
        public int addRecipe(Recipe recipe)
        {
            context.recipes.Add(recipe);
            context.SaveChanges();
            return recipe.RecipeID;
        }

        [HttpPost]
        public void addRecipeItem(RecipeItem recipeItem)
        {
            context.recipeItems.Add(recipeItem);
            context.SaveChanges();
        }

        [HttpGet]
        public IEnumerable<Ingredient> ingredients()
            {
            return context.ingredients.ToArray();
        }
        [HttpPost]
        public void addIngredient(Ingredient ingredient)
        {
            context.ingredients.Add(ingredient);
            context.SaveChanges();
        }
        [HttpPost]
        public void delRecipe(int id)
        {
            var recipe = context.recipes.FirstOrDefault(x => x.RecipeID == id);
            if (recipe != null)
            {
                context.recipes.Remove(recipe);
                context.SaveChanges();
            }
        }

        [HttpPost]
        public void delIngredient(int id)
        {
            var ingredient = context.ingredients.FirstOrDefault(x => x.IngredientID == id);
            if (ingredient != null)
            {
                var recipesWithIngredient = (from ingr in context.ingredients
                                             where ingr.IngredientID == id
                                             join item in context.recipeItems
                                             on ingr.IngredientID equals item.IngredientID
                                             join recipe in context.recipes
                                             on item.ItemID equals recipe.RecipeID
                                             select recipe
                                             ).ToArray();
                foreach (Recipe r in recipesWithIngredient)
                {
                    context.recipes.Remove(r);
                }
                //Have to save changes to the context here otherwise the cascade delete
                //on the recipeitems won't take effect and the ingredient delete will cause a 
                //foreign key issue.
                context.SaveChanges();
                ingredient = context.ingredients.FirstOrDefault(x => x.IngredientID == id);
                context.ingredients.Remove(ingredient);
                context.SaveChanges();
            }
        }

        [HttpPost]
        public void updateIngredient(Ingredient ingredient)
        {
            var editIngredient = context.ingredients.FirstOrDefault(x => x.IngredientID == ingredient.IngredientID);
            if(editIngredient != null)
            {
                editIngredient.name = ingredient.name;
                editIngredient.cost = ingredient.cost;
                context.SaveChanges();
            }
        }
    }
}
