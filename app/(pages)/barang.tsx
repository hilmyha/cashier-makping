import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from "react-native";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { globalStyles } from "../../constants/constant";
import { Category, Items } from "../../utils/types";
import { getItem } from "../../services/item.service";
import { useFocusEffect } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import ItemsForm from "../../components/form/ItemsForm";
import { getCategory } from "../../services/category.service";
import ItemCard from "../../components/card/ItemCard";
import PrimaryButton from "../../components/button/PrimaryButton";
import SheetTrigger from "../../components/view/Sparator";

export default function barang() {
  // state
  const [success, setSuccess] = useState<null | string>(null);
  const [error, setError] = useState<null | string>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const [barang, setBarang] = useState<Items[]>([]);
  const [kategori, setKategori] = useState<Category[]>([]);

  const snapPoints = useMemo(() => ["25%", "65%"], []);
  const categoryMemo = useMemo(() => kategori, [kategori]);

  // get barang data
  const getBarangData = async () => {
    setLoading(true);
    try {
      setError(null);
      const res = await getItem();
      setBarang(res);
      setSuccess("success get data");
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // get kategori data
  const getKategoriData = async () => {
    try {
      setError(null);
      const res = await getCategory();
      setKategori(res);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // useEffect untuk mengambil data
  useFocusEffect(
    useCallback(() => {
      getBarangData();
      getKategoriData();
    }, [])
  );

  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const handlePresentModalPress = useCallback(() => {
    bottomSheetRef.current?.present();
  }, []);

  return (
    <GestureHandlerRootView>
      <ScrollView
        style={globalStyles.container}
        contentContainerStyle={{ paddingBottom: 140 }}
      >
        <View style={{ gap: 8 }}>
          {loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : error ? (
            <Text>{error}</Text>
          ) : (
            barang.map((item) => (
              <ItemCard
                key={item.id}
                item={item}
                onPress={() => console.log(item.id)}
              />
            ))
          )}
        </View>
      </ScrollView>

      <SheetTrigger>
        <PrimaryButton text="Buat Barang" onPress={handlePresentModalPress} />
      </SheetTrigger>

      <BottomSheetModalProvider>
        <BottomSheetModal
          ref={bottomSheetRef}
          snapPoints={snapPoints}
          index={1}
        >
          <BottomSheetView>
            <ItemsForm onSuccess={getBarangData} category={categoryMemo} />
          </BottomSheetView>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}
