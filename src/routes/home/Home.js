import React from 'react';
import PropTypes from 'prop-types';
// import { graphql, compose, gql } from 'react-apollo';
// import { FormattedRelative } from 'react-intl';
import { compose } from 'recompose';
import withStyles from 'isomorphic-style-loader/withStyles';
import s from './Home.css';
import cx from 'classnames';
//import Home from './../../components/Home';
//import { FormattedMessage } from 'react-intl';




class Homepage extends React.Component {
  static propTypes = {
    
  };

  static defaultProps = {
    
  }

  render() {
    const {  layoutType } = this.props;
   

    let staticInfoCollection = {}
 
    
    return (
      <div className={s.root}>
        <h1>Home Routes</h1>
      </div>
    );
  }
}
export default Homepage
// export default compose(
//   withStyles(s),
// )(Homepage);