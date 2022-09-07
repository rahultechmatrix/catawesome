import React, { useState, useEffect } from "react";
import { StyleSheet, View, SafeAreaView } from 'react-native'
import { Http } from '../Services/http';
import { getEnvVariable } from "../environment";
import { CatList } from "../Components/CatList";
import { PrimaryTheme } from '../Styles/Themes';
import { BreedCollection } from "../Components/BreedSelection";
import { connect } from 'react-redux';
import { Repositry } from "../Services/Repositry";


let breed_id = '';
let page = 0;
export const Cats = (props) => {
  const [catList, setCatList] = useState([]);
  const [breed, setBreeds] = useState([]);
  //const [page, setPage] = useState(0);
  const [value, setValue] = useState(null);
  const [offset, setOffset] = useState(1)
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    // Update the document title using the browser API
    getBreedData();
    getCatData();

  }, []);

  const getBreedData = async () => {
    const breeds = await Http.get(getEnvVariable().url + 'breeds');
    setBreeds(breeds);
  }

  const getCatData = async (force = false) => {

    try {
      await props.getCatItems(
        {
          loading: false,
          loaded: false,
          pageNo: page,
          id: breed_id
        },
        force,
      );
    } catch (e) {
      setLoading(false)
    }

  }

  const getCatMoreData = async (force = false) => {
    try {
      await props.getCatItems(
        {
          loading: false,
          loaded: false,
          pageNo: page + 1,
          id: breed_id
        },
        force,
      );
    } catch (e) {
      setLoading(false)
    }
  }


  const selectedValue = (id, name) => {
    setValue(name);
    breed_id = id;
    page = 0;
    setCatList([]);
    getCatData();
  }




  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.root}>
        <BreedCollection breed={breed} onChange={selectedValue}></BreedCollection>
        <CatList catData={props.catItems} offset={offset} loading={props.catItemsLoading} loadMore={getCatMoreData}></CatList>
      </View>
    </SafeAreaView>
  )


}
const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  root: {
    padding: 10,
    backgroundColor: PrimaryTheme.$TEXT_ICON_COLOR,
  },

  label: {
    position: 'absolute',
    backgroundColor: PrimaryTheme.$TEXT_ICON_COLOR,
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },


});
const mapStateToProps = (state) => {

  return {
    catItems: state.catReducer.catItems,
    catItemsLoading: state.catReducer.loading,
    catItemsLoaded: state.catReducer.loaded,
    page: state.catReducer.pageNo
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getCatItems: (status, force) =>
      dispatch(Repositry.getCatItems(status, force)),

  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Cats);