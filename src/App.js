import React, { Component } from "react";
//import { DiasHabilesComponent } from './components/DiasHabiles/DiasHabilesComponent';
import Dashboard from './components/Dashboard/index';
import Statistics from './components/Statistics/index';
import './App.css';
import iconDashbord from './components/Statistics/assets/dashboard_32.png';
import iconStatistics from './components/Statistics/assets/combo-chart-32.png';
import { Navbar, Nav, Container, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';


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

    const Menu = () => {
      return (
        <>
          <Navbar bg="primary" expand="lg" variant="dark">
            <Navbar.Brand href="/">
              {'Status Taller'}
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link onClick={e => this.handleDashboardButtom(e)}>
                  <img src={iconDashbord}></img>
                </Nav.Link>
                <Nav.Link onClick={e => this.handleStatisticsButtom(e)}>
                  <img src={iconStatistics}></img></Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </>
      );
    }

    const Main = ({ viewDashboard }) => {
      console.log("**** viewDashboard: ", viewDashboard);
      if (viewDashboard) {
        return (
          <main className="flex justify-around" id="Main">
            <Dashboard></Dashboard>
            <br />
          </main>
        );
      } else {
        return (
          <main className="flex justify-around" id="Main">
            <Statistics></Statistics>
            <br />
          </main>
        );
      }

    }

    return (
      <div className="App Container">
        <header>
          <Menu></Menu>
        </header>
        <section>
          <br></br>
          <Main viewDashboard={this.state._viewDashboard}></Main>
        </section>
        <footer className="bg-primary p-2 text-xs flex justify-around items-center bg-gray-900 text-white">
          <div>© 2021 Departamento de TI</div>
        </footer>
      </div>
    );
  }
}

export default App;
