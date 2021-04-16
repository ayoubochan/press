import React, {Component} from 'react';
import './index.scss';
import {withRouter, NavLink} from 'react-router-dom'
import loading from '../../assets/loading.gif'

class Category extends Component {
  constructor(props) {
    super(props)
    this.state = {
      articles: [],
      page: 10
    }
  }

  componentDidMount() {
    this.fetchCategory()
    window.scrollTo(0,0)
  }

  componentDidUpdate(prevProps) {
    if(prevProps.match.params.category !== this.props.match.params.category) {
      this.fetchCategory()
    }
  }

  fetchCategory() {
    fetch('http://152.228.218.100:5000/api/category',
    {
      method: 'POST',
      headers: new Headers({
          'Content-Type': 'application/json',
      }),
      body: JSON.stringify(
          {
            category: this.props.match.params.category,
          }
      ),
    })
    .then((res) => {
      if (res.status === 200) {
          return res.json()
      } else {
          return window.location.href = '/404'
      }
    })
    .then(data => {
      this.setState({articles: data})
    })
  }

  render() {

    const articles = this.state.articles.slice(0, this.state.page).map((elem, index) => (
      <li key={index}>
        <NavLink to={`/article/${elem.id}/${elem.keywords}`}>
          <div className="img-card"><img src={elem.image} alt="article" /></div>
        </NavLink>
          <div className="text-card">
            <NavLink to={`/article/${elem.id}/${elem.keywords}`}>
              <p>{elem.title}</p>
            </NavLink>
            <div>
              {elem.categories.split('/').map((category, idx) => (
                <NavLink key={idx} to={`/categorie/${category.toLowerCase()}`}>{`#${category}`}</NavLink>
              ))}
            </div>
            <span>{new Date(elem.date).toISOString().slice(0, 10).split('-').reverse().join(' - ')}</span>
          </div>
        
      </li>
    ))

    return (
      <div style={{backgroundColor: 'white', minHeight: '300px', position: 'relative'}}>
        {this.state.articles.length === 0 && <img className="loading" src={loading} />}

        <ul className="articles">
          {articles}
        </ul>

      {this.state.page < this.state.articles.length &&
      <button className="display-more" onClick={() => this.setState(prevState => ({page: prevState.page + 10}))}>
        Afficher Plus
      </button>}
      
      </div>
    )
  }
}

export default withRouter(Category);