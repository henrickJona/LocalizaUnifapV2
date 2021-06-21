import React, { Component,useState,useEffect, cloneElement } from 'react';
import { StyleSheet, Text, View,  Button, FlatList, ScrollView, TouchableOpacity, SafeAreaView,Alert,Modal,Dimensions,Image } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { createAppContainer } from 'react-navigation';
//import { getLightEstimationEnabled } from 'expo/build/AR';
import { createDrawerNavigator} from 'react-navigation-drawer'
import MapView ,{ MAP_TYPES, PROVIDER_DEFAULT,UrlTile,Polyline } from 'react-native-maps';
import {TextInput} from 'react-native-paper'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Axios from 'axios';
import Loader from '../../Loader'
import DateTimePicker from '@react-native-community/datetimepicker'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import axios from 'axios'

import api from '../../services/api'
import Toast from 'react-native-simple-toast';
import * as Location from 'expo-location';
import {Asset} from 'expo-asset';
const reitoria = Asset.fromModule(require('../../assets/reitoria.jpg')).uri;
const auditorio = Asset.fromModule(require('../../assets/auditorio.jpg')).uri;
const biblioteca = Asset.fromModule(require('../../assets/biblioteca.jpg')).uri;
const dcet = Asset.fromModule(require('../../assets/dcet.jpeg')).uri;
const derca = Asset.fromModule(require('../../assets/derca.jpg')).uri;
const prefeitura = Asset.fromModule(require('../../assets/prefeitura.jpg')).uri;
const restauranteuniversitario = Asset.fromModule(require('../../assets/restauranteuniversitario.jpg')).uri;
const { width, height } = Dimensions.get("window");
const ASPECT_RATIO = width / height;
const LATITUDE = -0.0063376;
const LONGITUDE = -51.0848025;
const LATITUDE_DELTA = 0.018;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
function Event({ route, navigation: { goBack,dispatch } }) {
    /*  2. Get the param */
     const { evento} = route.params;
     const [nomePredio,setNomePredio] = useState('');
     const[mostrarMapa,setMostrarMapa] = useState(false)
     const [loading,setLoading] = useState(false);
     const [foot,setFoot] = useState(true);
     const [markerApears,setMakerApears] = useState(false);
     const [informationScreen,setInformationScreen] = useState(false)
     const [show1,setShow1] = useState(true)
     const [show,setShow] = useState(false)
     const [routes,setRoutes] =useState([]);
     const [coordinate,setCordinate] =useState([]);
     const [building,setBuilding] = useState([])
     const [tudo,setTudo] = useState([])
     const[listaDeImagens,setListaDeImagens] = useState([{nome:'auditorio',uri:auditorio}
     ,{nome:'biblioteca',uri:biblioteca}
     ,{nome:'derca',uri:derca},
     {nome:'prefeitura',uri:prefeitura},
     {nome:'reitoria',uri:reitoria},
     {nome:'dcet',uri:dcet,nome:'restauranteuniversitario',uri:restauranteuniversitario}])
     const[region,setRegion] =useState({latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA})
     useEffect(() => {
        async function  getBuildingName  (){
            setLoading(true)
         try {
             const response = await api.get(`/buildings/${evento.building_id}`)
               setBuilding(response.data)
               console.log(evento.building_id,'jjjjjjjj')
               setNomePredio(response.data.name)
               setLoading(false)
         } catch (error) {
           setLoading(false)
             console.log(error)
         }
        }
        getBuildingName();
    }, []);
  
    function telaInformacaoAppears  () {
        setRoutes([])
        if(!markerApears){
          setMakerApears(true)
        }
        console.log('testeeeeeeeee')
        if(!informationScreen){
            setShow1(false)
            setShow(false)
            setInformationScreen(true)
          /* this.setState({ show1: false });
          this.setState({ show: false,informationScreen:true,sendingInformation:rowData }); */
          
        
        }else{
          /* this.setState({ show1: true }); */
          setInformationScreen(false)
          /* this.setState({ informationScreen:false }); */
        }
        
        
        
        
      }

   

      async function getRoute (latitudeUser, longitudeUser, latitudeBuilding, longitudeBuilding){
        setLoading(true)
        console.log('apssoooooooou aqui')
        let array  = [];
        let obj = {};
        console.log('asatralllllllllllll')
        console.log(foot,'foot')
        try{
          const response = await axios
          .get(
            `https://api.openrouteservice.org/v2/directions/${!foot?'driving-car':'foot-walking'}?api_key=5b3ce3597851110001cf62487c30f797a66349f3a54de3af28c85215&start=${longitudeUser},${latitudeUser}&end=${longitudeBuilding},${latitudeBuilding}`
          )
          console.log(response.data.features[0].geometry.coordinates,'hhhhhhhhhhh')
    for(let i = 0; i<response.data.features[0].geometry.coordinates.length;i++){
      obj = {
        latitude: response.data.features[0].geometry.coordinates[i][1],
        longitude: response.data.features[0].geometry.coordinates[i][0]
      }
      array[i]= obj;
    }
    
    setRoutes(array)
    setLoading(false)
    console.log('setando false')
    /* this.setState({ route: array } *//* ,()=>{
      let coordinate=[]
      for(let i = 0 ;i< this.state.route.length;i++){
        const latitude = this.state.route[i][1];
        const longitude = this.state.route[i][0];
        coordinate.push({ latitude: latitude, longitude: longitude });
        
      }
      this.setState({coordinates:coordinate})
      for(let i = 0 ;i< this.state.route.length;i++){
        return (
          <Polyline
            key={i}
            coordinates={this.state.coordinates}
            strokeColor={"red"}
            strokeWidth={4}
          />
        );
      }
    
    
      
          
         /*  this.setState({ route: response.data.features[0].geometry.coordinates },()=>{
            
          }); */
         
            
        }catch(error){
          setLoading(false)
            Toast.show('Não foi possivel gerar a rota, tente novamente!!', Toast.SHORT, ['UIAlertController']);
          console.log("res");
          console.log(error);
        }
         
         /*  .then(res => {
            //console.log("res.data");
            //console.log(res.data.features[0].geometry.coordinates);
           
            
            //this.setState({route: res.data})
          })
          .catch(function(error) {
            
          }); */
      }
     
     async function getCurrentLocation  (latitudeBuilding,longitudeBuilding){
    try {
        
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
        }
        let location = await Location.getCurrentPositionAsync({});
        console.log(location,'jjjjjjjjjjjjjjjjjjj')
        getRoute(location.coords.latitude,location.coords.longitude,latitudeBuilding, longitudeBuilding);
    } catch (error) {
      setLoading(false)
        Toast.show('Não foi possivel encontrar sua localização, tente novamente!!', Toast.SHORT, ['UIAlertController']);
        console.log(error)
    }
        
        
      }

      function click(){
        let teste = listaDeImagens
        for(let i = 0 ;i< listaDeImagens.length;i++){
            console.log(listaDeImagens[i].nome,'qqqqqqqqqqqq',building.image)
            if(building.image === listaDeImagens[i].nome){
                setTudo(teste[i].uri)
              /* this.setState({tudo:teste[i].uri},()=>{
                console.log(this.state.tudo,'fffffffffffffff')
              }) */
              
            }
          }
        getCurrentLocation(building.latitude,building.longitude)
         
          setMostrarMapa(true)
          setMakerApears(true)
          
      }

      useEffect(()=>{
          if(routes.length >0){
            getCurrentLocation(building.latitude,building.longitude)
          }
        
      },[foot])
      function footCar (){
        if(routes.length >0 ){
            if(foot){
                setFoot(false)
               }else{
                setFoot(true)
               }
      
        }
           
           
         }


         function encerrarNav(){
             setMostrarMapa(false)
             setRoutes([])
             
         }
      return (
          
        <KeyboardAwareScrollView style={estilo.scroll}
        enableOnAndroid={true} extraHeight={130} extraScrollHeight={130}>
          <Loader loading={loading} /> 
          {mostrarMapa?(
              <Modal
              transparent={true}
              visible={mostrarMapa}
              animationType='none'
              onRequestClose={()=>{console.log('close modal')}}
              >
   <MapView
            initialRegion={region}
            provider={null}
            rotateEnabled={true}
            style={estilo.map}
            showsUserLocation={true}
            showsMyLocationButton={false}
            showsCompass={false}
          > 
           {/*  {informationScreen?(
           
             
           <View style={{position:"absolute",backgroundColor:'#FFF',bottom:0,borderTopWidth:1,borderTopColor:'#DEDEDE'}}>
<View style={{flexDirection:'row'}}>
 <View style={{width:'50%'}}>
   <Image style={{ width: "100%", height: 150 }}
           source={require("../../../backend/uploads/restauranteUniversitario.jpg")} />
   </View>
   <View style={{width:'50%'}}>
     <View style={{height:'10%',alignSelf:'flex-end',paddingRight:5}}>
<TouchableOpacity onPress={()=> closeInformation()}>
<Icon name='close' size={20} color={'#F3606E'}/>
</TouchableOpacity>
     </View>
     <View style={{height:'40%'}}>
     <Text style={{fontSize:18, paddingHorizontal:5}}>{building.name}</Text>
     </View>
     <View style={{height:'60%',alignSelf:"center",justifyContent:"center", flexDirection:'row'}}>
       <View style={{width:"50%"}} >
       <TouchableOpacity onPress={()=> getCurrentLocation(building.latitude,building.longitude)}>
         <Icon style={{alignSelf:"center"}} name='routes' size={22}  color= "#4d6273"/>
         <Text style={{textAlign:"center"}} >Gerar rota</Text>
       </TouchableOpacity>

       </View>
       <View style={{width:"50%"}} >
       <TouchableOpacity onPress={()=> navigation.navigate("Detalhes", {
                 nome: nomePredio
               })}>
         <Icon style={{alignSelf:"center"}} name='ellipsis-h' size={22}  color= "#4d6273"/>
         <Text style={{textAlign:"center"}} >Mais</Text>
       </TouchableOpacity>
         
       </View>
         </View>


             </View>


         
        
 </View>
 </View>
         ):null} */}
            {routes.map((geometry, index) => { 
              /* let coordinate=[]
              const latitude = geometry[1];
              const longitude = geometry[0];
              coordinate.push({ latitude: latitude, longitude: longitude });
              console.log(coordinate,'salvvvvvvvvvvvvvv')
              
                this.setState({coordinates:coordinate}) */
              

              //console.log(typeof coordinate);
              //console.log( coordinate);
              
              return (
                  
                <Polyline
                  key={index}
                  coordinates={routes}
                  strokeColor={"#004080"}
                  strokeWidth={4}
                />
              );
            })
            }
          
            {markerApears? (
              <MapView.Marker
              coordinate={ {latitude:parseFloat(building.latitude), longitude:parseFloat(building.longitude)} }
              
            >
              <MapView.Callout>
                <View>
                <Text style={{fontSize:16, paddingHorizontal:5}}>{building.name}</Text>
                </View>
              </MapView.Callout>
            </MapView.Marker>
            ):null}
           
            
            
          </MapView>
          
          {!show?(
            <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              backgroundColor: "rgba(52, 52, 52, 0.8)",
             
              /*   height: "100%", */
              paddingTop: 20,
              paddingLeft: 20,
              paddingBottom: 20,
              paddingRight: 20,
              flexDirection: "row",
              justifyContent: "space-between",

              backgroundColor: "rgba(0,0,0,0.0)",
              position: "absolute",
              right:0
            }}
          >
            

            <TouchableOpacity onPress={()=> footCar()} style={{backgroundColor:"#FFF",padding:5, borderColor:'#DEDEDE',borderWidth:1,justifyContent:"center",alignContent:"center", elevation:5,borderRadius:24,width:50,height:50}}>
                

                

                
                {!foot?(
               
<Icon

name="car"
size={22}
color="#4d6273"
style={{ alignSelf: "center" }}
/> 
              
                
                ):( 
               
                  <Icon
                  
                  name="walk"
                  size={22}
                  color="#4d6273"
                  style={{ alignSelf: "center" }}
                  />
                  )}
            
              
                </TouchableOpacity>
            
          
          </View>
          ):null}
          
          <View style={{position:"absolute",backgroundColor:'#FFF',bottom:0,borderTopWidth:1,borderTopColor:'#DEDEDE'}}>
          <View style={{flexDirection:'row'}}>
           <View style={{width:'50%'}}>
             <Image style={{ width: "100%", height: 150 }}
                     source={tudo != ''?{uri:tudo}:require('../../assets/teste.png')} />
             </View>
             <View style={{width:'50%'}}>
               {/* <View style={{height:'10%',alignSelf:'flex-end',paddingRight:5}}>
          <TouchableOpacity onPress={()=> closeInformation()}>
          <Icon name='close' size={20} color={'#F3606E'}/>
          </TouchableOpacity>
               </View> */}
               <View style={{height:'40%',paddingTop:5}}>
               <Text style={{fontSize:17, paddingHorizontal:5}}>{building.name}</Text>
               </View>
               <View style={{height:'60%',alignSelf:"center",justifyContent:"center", flexDirection:'row'}}>
                 <View style={{width:"50%",marginTop:12}} >
                 <TouchableOpacity onPress={()=> encerrarNav()}>
                   <Icon style={{alignSelf:"center"}} name='close' size={22}  color= "#4d6273"/>
                   <Text style={{textAlign:"center"}} >Encerrar Navegação</Text>
                 </TouchableOpacity>
          
                 </View>
                 
                   </View>
          
          
                       </View>
          
          
                   
                  
           </View>
           </View></Modal>
          ):(
<View style={estilo.principal}>
            
            <Text  style={estilo.titulo}>Titulo:</Text>
            <Text  style={estilo.conteudo}>{evento.title} </Text>
            <Text  style={estilo.titulo}>Descrição:</Text>
            <Text  style={estilo.conteudo}> {evento.describe} </Text>
              <View  style={{flexDirection:'row', padding:5,borderWidth:1,borderColor:'#DCDCDC',width:"95%",marginBottom:10,backgroundColor:'#F8F8F8',alignSelf:'center'}}>
              <View style={{width:'50%',alignContent:'center',alignItems:'center'}}>
              <Text style={{paddingBottom:15,color:'#696969'}}>Data de Inicio</Text>
              <View style={{flexDirection:'row'}} >
                <Text style={{color:'#696969'}}>{`${new Date(evento.start_date_time).
                  getDate()}/${new Date(evento.start_date_time).
                  getMonth()+1<=9?`0${new Date(evento.start_date_time).
                  getMonth()+1}`:`${new Date(evento.start_date_time).
                  getMonth()+1}`}/${new Date(evento.start_date_time).
                  getYear()-100} ` } </Text>
                <Icon name={'calendar'} size={25} color={'#597291'} />
              </View>
              </View>
              <View style={{width:'50%',alignContent:'center',alignItems:'center'}}>
              <Text style={{paddingBottom:15,color:'#696969'}}>Hora de Inicio</Text>
              <View style={{flexDirection:'row'}} >
                <Text style={{color:'#696969'}}>{`${new Date(evento.start_date_time).
                    getHours()<10?`0${new Date(evento.start_date_time).
                      getHours()}`:new Date(evento.start_date_time).
                      getHours()}:${new Date(evento.end_date_time).
                      getMinutes()<10?`0${new Date(evento.end_date_time).
                        getMinutes()}`:new Date(evento.end_date_time).
                      getMinutes()}`} </Text>
                <Icon name={'clock-outline'} size={25} color={'#597291'} />
              </View>
              </View>
              </View>
                
                  <View   style={{flexDirection:'row', padding:5,borderWidth:1,borderColor:'#DCDCDC',width:"95%",marginBottom:5,backgroundColor:'#F8F8F8',alignSelf:'center'}}>
                  
                  <View style={{width:'50%',alignContent:'center',alignItems:'center'}}>
                  <Text style={{paddingBottom:15,color:'#696969'}}>Data da Finalização</Text>
                  <View style={{flexDirection:'row'}} >
                    <Text style={{color:'#696969'}}>{` ${new Date(evento.end_date_time).
                        getDate()}/${new Date(evento.end_date_time).
                        getMonth()+1<=9?`0${new Date(evento.end_date_time).
                        getMonth()+1}`:`${new Date(evento.end_date_time).
                        getMonth()+1}`}/${new Date(evento.end_date_time).
                        getYear()-100}`} </Text>
                    <Icon name={'calendar'} size={25} color={'#597291'} />
                  </View>
                  </View>
                  <View style={{width:'50%',alignContent:'center',alignItems:'center'}}>
                  <Text style={{paddingBottom:15,color:'#696969'}}>Hora de Finalização</Text>
                  <View style={{flexDirection:'row'}} >
                    <Text style={{color:'#696969'}}>{`${new Date(evento.end_date_time).
                          getHours()<10?`0${new Date(evento.end_date_time).
                            getHours()}`:new Date(evento.end_date_time).
                          getHours()}:${new Date(evento.end_date_time).
                            getMinutes()<10?`0${new Date(evento.end_date_time).
                              getMinutes()}`:new Date(evento.end_date_time).
                            getMinutes()}`} </Text>
                    <Icon name={'clock-outline'} size={25} color={'#597291'} />
                  </View>
                  </View>
                  </View>
                  
                  <Text  style={estilo.titulo}>Local onde será realizado:</Text>
            <Text  style={estilo.conteudo}> {nomePredio} </Text>
                
  
            <TouchableOpacity style={estilo.botao} onPress={()=> click()}  >
                <Text style={estilo.botaoTexto}>Gerar rota</Text>
                <Icon name={'routes'} color={'#FFF'} size ={30} />
              </TouchableOpacity>
              {/* {opcao === 1?(  <TouchableOpacity style={estilo.botao}  >
                <Text style={estilo.botaoTexto}>Gerar rota</Text>
                <Icon name={'routes'} color={'#FFF'} size ={30} />
              </TouchableOpacity>):null}
              {opcao === 2?( <View style={{flexDirection:'row'}} >
                <TouchableOpacity style={estilo.botao}  >
                <Text style={estilo.botaoTexto}>Editar </Text>
                <Icon name={'folder-edit'} color={'#FFF'} size ={30} />
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>deletar()} style={estilo.botaoRemover}  >
                <Text style={estilo.botaoTexto}>Excluir</Text>
                <Icon name={'trash-can-outline'} color={'#FFF'} size ={30} />
              </TouchableOpacity>
              </View>
                   ):null}
              {opcao === 3?(  <TouchableOpacity style={estilo.botaoRemover} onPress={()=>deletar()} >
                <Text style={estilo.botaoTexto}>Excluir</Text>
                <Icon name={'trash-can-outline'} color={'#FFF'} size ={30} />
              </TouchableOpacity>):null} */}
              
            </View>
        
          )}
          

          
        </KeyboardAwareScrollView>
      );
    }
    
  
