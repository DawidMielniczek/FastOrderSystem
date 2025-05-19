import { useEffect, useState } from "react";
import MealItem from "./MealItem";

export default function Meals(){

    const [loadedMeals, setLoadedMeasl] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        async function fetchMeals() {
        setIsLoading(true);
        const response = await fetch('http://localhost:3000/meals');

        if(!response.ok) {
            //
        }
        const meals = await response.json();
        setLoadedMeasl(meals);
        setIsLoading(false);
    }
    fetchMeals();
    
    }, []);
    

    
    
    

    return ( 
        <div>
       {isLoading  ? <p> Loading fetch data...</p> :  <ul id="meals">
             {loadedMeals.map((meal) => (
                <MealItem key={meal.id} meal={meal} />
            ))}
        </ul> }
       </div>
         
    );
}