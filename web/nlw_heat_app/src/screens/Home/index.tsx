import React from "react";
import { View } from "react-native";
import { styles } from "./home";

import { Header } from "../../components/Header";

export function Home() {
  return (
    <View style={styles.container}>
      <Header />
    </View>
  );
}
