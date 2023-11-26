import PizzaMenu from "./components/PizzaMenu/PizzaMenu";
import { BaseProvider } from "./components/Context/BaseContext";
import { SizeProvider } from "./components/Context/SizeContext";
import { ToppingProvider } from "./components/Context/ToppingContaxt";
import { LoadingProvider } from "./components/Context/LoadingContext";
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Pizza Shop</h1>
      </header>
      <main>
        <LoadingProvider>
          <ToppingProvider>
            <BaseProvider>
              <SizeProvider>
                <PizzaMenu />
              </SizeProvider>
            </BaseProvider>
          </ToppingProvider>
        </LoadingProvider>
      </main>
    </div>
  );
}

export default App;
