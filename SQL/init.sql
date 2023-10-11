USE tuanrecipe;

DROP TABLE IF EXISTS RecipeItems;
DROP TABLE IF EXISTS Ingredients;
DROP TABLE IF EXISTS Recipes;

CREATE TABLE Recipes (
RecipeID SMALLINT AUTO_INCREMENT, 
Name VARCHAR(255) NOT NULL,
Instructions TEXT NOT NULL,
PRIMARY KEY (RecipeID));

CREATE TABLE Ingredients (
IngredientID SMALLINT AUTO_INCREMENT,
Name VARCHAR(255) NOT NULL,
Cost FLOAT(4, 2) NOT NULL, 
PRIMARY KEY (IngredientID));

CREATE TABLE RecipeItems (
recipeItemID SMALLINT AUTO_INCREMENT,
ItemID SMALLINT NOT NULL,
IngredientID SMALLINT NOT NULL,
Quantity TINYINT NOT NULL, 
INDEX idx_item (ItemID, Quantity),
PRIMARY KEY (recipeItemID),
FOREIGN KEY (ItemID) REFERENCES Recipes (RecipeID) ON DELETE CASCADE,
FOREIGN KEY (IngredientID) REFERENCES Ingredients (IngredientID)
);













