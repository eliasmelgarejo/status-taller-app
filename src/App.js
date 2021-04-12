import React, { Component } from "react";
import Dashboard from './components/Dashboard/index';
import Statistics from './components/Statistics/index';
import Login from './components/login.component';
import HomeComponet from './components/home.component';
import './App.css';
import iconDashbord from './components/Statistics/assets/dashboard_32.png';
import iconStatistics from './components/Statistics/assets/combo-chart-32.png';
import { Navbar, Nav, NavItem, Container, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route, Link, withRouter } from 'react-router-dom';

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

    const navStyle = {
      color: 'white',
    };

    const navLiStyle = {
      padding: '10px',
    }

    const Menu = () => {
      return (
        <>
          <Navbar bg="primary" expand="lg" variant="dark">
            <Navbar.Brand href="/home">
              {/* <Logo /> */}
              {'Censu Servicios'}
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ml-auto">
                {/* <Nav.Link onClick={e => this.handleDashboardButtom(e)}> */}
                <ul className='nav-links'>
                  <Link style={navStyle} to='/dashboard'>
                    <li style={navLiStyle}>
                      {'Status Taller'}
                    </li>
                    {/* <Nav.Link>                    
                      <img src={iconDashbord}></img>
                    </Nav.Link> */}
                  </Link>
                  {/* <Nav.Link onClick={e => this.handleStatisticsButtom(e)}> */}
                  <Link style={navStyle} to='/statistics'>
                    <li style={navLiStyle}>
                      {'Estadisticas'}
                    </li>
                    {/* <Nav.Link>                      
                      <img src={iconStatistics}></img>
                    </Nav.Link> */}
                  </Link>
                  <Link style={navStyle} to='/'>
                    <li style={navLiStyle}>{'Home '}</li>
                    {/* <Nav.Link>{'Logout'}</Nav.Link> */}
                  </Link>
                </ul>
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
          <>
            <br></br>
            <main className="flex justify-around" id="Main">
              <Dashboard></Dashboard>
            </main>
          </>
        );
      } else {
        return (
          <>
            <br></br>
            <main className="flex justify-around" id="Main">
              <Statistics></Statistics>
            </main>
          </>
        );
      }

    }

    const MainDashboard = () => {
      return (
        <>
          <header>
            <Menu></Menu>
          </header>
          <br></br>
          <main className="flex justify-around" id="Main">
            <Dashboard></Dashboard>
          </main>
          <br></br>
          <footer className="bg-primary p-2 text-xs flex justify-around items-center bg-gray-900 text-white">
            <div>Copyright © 2021 Censer Dpto. IT</div>
          </footer>
        </>
      );
    }

    const MainStatistics = () => {
      return (
        <>
          <header>
            <Menu></Menu>
          </header>
          <br></br>
          <main className="flex justify-around" id="Main">
            <Statistics></Statistics>
          </main>
          <br></br>
          <footer className="bg-primary p-2 text-xs flex justify-around items-center bg-gray-900 text-white">
            <div>Copyright © 2021 Censer Dpto. IT</div>
          </footer>
        </>
      );
    }

    const MainLogin = () => {
      return (
        <>
          <br></br>
          <div className="container" style={{ display: 'flex', justifyContent: 'center' }}>
            <div className="column col-md-4" style={{ background: '#007bff', color: "white" }}>
              <div className="auth-wrapper">
                <div className="auth-inner">
                  <Login></Login>
                </div>
              </div>
            </div>
          </div>

        </>
      );
    }

    const MainHome = () => {
      return (
        <>
          <header>
            <Menu></Menu>
          </header>
          <br />
          <div className="container" style={{ display: 'flex', justifyContent: 'center' }}>
            <HomeComponet></HomeComponet>
          </div>
          <br></br>
          <footer className="bg-primary p-2 text-xs flex justify-around items-center bg-gray-900 text-white">
            <div>Copyright © 2021 Censer Dpto. IT</div>
          </footer>
        </>
      );
    }

    return (
      <Router>
        <div className="App">

          <Switch>
            {/* <Route path="/" exact component={MainLogin} /> */}
            <Route path="/" exact component={MainHome} />
            <Route path="/dashboard" component={MainDashboard} />
            <Route path="/statistics" component={MainStatistics} />
            <Route path="/home" component={MainHome} />
          </Switch>

        </div>
      </Router>
    );
  }
}

export default App;
