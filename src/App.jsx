import Header from "./components/Header";
import Meals from "./components/Meals";
import CartContextProvider from "./context/CartContext";
import MealsContextProvider from "./context/MealsContext";

function App() {


  return (
    <MealsContextProvider>
      <CartContextProvider>
        <Header />
        <Meals />
      </CartContextProvider>
    </MealsContextProvider>
  );
}

export default App
