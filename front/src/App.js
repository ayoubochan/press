import React, {Component} from 'react';
import './App.scss';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Home from './components/Home/index'
import Category from './components/Category/index'
import Article from './components/Article/index'
import ErrorPage from './components/ErrorPage/index'
import Nav from './components/Nav/index'
import Footer from './components/Footer/index'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fixNav: false
    }
  }

  componentDidMount() {
    window.onscroll = () => {
      if (window.scrollY >= 200 && !this.state.fixNav) this.setState({fixNav: true})
      else if (window.scrollY <= 0 && this.state.fixNav) this.setState({fixNav: false})

    }
  }

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Nav fix={this.state.fixNav} />
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/article/:id/:keywords" component={Article} />
            <Route path="/categorie/:category" component={Category} />
            <Route path="*" component={ErrorPage} />
          </Switch>
          <Footer />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
