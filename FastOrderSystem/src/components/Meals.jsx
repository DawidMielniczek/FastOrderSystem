import { useEffect, useState } from "react";
import MealItem from "./MealItem";

export default function Meals(){

    const [loadedMeals, setLoadedMeasl] = useState([]);

    useEffect(() => {
        async function fetchMeals() {
        const respons = await fetch('http://localhost:3000/meals');

        if(!respons.ok) {
            //
        }
        
        const meals = await respons.json();
        setLoadedMeasl(meals);
    }
    fetchMeals();
    }, []);
    

    
    
    

    return (
        <ul id="meals">
             {loadedMeals.map((meal) => (
                <MealItem key={meal.id} meal={meal} />
            ))}
        </ul>
    );
}