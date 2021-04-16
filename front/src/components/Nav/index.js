import React, {Component} from 'react';
import './index.scss';
import {NavLink} from 'react-router-dom'

class Nav extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fixed: false,
      burger: false
    }
  }

  render() {

    const navigation = [
      {label: 'Actualité', link: '/'},
      {label: 'Business', link: '/categorie/business'},
      {label: 'Technologie', link: '/categorie/technologie'},
      {label: 'Cryptomonnaie', link: '/categorie/cryptomonnaie'}
    ]

    return (
      <nav style={{position: this.props.fix && 'fixed', top: this.props.fix && '0'}}>
        <button onClick={() => this.setState({burger: !this.state.burger})}>
          <div></div>
          <div></div>
          <div></div>
        </button>
        <div onClick={() => this.setState({burger: false})} className="burger-links" style={{height: this.state.burger && '320px'}}>
          {navigation.map((elem, index) => (
            <NavLink key={index} to={elem.link}>
              <div>{elem.label}</div>
            </NavLink>
          ))}
        </div>

        <NavLink to="/" className="website">E-Press</NavLink>

        <div className="links">
          {navigation.map((elem, index) => (
            <NavLink key={index} to={elem.link}>
              <div>{elem.label}</div>
            </NavLink>
          ))}
        </div>
      </nav>
    )
  }
}

export default Nav;