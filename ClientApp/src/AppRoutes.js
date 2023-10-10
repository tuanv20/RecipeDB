import { Home } from './components/Home';
import { Route, Routes} from 'react-router-dom';
import RecipePage from './components/Recipes/RecipePage';
import IngredientsPage from './components/Recipes/resources/pages/IngredientsPage';
import RecipesPage from './components/Recipes/resources/pages/RecipesPage';
import RecipeHome from './components/Recipes/RecipeHome';

const AppRoutes = () => (
    <Routes>
        <Route path="/" element={<Home/> } /> 
        <Route path="/recipepage" element={<RecipePage />}>
            <Route path="home" element={< RecipeHome />} />
            <Route path="ingredients" element={<IngredientsPage />} />
            <Route path="recipes" element={<RecipesPage />} />
        </Route>
    </Routes>
)

export default AppRoutes;
