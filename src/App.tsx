import PizzaList from "./components/PizzaList";
import { AvailableBasesProvider } from "./components/Context/AvailableBasesContext";
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Pizza Shop</h1>
      </header>
      <main>
      <AvailableBasesProvider> 

         <PizzaList />
      </AvailableBasesProvider>
       
      </main>
    </div>
  );
}

export default App;
