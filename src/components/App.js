// // import React from 'react';
// // import PropTypes from 'prop-types';
// // // import Helmet from 'react-helmet';
// // // import { Link } from 'react-router';
// // import styles from './App.css'

// // const DEFAULT_TITLE = '60fram.es React Boilerplate';

// // const App = ({ props }) => {
// //   return (
// //     <div className={styles.root}>
// //       {/* <Helmet
// //         titleTemplate={`%s | ${DEFAULT_TITLE}`}
// //         defaultTitle={DEFAULT_TITLE}
// //       /> */}
// //       <div className={styles.logo}>
// //         {/* <Link to="/" title="Home" className={styles.logoContent}>
// //           60fram.es
// //         </Link> */}
// //       </div>
// //       {this.props.children}
// //     </div>
// //   );
// // }

// // App.propTypes = {
// //   //children: PropTypes.node
// // };

// // export default App;
// // import React from "react";
// // import styles from './App.css'
// // // const App = () => React.createElement('div', {
// // // 	onClick() {
// // // 		window.alert('clicked');
// // // 	}
// // // }, 'Hello World.');
// // const App = ({ props }) => {
// //       return (
// //         <div className={styles.root}>
// //           {/* <Helmet
// //             titleTemplate={`%s | ${DEFAULT_TITLE}`}
// //             defaultTitle={DEFAULT_TITLE}
// //           /> */}
// //           <div className={styles.logo}>
// //             {/* <Link to="/" title="Home" className={styles.logoContent}>
// //               60fram.es
// //             </Link> */}
// //           </div>
// //           {this.props.children}
// //         </div>
// //       );
// //     }
// // export default App
// import React,{Children} from "react";
// import { ReactDOM } from "react";
// import PropTypes from "prop-types";
// const ContextType = {
//   // Enables critical path CSS rendering
//   // https://github.com/kriasoft/isomorphic-style-loader
// //   insertCss: PropTypes.any.isRequired,
// //   // Integrate Redux
// //   // http://redux.js.org/docs/basics/UsageWithReact.html
// //   store: PropTypes.shape({
// //     subscribe: PropTypes.any.isRequired,
// //     dispatch: PropTypes.any.isRequired,
// //     getState: PropTypes.any.isRequired,
// //   }).isRequired,
// //   // Apollo Client
// //   client: PropTypes.object.isRequired,
// };
// class App extends React.PureComponent {
//     static propTypes = {
//         context: PropTypes.shape(ContextType).isRequired,
//         children: PropTypes.element.isRequired,
//       };
    
//       static childContextTypes = ContextType;
    
//       constructor(props) {
//         super(props);
//       }
//       getChildContext() {
//         return this.props.context;
//       }
//       render(){
//         const {scripts} = this.props
       
//         return(
//             <>
//             {this.props.children}
//             {scripts.map(script => <script key={script} src={script} />)}
//             </>
//         )
//       }
// }

// export default App
import React, { Children } from 'react';
import PropTypes from 'prop-types';
// import { IntlProvider } from 'react-intl';
// import deepForceUpdate from 'react-deep-force-update';

// import AsyncStripeProvider from './AsyncStripeProvider';
// import { payment } from '../config';

const ContextType = {
  // Enables critical path CSS rendering
  // https://github.com/kriasoft/isomorphic-style-loader
  insertCss: PropTypes.any.isRequired,
  // Integrate Redux
  // http://redux.js.org/docs/basics/UsageWithReact.html
  store: PropTypes.shape({
    subscribe: PropTypes.any,//.isRequired,
    dispatch: PropTypes.any,//.isRequired,
    getState: PropTypes.any,//.isRequired,
  }).isRequired,
  // Apollo Client
  client: PropTypes.object.isRequired,
};

/**
 * The top-level React component setting context (global) variables
 * that can be accessed from all the child components.
 *
 * https://facebook.github.io/react/docs/context.html
 *
 * Usage example:
 *
 *   const context = {
 *     history: createBrowserHistory(),
 *     store: createStore(),
 *   };
 *
 *   ReactDOM.render(
 *     <App context={context}>
 *       <Layout>
 *         <LandingPage />
 *       </Layout>
 *     </App>,
 *     container,
 *   );
 */
class App extends React.PureComponent {

  static propTypes = {
    context: PropTypes.shape(ContextType).isRequired,
    children: PropTypes.element.isRequired,
  };

  static childContextTypes = ContextType;

  constructor(props) {
    super(props);
    this.state = {
      load: false
    };
  }

  getChildContext() {
    return this.props.context;
  }

  componentWillMount() {
    // if (typeof window === 'undefined') {
    //   return;
    // }

    // const googleMaps = (window.google) && (window.google.maps);
    // if (!googleMaps) {
    //   console.log('asdasdasd')
    //   const getGoogleMapsAPIUrl = key => `https://maps.googleapis.com/maps/api/js?key=${key}&libraries=places`
    //   const initGoogleMapsAPI = () => loadScriptAsync(getGoogleMapsAPIUrl(googleMapAPI));
    //   return;
    // }
  }

  componentDidMount() {
    const store = this.props.context && this.props.context.store;
    if (store) {
      this.unsubscribe = store.subscribe(() => {
        const state = store.getState();
        const newIntl = state.intl;
        if (this.intl !== newIntl) {
          this.intl = newIntl;
          if (__DEV__) {
            // eslint-disable-next-line no-console
            console.log('Intl changed — Force rendering');
          }
          deepForceUpdate(this);
        }
      });
    }

    this.setState({
      load: true
    })
  }

  componentWillUnmount() {
    // if (this.unsubscribe) {
    //   this.unsubscribe();
    //   this.unsubscribe = null;
    // }
  }

  render() {
    // NOTE: If you need to add or modify header, footer etc. of the app,
    // please do that inside the Layout component.
    const store = this.props.context && this.props.context.store;
    const state = store //&& store.getState();
    //this.intl = (state && state.intl) || {};
    //const { initialNow, locale, messages } = this.intl;
    //const localeMessages = (messages && messages[locale]) || {};
    const { load } = this.state;
    if (load) {
      return (
        // <AsyncStripeProvider apiKey={payment.stripe.publishableKey}>
        //   <IntlProvider
        //     initialNow={initialNow}
        //     locale={locale}
        //     messages={localeMessages}
        //     defaultLocale="en-US"
        //   >
        <>
            {Children.only(this.props.children)}
        </>
        //   </IntlProvider>
        // </AsyncStripeProvider>
      );
    } else {
      return (
        // <AsyncStripeProvider apiKey={payment.stripe.publishableKey}>
        //   <IntlProvider
        //     initialNow={initialNow}
        //     locale={locale}
        //     messages={localeMessages}
        //     defaultLocale="en-US"
        //   >
        <>
            {Children.only(this.props.children)}
        </>
        //   </IntlProvider>
        // </AsyncStripeProvider>
      );
    }
  }

}

export default App;