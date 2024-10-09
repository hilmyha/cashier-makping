import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { Items } from "../../utils/types";

type ItemCardProps = {
  onPress: () => void;
  item: Items;
};

export default function ItemCard({ onPress, item }: ItemCardProps) {
  return (
    <TouchableOpacity style={styles.container} key={item.id} onPress={onPress}>
      <Text style={styles.title}>{item.nama}</Text>
      <Text style={styles.text}>
        {item.harga.toLocaleString("id-ID", {
          style: "currency",
          currency: "IDR",
          minimumFractionDigits: 0,
        })}
      </Text>
      <Text style={styles.text}>{item.category.nama}</Text>
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
