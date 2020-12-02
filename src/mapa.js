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
import { Container, Header, Left, Right, Radio } from "native-base";
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
var coordinate = [];
class Mapa extends React.Component {
  static navigationOptions = {
    title: "mapa",
    drawerLabel: "Mapa",
    drawerIcon: (
      <Image
        style={{ width: 24, height: 24 }}
        source={require("./mapIcon.png")}
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
      data: []
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
            showsUserLocation={true}
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
                flexDirection: "row",
                justifyContent: "space-between",
                backgroundColor: "rgba(52, 52, 52, 0.8)",
                width: "100%",
                /*   height: "100%", */
                paddingTop: 50,
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
            </View>
          ) : null}

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
                <KeyboardAwareScrollView enableOnAndroid={true}>
                  <FlatList
                    data={this.state.data}
                    renderItem={({ item: rowData }) => {
                      return (
                        <View style={{ flexDirection: "row" }}>
                          <TouchableOpacity
                            onPress={() =>
                              this.props.navigation.navigate("ScreenTwo", {
                                rowData
                              })
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
                              {rowData.nome === "Sem Resultados!!" ? (
                                <Text
                                  style={{
                                    fontSize: 14,
                                    textAlign: "center",
                                    paddingTop: 13
                                  }}
                                >
                                  {rowData.nome}
                                </Text>
                              ) : null}
                              {rowData.nome !== "Sem Resultados!!" ? (
                                <Text style={{ fontSize: 18 }}>
                                  {rowData.nome}
                                </Text>
                              ) : null}
                            </View>
                          </TouchableOpacity>
                        </View>
                      );
                    }}
                    keyExtractor={(item, index) => item}
                  />
                </KeyboardAwareScrollView>
              </View>
            </Animatable.View>
          ) : null}
          {/* </View> */}
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
