using Microsoft.EntityFrameworkCore;
using NetReact.Models;

namespace NetReact.Data
{
    public class recipeDBContext:DbContext
    {
        public recipeDBContext(DbContextOptions<recipeDBContext> options) :base(options)
        {
        }

        public DbSet<NetReact.Models.Recipe> recipes { get; set; }
        public DbSet<Ingredient> ingredients { get; set; }
        public DbSet<RecipeItem> recipeitems { get; set; }
    }
}
