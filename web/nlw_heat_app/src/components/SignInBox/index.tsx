import React from "react";
import { View } from "react-native";

import { styles } from "./signin";

import { Button } from "../Button";
import { COLORS } from "../../theme/colors";

export function SignInBox() {
  return (
    <View style={styles.container}>
      <Button
        title="ENTRAR COM O GITHUB"
        color={COLORS.BLACK_PRIMARY}
        backgroundColor={COLORS.YELLOW}
        icon="github"
      />
    </View>
  );
}
