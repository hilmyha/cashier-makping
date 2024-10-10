import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";

type TagButtonProps = {
  item: { id: number; nama: string };
  selectedCategory: number | null;
  onCategorySelect: (categoryId: number | null) => void;
};

export default function TagButton({
  item,
  selectedCategory,
  onCategorySelect,
}: TagButtonProps) {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        selectedCategory === item.id && styles.selectedCategory,
      ]}
      onPress={() => onCategorySelect(item.id)}
    >
      <Text
        style={[
          styles.categoryText,
          selectedCategory === item.id && styles.selectedCategoryText,
        ]}
      >
        # {item.nama}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    padding: 10,
    borderRadius: 10,
  },
  selectedCategory: {
    backgroundColor: "#96030d",
  },
  categoryText: {
    color: "#333",
  },
  selectedCategoryText: {
    color: "#FFFFFF",
  },
});
