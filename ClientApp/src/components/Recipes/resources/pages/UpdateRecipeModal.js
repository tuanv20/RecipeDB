import React, { useEffect, useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import RecipeService from '../../../../services/RecipeService';
import IngredientsPage from './IngredientsPage';

export default function UpdateRecipeModal(props) {
    let recipe = props.recipe;
    const [recipeItems, changeRecipeItems] = useState([]);
    const [name, changeName] = useState(recipe.name);
    const [instructions, changeInstr] = useState(recipe.instructions);
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    let ingredientDict = props.ingredientDict;

    useEffect(() => {
        RecipeService.getRecipeItems(recipe.recipeID).then((response) => {
            changeRecipeItems(response.data);
            return response;
        }).catch((response) => console.log(response));
    }, []);


    let updateRecipe = function () {
        console.log(recipeItems);
    }

    return (
        <div>
            <div class="text-center"><a class="btn btn-outline-dark mt-auto m-2" onClick={toggle}>Edit</a></div>
            <Modal size="lg" isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Update Recipe</ModalHeader>
                <ModalBody>
                    <form>
                        <div class="form-group">
                            <label for="exampleInputEmail1">Recipe Name</label>
                            <input value={name} type="text" class="form-control" placeholder={name} onChange={(e) => changeName(e.target.value)} />
                        </div>
                        <div class="form-group">
                            <label for="exampleInputPassword1">Instructions</label>
                            <textarea value={instructions} type="text" class="form-control" rows="4" cols="50" placeholder={instructions} onChange={(e) => changeInstr(e.target.value)} />
                        </div>
                        <br></br>
                        <IngredientsPage ingredientDict={ingredientDict} selector={true} />
                        <br></br>
                        <Button class="btn btn-primary" onClick={() => updateRecipe()}>Submit</Button>
                    </form>
                </ModalBody>
                <ModalFooter>
                </ModalFooter>
            </Modal>
        </div>
    )
}