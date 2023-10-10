import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import RecipeService from '../../../../services/RecipeService';

//Basic info modal component that describes 
//website and the tech stack used
export default function UpdateIngredientModal(props) {
    let ingredient = props.ingredient;
    const [name, changeName] = useState(ingredient.name);
    const [cost, changeCost] = useState(ingredient.cost);
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    let editIngredient = function () {
        let newIngredient = {
            IngredientID: ingredient.ingredientID,
            Name: name,
            Cost: cost
        }
        RecipeService.updateIngredient(newIngredient).then((response) => {
            toggle();
            props.updateCallback();
            return response
        }).catch((response) => console.log(response));
    }

    return (
        <div>
            <div class="text-center"><a class="btn btn-outline-dark mt-auto m-2" onClick={toggle}>Edit</a></div>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Edit Ingredient</ModalHeader>
                <ModalBody>
                    <form>
                        <div class="form-group">
                            <label for="exampleInputEmail1">Ingredient Name</label>
                            <input value={name} type="text" class="form-control" aria-describedby="emailHelp" placeholder={name} onChange={(e) => changeName(e.target.value)} />
                        </div>
                        <div class="form-group">
                            <label for="exampleInputPassword1">Cost</label>
                            <input value={cost} type="text" class="form-control" placeholder={cost} onChange={(e) => changeCost(e.target.value)} />
                        </div>
                        <br></br>
                        <Button class="btn btn-primary" onClick={() => editIngredient()}>Submit</Button>
                    </form>
                </ModalBody>
                <ModalFooter>
                </ModalFooter>
            </Modal>
        </div>
    )
}