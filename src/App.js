import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {blue800} from 'material-ui/styles/colors';
import './App.css';
import MainPage from './components/MainPage';

class App extends Component {
  render() {
    const muiTheme = getMuiTheme({
      palette: {
        primary1Color: blue800,
      },
    });
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <MainPage/>
      </MuiThemeProvider>
    );
  }
}

export default App;
