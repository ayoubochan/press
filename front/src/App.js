import './App.scss';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Home from './components/Home/index'
import Article from './components/Article/index'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/article/:title" component={Article} exact />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
