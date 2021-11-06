import React, { useState } from "react";
import { Alert, View, TextInput, Keyboard } from "react-native";
import { Button } from "../Button";

import { styles } from "./sendmessage";
import { COLORS } from "../../theme/colors";

import { api } from "../../services/api";

export function SendMessageForm() {
  const [message, setMessage] = useState("");
  const [sendingMessage, setSendingMessage] = useState(false);

  async function handleMessageSubmit() {
    const messageFormatted = message.trim();

    if (messageFormatted.length > 0) {
      setSendingMessage(true);
      await api.post("/messages", { message: messageFormatted });

      setMessage("");
      Keyboard.dismiss();
      setSendingMessage(false);
      Alert.alert("Messagem enviada com sucesso");
    } else {
      Alert.alert("Escreva a mensagem para enviar.");
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        keyboardAppearance="dark"
        placeholder="Qual sau expectativa para o evento"
        placeholderTextColor={COLORS.GRAY_PRIMARY}
        multiline
        maxLength={140}
        onChangeText={setMessage}
        value={message}
        style={styles.input}
        editable={!sendingMessage}
      />

      <Button
        title="ENVIAR MENSAGEM"
        backgroundColor={COLORS.PINK}
        color={COLORS.WHITE}
        isLoading={sendingMessage}
        onPress={handleMessageSubmit}
      />
    </View>
  );
}
