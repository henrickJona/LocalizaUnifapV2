import React, { Component,useState,useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Image
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import {Asset} from 'expo-asset';
import { createAppContainer } from "react-navigation";
//import { getLightEstimationEnabled } from "expo/build/AR";


import MapView, {
  MAP_TYPES,
  PROVIDER_DEFAULT,
  UrlTile
} from "react-native-maps";
import { TextInput } from "react-native-paper";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
const reitoria = Asset.fromModule(require('../../assets/reitoria.jpg')).uri;
const auditorio = Asset.fromModule(require('../../assets/auditorio.jpg')).uri;
const biblioteca = Asset.fromModule(require('../../assets/biblioteca.jpg')).uri;
const dcet = Asset.fromModule(require('../../assets/dcet.jpeg')).uri;
const derca = Asset.fromModule(require('../../assets/derca.jpg')).uri;
const prefeitura = Asset.fromModule(require('../../assets/prefeitura.jpg')).uri;
const restauranteuniversitario = Asset.fromModule(require('../../assets/restauranteuniversitario.jpg')).uri;
function TelaInformacao({ route, navigation }) {
 /*  2. Get the param */
  const { lugar } = route.params;
  const [tudo,setTudo] = useState([])
     const[listaDeImagens,setListaDeImagens] = useState([{nome:'auditorio',uri:auditorio}
     ,{nome:'biblioteca',uri:biblioteca}
     ,{nome:'derca',uri:derca},
     {nome:'prefeitura',uri:prefeitura},
     {nome:'reitoria',uri:reitoria},
     {nome:'dcet',uri:dcet,nome:'restauranteuniversitario',uri:restauranteuniversitario}])

useEffect(()=>{
  let teste = listaDeImagens
  for(let i = 0 ;i< listaDeImagens.length;i++){
      console.log(listaDeImagens[i].nome,'qqqqqqqqqqqq',lugar.image)
      if(lugar.image === listaDeImagens[i].nome){
          setTudo(teste[i].uri)
        /* this.setState({tudo:teste[i].uri},()=>{
          console.log(this.state.tudo,'fffffffffffffff')
        }) */
        
      }
    }
},[])
  return (
   <KeyboardAwareScrollView
        style={estilo.scroll}
        enableOnAndroid={true}
        extraHeight={130}
        extraScrollHeight={130}
      >
        <View>
          <View>
            <Image
              style={{ width: "100%", height: 380 }}
              source={tudo != ''?{uri:tudo}:require('../../assets/teste.png')} />
            
          </View>
          <View
            style={{
              position: "absolute",
              textAlign: "left",
              fontSize: 30,
              paddingLeft: 30,
              backgroundColor: "rgba(52, 52, 52, 0.4)",
              width: "100%",
             height:'100%',paddingTop:250
            }}
          >
            <Text  h1 bold style={estilo.titulo}>
              {lugar.name}
            </Text>
          </View>
          <View
            style={estilo.tituloView }
          >
            <Text
              h1
              bold
              style={{
                color: "#898989",

                fontSize: 28,
                paddingLeft: 30
              }}
            >
              Descrição
            </Text>
          </View>
          <View style={{ paddingTop: 10, backgroundColor: "#F5F6F8"}}>
            <Text
              h1
              bold
              style={{
                color: "#4C4C4C",

                fontSize: 20,
                paddingLeft: 30
              }}
            >
             {lugar.describe}
            </Text>
          </View>
          {/* <View
            style={estilo.tituloView }
          >
            <Text
              h1
              bold
              style={{
                color: "#898989",

                fontSize: 32,
                paddingLeft: 30
              }}
            >
              Horários
            </Text>
          </View>
          <View style={{ paddingTop: 10, backgroundColor: "#F5F6F8" }}>
            <Text
              h1
              bold
              style={{
                color: "#4C4C4C",

                fontSize: 20,
                paddingLeft: 30,
                textAlign: "center"
              }}
            >
              Segunda-Sexta: 08:30 - 18:30
            </Text>
            <Text
              h1
              bold
              style={{
                color: "#4C4C4C",

                fontSize: 20,
                paddingLeft: 30,
                textAlign: "center"
              }}
            >
              Sábado: 08:30 - 12:30
            </Text>
          </View> */}
          </View>
          </KeyboardAwareScrollView>
  );
}

/* class TelaInformacao extends React.Component {
  static navigationOptions = {};
  state = {
    usuario: "",
    senha: "",
    email: "",
    csenha: "",
    data: []
  };
  componentDidMount() {
    console.log('slalllllllllll')
    
    console.log(this.props.navigation.state.params.nome,'fffffffffffffffffff')
    this.setState({ data:this.props.navigation.state.params.nome}, () =>
      console.log("tela", this.state.data)
    );
  }

  render() {
    const { params } = this.props.navigation.state;
    const nome = params ? params.nome : null;
    return (
      <KeyboardAwareScrollView
        style={estilo.scroll}
        enableOnAndroid={true}
        extraHeight={130}
        extraScrollHeight={130}
      >
        <View>
          <View>
            <Image
              style={{ width: "100%", height: 380 }}
              source={require("../backend/uploads/restauranteUniversitario.jpg")}
            />
          </View>
          <View
            style={{
              position: "absolute",
              paddingTop: 300,
              textAlign: "left",
              fontSize: 30,
              paddingLeft: 30,
              backgroundColor: "rgba(52, 52, 52, 0.4)",
              width: "100%"
            }}
          >
            <Text h1 bold style={estilo.titulo}>
              {nome}
            </Text>
          </View>
          <View
            style={{
              paddingTop: 15,
              backgroundColor: "#F1F0F6",
              borderBottomColor: "#EDECF2",
              borderBottomWidth: 2,
              flex: 1
            }}
          >
            <Text
              h1
              bold
              style={{
                color: "#B6B5BB",

                fontSize: 32,
                paddingLeft: 30
              }}
            >
              Descrição
            </Text>
          </View>
          <View style={{ paddingTop: 10, backgroundColor: "#FFFFFF" }}>
            <Text
              h1
              bold
              style={{
                color: "#4F4F51",

                fontSize: 20,
                paddingLeft: 30
              }}
            >
              {this.state.data.descricao}
            </Text>
          </View>
          <View
            style={{
              paddingTop: 20,
              backgroundColor: "#F1F0F6",
              borderBottomColor: "#EDECF2",
              borderBottomWidth: 2,
              flex: 1
            }}
          >
            <Text
              h1
              bold
              style={{
                color: "#B6B5BB",

                fontSize: 32,
                paddingLeft: 30
              }}
            >
              Horários
            </Text>
          </View>
          <View style={{ paddingTop: 10, backgroundColor: "#FFFFFF" }}>
            <Text
              h1
              bold
              style={{
                color: "#4F4F51",

                fontSize: 20,
                paddingLeft: 30,
                textAlign: "center"
              }}
            >
              Segunda-Sexta: 08:30 - 18:30
            </Text>
            <Text
              h1
              bold
              style={{
                color: "#4F4F51",

                fontSize: 20,
                paddingLeft: 30,
                textAlign: "center"
              }}
            >
              Sábado: 08:30 - 12:30
            </Text>
          </View>
          <View>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate("ScreenThree", {
                  dataa: this.state.data
                });
              }}
              style={{ alignItems: "center", paddingTop: 20 }}
            >
              <Icon name="arrow-circle-o-right" size={40} color="#4d6273" />
              <Text style={{ color: "#4d6273" }}>Gerar rota</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }
} */
export default TelaInformacao;
const estilo = StyleSheet.create({
  tituloView:{
    paddingTop: 15,
    backgroundColor: "#FFF",
    borderBottomColor: "#EDECF2",
    borderBottomWidth: 2,
    borderBottomColor:'#EAEBED',borderBottomWidth:1 
  },
  principal: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",

    backgroundColor: "#F5F6F8"
  },
  entrada: {
    borderBottomWidth: 0,
    marginBottom: 10,
    borderRadius: 2,
    paddingVertical: 5,
    width: "100%",
    backgroundColor: "white"
  },
  titulo: {
    color: "#ECEBDF",

    fontSize: 28,
    paddingBottom: 40,height:'100%'
  },
  botao: {
    borderBottomWidth: 0,
    marginBottom: 10,
    borderRadius: 10,
    paddingVertical: 10,
    width: "50%",
    backgroundColor: "#7f7fff",
    height: 40
  },
  botaoTexto: {
    textAlign: "center",
    fontSize: 20,
    color: "white"
  },
  esqsenha: {
    paddingTop: 20,
    alignItems: "center"
  },
  scroll: {
    flex: 1,
    backgroundColor: "#F5F6F8"
  }
});
