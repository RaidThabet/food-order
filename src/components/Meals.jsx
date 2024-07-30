import { useContext } from "react";

import Meal from "./Meal";
import { MealsContext } from "../context/MealsContext";
import Loading from "./Loading";

export default function Meals() {
    const {data: meals, error, isLoading} = useContext(MealsContext);

    if (!meals ||  error) {
        return <p>Something went wrong</p>
    }

    if (isLoading) {
        return <Loading />
    }

    return (
        <main className="flex flex-wrap justify-center items-center gap-8 bg-stone-300 max-h-full h-auto">
            {meals.map(meal => <Meal key={meal.id} item={meal} />)}

        </main>
    )
}