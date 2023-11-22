import PizzaList from "./components/PizzaList";
import { BaseProvider } from "./components/Context/BaseContext";
import { SizeProvider } from "./components/Context/SizeContext";
import { ToppingProvider } from "./components/Context/ToppingContaxt";
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Pizza Shop</h1>
      </header>
      <main>
        <ToppingProvider>
          <BaseProvider>
            <SizeProvider>
              <PizzaList />
            </SizeProvider>
          </BaseProvider>
        </ToppingProvider>
      </main>
    </div>
  );
}

export default App;
