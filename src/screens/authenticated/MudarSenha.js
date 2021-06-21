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
import AsyncStorage from '@react-native-async-storage/async-storage';
 class MudarSenha extends React.Component {
    static navigationOpotions ={
      
    }
    state = {
      
      senha:'',
      novaSenha:'',
      csenha:'',
      loading:false,
      user:[]
    };
    componentDidMount(){
this.getuser()
    }

      getuser=async()=>{
        const user = await AsyncStorage.getItem(
         '@LocalizaUnifap:user',
        );
        console.log(JSON.parse(user),'ttttttttt')
       
        this.setState({user:JSON.parse(user)})
        }
    register = async () => {
      if(this.state.novaSenha.length >0 &&this.state.senha.length >0 &&  this.state.csenha.length >0){
        console.log(this.state.senha.length,this.state.csenha)
        if(this.state.senha === this.state.csenha){
          try{
            this.setState({loading:true})
const response = await api.post(`/session/mudarsenha/${this.state.user.id}`,{

  newPassword:this.state.novaSenha,
  password: this.state.senha
})
console.log(response.data)
this.setState({novaSenha:'',csenha:'',senha:''})
this.setState({loading:false})
Toast.show('Senha atualizada com sucesso!!', Toast.SHORT, ['UIAlertController']);
/* Alert.alert(
  'Parabens',
  'Cadastrado com sucesso!',
  [
    
    {text: 'OK', onPress: () => {this.props.navigation.navigate("Index")}},

  ],
  { cancelable: false }
) */
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
            
          <Text  style={estilo.esqsenha}>Preencha corretamente os campos</Text>
            
            <TextInput style={estilo.entrada}
              label='Nova Senha'
              value={this.state.novaSenha}
              secureTextEntry={true}
              onChangeText={novaSenha => this.setState({ novaSenha })}
              theme={{ colors: { primary: "#129794" }}}
              underlineColor='#fff'
            />
            <TextInput
              label='Senha Atual'
              style={estilo.entrada}
              secureTextEntry={true}
              value={this.state.csenha}
              onChangeText={csenha => this.setState({ csenha })}
              theme={{ colors: { primary: "#129794" }}}
              underlineColor='#fff'
            /> 
            <TextInput
              label='Repita a Senha Atual'
              style={estilo.entrada}
              secureTextEntry={true}
              value={this.state.senha}
              onChangeText={senha => this.setState({ senha })}
              theme={{ colors: { primary: "#129794" }}}
              underlineColor='#fff'
            /> 
            <TouchableOpacity style={estilo.botao} onPress={()=>this.register()} >
              <Text style={estilo.botaoTexto}>Atualizar senha</Text>
            </TouchableOpacity>
            
          </View>
        </KeyboardAwareScrollView>
      );
    }
    
  }
export default MudarSenha
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