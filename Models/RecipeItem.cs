﻿namespace NetReact.Models;
    using System.ComponentModel.DataAnnotations;
    public class RecipeItem
    {
        [Key]
        public int recipeItemID { get; set; }
        public int ItemID { get; set; }
        public int IngredientID { get; set; }
        public int Quantity { get; set; }
    }