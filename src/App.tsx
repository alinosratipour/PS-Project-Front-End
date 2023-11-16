import PizzaList from "./components/PizzaList";
import { AvailableBasesProvider } from "./components/Context/AvailableBasesContext";
import {SizeProvider} from "./components/Context/SizeContext"
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Pizza Shop</h1>
      </header>
      <main>
      <AvailableBasesProvider> 

      <SizeProvider>
            <PizzaList />
          </SizeProvider>
      </AvailableBasesProvider>
       
      </main>
    </div>
  );
}

export default App;
