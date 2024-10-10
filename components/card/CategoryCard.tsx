import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { Category } from "../../utils/types";

type CategoryCardProps = {
  onPress: () => void;
  category: Category;
};

export default function CategoryCard({ onPress, category }: CategoryCardProps) {
  return (
    <TouchableOpacity
      style={styles.container}
      key={category.id}
      onPress={onPress}
    >
      <Text style={styles.title}>{category.nama}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
  },
  title: {
    fontWeight: "900",
    color: "#696969",
    fontSize: 18,
  },
  text: {
    color: "#696969",
    fontSize: 14,
  },
});
