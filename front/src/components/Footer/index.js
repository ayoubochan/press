import React, {Component} from 'react';
import './index.scss';
import {NavLink} from 'react-router-dom'
import validate from '../../assets/validate.svg'

class Footer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      click: false
    }
  }

  register() {
    fetch('https://e-press.fr/api/register',
    {
      method: 'POST',
      headers: new Headers({
          'Content-Type': 'application/json',
      }),
      body: JSON.stringify(
          {email: this.state.email}
      ),
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)
      this.setState({click: !this.state.click})
      this.refs.validate.style.animation = 'spawn 3s ease-in-out'
      this.refs.validate.onanimationend = () => this.refs.validate.style.animation = ''
    })
  }

  render() {

    const sections = [
      {label: 'Business', link: '/categorie/business'},
      {label: 'Technologie', link: '/categorie/technologie'},
      {label: 'Cryptomonnaie', link: '/categorie/cryptomonnaie'}
    ]

    return (
      <footer>
        <div className="top-footer">
          <input onChange={(e) => this.setState({email: e.target.value})} placeholder="exemple@gmail.com" type="text" />
          <button onClick={() => this.register()}>S'INSCRIRE</button>
          <img ref="validate" src={validate} alt="validation" />
        </div>
        <div className="main-footer">
          <div className="sections">
            <span>
              Sections
            </span>
            <ul>
              {sections.map((elem, index) => (
                <li key={index}><NavLink to={elem.link}>{elem.label}</NavLink></li>
              ))}
            </ul>
          </div>

          <div className="message">
            Le site web est actuellement dans sa phase de lancement et les newsletters ne sont pas encore effectives.
            <br/><br/>Vous pouvez malgré tout vous inscrire dès maintenant et être averti le moment venu.
          </div>
        </div>
      </footer>
    )
  }
}

export default Footer;