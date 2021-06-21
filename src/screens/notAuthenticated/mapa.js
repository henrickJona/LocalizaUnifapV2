import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableHighlight,
  Image, Modal,Pic,Alert
} from "react-native";
import MapView, {
  MAP_TYPES,
  PROVIDER_DEFAULT,
  UrlTile,
  Marker,
  Polyline
} from "react-native-maps";
/* import Icon from "react-native-vector-icons/FontAwesome"; */
import Icon from "react-native-vector-icons/FontAwesome5";
import * as Animatable from "react-native-animatable";
import MapViewDirections from "react-native-maps-directions";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import axios from "axios";
import * as Location from 'expo-location';
import Loader from '../../Loader';
import {Piker} from '@react-native-community/picker'; 
import {Asset} from 'expo-asset';
import Toast from 'react-native-simple-toast';
import api from '../../services/api'
const { width, height } = Dimensions.get("window");
const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);
const ASPECT_RATIO = width / height;
const LATITUDE = -0.0063376;
const LONGITUDE = -51.0848025;
const LATITUDE_DELTA = 0.018;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const GOOGLEMAPSAPIKEY =
  "5b3ce3597851110001cf62487c30f797a66349f3a54de3af28c85215";
/* var coordinate = []; */
const reitoria = Asset.fromModule(require('../../assets/reitoria.jpg')).uri;
const auditorio = Asset.fromModule(require('../../assets/auditorio.jpg')).uri;
const biblioteca = Asset.fromModule(require('../../assets/biblioteca.jpg')).uri;
const dcet = Asset.fromModule(require('../../assets/dcet.jpeg')).uri;
const derca = Asset.fromModule(require('../../assets/derca.jpg')).uri;
const prefeitura = Asset.fromModule(require('../../assets/prefeitura.jpg')).uri;
const restauranteuniversitario = Asset.fromModule(require('../../assets/restauranteuniversitario.jpg')).uri;
class Mapa extends React.Component {
  static navigationOptions = {
    title: "mapa",
    drawerLabel: "Mapa",
    drawerIcon: (
      <Image
        style={{ width: 24, height: 24 }}
        source={require("../../mapIcon.png")}
      />
    )
  };
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      show1: true,
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      },
      nome: "",
      route: [],
      data: [],
      todosOsLugares:[{id:2,nome:'Reitoria',latitude:-0.00667,longitude:-51.08379}],
      informationScreen:false,
      sendingInformation:[],
      loading:false,
      markerApears:false,
      coordinates:[],
      foot:false,
      tudo:[],
      listaDeImagens:[{nome:'auditorio',uri:auditorio}
                      ,{nome:'biblioteca',uri:biblioteca}
                      ,{nome:'derca',uri:derca},
                      {nome:'prefeitura',uri:prefeitura},
                      {nome:'reitoria',uri:reitoria},
                      {nome:'dcet',uri:dcet,nome:'restauranteuniversitario',uri:restauranteuniversitario}]
    };
  }

  ShowHideComponent = () => {
    if (this.state.show == true) {
      this.setState({ show: false });
    } else {
      this.setState({ show: true });
      this.setState({ show1: false });
    }
  };
  state() {
    searchBarFocused: false;
  }
  componentDidMount() {
    this.getData()
    var aux = [];
    this.keyboardDidShow = Keyboard.addListener(
      "keyboardDidShow",
      this.keyboardDidShow
    );
    this.keyboardWillShow = Keyboard.addListener(
      "keyboardWillShow",
      this.keyboardWillShow
    );
    this.keyboardWillHide = Keyboard.addListener(
      "keyboardWillHide",
      this.keyboardWillHide
    );
    this.keyboardDidHide = Keyboard.addListener(
      "keyboardDidHide",
      this.keyboardDidHide
    );
   
     
  }
  //pegaRotas(){
  //this.state.route.map((coordinates, index)=>{
  //const lat = coordinates.latitude
  //const longi = coordinates.longitude
  //const coord = [lat, longi]
  //this.renderRoute(coord, index)
  //console.log("entrou",coord)
  //})
  //}

  getCurrentLocation = async (latitudeBuilding,longitudeBuilding)=>{
    try {
      
     
    /* let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.log('Permission to access location was denied')
      setErrorMsg('Permission to access location was denied');
    }
    let location = await Location.getCurrentPositionAsync({});
    console.log(location,'jjjjjjjjjjjjjjjjjjj')
    this.getRoute(location.coords.latitude,location.coords.longitude,latitudeBuilding, longitudeBuilding); */
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }
    this.setState({loading:true})
    let location = await Location.getCurrentPositionAsync({});
     console.log(location,'1')
      this.getRoute(location.coords.latitude,location.coords.longitude,latitudeBuilding, longitudeBuilding);
    } catch (error) {
      this.setState({loading:false})
      Toast.show('Não foi possivel encontrar sua localização, tente novamente!!', Toast.SHORT, ['UIAlertController']);
    }
    
    
  }

  getRoute = async(latitudeUser, longitudeUser, latitudeBuilding, longitudeBuilding)=>{
    console.log('apssoooooooou aqui')
    let array  = [];
    let obj = {};
    console.log('asatralllllllllllll')
    try{
      const response = await axios
      .get(
        `https://api.openrouteservice.org/v2/directions/${this.state.foot?'driving-car':'foot-walking'}?api_key=5b3ce3597851110001cf62487c30f797a66349f3a54de3af28c85215&start=${longitudeUser},${latitudeUser}&end=${longitudeBuilding},${latitudeBuilding}`
      )
      console.log(response.data.features[0].geometry.coordinates,'hhhhhhhhhhh')
for(let i = 0; i<response.data.features[0].geometry.coordinates.length;i++){
  obj = {
    latitude: response.data.features[0].geometry.coordinates[i][1],
    longitude: response.data.features[0].geometry.coordinates[i][0]
  }
  array[i]= obj;
}
this.setState({loading:false})
this.setState({ route: array }/* ,()=>{
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


  
         
} */);
console.log(array,'hhhhhhhhhhh')
     /*  this.setState({ route: response.data.features[0].geometry.coordinates },()=>{
        
      }); */
     
        
    }catch(error){
      this.setState({loading:false})
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

  renderRoute = (latitude, longitude, i)=> {
    console.log('slllllllllllllllllllllllllllllll')
    /* return (
      <MapView.Polyline
        key={i}
        coordinates={(latitude, longitude)}
        strokeColor={"#000"}
        strokeWidth={4}
      />
    ); */
  }
  /* 
  keyboardDidShow = () => {
    this.setState({ show1: false });
    this.setState({ searchBarFocused: true });
  };
  keyboardWillShow = () => {
    this.setState({ show1: false });
    this.setState({ searchBarFocused: true });
  };
  keyboardWillHide = () => {
    this.setState({ show1: true });
    this.setState({ show: false });
    this.setState({ searchBarFocused: false });
  };
  keyboardDidHide = () => {
    this.setState({ show1: true });
    this.setState({ show: false });
    this.setState({ searchBarFocused: false });
  }; */

  backButton = () => {
    console.log("backk");
    this.setState({ show1: true });
    this.setState({ show: false });
    this.setState({ searchBarFocused: false });
    this.setState({ nome: "" });
    this.setState({ data: [] });
  };

  getData = async () => {
    try{
this.setState({loading:true})
      const response = await api.get('/showbuildings')
      if(response.data === null){
  Alert.alert('Aviso', 'Nada Encontrado, reinicie o app!!')
  this.setState({loading:false})
      }else{
        this.setState({loading:false})
        this.setState({todosOsLugares: response.data})
      }
    }catch(error){
      this.setState({loading:false})
      console.log(error)
      Alert.alert('Aviso!!', "Não foi possivel conectar a internet, tente novamento mais tarde!!")
    }

  }

  search = async () => {
    this.setState({route:[]})
   /*  let a = [{ nome: "Sem Resultados!!" }]; */
   
    const filter = this.state.todosOsLugares?.filter((value) => {
      return String(value.name)
        .toUpperCase()
        .includes(String(this.state.nome).toUpperCase());
    });
if(this.state.nome.length === 0){
  this.setState({data: null})
}else if(filter?.length === 0){
  
  this.setState({data: [{ name: "Sem Resultados!!" }]})
  /* this.setState({data: filter}) */
}
    else {
      console.log(filter[0],'teste')
      this.setState({data: filter})
    }
    
   /*  if (this.state.nome === "") {
      console.log("entroi");
      this.setState({ data: [] });
    } else if (this.state.nome !== "") {
      const nome = this.state.nome;

      const response = await axios.get("http://172.16.53.97:5000/edificios", {
        headers: {
          nome: nome
        }
      });

      if (Object.entries(response.data).length === 0) {
        console.log("response");
        this.setState({ data: a });
      } else {
        this.setState({ data: response.data });
        console.log(response.data);
      }
    } */
  };
  trataDetalhes = i => {
    console.log(i);
  };
  get mapType() {
    return this.props.provider === PROVIDER_DEFAULT
      ? MAP_TYPES.STANDARD
      : MAP_TYPES.NONE;
  }
  telaInformacaoAppears = (rowData) =>{
    this.setState({tudo:[]})
    let teste = this.state.listaDeImagens
    if(rowData.name!= 'Sem Resultados!!'){
      this.setState({route:[]})
      if(!this.state.markerApears){
        this.setState({markerApears:true});
      }
      console.log('testeeeeeeeee')
      if(!this.state.informationScreen){
        console.log(rowData.image,'sssssssssss')
        for(let i = 0 ;i< this.state.listaDeImagens.length;i++){
          console.log(this.state.listaDeImagens[i].nome,'qqqqqqqqqqqq',rowData.image)
          if(rowData.image === this.state.listaDeImagens[i].nome){
            this.setState({tudo:teste[i].uri},()=>{
              console.log(this.state.tudo,'fffffffffffffff')
            })
            
          }
        }
        
        this.setState({ show1: false });
        this.setState({ show: false,informationScreen:true,sendingInformation:rowData });
      }else{
        /* this.setState({ show1: true }); */
        this.setState({ informationScreen:false/* ,sendingInformation:rowData */ });
      }
    }else{
      
    }
    
    
    
    
    
  }

  closeInformation =  ()=>{
    this.setState({ show1: true,informationScreen:false,route:[],markerApears:false });
    
  }

  footCar = () =>{
 if(this.state.route.length >0 ){
  this.getCurrentLocation(this.state.sendingInformation.latitude,this.state.sendingInformation.longitude)
 }
    if(this.state.foot){
      this.setState({foot:false})
    }else{
      this.setState({foot:true})
    }
    
  }
  
  render() {
    const { navigate } = this.props.navigation;
    return (
      <DismissKeyboard>
       
        <View>
        <Loader loading={this.state.loading} /> 
           
           
           <MapView
            initialRegion={this.state.region}
            provider={null}
            rotateEnabled={true}
            style={styles.map}
            showsUserLocation={true}
            showsMyLocationButton={false}
            mapType={'standard'}
            showsCompass={false}
            
          >
            
            {this.state.route.map((geometry, index) => { 
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
                  coordinates={this.state.route}
                  strokeColor={"#004080"}
                  strokeWidth={4}
                />
              );
            })
            }
          
            {this.state.markerApears? (
              <MapView.Marker

              coordinate={ {latitude:parseFloat(this.state.sendingInformation.latitude), longitude:parseFloat(this.state.sendingInformation.longitude)} }
              onCalloutPress={() => this.telaInformacaoAppears(this.state.sendingInformation)}
            >
              <MapView.Callout>
                <View>
                <Text style={{fontSize:16, paddingHorizontal:5}}>{this.state.sendingInformation.name}</Text>
                </View>
              </MapView.Callout>
            </MapView.Marker>
            ):null}
           
            
            
          </MapView>
          {this.state.show1 ? (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                backgroundColor: "rgba(52, 52, 52, 0.8)",
                width: "100%",
                /*   height: "100%", */
                paddingTop: 20,
                paddingLeft: 20,
                paddingBottom: 20,
                paddingRight: 20,
                flexDirection: "row",
                justifyContent: "space-between",

                backgroundColor: "rgba(0,0,0,0.0)",
                position: "absolute",
                width: "100%"
              }}
            >
              

              <Icon
                onPress={this.ShowHideComponent}
                name="search"
                size={40}
                color="#4d6273"
                style={{ justifyContent: "flex-end" }}
              />
           
              {/* <View> */}
              
            
            </View>

          
              
           /*  </View> */
          ) : null}

          {!this.state.show?(
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
            

            <TouchableOpacity onPress={()=> this.footCar()} style={{backgroundColor:"#FFF",padding:5, borderColor:'#DEDEDE',borderWidth:1,justifyContent:"center",alignContent:"center", elevation:5,borderRadius:24,width:50,height:50}}>
                

                

                
                {!this.state.foot?(
               
<Icon

name="walking"
size={22}
color="#4d6273"
style={{ alignSelf: "center" }}
/> 
              
                
                ):( 
               
                  <Icon
                  
                  name="car"
                  size={22}
                  color="#4d6273"
                  style={{ alignSelf: "center" }}
                  />
                  )}
            
              
                </TouchableOpacity>
            
          
          </View>
          ):null}

          {this.state.show ? (
            <Animatable.View
              animation="fadeInRight"
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                backgroundColor: "rgba(52, 52, 52, 0.5)",
                width: "100%",
                height: "100%",
                paddingTop: 50,
                paddingLeft: 20,

                paddingBottom: 20,

                position: "absolute"
              }}
            >
              <Icon
                onPress={() => this.backButton()}
                name="arrow-left"
                size={40}
                color="#F8F8F8"
              />
              <View style={{ width: "88%" }}>
                <TextInput
                  autoFocus={true}
                  placeholder="Insira sua Busca!"
                  placeholderTextColor="#4d6273"
                  style={{
                    borderColor: "#e3e3e3",
                    borderWidth: 1,
                    width: "88%",
                    paddingLeft: 15,
                    height: 40,
                    backgroundColor: "white",
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.8,
                    shadowRadius: 2
                  }}
                  value={this.state.nome}
                  onChangeText={nome =>
                    this.setState({ nome: nome }, () => this.search())
                  }
                />
               {/*  <KeyboardAwareScrollView enableOnAndroid={true}> */}
                  <FlatList
                    data={this.state.data}
                    renderItem={({ item: rowData,index }) => {
                      return (
                        <View style={{ flexDirection: "row" }}>
                          <TouchableOpacity
                            onPress={() =>
                          /*  this.getCurrentLocation(rowData.latitude, rowData.longitude) */
                          this.telaInformacaoAppears(rowData)
                        
                            }
                            /* onPress={() => this.trataDetalhes(rowData)} */
                            style={{
                              paddingLeft: 5,
                              height: 70,
                              width: "88%",
                              padding: 10,
                              borderWidth: 1,
                              borderColor: "#E0E0E0",
                              flexDirection: "row",
                              justifyContent: "space-between",
                              backgroundColor: "white"
                            }}
                          >
                            <View style={{ width: "100%", height: "100%" }}>
                              {rowData.name === "Sem Resultados!!" ? (
                                <Text
                                  style={{
                                    fontSize: 14,
                                    textAlign: "center",
                                    paddingTop: 13
                                  }}
                                >
                                  {rowData.name}
                                </Text>
                              ) : null}
                              {rowData.name !== "Sem Resultados!!" ? (
                                <Text style={{ fontSize: 18 }}>
                                  {rowData.name}
                                </Text>
                              ) : null}
                            </View>
                          </TouchableOpacity>
                        </View>
                      );
                    }}
                    keyExtractor={(item, index) => String( item.id)}
                  />
                {/* </KeyboardAwareScrollView> */}
              </View>
            </Animatable.View>
          ) : null}
          {/* </View> */}
          {this.state.informationScreen?(
           
             
            <View style={{position:"absolute",backgroundColor:'#FFF',bottom:0,borderTopWidth:1,borderTopColor:'#DEDEDE'}}>
<View style={{flexDirection:'row'}}>
  <View style={{width:'50%'}}>
    <Image style={{ width: "100%", height: 150 }}
            source={this.state.tudo != ''?{uri:this.state.tudo}:require('../../assets/teste.png')} />
    </View>
    <View style={{width:'50%'}}>
      <View style={{height:'10%',alignSelf:'flex-end',paddingRight:5}}>
<TouchableOpacity style={{width:'100%'}} onPress={()=>this.closeInformation()}>
<Icon name='times' size={20} color={'#F3606E'}/>
</TouchableOpacity>
      </View>
      <View style={{height:'40%'}}>
      <Text style={{fontSize:18, paddingHorizontal:5}}>{this.state.sendingInformation.name}</Text>
      </View>
      <View style={{height:'60%',alignSelf:"center",justifyContent:"center", flexDirection:'row'}}>
        <View style={{width:"50%"}} >
        <TouchableOpacity onPress={()=> this.getCurrentLocation(this.state.sendingInformation.latitude,this.state.sendingInformation.longitude)}>
          <Icon style={{alignSelf:"center"}} name='route' size={22}  color= "#4d6273"/>
          <Text style={{textAlign:"center"}} >Gerar rota</Text>
        </TouchableOpacity>

        </View>
        <View style={{width:"50%"}} >
        <TouchableOpacity onPress={()=> this.props.navigation.navigate("Detalhes", {
                  lugar: this.state.sendingInformation
                })}>
          <Icon style={{alignSelf:"center"}} name='ellipsis-h' size={22}  color= "#4d6273"/>
          <Text style={{textAlign:"center"}} >Mais</Text>
        </TouchableOpacity>
          
        </View>
          </View>


              </View>


          
         
  </View>
  </View>
          ):null}
        </View>
      </DismissKeyboard>
    );
  }
}
export default Mapa;

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%"
  }
});
