import React from "react";

import { Text, View, TouchableOpacity } from "react-native";
import { UserPhotos } from "../UserPhotos";

import { styles } from "./header";
import LogoSvg from "../../assets/logo.svg";
import { useAuth } from "../../hooks/auth";

export function Header() {
  const { user, signOut } = useAuth();
  return (
    <View style={styles.container}>
      <LogoSvg />

      <View style={styles.logoutButton}>
        <TouchableOpacity onPress={signOut}>
          <Text style={styles.logoutText}> Sair </Text>
        </TouchableOpacity>
        <UserPhotos imageUri={user?.avatar_url} />
      </View>
    </View>
  );
}
