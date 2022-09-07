import React, { useState, useEffect } from "react";
import { StyleSheet, View, SafeAreaView } from 'react-native'
import { Http } from './src/Services/http';
import { getEnvVariable } from "./src/environment";
import { CatList } from "./src/Components/CatList";
import {PrimaryTheme} from './src/Styles/Themes';
import { BreedCollection } from "./src/Components/BreedSelection";
import {connect} from 'react-redux';
import { Repositry } from "./src/Services/Repositry";
import {Provider} from 'react-redux';
import Store from './src/redux/actions';
import Cats from "./src/Screens/Cats";
let breed_id = '';
let page = 0;
export const App = (props) => {
  


  return (
    <Provider store={Store}>
     <Cats></Cats>
    </Provider>
  )


}


export default App