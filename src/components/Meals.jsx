import Meal from "./Meal";
import useFetch from "../hooks/useFetch";

const config = {method: "GET"};

export default function Meals() {
    const {data: meals, error, isLoading: isFetching} = useFetch("http://localhost:3000/meals", config);

    if (error) {
        return <p>ERROR MEALS</p>
    }

    if (isFetching) {
        return <p>Fetching meals...</p>
    }

    return (
        <main className="flex flex-wrap justify-center items-center bg-teal-700">
            {meals.map(meal => <Meal key={meal.id} name={meal.name} price={meal.price} image={meal.image} />)}

        </main>
    )
}