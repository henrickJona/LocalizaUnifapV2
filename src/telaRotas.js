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
  Image
} from "react-native";
import { Container, Header, Left, Right, Radio, TabHeading } from "native-base";
import MapView, {
  MAP_TYPES,
  PROVIDER_DEFAULT,
  UrlTile,
  Marker,
  Polyline
} from "react-native-maps";
import Icon from "react-native-vector-icons/FontAwesome";
import * as Animatable from "react-native-animatable";
import MapViewDirections from "react-native-maps-directions";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import axios from "axios";
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
let coordinate = [];
class telaRotas extends React.Component {
  /*  static navigationOptions = {
    title: ""
  }; */
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
      x: null
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
    this.setState({ data: this.props.navigation.state.params.dataa }, () =>
      console.log("tela", this.state.data)
    );
    this.pegarLocalizacaoUsuario();
    /*  var aux = [];
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
    ); */
    /*  axios
      .get(
        "https://api.openrouteservice.org/v2/directions/foot-walking?api_key=5b3ce3597851110001cf62487c30f797a66349f3a54de3af28c85215&start=-51.082908,-0.006254&end=-51.085605,-0.006954"
      )
      .then(res => {
        //console.log("res.data");
        //console.log(res.data.features[0].geometry.coordinates);
        this.setState({ route: res.data.features[0].geometry.coordinates });

        //this.setState({route: res.data})
      })
      .catch(function(error) {
        console.log("res");
        console.log(error);
      }); */
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

  renderRoute(latitude, longitude, i) {
    return (
      <MapView.Polyline
        key={i}
        coordinates={(latitude, longitude)}
        strokeColor={"#000"}
        strokeWidth={4}
      />
    );
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

  search = async () => {
    let a = [{ nome: "Sem Resultados!!" }];
    if (this.state.nome === "") {
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
        /* console.log(response.data); */
      }
    }
  };
  trataDetalhes = i => {
    console.log(i);
  };

  pegarLocalizacaoUsuario = async () => {
    navigator.geolocation.getCurrentPosition(
      async ({ coords: { latitude, longitude } }) => {
        this.setState({
          region: {
            latitude,
            longitude,
            latitudeDelta: 0.002,

            longitudeDelta: LONGITUDE_DELTA
          }
        });
      }, //sucesso
      () => {}, //erro
      {
        timeout: 2000,
        enableHighAccuracy: true,
        maximumAge: 1000
      }
    );
    navigator.geolocation.getCurrentPosition(position => {
      this.setState({ x: position.coords });
    });
  };
  carrro = async () => {
    coordinate = [];
    this.setState({ route: [] });
    this.pegarLocalizacaoUsuario();

    this.setState({ show1: false });
    this.setState({ show: true });
    axios
      .get(
        `https://api.openrouteservice.org/v2/directions/driving-car?api_key=5b3ce3597851110001cf62487c30f797a66349f3a54de3af28c85215&start=${this.state.x.longitude},${this.state.x.latitude}&end=${this.state.data.longitude},${this.state.data.latitude}`
      )
      .then(res => {
        //console.log("res.data");
        //console.log(res.data.features[0].geometry.coordinates);
        this.setState({ route: res.data.features[0].geometry.coordinates });

        //this.setState({route: res.data})
      })
      .catch(function(error) {
        console.log("res");
        console.log(error);
      });
    /* this.map.animateCamera(
      {
        center: this.state.region,
        pitch: 2,
        heading: 180,
        altitude: 100,
        zoom: 19
      },
      1000
    ); */
  };
  pe = async () => {
    coordinate = [];
    this.setState({ route: [] });
    this.pegarLocalizacaoUsuario();

    this.setState({ show1: false });
    this.setState({ show: true });
    try {
      const response = await axios.get(
        `https://api.openrouteservice.org/v2/directions/foot-walking?api_key=5b3ce3597851110001cf62487c30f797a66349f3a54de3af28c85215&start=${this.state.x.longitude},${this.state.x.latitude}&end=${this.state.data.longitude},${this.state.data.latitude}`
      );

      this.setState({ route: response.data.features[0].geometry.coordinates });
      console.log(response);
      //this.setState({route: res.data})
    } catch (error) {
      console.log(error);
    }

    /* this.map.animateCamera(
      {
        center: this.state.region,
        pitch: 2,
        heading: 180,
        altitude: 100,
        zoom: 19
      },
      1000
    ); */
  };
  volta = () => {
    this.setState({ route: [] });
    this.setState({ show1: true });
    this.setState({ show: false });
  };
  get mapType() {
    return this.props.provider === PROVIDER_DEFAULT
      ? MAP_TYPES.STANDARD
      : MAP_TYPES.NONE;
  }
  render() {
    const { navigate } = this.props.navigation;
    return (
      <DismissKeyboard>
        <View>
          <MapView
            initialRegion={this.state.region}
            provider={null}
            rotateEnabled={false}
            style={styles.map}
            showsUserLocation
            ref={map => {
              this.map = map;
            }}
          >
            {this.state.route.map((geometry, index) => {
              const latitude = geometry[1];
              const longitude = geometry[0];
              coordinate.push({ latitude: latitude, longitude: longitude });

              //console.log(typeof coordinate);
              //console.log( coordinate);
              return (
                <Polyline
                  key={index}
                  coordinates={coordinate}
                  strokeColor={"red"}
                  strokeWidth={4}
                />
              );
            })}

            {/* {console.log(coordinate)} */}
            <MapView.Marker
              coordinate={{ latitude: -0.0070825, longitude: -51.0845708 }}
              onCalloutPress={() => navigate("ScreenTwo")}
            >
              <MapView.Callout>
                <View>
                  <Text>teste</Text>
                </View>
              </MapView.Callout>
            </MapView.Marker>
          </MapView>
          {/* 
          <View
            style={{
              paddingTop: 50,
              paddingLeft: 20,
              paddingBottom: 20,

              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: "rgba(0,0,0,0.0)",
              position: "absolute",
              width: "100%"
            }}
          > */}
          {this.state.show1 ? (
            <View
              style={{
                width: "100%",
                height: "100%",
                position: "absolute"
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  backgroundColor: "rgba(52, 52, 52, 0.8)",
                  width: "100%",
                  height: 80,

                  paddingRight: 10,
                  paddingLeft: 10,
                  flexDirection: "row",
                  justifyContent: "space-between",

                  backgroundColor: "#4d6273",
                  position: "absolute",
                  top: 0
                }}
              >
                <TouchableOpacity
                  onPress={() => this.props.navigation.goBack()}
                  style={{
                    borderRadius: 15,

                    height: 70,
                    marginTop: 2,
                    width: "10%",
                    alignSelf: "center"
                  }}
                >
                  <Icon
                    name="arrow-left"
                    size={30}
                    color="white"
                    style={{ alignSelf: "center", paddingTop: 28 }}
                  />
                </TouchableOpacity>

                <Text
                  style={{
                    width: "70%",
                    color: "white",
                    textAlign: "center",
                    fontSize: 19,
                    paddingTop: 38
                  }}
                >
                  Escolha uma opção abaixo
                </Text>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate("mapa")}
                  style={{
                    borderRadius: 15,

                    height: 70,
                    marginTop: 2,
                    width: "10%",
                    alignSelf: "center"
                  }}
                >
                  <Icon
                    name="power-off"
                    size={30}
                    color="white"
                    style={{ alignSelf: "center", paddingTop: 28 }}
                  />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  backgroundColor: "rgba(52, 52, 52, 0.8)",
                  width: "100%",
                  height: 100,

                  paddingLeft: 20,

                  paddingRight: 20,
                  flexDirection: "row",
                  justifyContent: "space-between",

                  backgroundColor: "#4d6273",
                  position: "absolute",
                  width: "100%",
                  bottom: 0
                }}
              >
                <TouchableOpacity
                  onPress={() => this.carrro()}
                  style={{
                    borderRadius: 15,
                    backgroundColor: "#F6F6F6",
                    height: 70,
                    marginTop: 2,
                    width: "40%",
                    alignSelf: "center"
                  }}
                >
                  <Icon
                    name="car"
                    size={40}
                    color="#4d6273"
                    style={{ alignSelf: "center", marginTop: 5 }}
                  />

                  <Text
                    style={{
                      color: "#727272",
                      textAlign: "center",
                      fontSize: 15,
                      marginTop: 1
                    }}
                  >
                    Carro
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => this.pe()}
                  style={{
                    borderRadius: 15,
                    backgroundColor: "#F6F6F6",
                    height: 70,
                    marginTop: 2,
                    width: "40%",
                    alignSelf: "center"
                  }}
                >
                  <Icon
                    name="blind"
                    size={40}
                    color="#4d6273"
                    style={{ alignSelf: "center", marginTop: 5 }}
                  />

