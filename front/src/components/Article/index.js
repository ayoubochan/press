import React, {Component} from 'react';
import './index.scss';
import {withRouter, NavLink} from 'react-router-dom'
import {Helmet} from "react-helmet";
import loading from '../../assets/loading.gif'

class Article extends Component {
  constructor(props) {
    super(props)
    this.state = {
      structure: [],
      suggestions: [],
      fixed: false,
      date: '',
      categories: []
    }
  }

  componentDidMount() {
    if(this.state.suggestions.length === 0) this.fetchData()
    window.scrollTo(0,0)
  }

  fetchData() {
    fetch('https://e-press.fr/api/article',
    {
      method: 'POST',
      headers: new Headers({
          'Content-Type': 'application/json',
      }),
      body: JSON.stringify(
          {
            id: this.props.match.params.id,
            keywords: this.props.match.params.keywords
          }
      ),
    })
    .then((res) => {
      if (res.status === 200) {
          return res.json()
      } else {
          window.location.href = '/404'
      }
    })
    .then(data => {
      this.randomPick(data.suggestions, data.structure, data.date, data.categories)
    })
  }

  randomPick(suggestions, structure, date, categories) {
    let array = []
    let random;

    const randomiser = () => {
      random = Math.round(Math.random() * 29);
      array.includes(random) ? randomiser() : array.push(random)

      if(array.length === 3) {
        this.setState({
          structure: structure,
          suggestions: suggestions.filter((elem, index) => array.includes(index)),
          date: date,
          categories: categories.split('/')
        })
      }
      else randomiser()
    }  
    randomiser()
  }

  componentDidUpdate(prevProps) {
    if(prevProps.match.params.id !== this.props.match.params.id) {
      window.scrollTo(0,0)
      this.setState({
        structure: [],
        suggestions: [],
        categories: []
      })
      this.fetchData()
    }
  }

  // seperateParagraphs(content) {
  //   return content.split((/\n/g)||[]).filter(elem => elem !== '').map(elem => (
  //     <p className="paragraph">{elem}</p>
  //   ))
  // }

  render() {

    const article = this.state.structure.slice(1, this.state.structure.length).map((elem, index) => {
      switch(elem.type) {
        case 'image':
          return <img key={index} src={elem.content} alt="article" />
          break;
        case 'subtitle':
            return <p key={index} className="subtitle"><strong>{elem.content}</strong></p>
            break;
        default:
          // return this.seperateParagraphs(elem.content)
          return elem.content.split((/\n/g)||[]).filter(el => el !== '').map((el, idx) => (
            <p key={idx} className="paragraph">{el}</p>
          ))
      }
    })

    const suggestions = this.state.suggestions.map((elem, index) => (
      <div key={index}>
        <NavLink to={`/article/${elem.id}/${elem.keywords}`}>
          <div><img src={elem.image} alt="article" /></div>
          <p>{elem.title}</p>
        </NavLink>
      </div>
    ))

    const categories = this.state.categories.map((elem, index) => (
      <NavLink key={index} to="/">{`#${elem}`}</NavLink>
    ))

    return (
      <div style={{backgroundColor: 'white', minHeight: '300px', position: 'relative'}} className="structure-container">
        <Helmet>
          <title>{this.state.structure[0]?.content}</title>
          <meta name="description" content={this.state.structure[2]?.content.slice(0, 100)} />
        </Helmet>

        {this.state.structure.length === 0 && <img className="loading" src={loading} />}

        <div className="head">
          <h1>{this.state.structure[0]?.content}</h1>
          <div className="tags">{categories}</div>
        </div>

        <div className="article-container">
          <article>
            {article}
          </article>
          {/* style={{position: this.props.fix && 'fixed', top: this.props.fix ? '100px': '0'}} */}
          <div className="suggestions-container">
            <div className="suggestions">
              {suggestions}
            </div>
          </div>
          
        </div>
      </div>
    )
  }
}

export default withRouter(Article);