// import React from 'react';
// import PropTypes from 'prop-types';
// // import Helmet from 'react-helmet';
// // import { Link } from 'react-router';
// import styles from './App.css'

// const DEFAULT_TITLE = '60fram.es React Boilerplate';

// const App = ({ props }) => {
//   return (
//     <div className={styles.root}>
//       {/* <Helmet
//         titleTemplate={`%s | ${DEFAULT_TITLE}`}
//         defaultTitle={DEFAULT_TITLE}
//       /> */}
//       <div className={styles.logo}>
//         {/* <Link to="/" title="Home" className={styles.logoContent}>
//           60fram.es
//         </Link> */}
//       </div>
//       {this.props.children}
//     </div>
//   );
// }

// App.propTypes = {
//   //children: PropTypes.node
// };

// export default App;
// import React from "react";
// import styles from './App.css'
// // const App = () => React.createElement('div', {
// // 	onClick() {
// // 		window.alert('clicked');
// // 	}
// // }, 'Hello World.');
// const App = ({ props }) => {
//       return (
//         <div className={styles.root}>
//           {/* <Helmet
//             titleTemplate={`%s | ${DEFAULT_TITLE}`}
//             defaultTitle={DEFAULT_TITLE}
//           /> */}
//           <div className={styles.logo}>
//             {/* <Link to="/" title="Home" className={styles.logoContent}>
//               60fram.es
//             </Link> */}
//           </div>
//           {this.props.children}
//         </div>
//       );
//     }
// export default App
import React,{Children} from "react";
import { ReactDOM } from "react";
import PropTypes from "prop-types";
const ContextType = {
  // Enables critical path CSS rendering
  // https://github.com/kriasoft/isomorphic-style-loader
//   insertCss: PropTypes.any.isRequired,
//   // Integrate Redux
//   // http://redux.js.org/docs/basics/UsageWithReact.html
//   store: PropTypes.shape({
//     subscribe: PropTypes.any.isRequired,
//     dispatch: PropTypes.any.isRequired,
//     getState: PropTypes.any.isRequired,
//   }).isRequired,
//   // Apollo Client
//   client: PropTypes.object.isRequired,
};
class App extends React.PureComponent {
    static propTypes = {
        context: PropTypes.shape(ContextType).isRequired,
        children: PropTypes.element.isRequired,
      };
    
      static childContextTypes = ContextType;
    
      constructor(props) {
        super(props);
      }
      getChildContext() {
        return this.props.context;
      }
      render(){
        return(
            <>
            {this.props.children}
            </>
        )
      }
}

export default App