import React, { Component } from "react";
//import { DiasHabilesComponent } from './components/DiasHabiles/DiasHabilesComponent';
import Dashboard from './components/Dashboard/index';
import Statistics from './components/Statistics/index';
import './App.css';
import iconDashbord from './components/Statistics/assets/dashboard_32.png';
import iconStatistics from './components/Statistics/assets/combo-chart-32.png';

// function App() {
//   return (
//     <div className="App">
//       <Header mytitle={'STATUS TALLER'}></Header>
//       <Main></Main>
//       <Footer></Footer>
//     </div>
//   );
// }

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _viewDashboard: true,
      _hasLogin: false,
    }

    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);

  }

  handleSignIn = () => {
    this.setState({ _hasLogin: true });
  }

  handleSignOut = () => {
    this.setState({ _hasLogin: false });
  }

  handleDashboardButtom = () => {
    console.log('handleDashboardButtom!!');
    this.setState({ _viewDashboard: true });
  }

  handleStatisticsButtom = () => {
    console.log('handleStatisticsButtom!!');
    this.setState({ _viewDashboard: false });
  }

  componentDidMount() {
    this.setState({ _viewDashboard: true });
  }

  render() {

    const Header = ({ mytitle }) => {
      return (
        <header className="titleComponent" id="Header">
          <div>
            <h2>{mytitle}</h2>
            <div className="row">
              <span>--</span>
              <button onClick={e => this.handleDashboardButtom(e)}><img src={iconDashbord}></img></button>
              <button onClick={e => this.handleStatisticsButtom(e)}><img src={iconStatistics}></img></button>
            </div>
          </div>
        </header>
      );
    }

    const Main = ({ viewDashboard }) => {
      console.log("**** viewDashboard: ", viewDashboard);
      if (viewDashboard) {
        return (
          <main className="flex justify-around" id="Main">
            <Dashboard></Dashboard>
            <p></p>
          </main>
        );
      } else {
        return (
          <main className="flex justify-around" id="Main">
            <Statistics></Statistics>
            <p></p>
          </main>
        );
      }

    }

    const Footer = () => {
      return (
        <footer
          className="titleComponent p-2 text-xs flex justify-around items-center bg-gray-900 text-white"
          id="Footer"
        >
          <div>© 2021 Departamento de TI</div>
        </footer>
      );
    }

    return (
      <div className="App">
        <Header mytitle={'STATUS TALLER'}></Header>
        <Main viewDashboard={this.state._viewDashboard}></Main>
        <Footer></Footer>
      </div>
    );
  }
}

export default App;
