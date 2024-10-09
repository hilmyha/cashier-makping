import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { globalStyles } from "../../constants/constant";
import { router } from "expo-router";

export default function home() {
  return (
    <View style={globalStyles.container}>
      <Text>home</Text>
      <TouchableOpacity onPress={() => router.push("/barang")}>
        <Text>barang</Text>
      </TouchableOpacity>
    </View>
  );
}
