using System.ComponentModel.DataAnnotations;

namespace NetReact.Models
{
    public class Recipe
    {
        [Key]
        public int RecipeID { get; set; }
        public string name { get; set; }
        public string instructions { get; set; }
    }
}