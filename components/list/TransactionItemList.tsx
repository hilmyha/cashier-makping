import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Transaction } from "../../utils/types";

type TransactionItemListProps = {
  transaction: Transaction;
};

export default function TransactionItemList({
  transaction,
}: TransactionItemListProps) {
  const multiply = "&U+00D7";
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{transaction.items[0].nama}</Text>
      <View style={styles.section}>
        <Text style={styles.text}>
          {transaction.items[0].harga.toLocaleString("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
          })}
        </Text>
        <Text style={styles.text}>x {transaction.quantity}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },
  title: {
    fontWeight: "900",
    color: "#696969",
    fontSize: 16,
  },
  text: {
    color: "#696969",
    fontSize: 14,
  },
});
