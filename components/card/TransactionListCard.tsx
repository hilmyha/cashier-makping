import { View, Text, StyleSheet, Button } from "react-native";
import React from "react";
import { Items, Transaction } from "../../utils/types";

type TransactionListCardProps = {
  item: Items;
  transaksi: Transaction[];
  ascendCount: (item: Items) => void;
  descendCount: (item: Items) => void;
};

export default function TransactionListCard({
  item,
  transaksi,
  ascendCount,
  descendCount,
}: TransactionListCardProps) {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>{item.nama}</Text>
        <Text style={styles.text}>
          {item.harga.toLocaleString("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
          })}
        </Text>
      </View>

      <View style={styles.counter}>
        {/* Tombol "-" untuk mengurangi jumlah */}
        <Button title="-" onPress={() => descendCount(item)} />
        <Text style={[styles.text, { fontWeight: "900" }]}>
          {transaksi.find((t) => t.items.find((i) => i.id === item.id))
            ?.quantity || 0}
        </Text>
        <Button title="+" onPress={() => ascendCount(item)} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  counter: {
    backgroundColor: "#ECECEC",
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
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
