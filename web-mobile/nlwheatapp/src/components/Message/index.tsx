import React from "react";
import { Text, View } from "react-native";
import { MotiView } from "moti";

import { UserPhotos } from "../UserPhotos";

import { styles } from "./message";

export type MessageProps = {
  id: string;
  text: string;
  user: {
    name: string;
    avatar_url: string;
  };
};

type Props = {
  data: MessageProps;
};

export function Message({ data }: Props) {
  return (
    <MotiView
      from={{ opacity: 0, translateY: -50 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: "timing", duration: 700 }}
      style={styles.container}
    >
      <Text style={styles.message}> {data.text} </Text>

      <View style={styles.footer}>
        <UserPhotos imageUri={data.user.avatar_url} sizes="SMALL" />

        <Text style={styles.userName}>{data.user.name}</Text>
      </View>
    </MotiView>
  );
}
