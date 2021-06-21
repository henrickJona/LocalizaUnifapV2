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
 class Cadastrar extends React.Component {
    static navigationOpotions ={
      
    }
    state = {
      usuario: '',
      senha:'',
      email:'',
      csenha:'',
      loading:false,
    };

    register = async () => {
      if(this.state.usuario.length >0 &&this.state.senha.length >0 && this.state.email.length >0 && this.state.csenha.length >0){
        console.log(this.state.senha.length,this.state.csenha)
        if(this.state.senha === this.state.csenha){
          try{
            this.setState({loading:true})
const response = await api.post('/user',{
  name:this.state.usuario,
  email:this.state.email,
  password: this.state.senha
})

this.setState({loading:false})
Alert.alert(
  'Parabens',
  'Cadastrado com sucesso!',
  [
    
    {text: 'OK', onPress: () => {this.props.navigation.navigate("Index")}},

  ],
  { cancelable: false }
)
          }catch(error){
            this.setState({loading:false})
            console.log(error.response.data,'tew')
            alert(error.response.data.error)
          }
        }else{
          Alert.alert('Ops','Senhas diferentes!')
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
            
          <Text  style={estilo.esqsenha}>Cadastrando-se, você pode criar eventos, visivel a todos.</Text>
            <TextInput style={estilo.entrada}
              label='Usuário'
              value={this.state.usuario}
              onChangeText={usuario => this.setState({ usuario })}
              theme={{ colors: { primary: "#129794" }}}
              underlineColor='#fff'
            />
            <TextInput style={estilo.entrada}
              label='E-mail'
              value={this.state.email}
              keyboardType='email-address'
              onChangeText={email => this.setState({ email })}
              theme={{ colors: { primary: "#129794" }}}
              underlineColor='#fff'
            />
            <TextInput
              label='Senha'
              style={estilo.entrada}
              secureTextEntry={true}
              value={this.state.csenha}
              onChangeText={csenha => this.setState({ csenha })}
              theme={{ colors: { primary: "#129794" }}}
              underlineColor='#fff'
            /> 
            <TextInput
              label='Repita a Senha'
              style={estilo.entrada}
              secureTextEntry={true}
              value={this.state.senha}
              onChangeText={senha => this.setState({ senha })}
              theme={{ colors: { primary: "#129794" }}}
              underlineColor='#fff'
            /> 
            <TouchableOpacity style={estilo.botao} onPress={()=>this.register()} >
              <Text style={estilo.botaoTexto}>Criar conta</Text>
            </TouchableOpacity>
            
          </View>
        </KeyboardAwareScrollView>
      );
    }
    
  }
export default Cadastrar
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
    flex:1,
    paddingTop:50,
    backgroundColor:'#F5F6F8'
  }

});