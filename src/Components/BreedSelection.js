import React, { useState, useEffect } from "react";
import { StyleSheet, View} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

export const BreedCollection = (props)=>{

    return(
        <View>
             <Dropdown 
             data={props.breed}
          labelField='name'
          valueField="id"
          style={[styles.dropdown,]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          maxHeight={300}
          onChange={item => {            
            props.onChange(item.id,item.name)
          }}>
        </Dropdown>
        </View>
    )
}

const styles= StyleSheet.create({
    dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
      },
      placeholderStyle: {
        fontSize: 16,
      },
      selectedTextStyle: {
        fontSize: 16,
      },
})