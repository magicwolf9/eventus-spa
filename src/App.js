import React, {Component} from 'react';
import Router from './Router'
import {createGlobalStyle} from 'styled-components'

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
  }
`;

class App extends Component {
    render() {
        return (
            <React.Fragment>
                <GlobalStyle/>
                <Router/>
            </React.Fragment>
        );
    }
}

export default App;
