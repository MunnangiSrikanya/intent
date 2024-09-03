import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import IntentGrid from './Intent/IntentGrid';
import MessageCenter from './Messages/MessageCenter';
import NavBar from './Navigation/NavBar';
import Welcome from './Welcome/Welcome';
import Header from './Header/Header';

const App: React.FC = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <NavBar />
        <Switch>
          <Route exact path='/' component={Welcome} />
          <Route path='/intent' component={IntentGrid} />
          <Route path='/messages' component={MessageCenter} />
          <Redirect to='/' />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
