import PizzaMenu from "./components/PizzaMenu/PizzaMenu";
import { BaseProvider } from "./components/Context/BaseContext";
import { SizeProvider } from "./components/Context/SizeContext";
//import { ToppingProvider } from "./components/Context/ToppingContaxt";
import { LoadingProvider } from "./components/Context/LoadingContext";
import { PizzaProvider } from "./components/Context/PizzaContext";
function App() {
  /*
  for ToppingProvider i used zustand store for just to see
  how it works i might revert it or might just use suztand 
  for all other contaxt as well
  */
  return (
    <div className="App">
      <header className="App-header">
        <h1>Pizza Shop</h1>
      </header>
      <main>
        <LoadingProvider>
          {/* <ToppingProvider> */}
          <BaseProvider>
            <SizeProvider>
              <PizzaProvider>
                <PizzaMenu />
              </PizzaProvider>
            </SizeProvider>
          </BaseProvider>
          {/* </ToppingProvider> */}
        </LoadingProvider>
      </main>
    </div>
  );
}

export default App;