export default Event
const estilo = StyleSheet.create({
    map: {
        width: "100%",
        height: "100%"
      },
  principal:{
    flex: 1,
    flexDirection: 'column',
    justifyContent:'center',
    backgroundColor:'#FFF',
    borderWidth:1,
    borderColor:'#D0D0D0'

  },
  entrada:{
    
    borderRadius: 2,
    width: '100%',
    backgroundColor:'white',height:60,borderColor:'#ECEDEF',borderWidth:1,marginBottom:4
    
  },botaoRemover:{
    borderBottomWidth: 0,
    borderRadius: 10,
    width: '35%',
    backgroundColor:'#F47C70',
    height:40,
    justifyContent:'center',margin:10,flexDirection:'row',alignSelf:'center',alignItems:'center'
    
  },
  botao:{
    borderBottomWidth: 0,
    borderRadius: 10,
    width: '50%',
    backgroundColor:'#129794',
    height:40,
    justifyContent:'center',margin:10,flexDirection:'row',alignSelf:'center',alignItems:'center'
    
  },
  botaoTexto:{
    textAlign:'center',
    fontSize:18,
    color:'white',
    alignItems:'center'
    
  },
  tituloPrincipal:{
    alignItems:'center',
    color:'#807e7e',
    textAlign:'justify',
    padding:10,
    fontSize:15
  },
  titulo:{
    color:'#807e7e',
    textAlign:'left',
    padding:10,
    fontSize:14
  },conteudo:{
    alignItems:'center',
    color:'#202020',
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