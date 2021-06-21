import React, { Component,useEffect,useContext } from 'react';
import { StyleSheet, Text, View,  Button, FlatList, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { createAppContainer } from 'react-navigation';
//import { getLightEstimationEnabled } from 'expo/build/AR';
import { createDrawerNavigator} from 'react-navigation-drawer'
import MapView ,{ MAP_TYPES, PROVIDER_DEFAULT,UrlTile } from 'react-native-maps';
import {TextInput} from 'react-native-paper'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import api from '../../services/api'
import Loader from '../../Loader'
import EventContext from '../../contexts/events'
 function Evento({navigation}) { 
  const { eventList, getAllEvents, loading, isUpdate } = useContext(
    EventContext,
  ); 
  useEffect(() => {
    setTimeout(function () {
      getAllEvents();
    }, 1000);
    
  }, []);
    
/* async function getData(){
  const hoje = new Date();
  let i = 0;
  const eventosAbertos =[]
  this.setState({loading:true})
  try {
    const response =await api.get('/showevents')
    console.log(response.data,'g')
    response.data.forEach((evento,index) => {
      const teste = new Date(response.data[index].end_date_time)
      if(teste >= hoje){
        console.log("entrou")
        eventosAbertos[i] = evento
        i++
      }
});
console.log(eventosAbertos,'g')
this.setState({todosEventos:eventosAbertos})
console.log()
this.setState({loading:false})
  } catch (error) {
    this.setState({loading:false})
    console.log(error)
  }
} */

  
      return (
          
        <View style={estilo.principal}
        >{eventList.length === 0 && !loading?(
          <View style={{flex:1,backgroundColor:'#F5F6F8',justifyContent:'center',alignItems:'center'}}>
            
            <Text>
              Nada encontrado👉👈
            </Text>
          </View>
        ):(<View>
          
          <Loader loading={loading} /> 
          <Text style={{fontSize:30,color:'#505050',paddingTop:20,paddingLeft:15,paddingBottom:10}}>Eventos em Aberto</Text>
          
            
          <FlatList
                    data={eventList}
                    refreshing={false}
                onRefresh={() => getAllEvents()}
                    renderItem={({ item: rowData,index }) => {
                      return (
                        <View style={{ flexDirection: "row" }}>
                          <TouchableOpacity onPress={()=> navigation.navigate("Visualizar Evento", {
                  evento: rowData
                })} style={{flexDirection:"column", backgroundColor:"#FFF",height:80, width:'100%',alignSelf:"center", marginBottom:2,borderWidth:1,borderColor:'#E8E8E8'}}>
                <View style={{flexDirection:'row',height:'80%'}}>
                <View style={{justifyContent:"center", width:"15%",alignItems:"center"}}>
                    <Icon name='calendar-clock' size={32} color="#129794"/>
                </View>
                <View style={{justifyContent:"center", width:"95%"}}>
                <Text>{rowData.title} </Text>
                </View>
                </View>
                
                <View style={{height:'20%',alignItems:'flex-end',marginRight:10}}><Text style={{fontSize:11,color:'#606060'}}> {`${new Date(rowData.start_date_time).
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
            </TouchableOpacity>
                        </View>
                      );
                    }}
                    keyExtractor={(item, index) =>  index.toString()}
                  /></View>) }
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
export default Evento
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