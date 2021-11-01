import React from "react";

import { Text, View, TouchableOpacity } from "react-native";
import { UserPhotos } from "../UserPhotos";

import { styles } from "./header";
import LogoSvg from "../../assets/logo.svg";

export function Header() {
  return (
    <View style={styles.container}>
      <LogoSvg />

      <UserPhotos imageUri="https://github.com/GabrielMedradoS.png" />

      <TouchableOpacity>
        <Text style={styles.logoutText}> Sair </Text>
      </TouchableOpacity>
    </View>
  );
}
