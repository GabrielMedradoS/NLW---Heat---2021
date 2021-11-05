import React from "react";

import { Text, View } from "react-native";
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
    <View style={styles.container}>
      <Text style={styles.message}> {data.text} </Text>

      <View style={styles.footer}>
        <UserPhotos imageUri={data.user.avatar_url} sizes="SMALL" />

        <Text style={styles.userName}>{data.user.name}</Text>
      </View>
    </View>
  );
}
