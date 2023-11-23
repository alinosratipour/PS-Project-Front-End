import PizzaMenu from "./components/PizzaMenu/PizzaMenu";
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
              <PizzaMenu />
            </SizeProvider>
          </BaseProvider>
        </ToppingProvider>
      </main>
    </div>
  );
}

export default App;
