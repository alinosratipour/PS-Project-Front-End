import PizzaList from "./components/PizzaList";
import { BaseProvider } from "./components/Context/BaseContext";
import { SizeProvider } from "./components/Context/SizeContext";
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Pizza Shop</h1>
      </header>
      <main>
        <BaseProvider>
          <SizeProvider>
            <PizzaList />
          </SizeProvider>
        </BaseProvider>
      </main>
    </div>
  );
}

export default App;
