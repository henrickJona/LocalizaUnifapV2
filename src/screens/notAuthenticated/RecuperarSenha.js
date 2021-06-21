import React, { Component } from 'react';
import { StyleSheet, Text, View,  Button, FlatList, ScrollView, TouchableOpacity, SafeAreaView,Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { createAppContainer } from 'react-navigation';
//import { getLightEstimationEnabled } from 'expo/build/AR';
import { createDrawerNavigator} from 'react-navigation-drawer'
import MapView ,{ MAP_TYPES, PROVIDER_DEFAULT,UrlTile } from 'react-native-maps';
import {TextInput} from 'react-native-paper'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Axios from 'axios';
import Loader from '../../Loader'
import api from '../../services/api'
import Toast from 'react-native-simple-toast';
 class RecuperarSenha extends React.Component {
    static navigationOpotions ={
      
    }
    state = {
      usuario: '',
      senha:'',
      email:'',
      csenha:'',
      loading:false,
    };

    recuperarSenha = async () => {
      if(this.state.email.length >0){
       this.setState({loading:true})
        
          try{
            this.setState({loading:true})
const response = await api.post(`/session/${this.state.email}`)
console.log(response)

this.setState({loading:false})
Toast.show('Senha enviada ao seu email!!', Toast.SHORT, ['UIAlertController']);
          }catch(error){
            this.setState({loading:false})
            console.log(error.response.data,'tew')
            /* alert(error.response.data.error) */
            Toast.show(`${error.response.data.error}`, Toast.SHORT, ['UIAlertController']);
          }
       
      }else{
        Alert.alert('Ops','Preencha todos os campos!')
      }

    }
    
    render(){
      return (
          
        <KeyboardAwareScrollView style={estilo.scroll}
        enableOnAndroid={true} extraHeight={130} extraScrollHeight={130}>
          <Loader loading={this.state.loading} /> 
          <View style={estilo.principal}>
            
          <Text  style={estilo.esqsenha}>Insira o email cadastrado e será enviado uma senha temporária ao seu email.</Text>
           
            <TextInput style={estilo.entrada}
              label='E-mail'
              value={this.state.email}
              keyboardType='email-address'
              onChangeText={email => this.setState({ email })}
              theme={{ colors: { primary: "#129794" }}}
              underlineColor='#fff'
            />
            
            <TouchableOpacity style={estilo.botao} onPress={()=>this.recuperarSenha()} >
              <Text style={estilo.botaoTexto}>Recuperar Senha</Text>
            </TouchableOpacity>
            
          </View>
        </KeyboardAwareScrollView>
      );
    }
    
  }
export default RecuperarSenha
const estilo = StyleSheet.create({
  principal:{
    flex: 1,
    flexDirection: 'column',
    justifyContent:'center',
    alignItems: 'center',
    backgroundColor:'#F5F6F8'
  },
  entrada:{
    
    borderRadius: 2,
    width: '100%',
    backgroundColor:'white',height:70,borderColor:'#ECEDEF',borderWidth:1,marginBottom:4
    
  },
  titulo:{
    color:'#477fad',
    
    fontSize:32,
    paddingBottom:40

  },
  botao:{
    borderBottomWidth: 0,
    borderRadius: 10,
    width: '50%',
    backgroundColor:'#129794',
    height:40,
    justifyContent:'center',margin:10
    
  },
  botaoTexto:{
    textAlign:'center',
    fontSize:20,
    color:'white',
    alignItems:'center'
    
  },
  esqsenha:{
    paddingTop:20,
    alignItems:'center',
    color:'#807e7e',
    textAlign:'justify',
    padding:10,
    fontSize:15
  },
  scroll:{
    
    paddingTop:50,
    backgroundColor:'#F5F6F8'
  }

});