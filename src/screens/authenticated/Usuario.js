import React, { Component } from 'react';
import { StyleSheet, Text, View,  Button, FlatList, ScrollView, TouchableOpacity, SafeAreaView,Image,Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { createAppContainer } from 'react-navigation';
//import { getLightEstimationEnabled } from 'expo/build/AR';
import { createDrawerNavigator} from 'react-navigation-drawer'
import MapView ,{ MAP_TYPES, PROVIDER_DEFAULT,UrlTile } from 'react-native-maps';
import {TextInput} from 'react-native-paper'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Loader from '../../Loader'
import { useAuth } from '../../contexts/auth';
function Usuario({navigation}){
    const { logOut,loading } = useAuth();
    function logOutt() {
        Alert.alert(
          'Sair da conta',
          'Você realmente deseja sair de sua conta?',
          [
            { text: 'Sim', onPress: () => logOut() },
            {
              text: 'Cancelar',
              onPress: () => {},
              style: 'cancel',
            },
          ],
          { cancelable: false },
        );
        console.log('oiiiiiii');
      }
    return(
<View style={estilo.scroll}
         >
          <Loader loading={loading} /> 
           
          <View  >
            <TouchableOpacity style={estilo.botao} onPress={()=>navigation.navigate('Mudar Senha')}>
                <View style={{width:'15%',alignItems:'center'}}>
                <Icon name='onepassword' size={32} color={'#129794'} />
                </View>
<View style={{width:'75%'}}>
<Text style={estilo.botaoTexto}>
    Alterar Senha
</Text>
</View>
<View style={{width:'10%'}}>
                <Icon name='chevron-right' size={32} color={'#597291'} />
                </View>


            </TouchableOpacity>
          </View>
          <View>
          <TouchableOpacity style={estilo.botao} onPress={()=> logOutt()}>
          <View style={{width:'15%',alignItems:'center'}}>
                <Icon name='exit-to-app' size={32} color={'#F47C70'}/>
                </View>
                <View style={{width:'75%'}}>
<Text style={estilo.botaoTexto}>
    Sair
</Text></View>
<View style={{width:'10%'}}>
                <Icon name='chevron-right' size={32} color={'#597291'} />
                </View>



            </TouchableOpacity>
          </View>
        </View>
    )
}

export default Usuario
 /* class Usuario extends React.Component {
    static navigationOpotions ={
      
    }
    state = {
      
      email:'',
      senha:'',
      loading:false

    };
    register = async () => {
      if(this.state.senha.length >1 && this.state.email.length >1 ){
        
        if(this.state.senha === this.state.csenha){
          try{
            this.setState({loading:true})
const response = await Axios.post('https://localiza-unifap.herokuapp.com/users',{
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
            alert(error.response.data.message)
          }
        }else{
          alert('Senhas diferentes!')
        }
      }else{
        alert('Preencha todos os campos!')
      }

    }
    render(){
      return (
          
        <View style={estilo.scroll}
         >
          <Loader loading={this.state.loading} /> 
           
          <View  >
            <TouchableOpacity style={{flexDirection:'row',justifyContent:'center',alignItems:'center',borderBottomWidth:1,borderBottomColor:'#F2F2F7',height:60}}>
                <View style={{width:'15%',alignItems:'center'}}>
                <Icon name='cog' size={32} color={'#353535'} />
                </View>
<View style={{width:'75%'}}>
<Text style={estilo.botaoTexto}>
    Editar Perfil
</Text>
</View>
<View style={{width:'10%'}}>
                <Icon name='angle-right' size={32} color={'#353535'} />
                </View>


            </TouchableOpacity>
          </View>
          <View>
          <TouchableOpacity style={{flexDirection:'row',justifyContent:'center',alignItems:'center',borderBottomWidth:1,borderBottomColor:'#F2F2F7',height:60}}>
          <View style={{width:'15%',alignItems:'center'}}>
                <Icon name='power-off' size={32} color={'#353535'}/>
                </View>
                <View style={{width:'75%'}}>
<Text style={estilo.botaoTexto}>
    Sair
</Text></View>
<View style={{width:'10%'}}>
                <Icon name='angle-right' size={32} color={'#353535'} />
                </View>



            </TouchableOpacity>
          </View>
        </View>
      );
    }
    
  } */

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
    
    borderBottomWidth: 0,
    marginBottom: 10,
    borderRadius: 2,
    paddingVertical: 5,
    width: '100%',
    backgroundColor:'white'
    
  },
  titulo:{
    color:'#808080',
    textAlign:'center',
    fontSize:15,

  },
  link:{
    color:'#4571B5',
    textAlign:'center',
    fontSize:15,

  },
  botao:{
    flexDirection:'row',justifyContent:'center',alignItems:'center',borderBottomWidth:1,borderBottomColor:'#ECEDEF',height:60
    
  },
  botaoTexto:{
    fontSize:18,
    color:'#858585',
    textAlignVertical:'center'

    
  },
  esqsenha:{
    paddingTop:20,
    alignItems:'center'
  },
  scroll:{
    backgroundColor:'#F5F6F8',
    flex:1,
    justifyContent:'center'
  }

});