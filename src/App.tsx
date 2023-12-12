import PizzaMenu from "./components/PizzaMenu/PizzaMenu";
import ContextProvider from "./components/Context/ContextProvider";
import NavBar from "./components/NavBar/NavBar";
import "./App.css"
function App() {
  return (
    <div className="App">
    
      <main>
        <ContextProvider>
             <NavBar />
             <PizzaMenu />
     
       
        </ContextProvider>
      </main>
    </div>
  );
}

export default App;
