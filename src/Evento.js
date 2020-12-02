import React, { Component } from 'react';
import { StyleSheet, Text, View,  Button, FlatList, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Container, Header, Content } from 'native-base';
import { createAppContainer } from 'react-navigation';
//import { getLightEstimationEnabled } from 'expo/build/AR';
import { createDrawerNavigator} from 'react-navigation-drawer'
import MapView ,{ MAP_TYPES, PROVIDER_DEFAULT,UrlTile } from 'react-native-maps';
import {TextInput} from 'react-native-paper'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'


 class Evento extends React.Component {
    static navigationOpotions ={
      
    }
    state = {
      usuario: '',
      senha:'',
      email:'',
      csenha:''
    };
    
    render(){
      return (
          
        <ScrollView style={estilo.principal}
        >
          
          
            
           
            <TouchableOpacity style={{flexDirection:"row", backgroundColor:"#FFF",height:80, width:'95%',alignSelf:"center", borderRadius:9, marginBottom:10}}>
                <View style={{justifyContent:"center", width:"15%",alignItems:"center"}}>
                    <Icon name='info-circle' size={32} color="#95A2B1"/>
                </View>
                <View style={{justifyContent:"center", width:"80%"}}>
                <Text>Titulo do Evento</Text>
                </View>
                
            </TouchableOpacity>
            <TouchableOpacity style={{flexDirection:"row", backgroundColor:"#FFF",height:80, width:'95%',alignSelf:"center", borderRadius:9, marginBottom:10}}>
                <View style={{justifyContent:"center", width:"15%",alignItems:"center"}}>
                    <Icon name='info-circle' size={32} color="#95A2B1"/>
                </View>
                <View style={{justifyContent:"center", width:"80%"}}>
                <Text>Titulo do Evento</Text>
                </View>
                
            </TouchableOpacity>
            <TouchableOpacity style={{flexDirection:"row", backgroundColor:"#FFF",height:80, width:'95%',alignSelf:"center", borderRadius:9, marginBottom:10}}>
                <View style={{justifyContent:"center", width:"15%",alignItems:"center"}}>
                    <Icon name='info-circle' size={32} color="#95A2B1"/>
                </View>
                <View style={{justifyContent:"center", width:"80%"}}>
                <Text>Titulo do Evento</Text>
                </View>
                
            </TouchableOpacity>
          
        </ScrollView>
      );
    }
    
  }
export default Evento
const estilo = StyleSheet.create({
  principal:{
    flex: 1,
    flexDirection: 'column',
    backgroundColor:'#CED2EB',
    paddingTop:45,
  },
  entrada:{
    
    borderBottomWidth: 0,
    marginBottom: 10,
    borderRadius: 2,
    paddingVertical: 5,
    width: '100%',
    backgroundColor:'white'
    
  },
  titulo:{
    color:'#7f7fff',
    
    fontSize:32,
    paddingBottom:40

  },
  botao:{
    borderBottomWidth: 0,
    marginBottom: 10,
    borderRadius: 10,
    paddingVertical: 10,
    width: '50%',
    backgroundColor:'#7f7fff',
    height:40,
    
  },
  botaoTexto:{
    textAlign:'center',
    fontSize:20,
    color:'white'
    
  },
  esqsenha:{
    paddingTop:20,
    alignItems:'center'
  },
  scroll:{
    flex:1,
    paddingTop:70
  }

});