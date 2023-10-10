import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import RecipeService from '../../../../services/RecipeService';
import IngredientsPage from './IngredientsPage';

//Basic info modal component that describes 
//website and the tech stack used
export default function AddRecipeModal(props) {
    const [name, changeName] = useState("");
    const [instructions, changeInstr] = useState("");
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    let ingredientDict = props.ingredientDict;


    let addRecipe = async function () {
        toggle();
        let newRecipeId;
        let newRecipe = {
            Name: name,
            Instructions: instructions
        }
        RecipeService.addRecipe(newRecipe).then((response) => {
            newRecipeId = response.data;
            for (let key in ingredientDict) {
                let newRecipeItem = {
                    ItemID: newRecipeId,
                    IngredientID: key,
                    Quantity: ingredientDict[key]
                }
                RecipeService.addRecipeItem(newRecipeItem).then((response) => {
                    return response;
                }).catch((response) => console.log(response));
            }
            props.submitCallback();
        }).catch((response) => console.log(response));
        ;
    }
    if (!props.edit) {
        return (
            <div>
                <Button style={{ color: 'success', textDecoration: 'none', fontWeight: 'bold', fontSize: '24px' }} onClick={toggle}>
                    Add Recipe
                </Button>
                <Modal size="lg" isOpen={modal} toggle={toggle}>
                    <ModalHeader toggle={toggle}>Add Recipe</ModalHeader>
                    <ModalBody>
                        <form>
                            <div class="form-group">
                                <label for="exampleInputEmail1">Recipe Name</label>
                                <input value={name} type="text" class="form-control" aria-describedby="emailHelp" placeholder={name} onChange={(e) => changeName(e.target.value)} />
                            </div>
                            <div class="form-group">
                                <label for="exampleInputPassword1">Instructions</label>
                                <textarea value={instructions} type="text" class="form-control" rows="4" cols="50" placeholder={instructions} onChange={(e) => changeInstr(e.target.value)} />
                            </div>
                            <br></br>
                            <IngredientsPage ingredientDict={ingredientDict} selector={true} />
                            <br></br>
                            <Button class="btn btn-primary" onClick={() => addRecipe()}>Submit</Button>
                        </form>
                    </ModalBody>
                    }
                    <ModalFooter>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
    else {
        return (
            <div>
                 <div class="text-center"><a class="btn btn-outline-dark mt-auto m-2" onClick={toggle}>Edit</a></div>
                <Modal size="lg" isOpen={modal} toggle={toggle}>
                    <ModalHeader toggle={toggle}>Update Recipe</ModalHeader>
                    <ModalBody>
                        <form>
                            <div class="form-group">
                                <label for="exampleInputEmail1">Recipe Name</label>
                                <input value={name} type="text" class="form-control" aria-describedby="emailHelp" placeholder={name} onChange={(e) => changeName(e.target.value)} />
                            </div>
                            <div class="form-group">
                                <label for="exampleInputPassword1">Instructions</label>
                                <textarea value={instructions} type="text" class="form-control" rows="4" cols="50" placeholder={instructions} onChange={(e) => changeInstr(e.target.value)} />
                            </div>
                            <br></br>
                            <IngredientsPage ingredientDict={ingredientDict} selector={true} />
                            <br></br>
                            <Button class="btn btn-primary" onClick={() => addRecipe()}>Submit</Button>
                        </form>
                    </ModalBody>
                    <ModalFooter>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}