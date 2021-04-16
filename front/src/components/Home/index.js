import React, {Component} from 'react';
import './index.scss';
import {NavLink} from 'react-router-dom'
import loading from '../../assets/loading.gif'

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      articles: [],
      page: 10
    }
  }

  componentDidMount() {
    fetch('https://localhost:5000/api/articles')
    .then(res => res.json())
    .then(data => {
      this.setState({articles: data})
    })

    window.scrollTo(0,0)
  }

  render() {

    const articles = this.state.articles.slice(0, this.state.page).map((elem, index) => (
      <li key={index}>
        <NavLink to={`article/${elem.id}/${elem.keywords}`}>
          <div className="img-card"><img src={elem.image} alt="article" /></div>
        </NavLink>
          <div className="text-card">
            <NavLink to={`article/${elem.id}/${elem.keywords}`}>
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

        <ul style={{display: articles.length === 0 && 'none'}} className="articles">
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

export default Home;