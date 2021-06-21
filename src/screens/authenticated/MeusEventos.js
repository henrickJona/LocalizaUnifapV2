import React, { Component,useState,useContext,useEffect } from 'react';
import { StyleSheet, Text, View,  Button, FlatList, ScrollView, TouchableOpacity, SafeAreaView,Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { createAppContainer } from 'react-navigation';
//import { getLightEstimationEnabled } from 'expo/build/AR';
import { createDrawerNavigator} from 'react-navigation-drawer'
import MapView ,{ MAP_TYPES, PROVIDER_DEFAULT,UrlTile } from 'react-native-maps';
import {TextInput} from 'react-native-paper'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import api from '../../services/api'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../../Loader'
import Toast from 'react-native-simple-toast';
import EventContext from '../../contexts/events'
const hoje = new Date()
 function MeusEventos({navigation}) {
const [titulo,setTitulo] = useState('')
const [user,setUser] = useState([])
const { myEventList, getAllEvents, isUpdate,eventOpened,loading,getMyEvents,deletar } = useContext(
  EventContext,
); 
useEffect(()=>{
getMyEvents(),getuser()
},[])
    /* static navigationOpotions ={
      
    }
    state = {
      titulo: '',
      dataInicio:'',
      dataFim:'',
      horarioInicio:'',
      horarioFim:'',
      todosEventos:[],loading:false,eventosAbertos:[],user:[],eventosFechados:[]
    };
    componentDidMount(){
      this.getData()
      this.getuser()
    }
 */
    async function getuser(){
      const user = await AsyncStorage.getItem(
        '@LocalizaUnifap:user',
      );
      const token  = await AsyncStorage.getItem(
        '@LocalizaUnifap:token',
      );
      console.log(JSON.parse(user),'ttttttttt')
      setUser(JSON.parse(user))
      }
    
/* async function getData(){
  const hoje = new Date();
  let i = 0,k=0;
  const eventosAbertos =[]
  const eventosFechados =[]
  const meusEventos =[]
  this.setState({loading:true})
  try {
    const response =await api.get('/showevents')
    console.log(response.data,'g')
    response.data.forEach((evento,index) => {
      const teste = new Date(response.data[index].end_date_time)
      console.log(user.id,'dffffffffff',response.data.user_id)
      if(response.data[index].user_id === user.id){
       
        if( teste >= hoje){
          console.log("entrou")
          eventosAbertos[i] = evento
          i++
        }else{
          eventosFechados[k] = evento
          k++
        }
        
      }
      
});
for(let i = 0 ; i<eventosAbertos.length;i++){
  meusEventos[i] = eventosAbertos[i]
}
let l = 0
for(let i = eventosAbertos.length ; i<eventosFechados.length+eventosAbertos.length;i++){
  meusEventos[i] = eventosFechados[l]
  l++
}

console.log(meusEventos,'g')
this.setState({eventosAbertos:eventosAbertos,todosEventos:meusEventos})
console.log()
this.setState({loading:false})
  } catch (error) {
    this.setState({loading:false})
    console.log(error)
  }
} */




      return (
          
        <View style={estilo.principal}
        >
          {myEventList.length === 0 && !loading?(
            <View style={{flex:1,backgroundColor:'#F5F6F8',justifyContent:'center',alignItems:'center'}}>
              <View style={{position:'absolute',bottom:10,right:10,zIndex:1}}>
          <TouchableOpacity onPress={()=> navigation.navigate('Adicionar Evento')} style={{backgroundColor:'#129794',width:75,height:75,borderRadius:90,alignItems:'center',justifyContent:'center'}}>
            <Icon name='plus' size={40} color='#fff' />
          </TouchableOpacity>
          
          </View>
              <Text>
                Nada encontrado👉👈
              </Text>
            </View>
          ):(
            <View style={{flex:1}}>
          <Loader loading={loading} /> 
          <View style={{position:'absolute',bottom:10,right:10,zIndex:1}}>
          <TouchableOpacity onPress={()=> navigation.navigate('Adicionar Evento')} style={{backgroundColor:'#129794',width:75,height:75,borderRadius:90,alignItems:'center',justifyContent:'center'}}>
            <Icon name='plus' size={40} color='#fff' />
          </TouchableOpacity>
          
          </View>
          
            
          <FlatList
                    data={myEventList}
                    refreshing={false}
                onRefresh={() => getMyEvents()}
                    renderItem={({ item: rowData,index }) => {
                      return (
                        <View >
                          {index ===0?(
                            <Text style={{fontSize:28,color:'#505050',paddingTop:17,paddingLeft:15,paddingBottom:10}}>Eventos em Aberto</Text>
                          ):null}
                          {index === eventOpened.length ?(
                            <Text style={{fontSize:28,color:'#505050',paddingTop:17,paddingLeft:15,paddingBottom:10}}>Eventos Passados</Text>
                          ):null}
                          <View  style={{flexDirection:"column", backgroundColor:"#FFF",height:90, width:'100%',alignSelf:"center", marginBottom:2,borderWidth:1,borderColor:'#E8E8E8'}}>
                <View style={{flexDirection:'row',height:'60%'}}>
                <View style={{justifyContent:"center", width:"15%",alignItems:"center"}}>
                    <Icon name='calendar-clock' size={32} color="#129794"/>
                </View>
                
                <View style={{justifyContent:"center", width:"95%"}}>
                <Text>{rowData.title} </Text>
                </View>
                </View>
               
                {new Date(rowData.end_date_time)>=hoje?(
                  <View style={{flexDirection:'row',height:'30%',alignItems:'center'}}>
                  
                    <View style={{width:'10%',alignItems:'center'}}>
                    <TouchableOpacity  onPress={()=> navigation.navigate("Edição Evento", {
                  evento: rowData
                })} style={{backgroundColor:'#F1A944',width:'80%',alignItems:'center',borderRadius:5}}>
                    <Icon name={'calendar-edit'} color={'#FFF'} size ={25} />
                    </TouchableOpacity>
                  </View>
                  <View style={{width:'10%',alignItems:'center'}}>
                    <TouchableOpacity onPress={()=> deletar(rowData)} style={{backgroundColor:'#E65B65',width:'80%',alignItems:'center',borderRadius:5}}>
                      <Icon name='trash-can' size={25} color={'#FFF'} />
                    </TouchableOpacity>
                  </View>
                  <View style={{height:'20%',alignItems:'flex-end',width:'80%'}}><Text style={{fontSize:11,color:'#606060'}}> {`${new Date(rowData.start_date_time).
                  getDate()}/${new Date(rowData.start_date_time).
                  getMonth()+1<=9?`0${new Date(rowData.start_date_time).
                  getMonth()+1}`:`${new Date(rowData.start_date_time).
                  getMonth()+1}`}/${new Date(rowData.start_date_time).
                  getYear()-100} ${new Date(rowData.start_date_time).
                    getHours()<10?`0${new Date(rowData.start_date_time).
                      getHours()}`:new Date(rowData.start_date_time).
                      getHours()}:${new Date(rowData.end_date_time).
                      getMinutes()<10?`0${new Date(rowData.end_date_time).
                        getMinutes()}`:new Date(rowData.end_date_time).
                      getMinutes()}  •  ${new Date(rowData.end_date_time).
                        getDate()}/${new Date(rowData.end_date_time).
                        getMonth()+1<=9?`0${new Date(rowData.end_date_time).
                        getMonth()+1}`:`${new Date(rowData.end_date_time).
                        getMonth()+1}`}/${new Date(rowData.end_date_time).
                        getYear()-100} ${new Date(rowData.end_date_time).
                          getHours()<10?`0${new Date(rowData.end_date_time).
                            getHours()}`:new Date(rowData.end_date_time).
                          getHours()}:${new Date(rowData.end_date_time).
                            getMinutes()<10?`0${new Date(rowData.end_date_time).
                              getMinutes()}`:new Date(rowData.end_date_time).
                            getMinutes()}`} </Text></View>
                </View>
                
            
                  
                ):(
<View style={{flexDirection:'row',height:'30%',alignItems:'center'}}>
                  
                
                <View style={{width:'10%',alignItems:'center'}}>
                  <TouchableOpacity onPress={()=> deletar(rowData)} style={{backgroundColor:'#E65B65',width:'80%',alignItems:'center',borderRadius:5}}>
                    <Icon name='trash-can' size={25} color={'#FFF'} />
                  </TouchableOpacity>
                </View>
                <View style={{height:'20%',alignItems:'flex-end',width:'90%'}}><Text style={{fontSize:11,color:'#606060'}}> {`${new Date(rowData.start_date_time).
                getDate()}/${new Date(rowData.start_date_time).
                getMonth()+1<=9?`0${new Date(rowData.start_date_time).
                getMonth()+1}`:`${new Date(rowData.start_date_time).
                getMonth()+1}`}/${new Date(rowData.start_date_time).
                getYear()-100} ${new Date(rowData.start_date_time).
                  getHours()<10?`0${new Date(rowData.start_date_time).
                    getHours()}`:new Date(rowData.start_date_time).
                    getHours()}:${new Date(rowData.end_date_time).
                    getMinutes()<10?`0${new Date(rowData.end_date_time).
                      getMinutes()}`:new Date(rowData.end_date_time).
                    getMinutes()}  •  ${new Date(rowData.end_date_time).
                      getDate()}/${new Date(rowData.end_date_time).
                      getMonth()+1<=9?`0${new Date(rowData.end_date_time).
                      getMonth()+1}`:`${new Date(rowData.end_date_time).
                      getMonth()+1}`}/${new Date(rowData.end_date_time).
                      getYear()-100} ${new Date(rowData.end_date_time).
                        getHours()<10?`0${new Date(rowData.end_date_time).
                          getHours()}`:new Date(rowData.end_date_time).
                        getHours()}:${new Date(rowData.end_date_time).
                          getMinutes()<10?`0${new Date(rowData.end_date_time).
                            getMinutes()}`:new Date(rowData.end_date_time).
                          getMinutes()}`} </Text></View>
              </View>
              
                )}
                  
                 
                
                  
                
                
                
            </View>
                        </View>
                      );
                    }}
                    keyExtractor={(item, index) =>  index.toString()}
                  />
            </View>
          )
        }
            {/* <TouchableOpacity style={{flexDirection:"row", backgroundColor:"#FFF",height:80, width:'95%',alignSelf:"center", borderRadius:9, marginBottom:10}}>
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
            <TouchableOpacity onPress={()=>this.props.navigation.navigate('AddEvento')} style={{position:"absolute",backgroundColor:'#597291',borderRadius:130,bottom:15,padding:10,right:15,width:70,height:70,alignItems:'center',justifyContent:'center'}}>
                  <Icon name={'plus'} size={35} color='white'/>
                </TouchableOpacity> */}
        </View>
      );
    
    
  }
export default MeusEventos
const estilo = StyleSheet.create({
  principal:{
    flex: 1,
    flexDirection: 'column',
    backgroundColor:'#F5F6F8',
    
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