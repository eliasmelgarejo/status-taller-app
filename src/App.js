//import { DiasHabilesComponent } from './components/DiasHabiles/DiasHabilesComponent';
import Dashboard from './components/Dashboard/index';
import TitleComponent from './components/Dashboard/DashboardHeader/TitleComponent';
//import logo from './logo.svg';
import './App.css';


function Header({ countInCart }) {
  return (
    <header className="titleComponent" id="Header">
      <div><h1>STATUS TALLER</h1></div>
    </header>
  );
}

function Main({ onAddToCart }) {
  return (
    <main className="p-3 flex justify-around" id="Main">
      <Dashboard></Dashboard>
    </main>
  );
}

function Footer() {
  return (
    <footer
      className="titleComponent p-2 text-xs flex justify-around items-center bg-gray-900 text-white"
      id="Footer"
    >
      <div>© 2021 Departamento de TI</div>
    </footer>
  );
}

function App() {
  return (
    <div className="App">
      <Header></Header>
      <Main></Main>
      <Footer></Footer>
    </div>
  );
}

export default App;
