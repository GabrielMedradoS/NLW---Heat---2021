import React from "react";

import { Text, View, TouchableOpacity } from "react-native";
import { UserPhotos } from "../UserPhotos";

import { styles } from "./header";
import LogoSvg from "../../assets/logo.svg";

export function Header() {
  return (
    <View style={styles.container}>
      <LogoSvg />

      <View style={styles.logoutButton}>
        <TouchableOpacity>
          <Text style={styles.logoutText}> Sair </Text>
        </TouchableOpacity>
        <UserPhotos imageUri="https://github.com/GabrielMedradoS.png" />
      </View>
    </View>
  );
}
