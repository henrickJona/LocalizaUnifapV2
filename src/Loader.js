
import React, {Component} from 'react';

import Icon from 'react-native-vector-icons/FontAwesome';
import {StyleSheet, Text, View, Modal, ActivityIndicator,TouchableWithoutFeedback} from 'react-native';

const Loader = props=>{
    const {
        loading,
        ...atributes
    } =props

    return(
        
        <Modal
        transparent={true}
        visible={loading}
        animationType='none'
        onRequestClose={()=>{console.log('close modal')}}
        >
            <View style={styles.modalBackground}>
                <View style={styles.activityIndicatorWrapper}>
                    <ActivityIndicator size={"large"} color="#0000ff"  animating={loading}/>
                </View>
            </View>
        </Modal>
        
    )
}
const styles = StyleSheet.create({
    modalBackground:{
        flex:1,
        alignItems:'center',
        flexDirection:'column',justifyContent:'space-around',
        backgroundColor: '#00000040'
    },
    activityIndicatorWrapper:{
        backgroundColor:"#FFFFFF",
        height:100,
        width:100,
        borderRadius:10,
        display:'flex',
        alignItems:'center',
        justifyContent:'space-around'
    }
});

export default Loader;