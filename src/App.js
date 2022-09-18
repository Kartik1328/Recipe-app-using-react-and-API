import React, {useEffect,useState} from "react";
import Recipe from "./recipe";
import "./App.css";

const App = () => {
  const APP_ID="a1edda28";
  const APP_KEY="5deee604e192fc2709ef1be3dc336910";

  const [recipes, setRecipes]= useState([]);
  const [search, setsearch] = useState('');
  const [query, setQuery]= useState('chicken');

  // usestate is a type of variable whose value changes accoding to changes made by developer  or events on the web page and renders accordingly to the changes
  // here back ticks are used instead of double brackets
  // now the API is imported succesfully 

  useEffect(()=> {
     getRecipes();
  }, [query]);

  // here useeffect and use state is used 

  const getRecipes = async()=>{
    const response= await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);

    const data = await response.json();
     setRecipes(data.hits);
     console.log(data.hits);
    };

    // here we are making request from API using async and await and this process takes time 

    // async and await keywords are very important when we want to make request always 

    const updateSearch = e =>{
      setsearch(e.target.value);
    };

    const getSearch = e =>{
      e.preventDefault();
      setQuery(search);
      setsearch('');
      // here the setsearch is empty string because when we type a name of a dish its name should be automatically removed from the search box 
    }

  return (
    <div className="App">
     <form onSubmit={getSearch} className="search-form">
      <input className="search-bar" type="text" value={search} onChange={updateSearch} />
      <button className="search-button" type="submit">
        Search
      </button>
     </form>
     <div className="recipes">
     {recipes.map(recipe=> (
      <Recipe 
      key={recipe.recipe.label}
      // key is unique for every element used in the API 
      title={recipe.recipe.label}
       calories={recipe.recipe.calories}
       image = {recipe.recipe.image} 
       ingredients={recipe.recipe.ingredients} 
       />
     ))}
     </div>
    </div>
  );
};

export default App;
