import { View, Text, StyleSheet, Alert } from "react-native";
import React, { useState } from "react";
import { Category } from "../../utils/types";
import {
  deleteCategory,
  postCategory,
  updateCategory,
} from "../../services/category.service";
import InputText from "../input/InputText";
import PrimaryButton from "../button/PrimaryButton";

type CategoriesFormProps = {
  onSuccess: () => void;
  categoryData?: Category | null;
};

export default function CategoriesForm({
  onSuccess,
  categoryData,
}: CategoriesFormProps) {
  const [error, setError] = useState<null | string>(null);
  const [nama, setNama] = useState<string>(categoryData?.nama || "");

  const handleCreateCategory = async () => {
    // validation
    if (!nama) {
      setError("Nama harus diisi");
      return;
    }

    try {
      setError(null);
      if (categoryData) {
        await updateCategory(categoryData.id, { nama });
      } else {
        await postCategory({ nama });
      }

      // reset form
      setNama("");
    } catch (error: any) {
      setError(error.message);
    } finally {
      onSuccess();
    }
  };

  const handleDeleteCategory = async () => {
    try {
      setError(null);
      await deleteCategory(categoryData!.id);
      setNama("");
      onSuccess();
    } catch (error: any) {
      setError(error.message);
    }
  };

  const confirmDeleteCategory = () => {
    Alert.alert(
      "Konfirmasi Penghapusan",
      "Apakah Anda yakin ingin menghapus kategori ini?",
      [
        {
          text: "Tidak",
          style: "cancel",
        },
        {
          text: "Ya",
          onPress: handleDeleteCategory,
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {categoryData ? "Ubah Kategori" : "Buat Kategori"}
      </Text>
      <View style={styles.section}>
        <InputText
          placeholder="Nama"
          type="default"
          onChangeText={setNama}
          value={nama}
        />
      </View>
      {error && <Text style={[styles.text, { color: "red" }]}>{error}</Text>}
      <View style={styles.section}>
        <PrimaryButton onPress={handleCreateCategory} text="Simpan" />
        {categoryData && (
          <PrimaryButton
            onPress={confirmDeleteCategory}
            text="Hapus"
            iconName="trash"
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 24,
  },
  section: {
    gap: 8,
  },
  title: {
    fontWeight: "bold",
    color: "#696969",
    fontSize: 20,
  },
  text: {
    color: "#696969",
    fontSize: 14,
  },
});
