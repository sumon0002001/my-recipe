import React, {useState} from 'react';
import './App.css';
import Axios from 'axios';
import RecipeList from './components/RecipeList';

const App = () => {
  const YOUR_APP_ID = `57c6a26b`;
  const YOUR_APP_KEY = "64c5f0ec0b638ee1a2545f9dcdd68631";

  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [healthLabels, setHealthLabels] = useState('vegan')
  
  const url = `https://api.edamam.com/search?q=${query}&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}&health=${healthLabels}`;

  const getData = async () => {
    var result = await Axios.get(url)
    setRecipes(result.data.hits);
    console.log(result.data.hits);
  }

  const onSubmit = (e) => {
    e.preventDefault();
    getData()
    setQuery("")
  }

  return (
    <div className="app">
      <h1>Food Recipe Plaza 🍔</h1>
      <form className="app__searchForm" onSubmit={onSubmit}>
        <input
          className="app__input"
          type="text"
          placeholder="enter ingridient"
          autoComplete="Off"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <input className="app__submit" type="submit" value="Search" />
        <select name="" id="" className="app__healthLabels">
          <option onClick={() => setHealthLabels('vegan')}>
            Vegan
          </option>
          <option onClick={() => setHealthLabels('vegetarian')}>
          vegetarian
          </option>
          <option onClick={() => setHealthLabels('paleo')}>
          paleo
          </option>
          <option onClick={() => setHealthLabels('dairy-free')}>
          dairy-free
          </option>
          <option onClick={() => setHealthLabels('gluten-free')}>
          gluten-free
          </option>
          <option onClick={() => setHealthLabels('wheat-free')}>
          wheat-free
          </option>
          <option onClick={() => setHealthLabels('fat-free')}>
          fat-free
          </option>
          <option onClick={() => setHealthLabels('low-sugar')}>
          low-sugar
          </option>
        </select>
      </form>
      <div >
        {recipes !== [] &&
          recipes.map((recipe) => {
          return <RecipeList recipe={recipe} />;
          })}
      </div>

     
    </div>
  );
}

export default App;
