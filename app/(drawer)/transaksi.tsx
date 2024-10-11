import { View, Text, ScrollView, Button, StyleSheet } from "react-native";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { globalStyles } from "../../constants/constant";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import SheetTrigger from "../../components/view/Sparator";
import PrimaryButton from "../../components/button/PrimaryButton";
import { Items, Transaction } from "../../utils/types";
import { getItem } from "../../services/item.service";
import { router, useFocusEffect } from "expo-router";
import ItemCard from "../../components/card/ItemCard";
import TransactionListCard from "../../components/card/TransactionListCard";
import TransactionItemList from "../../components/list/TransactionItemList";
import { postTransaksi } from "../../services/transaction.service";

export default function transaksi() {
  const [barang, setBarang] = useState<Items[]>([]);
  const [transaksi, setTransaksi] = useState<Transaction[]>([]);

  const getBarangData = async () => {
    try {
      const res = await getItem();
      setBarang(res);
    } catch (error: any) {
      console.log(error.message);
    } finally {
      console.log("finally");
    }
  };

  useFocusEffect(
    useCallback(() => {
      getBarangData();
    }, [])
  );

  function generateTransactionId() {
    const date = new Date();
    const formattedDate = date.toISOString().slice(0, 10).replace(/-/g, "");
    const hours = ("0" + date.getHours()).slice(-2);
    const minutes = ("0" + date.getMinutes()).slice(-2);
    const time = `${hours}:${minutes}`;

    const randomPart = Math.random()
      .toString(36)
      .substring(2, 10)
      .toUpperCase();

    return `TRX${formattedDate}-${time}-${randomPart}`;
  }

  // fungsi untuk menambah jumlah barang ke transaksi
  const handleAddItem = (selectedItem: Items, change: number) => {
    setTransaksi((prev) => {
      const existTransaction = prev.find((transaction) =>
        transaction.items.find((i) => i.id === selectedItem.id)
      );

      if (existTransaction) {
        // Cek apakah item sudah ada di transaksi
        const newQuantity = existTransaction.quantity + change;
        if (newQuantity <= 0) {
          return prev.filter(
            (transaction) => transaction.id !== existTransaction.id
          );
        }

        return prev.map((transaction) => {
          if (transaction.id === existTransaction.id) {
            return {
              ...transaction,
              quantity: newQuantity,
              total: selectedItem.harga * newQuantity, // gunakan selectedItem untuk menghitung harga
              status: "pending",
            };
          }
          return transaction; // Kembalikan transaksi asli jika tidak cocok
        });
      } else {
        // Tambahkan transaksi baru jika item belum ada
        return [
          ...prev,
          {
            id: prev.length + 1,
            transactionId: `tx-${Date.now()}`, // tambahkan ID transaksi baru
            quantity: change,
            total: selectedItem.harga * change,
            items: [selectedItem], // tambahkan item baru
            return: 0,
            payment: 0,
            status: "pending",
          },
        ];
      }
    });
  };

  const handleCountTotalPrice = useMemo(() => {
    return transaksi.reduce((total, item) => total + item.total, 0);
  }, [transaksi]);

  const handleSubmitOrder = async () => {
    try {
      await postTransaksi({
        transactionId: generateTransactionId(),
        quantity: 1,
        total: handleCountTotalPrice,
        return: 0,
        payment: 0,
        status: "pending",
        items: transaksi.flatMap((trans) => trans.items),
      });

      setTransaksi([]);
      router.replace("/(drawer)");
    } catch (error: any) {
      console.log(error.message);
    } finally {
      console.log("finally");
    }
  };

  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ["25%", "85%"], []);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetRef.current?.present();
  }, []);

  return (
    <GestureHandlerRootView>
      <ScrollView style={globalStyles.container}>
        {barang.map((item) => (
          <TransactionListCard
            key={item.id}
            item={item}
            transaksi={transaksi}
            ascendCount={() => handleAddItem(item, 1)}
            descendCount={() => handleAddItem(item, -1)}
          />
        ))}
      </ScrollView>

      <SheetTrigger>
        <PrimaryButton
          text="Lihat"
          iconName="eye"
          onPress={handlePresentModalPress}
        />
      </SheetTrigger>

      <BottomSheetModalProvider>
        <BottomSheetModal
          style={globalStyles.shadows}
          ref={bottomSheetRef}
          snapPoints={snapPoints}
          index={1}
        >
          <BottomSheetView style={styles.container}>
            <Text style={styles.title}>Transaksi</Text>
            <View>
              {transaksi.length > 0 ? (
                transaksi.map((trans) => (
                  <TransactionItemList key={trans.id} transaction={trans} />
                ))
              ) : (
                <Text style={[styles.text, { color: "red" }]}>
                  Belum ada barang dipilih
                </Text>
              )}
            </View>
            <View style={styles.section}>
              <Text style={styles.title}>Total</Text>
              <Text style={styles.title}>
                {handleCountTotalPrice.toLocaleString("id-ID", {
                  style: "currency",
                  currency: "IDR",
                  minimumFractionDigits: 0,
                })}
              </Text>
            </View>
            <PrimaryButton
              text="Place Order"
              onPress={() => {
                handleSubmitOrder();
                bottomSheetRef.current?.dismiss();
              }}
            />
          </BottomSheetView>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  section: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 16,
    borderTopWidth: 1.3,
    borderStyle: "solid",
  },
  text: {
    fontSize: 14,
  },
});
