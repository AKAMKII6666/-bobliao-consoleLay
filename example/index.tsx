import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import consoleLay from '../.';

const App = () => {
  window['consoleLay'] = consoleLay;

  return <div>test consoleLayk</div>;
};

ReactDOM.render(<App />, document.getElementById('root'));
