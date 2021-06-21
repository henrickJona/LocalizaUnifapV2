import React, { Component,useState } from 'react';
import { StyleSheet, Text, View,  Button, FlatList, ScrollView, TouchableOpacity, SafeAreaView,Image,Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { createAppContainer } from 'react-navigation';
//import { getLightEstimationEnabled } from 'expo/build/AR';
import { createDrawerNavigator} from 'react-navigation-drawer'
import MapView ,{ MAP_TYPES, PROVIDER_DEFAULT,UrlTile } from 'react-native-maps';
import {TextInput} from 'react-native-paper'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Loader from '../../Loader'
import Toast from 'react-native-simple-toast';
import { useAuth } from '../../contexts/auth';
function Perfil ({navigation}){
  const { logIn,loading } = useAuth();
const [email,setEmail] = useState('');
const [senha,setSenha] = useState('');

     function register ()  {
        if(senha.length >0 && email.length >0 ){
            try{
              console.log('tetete')
              logIn(email,senha).then((response=>{
                console.log(response.informacao, 'jjjjjjj')
                if(response.informacao === 'Sucesso'){

                }else{
                  Toast.show(`${response.informacao}`, Toast.SHORT, ['UIAlertController']);
                }
                
              }))
            }catch(error){
              console.log(error, 'jjjjjjj')
              Toast.show(`${error}`, Toast.SHORT, ['UIAlertController']);
              /* Alert.alert(error.response.data.message) */
            }
        }else{
          Alert.alert('Ops','Preencha todos os campos!')
        }
      }
  return(
    <KeyboardAwareScrollView style={estilo.scroll}
    contentContainerStyle={{
      flexDirection:'column',
      justifyContent: 'flex-start',paddingVertical:'25%'
    }}
    enableOnAndroid={true} >
      <Loader loading={loading} /> 
        <View style={{ justifyContent:'center',alignItems:'center',flex:1}}>
        <Image
          style={{ height: 160 ,width:200}}

          source={require("../../../assets/localizaUnifapLogin.png")}
        />
      </View>
      <View style={{height:'70%'}} >
      
        
        <TextInput style={estilo.entrada}
          label='E-mail'
          mode='flat'
          underlineColor='#fff'
          keyboardType='email-address'
          theme={{ colors: { primary: "#129794" }}}
          value={email}
          onChangeText={email => setEmail(email)}
        />
        <TextInput
          label='Senha'
          style={estilo.entrada}
          secureTextEntry={true}
          
          value={senha}
          mode='flat'
          underlineColor='#fff'
          theme={{ colors: { primary: "#129794" }}}
          onChangeText={senha => setSenha(senha)}
        /> 
       
        <TouchableOpacity style={estilo.botao} onPress={()=> register()} >
          <Text style={estilo.botaoTexto}>Entrar</Text>
        </TouchableOpacity>
        <View style={{flexDirection:'row',justifyContent:'center'}}>
         
          <Text  style={estilo.titulo}>Ainda não tem uma conta?
          <TouchableOpacity style={{height:17}} onPress={()=> navigation.navigate("Cadastrar")}>
            <Text  style={estilo.link}> Cadastrar
              </Text> 
          </TouchableOpacity>
          </Text>
         
       
        
        </View>
        <TouchableOpacity style={{height:17,marginTop:15,justifyContent:'flex-end',paddingBottom:5,width:'50%',alignSelf:'center'}} onPress={()=> navigation.navigate("Recuperar Senha")}>
            <Text  style={estilo.senhaEsquecida}> Esqueceu a senha?
              </Text> 
          </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  )
}
export default Perfil;
 /* class Perfil extends React.Component {
   
    
    state = {
      
      email:'',
      senha:'',
      loading:false

    };
    
    
    render(){
      
      return (
          
        <KeyboardAwareScrollView style={estilo.scroll}
        contentContainerStyle={{
          justifyContent: 'center',
          paddingVertical:'25%'
        }}
        enableOnAndroid={true} >
          <Loader loading={this.state.loading} /> 
            <View style={{ justifyContent:'center',alignItems:'center'}}>
            <Image
              style={{ height: 160 ,width:200}}

              source={require("../../../assets/localizaUnifapLogin.png")}
            />
          </View>
          <View  >
            
            
            
            <TextInput style={estilo.entrada}
              label='E-mail'
              value={this.state.email}
              onChangeText={email => this.setState({ email })}
            />
            <TextInput
              label='Senha'
              style={estilo.entrada}
              secureTextEntry={true}
              value={this.state.csenha}
              onChangeText={csenha => this.setState({ csenha })}
            /> 
           
            <TouchableOpacity style={estilo.botao} onPress={()=> this.register()} >
              <Text style={estilo.botaoTexto}>Entrar</Text>
            </TouchableOpacity>
            <View style={{flexDirection:'row',justifyContent:'center'}}>
             
              <Text  style={estilo.titulo}>Ainda não tem uma conta?
              <TouchableOpacity style={{height:17}} onPress={()=> this.props.navigation.navigate("Cadastrar")}>
                <Text  style={estilo.link}> Cadastrar
                  </Text> 
              </TouchableOpacity>
              </Text>
           
           
            
            </View>
            
          </View>
        </KeyboardAwareScrollView>
      );
    }
    
  }
export default Perfil*/
const estilo = StyleSheet.create({
  principal:{
    flex: 1,
    flexDirection: 'column',
    justifyContent:'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor:'white'
  },
  entrada:{
    
    marginBottom: 4,
    borderRadius: 2,
    width: '100%',
    backgroundColor:'white',
    borderWidth:1,
    borderColor:'#ECEDEF',
    height:70
    
  },
  titulo:{
    color:'#808080',
    textAlign:'center',
    fontSize:15,

  },
  link:{
    color:'#0063C5',
    textAlign:'center',
    fontSize:15,

  },
  senhaEsquecida:{
    color:'#DC2D30',
    textAlign:'center',
    fontSize:14,

  },
  botao:{
    borderBottomWidth: 0,
    marginBottom: 10,
    borderRadius: 10,
    paddingVertical: 10,
    width: '50%',
    backgroundColor:'#129794',
    height:40,
    alignSelf:'center',
    justifyContent:'center', margin:10
    
  },
  botaoTexto:{
    textAlign:'center',
    fontSize:20,
    color:'white',
    textAlignVertical:'center'

    
  },
  esqsenha:{
    paddingTop:20,
    alignItems:'center'
  },
  scroll:{
    backgroundColor:'#F5F6F8',
    

  }

}); 