import React from "react";
import { View } from "react-native";

import { styles } from "./signin";

import { Button } from "../Button";
import { COLORS } from "../../theme/colors";

import { useAuth } from "../../hooks/auth";

export function SignInBox() {
  const { signIn, isSigning } = useAuth();

  return (
    <View style={styles.container}>
      <Button
        title="ENTRAR COM O GITHUB"
        color={COLORS.BLACK_PRIMARY}
        backgroundColor={COLORS.YELLOW}
        icon="github"
        onPress={signIn}
        isLoading={isSigning}
      />
    </View>
  );
}
