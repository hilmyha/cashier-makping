import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { globalStyles } from "../../constants/constant";
import { router, useFocusEffect } from "expo-router";
import MenuButton from "../../components/button/MenuButton";
import { Ionicons } from "@expo/vector-icons";
import { Transaction } from "../../utils/types";
import { getTransaction } from "../../services/transaction.service";

export default function home() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const [transaksi, setTransaksi] = useState<Transaction[]>([]);

  const getTransaksiData = async () => {
    try {
      setError("");
      const res = await getTransaction();
      setTransaksi(res);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getTransaksiData();
    }, [])
  );

  const pendingTransactions = transaksi.filter(
    (item) => item.status === "pending"
  );

  const navList = [
    {
      name: "Barang",
      iconName: "cart",
      href: "/barang",
    },
    {
      name: "Kategori",
      iconName: "archive",
      href: "/kategori",
    },
  ];

  return (
    <ScrollView style={globalStyles.container}>
      <SafeAreaView style={{ gap: 16 }}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <View
            style={{
              flexDirection: "row",
              gap: 12,
              alignItems: "center",
            }}
          >
            {navList.map((menu, index) => (
              <MenuButton
                key={index}
                title={menu.name}
                iconName={menu.iconName as keyof typeof Ionicons.glyphMap}
                onPress={() => router.push(menu.href)}
              />
            ))}
          </View>
        </ScrollView>

        <View
          style={{
            flexDirection: "row",
            gap: 12,
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            Orderan menungu
          </Text>
        </View>

        <View style={{ gap: 12 }}>
          {loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : error ? (
            <Text style={{ color: "red" }}>{error}</Text>
          ) : pendingTransactions.length === 0 ? (
            <Text>Tidak ada transaksi.</Text>
          ) : (
            pendingTransactions.reverse().map((transaction) => (
              <TouchableOpacity
                key={transaction.id}
                style={{ padding: 16, backgroundColor: "#FFFFFF" }}
                onPress={() => console.log(transaction.id)}
              >
                <Text>ID: {transaction.transactionId}</Text>
                <Text>Status: {transaction.status}</Text>
                <Text>Total: {transaction.total}</Text>
              </TouchableOpacity>
            ))
          )}
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}
