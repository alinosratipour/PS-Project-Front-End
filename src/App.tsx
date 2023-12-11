import PizzaMenu from "./components/PizzaMenu/PizzaMenu";
import ContextProvider from "./components/Context/ContextProvider";
import NavBar from "./components/NavBar/NavBar";

function App() {
  return (
    <div className="App">
      <header>
        
      </header>
      <main>
        <ContextProvider>
             <NavBar showBasketIcon={false}/>
             <PizzaMenu />
     
       
        </ContextProvider>
      </main>
    </div>
  );
}

export default App;
