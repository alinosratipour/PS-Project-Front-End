import PizzaMenu from "./components/PizzaMenu/PizzaMenu";
import ContextProvider from "./components/Context/ContextProvider";

function App() {
  return (
    <div className="App">
      <header>
        <h1>Pizza Shop</h1>
      </header>
      <main>
        <ContextProvider>
          <PizzaMenu />
        </ContextProvider>
      </main>
    </div>
  );
}

export default App;
