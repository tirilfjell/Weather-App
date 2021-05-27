import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, SafeAreaView } from "react-native";
import axios from "axios";

function Quote(props) {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");

  const quoteAPI = async () => {
    let arrayOfQuotes = [];

    try {
      const data = await axios.get("https://api.quotable.io/random");
      arrayOfQuotes = data.data;
    } catch (error) {
      console.log(error);
    }

    try {
      setQuote(arrayOfQuotes.content);
      setAuthor(arrayOfQuotes.author);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    quoteAPI();
  }, []);

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.quote_text}>"{quote}"</Text>
        <Text style={styles.quote_author}>-{author}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 20,
    marginRight: 20,
    paddingTop: 20
  },
  quote_text: {
    fontSize: 20,
    color: "#fff"
  },
  quote_author: {
    color: "#fff"
  }
});

export default Quote;
