import { useContext } from "react";

import Meal from "./Meal";
import { MealsContext } from "../context/MealsContext";

export default function Meals() {
    const {data: meals, error, isLoading} = useContext(MealsContext);

    if (!meals ||  error) {
        return <p>Something went wrong</p>
    }

    if (isLoading) {
        return <p>Fethcing meals...</p>
    }

    return (
        <main className="flex flex-wrap justify-center items-center bg-teal-700">
            {meals.map(meal => <Meal key={meal.id} item={meal} />)}

        </main>
    )
}