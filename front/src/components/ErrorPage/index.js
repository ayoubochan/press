import React, {Component} from 'react';
import './index.scss';
import {Helmet} from 'react-helmet';

class ErrorPage extends Component {

  render() {
    return (
      <div className="error">
        <Helmet>
          <title>Page 404</title>
          <meta name="description" content="Page introuvable" />
        </Helmet>
        
        404 | Désolé, la page que vous recherchez est introuvable
      
      </div>
    )
  }
}

export default ErrorPage;