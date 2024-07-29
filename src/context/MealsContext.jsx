/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";

import useFetch from "../hooks/useFetch";

export const MealsContext = createContext({
    meals: [], // { data, isFetching, error }
    filterMeals: () => {}
})

const config = {method: "GET"};


export default function MealsContextProvider({children}) {
    const { data: meals, isLoading, error } = useFetch("http://localhost:3000/meals", config);


    const [filteredMeals, setFilteredMeals] = useState({data: [], error: null, isLoading: true});


    useEffect(() => {
        setFilteredMeals({ data: meals, error: error, isLoading: isLoading });
    }, [meals, error, isLoading])

    function handleFilter(query) {
        if (query.trim() === "") {
            setFilteredMeals({ data: meals, error: error, isLoading: isLoading });
            return;
        }
        const searchTerms = query.toUpperCase().split(" ");
        const newMeals = meals.filter(meal => searchTerms.some(term => meal.name.toUpperCase().includes(term)));
        setFilteredMeals({ data: newMeals, error: error, isLoading: isLoading });
    }

    let mealsContext = {...filteredMeals, filterMeals: handleFilter};


    return (
        <MealsContext.Provider value={mealsContext}>{children}</MealsContext.Provider>
    )
}