import React, {Component} from 'react';
import Router from './Router'
import {createGlobalStyle} from 'styled-components'

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
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
