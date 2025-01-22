import restrauntList from '../constants';
import RestrauntCard from './RestrauntCard';
import { useState, useEffect } from 'react';
import Shimmer from './Shimmer';

function filterData(searchText,restaurants){
  return restaurants.filter((restaurant)=>
    restaurant?.info?.name.toLowerCase().includes(searchText.toLowerCase())
);
};


const Body =()=>{
  //const initialRestaurants  = restrauntList[0].card.card.gridElements.infoWithStyle.restaurants || [];

  const [restaurants, setRestaurants] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(()=> {
    getRestaurants();
  }, []);

  async function getRestaurants(){
    const response = await fetch(    
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=21.99740&lng=79.00110&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );
    const json = await response.json();
    console.log(json);
    console.log("API Response:", json);
    setRestaurants(json?.data?.cards?.find(
      (card) => card.card?.card?.imageGridCards?.info
    )?.card?.card?.imageGridCards?.info);
  } 
  

    return(
      <>
        <div className='search-container'>
        <input
          type='text'
          value= {searchText}
          placeholder='Search'
          className='search-text'
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
          />
          <button
            className='search-btn'
            onClick={() =>{
              const data = filterData(searchText, restaurants);
              setRestaurants(data);
            }}>search</button>
          </div>

        <div className='cards'>

          {/* {restaurants.map((restaurant) => {
            return (
              <RestrauntCard { ...restaurant.data} key={restaurant.data} />
            );
          })}; */}
          {restaurants && restaurants.length > 0 ? (
          restaurants.map((restaurant) => (
            <RestrauntCard
              // key={restaurant.info.rescard}
              restaurant={restaurant.info}
            />
          ))
          ) : (
          <Shimmer /> // Display a loading shimmer if data isn't available
          )}

        </div>
      </>
    );
};


export default Body;