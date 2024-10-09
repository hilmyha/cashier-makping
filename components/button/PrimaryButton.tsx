import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

type PrimaryButtonProps = {
  onPress: () => void;
  text: string;
  iconName?: keyof typeof Ionicons.glyphMap;
};

export default function PrimaryButton({
  onPress,
  text,
  iconName,
}: PrimaryButtonProps) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Ionicons name={iconName || "add-circle"} size={24} color="#FFFFFF" />
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 8,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#96030d",
  },
  text: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
});