                  <Text
                    style={{
                      color: "#727272",
                      textAlign: "center",
                      fontSize: 15,
                      marginTop: 1
                    }}
                  >
                    A pé
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : null}

          {this.state.show ? (
            <View
              style={{
                width: "100%",
                height: "100%",
                position: "absolute"
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  backgroundColor: "rgba(52, 52, 52, 0.8)",
                  width: "100%",
                  height: 90,

                  paddingLeft: 20,

                  paddingRight: 20,
                  flexDirection: "row",
                  justifyContent: "space-between",

                  backgroundColor: "#4d6273",
                  position: "absolute",
                  top: 0
                }}
              >
                <TouchableOpacity
                  style={{
                    borderRadius: 15,

                    height: 70,
                    marginTop: 2,
                    width: "20%",
                    alignSelf: "center"
                  }}
                >
                  <Icon
                    name="arrow-right"
                    size={40}
                    color="white"
                    style={{ alignSelf: "center", paddingTop: 12 }}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={this.botaoIformacao}
                  style={{
                    borderRadius: 15,

                    height: 70,
                    marginTop: 2,
                    width: "80%",
                    alignSelf: "center"
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      textAlign: "center",
                      fontSize: 18,
                      paddingTop: 20
                    }}
                  >
                    Vire a Direita
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  backgroundColor: "rgba(52, 52, 52, 0.8)",
                  width: "100%",
                  height: 80,

                  paddingLeft: 20,

                  paddingRight: 20,
                  flexDirection: "row",
                  justifyContent: "space-between",

                  backgroundColor: "#617C92",
                  position: "absolute",
                  width: "100%",
                  bottom: 0
                }}
              >
                <TouchableOpacity
                  onPress={() => this.volta()}
                  style={{
                    borderRadius: 15,

                    height: 70,
                    marginTop: 2,
                    width: "20%",
                    alignSelf: "center"
                  }}
                >
                  <Icon
                    name="close"
                    size={40}
                    color="white"
                    style={{ alignSelf: "center", paddingTop: 12 }}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={this.botaoIformacao}
                  style={{
                    borderRadius: 15,

                    height: 70,
                    marginTop: 2,
                    width: "80%",
                    alignSelf: "center"
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      textAlign: "center",
                      fontSize: 18,
                      paddingTop: 20
                    }}
                  >
                    8 minutos
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : null}
          {/* </View> */}
        </View>
      </DismissKeyboard>
    );
  }
}
export default telaRotas;

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%"
  }
});
