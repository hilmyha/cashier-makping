import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { globalStyles } from "../../constants/constant";
import { Category } from "../../utils/types";
import { getCategory } from "../../services/category.service";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import SheetTrigger from "../../components/view/Sparator";
import PrimaryButton from "../../components/button/PrimaryButton";
import { useFocusEffect } from "expo-router";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import CategoriesForm from "../../components/form/CategoriesForm";
import CategoryCard from "../../components/card/CategoryCard";

export default function kategori() {
  const [success, setSuccess] = useState<null | string>(null);
  const [error, setError] = useState<null | string>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const [kategori, setKategori] = useState<Category[]>([]);

  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );

  const snapPoints = useMemo(() => ["25%", "65%"], []);

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

  // use effect untuk mengambil kategori
  useFocusEffect(
    useCallback(() => {
      getKategoriData();
    }, [])
  );

  const handleCategorySelect = (category: Category) => {
    setSelectedCategory(category);
    bottomSheetRef.current?.present();
  };

  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const handlePresentModalPress = useCallback(() => {
    setSelectedCategory(null);
    bottomSheetRef.current?.present();
  }, []);

  return (
    <GestureHandlerRootView>
      <ScrollView
        style={globalStyles.container}
        contentContainerStyle={{ paddingBottom: 140 }}
      >
        <Text>kategori</Text>

        <View style={{ gap: 8 }}>
          {loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : error ? (
            <Text>{error}</Text>
          ) : kategori.length > 0 ? (
            kategori.map((cat) => (
              <CategoryCard
                key={cat.id}
                onPress={() => handleCategorySelect(cat)}
                category={cat}
              />
            ))
          ) : (
            <Text>Tidak ada data</Text>
          )}
        </View>
      </ScrollView>

      <SheetTrigger>
        <PrimaryButton text="Buat Kategori" onPress={handlePresentModalPress} />
      </SheetTrigger>

      <BottomSheetModalProvider>
        <BottomSheetModal
          style={globalStyles.shadows}
          ref={bottomSheetRef}
          snapPoints={snapPoints}
          index={1}
        >
          <BottomSheetView>
            <CategoriesForm
              onSuccess={() => {
                getKategoriData();
                bottomSheetRef.current?.dismiss();
              }}
              categoryData={selectedCategory}
            />
          </BottomSheetView>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}
