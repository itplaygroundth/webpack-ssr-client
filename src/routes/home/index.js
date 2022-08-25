import React from 'react';
import Home from './Home';
//import fetch from '../../core/fetch';
// import HomeLayout from '../../components/Layout/HomeLayout';

//import { getListingFields } from '../../actions/getListingFields';

export default {

  path: '/',

  async action({store}) {
    const title = "React SSR 2"//store.getState().siteSettings.data.siteTitle;
    const description = "Webpack SSR babel";//store.getState().siteSettings.data.metaDescription;
    const listingFields = {} //store.getState().listingFields.data;
    const layoutType = 1 //store.getState().siteSettings.data.homePageType;

    // if (listingFields === undefined) {
    //   store.dispatch(getListingFields());
    // }
    
    return {
      title,
      description,
      listingFields,
      chunk: 'home',
      component: <Home layoutType={layoutType} />,
    };
  },

};