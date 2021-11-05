import React from "react";
import { View, ScrollView } from "react-native";
import { styles } from "./home";

import { Header } from "../../components/Header";
import { MessageList } from "../../components/MessageList";

export function Home() {
  return (
    <View style={styles.container}>
      <Header />
      <MessageList />
    </View>
  );
}
