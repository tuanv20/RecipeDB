import { useState, useEffect } from 'react';
import RecipeService from '../../../../services/RecipeService';
import UpdateIngredientModal from './UpdateIngredientModal';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Button } from 'reactstrap';

//Component within every resource page that contains 
//titles and descriptions of videos (passed in as props from the resource page)
export default function IngredientCard(props) {
    let ingredient = props.ingredient;
    let id = ingredient.ingredientID;
    const [quantity, changeQuantity] = useState(0);
    const [update, changeUpdate] = useState(false);
    let ingredientDict = props.ingredientDict;

    let decQuantity = function () {
        if (quantity > 0) {
            changeQuantity(quantity - 1);
            ingredientDict[id] = quantity - 1;
        }
    }

    let incQuantity = function () {
        changeQuantity(quantity + 1)
        ingredientDict[id] = quantity + 1;
    }

    let deleteIngredient = function (id) {
        let deleteBool = window.confirm("Are you sure you want to delete this item? This will also delete any recipes currently using the item!");
        if (deleteBool) {
            RecipeService.deleteIngredient(id).then((response) => {
                props.changeCallback();
            }).catch((response) => console.log(response));
        }
    }

    useEffect(() => {
        props.changeCallback();
    }, [update])

    return (
        <div class="col mb-5">
            <div class="card h-100">
                <img class="card-img-top" src={props.img} alt="..." style={{ maxWidth: "275px", maxHeight: "150px" }} />
                <div class="card-body p-4">
                    <div class="text-center">
                        <div style={{ fontSize: "1em", fontWeight:"bold" }}>{ingredient.name}</div>
                        <div style={{fontSize: "1em"} }>{"Cost: $" + ingredient.cost}</div>
                    </div>
                </div>
                {props.isSelector != null ?
                    <div class="card-footer border-top-0 bg-transparent d-flex flex-row align-items-center justify-content-center">
                        <Button class="btn btn-link px-2 sm"
                            onClick={() => decQuantity() }>
                            <i class="bi bi-file-minus"
                               style={{ fontSize: '1em' }}
                            />
                        </Button>

                        <input name="quantity" value={quantity}
                            class="form-control"
                            style={ {width: "100%", height: "100%", minWidth:"3em" } }
                            />

                        <Button class="btn btn-link px-2 sm"
                            onClick={() => incQuantity()}>
                            <i class="bi bi-file-plus"
                                style={ {fontSize:'1em'} }
                            />
                        </Button>
                    </div>
                    :
                    <div class="card-footer p-4 pt-0 border-top-0 bg-transparent d-flex flex-row justify-content-center">
                        <UpdateIngredientModal ingredient={ingredient} updateCallback={() => changeUpdate(!update)} />
                        <div class="text-center"><a class="btn btn-outline-dark mt-auto m-2" onClick={() => deleteIngredient(ingredient.ingredientID)} >Delete</a></div>
                    </div>
                }
            </div>
        </div>
    )
}