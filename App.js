import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";

import WeatherApp from "./components/WeatherApp";
import Quote from "./components/Quote";

function App(props) {
  return (
    <>
      <ScrollView>
        <WeatherApp />
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {}
});

export default App;
