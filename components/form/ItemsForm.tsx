import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import InputText from "../input/InputText";
import { Category, Items } from "../../utils/types";
import { Picker } from "@react-native-picker/picker";
import PrimaryButton from "../button/PrimaryButton";
import { deleteItem, postItem, updateItem } from "../../services/item.service";

type ItemsFormProps = {
  onSuccess: () => void;
  category: Category[];
  barangData?: Items | null;
};

export default function ItemsForm({
  onSuccess,
  category,
  barangData,
}: ItemsFormProps) {
  const [error, setError] = useState<null | string>(null);
  const [nama, setNama] = useState<string>(barangData?.nama || "");
  const [harga, setHarga] = useState<string>(
    barangData?.harga.toString() || ""
  );
  const [categoryId, setCategoryId] = useState<string | null>(
    barangData?.category.id.toString() || null
  );

  // handle create and update item
  const handleCreateItem = async () => {
    // validation
    if (!nama) {
      setError("Nama harus diisi");
      return;
    } else if (!harga || parseInt(harga) <= 0 || isNaN(parseInt(harga))) {
      setError("Harga harus diisi dan harus bertipe angka");
      return;
    } else if (!categoryId) {
      setError("Kategori harus diisi");
      return;
    }

    try {
      setError(null);

      if (barangData) {
        await updateItem(barangData.id, {
          nama,
          harga: parseInt(harga),
          categoryId: parseInt(categoryId),
        });
      } else {
        await postItem({
          nama,
          harga: parseInt(harga),
          categoryId: parseInt(categoryId),
        });
      }

      // reset form
      setNama("");
      setHarga("");
      setCategoryId("");
    } catch (error: any) {
      setError(error.message);
    } finally {
      onSuccess();
    }
  };

  // handle delete item
  const handleDeleteItem = async () => {
    try {
      setError(null);
      await deleteItem(barangData!.id);
      onSuccess();
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {barangData ? "Ubah Barang" : "Buat Barang"}
      </Text>
      <View style={styles.section}>
        <InputText
          placeholder="Nama"
          type="default"
          onChangeText={setNama}
          value={nama}
        />
        <InputText
          placeholder="Harga"
          type="number-pad"
          onChangeText={setHarga}
          value={harga}
        />
        <View style={styles.picker}>
          <Picker selectedValue={categoryId} onValueChange={setCategoryId}>
            <Picker.Item
              style={styles.text}
              label="Pilih Kategori"
              value={null}
            />
            {category.map((category) => (
              <Picker.Item
                key={category.id}
                style={styles.text}
                label={category.nama}
                value={category.id.toString()}
              />
            ))}
          </Picker>
        </View>
      </View>
      {error && <Text style={[styles.text, { color: "red" }]}>{error}</Text>}
      <View style={styles.section}>
        <PrimaryButton onPress={handleCreateItem} text="Simpan" />
        {barangData && (
          <PrimaryButton
            onPress={handleDeleteItem}
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
  picker: {
    backgroundColor: "#ECECECEC",
    borderRadius: 10,
  },
});
