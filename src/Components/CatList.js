import React, { useState, useEffect } from "react";
import { Text, StyleSheet, View, ActivityIndicator, FlatList, Image, Dimensions } from 'react-native';
import Lightbox from 'react-native-lightbox';
import FastImage from 'react-native-fast-image';

const { width, height } = Dimensions.get('window');

export const CatList = (props) => {

  const renderItem = ({ item }) => {
    // console.log('iiii', item.url)
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          margin: 1,
          justifyContent: 'center'
        }}>
        <Lightbox underlayColor="white">
          <FastImage source={{ uri: item.url, priority: FastImage.priority.normal, }}
            style={styles.imageThumbnail} resizeMode={FastImage.resizeMode.cover} />
        </Lightbox>
      </View>
    )
  }

  const renderFooter = () => {
    return (
      //Footer View with Load More button
      <View style={styles.footer}>
        {props.loading ? (
          <ActivityIndicator
            size={'large'}
            style={{ marginLeft: 8 }} />
        ) : null}
      </View>
    );
  };


  return (
    <FlatList
      data={props.catData}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      ListFooterComponent={renderFooter}
      onScroll={e => {
        let paddingToBottom = 10;
        paddingToBottom +=
          e.nativeEvent.layoutMeasurement.height;
        var currentOffset =
          e.nativeEvent.contentOffset.y;
        var direction =
          currentOffset > props.offset ? 'down' : 'up';
        if (direction === 'down') {
          if (
            e.nativeEvent.contentOffset.y >=
            e.nativeEvent.contentSize.height -
            paddingToBottom
          ) {

            setTimeout(() => {
              props.loadMore();
            }, 1000);
          }
        }

      }}

    />
  )
}

const styles = StyleSheet.create({
  footer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 30
  }
  ,
  imageThumbnail: {
    justifyContent: 'center',
    alignItems: 'center',
    width: width,
    height: height / 2,
    borderWidth: 2,
    borderColor: '#d35647',
    margin: 8,

  },
})