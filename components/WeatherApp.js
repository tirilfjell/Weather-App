import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  Dimensions,
  StyleSheet,
  Image,
  ImageBackground,
  StatusBar,
  TouchableOpacity,
  TextInput,
  Linking,
  FlatList,
  ScrollView
} from "react-native";

const Dev_Height = Dimensions.get("window").height;
const Dev_Width = Dimensions.get("window").width;

import Icon from "react-native-vector-icons/AntDesign";

import Quote from "./Quote";

export default class WeatherApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isLoading: true,
      temp: "",
      city: "Kristiansand",
      icon: "",
      city_display: "",
      desc: "",
      main: "",
      humidity: "",
      pressure: "",
      visiblity: ""
    };
    this.fetch_weather();
  }

  fetch_weather = () => {
    fetch(
      "http://api.openweathermap.org/data/2.5/weather?q=" +
        this.state.city +
        "&appid=1e7132a6dc655a9b3af2149650b5268e"
    )
      .then(response => response.json())
      .then(json => {
        this.setState({ data: json });
        this.setState({ temp: (json.main.temp - 273.15).toFixed(1) + " °C" });
        this.setState({ city_display: json.name });
        this.setState({ icon: json.weather[0].icon });
        this.setState({ desc: json.weather[0].description });
        this.setState({ main: json.weather[0].main });
        this.setState({ humidity: json.main.humidity + " %" });
        this.setState({ pressure: json.main.pressure + " hPa" });
        this.setState({
          visibility: (json.visibility / 1000).toFixed(2) + " Km"
        });
      })
      .catch(error => console.error(error))
      .finally(() => {
        this.setState({ isLoading: false });
      });
  };

  render() {
    return (
      <ImageBackground
        source={{
          uri:
            "https://images.unsplash.com/photo-1559060017-445fb9722f2a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
        }}
        style={styles.Image_Background_Style}
      >
        <SafeAreaView style={styles.container}>
          <StatusBar translucent={true} backgroundColor="#000" />
          <Quote />
          <View style={styles.Search_Box_View}>
            <TextInput
              placeholder="Search City"
              placeholderTextColor="#FFF"
              style={styles.Search_Box}
              onChangeText={text => this.setState({ city: text })}
            />
            <TouchableOpacity
              style={styles.button_touch}
              onPress={this.fetch_weather}
            >
              <Icon name="search1" size={30} color="#FFF" />
            </TouchableOpacity>
          </View>

          <View style={styles.Weather_Box_Main}>
            <View style={styles.Weather_Holder_View}>
              <Image
                tintColor="#FFF"
                source={{
                  uri:
                    "http://openweathermap.org/img/wn/" +
                    this.state.icon +
                    "@2x.png"
                }}
                style={styles.Weather_Image}
              />
              <View>
                <Text style={styles.temprature_text}>{this.state.temp}</Text>
                <Text style={styles.city_text}>{this.state.city_display}</Text>
              </View>
            </View>
          </View>

          <View style={styles.Info_Box_View}>
            <View style={styles.Info_Holder_Veiw}>
              <Text style={styles.Main_Weather_Text}>{this.state.main}</Text>
              <Text style={styles.description_text}>{this.state.desc}</Text>
              <Text style={styles.humidity_text}>
                Humidity : {this.state.humidity}
              </Text>
              <Text style={styles.other_text}>
                Pressure : {this.state.pressure}
              </Text>
              <Text style={styles.other_text}>
                Visibility : {this.state.visibility}
              </Text>
            </View>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footer_text}>Made by Tiril Fjell</Text>
            <Text style={styles.footer_text}>Powered by</Text>
            <Text
              style={{ color: "#5e4bab" }}
              onPress={() => Linking.openURL("https://openweathermap.org")}
            >
              Openweathermap API
            </Text>
          </View>
        </SafeAreaView>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: Dev_Height,
    width: Dev_Width
  },

  Image_Background_Style: {
    height: null,
    width: "100%",
    resizeMode: "cover",
    overflow: "hidden",
    flex: 1
  },
  Search_Box_View: {
    height: "20%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row"
  },
  Search_Box: {
    fontSize: 22,
    height: "35%",
    width: "80%",
    borderColor: "#FFF",
    borderRadius: 15,
    color: "#FFF",
    paddingHorizontal: 15,
    backgroundColor: "rgba(94, 75, 171, 0.60)"
  },
  button_touch: {
    marginLeft: "3%",
    height: "35%",
    width: "8%",
    justifyContent: "center",
    alignItems: "center"
  },
  Weather_Box_Main: {
    height: "25%",
    width: "100%",
    justifyContent: "center",
    alignItems: "baseline",
    margin: 0,
    flexDirection: "row"
  },
  Weather_Holder_View: {
    height: "70%",
    width: "90%",
    backgroundColor: "rgba(227, 107, 89, 0.60)",
    borderRadius: 50,
    alignItems: "center",
    flexDirection: "row"
  },
  Weather_Image: {
    height: "80%",
    width: "50%"
  },
  temprature_text: {
    fontSize: 30,
    color: "#fff",
    marginLeft: "5%"
  },
  city_text: {
    fontSize: 25,
    color: "#FFF",
    marginLeft: "5%",
    marginTop: "3%"
  },
  Info_Box_View: {
    fontSize: 50,
    height: "40%",
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  Info_Holder_Veiw: {
    height: "80%",
    width: "90%",
    backgroundColor: "rgba(94, 75, 171, 0.60)",
    borderRadius: 50
  },
  Main_Weather_Text: {
    fontSize: 28,
    fontFamily: "Arial",
    fontWeight: "bold",
    color: "#fff",
    marginLeft: "8%",
    marginTop: "8%",
    textTransform: "capitalize"
  },
  description_text: {
    fontSize: 25,
    color: "#fff",
    marginLeft: "8%",
    marginTop: "3%",
    textTransform: "capitalize"
  },
  humidity_text: {
    fontSize: 20,
    color: "#fff",
    marginLeft: "8%",
    marginTop: "5%"
  },
  other_text: {
    fontSize: 20,
    color: "#fff",
    marginLeft: "8%",
    marginTop: "2%"
  },
  footer: {
    position: "absolute",
    flex: 0.1,
    left: 0,
    right: 0,
    bottom: -10,
    backgroundColor: "rgba(227, 107, 89, 0.60)",
    height: 90,
    alignItems: "center"
  },
  footer_text: {
    marginTop: 5,
    color: "#fff",
    fontSize: 10,
    alignItems: "center"
  }
});
