import React from "react";
import { ScrollView } from "react-native";

import { Message } from "../Message";

import { styles } from "./messagelist";

export function MessageList() {
  const message = {
    id: "1",
    text: "mensagem",
    user: {
      name: "gabriel",
      avatar_url: "https://github.com/GabrielMedradoS.png",
    },
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="never"
    >
      {/* sempre quando clica na lista o teclado  fecha */}
      <Message data={message} />
      <Message data={message} />
      <Message data={message} />
    </ScrollView>
  );
}
