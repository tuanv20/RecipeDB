import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import RecipeService from '../../../../services/RecipeService';

//Basic info modal component that describes 
//website and the tech stack used
export default function AddIngredientModal(props) {
    const [name, changeName] = useState("");
    const [cost, changeCost] = useState("");
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    let addIngredient = function () {
        let newIngredient = {
            Name: name,
            Cost: cost
        }
        RecipeService.addIngredient(newIngredient).then((response) => {
            toggle();
            props.changeCallback();
            return response
        }).catch((response) => console.log(response));
    }

    return (
        <div>
            <Button style={{ color: 'success', textDecoration: 'none', fontWeight: 'bold', fontSize: '24px' }} onClick={toggle}>
                Add Ingredient 
            </Button>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Add Ingredient</ModalHeader>
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
                        <Button class="btn btn-primary" onClick={() => addIngredient()}>Submit</Button>
                    </form>
                </ModalBody>
                <ModalFooter>
                </ModalFooter>
            </Modal>
        </div>
    )
}