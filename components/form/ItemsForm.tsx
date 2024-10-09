import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import InputText from "../input/InputText";
import { Category } from "../../utils/types";
import { Picker } from "@react-native-picker/picker";
import PrimaryButton from "../button/PrimaryButton";
import { postItem } from "../../services/item.service";

type ItemsFormProps = {
  onSuccess: () => void;
  category: Category[];
};

export default function ItemsForm({ onSuccess, category }: ItemsFormProps) {
  const [error, setError] = useState<null | string>(null);
  const [nama, setNama] = useState<string>("");
  const [harga, setHarga] = useState<string>("");
  const [categoryId, setCategoryId] = useState<string | null>("");

  // handle create item
  const handleCreateItem = async () => {
    // validation
    if (!nama || !harga || !categoryId) {
      setError("Data tidak boleh ada yang kosong");
      return;
    }

    try {
      setError(null);
      const res = await postItem({
        nama,
        harga: parseInt(harga),
        categoryId: parseInt(categoryId),
      });

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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Buat Barang</Text>
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
      {error && <Text style={styles.text}>{error}</Text>}
      <PrimaryButton onPress={handleCreateItem} text="Simpan" />
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
    fontSize: 18,
  },
  text: {
    color: "#696969",
    fontSize: 14,
  },
  picker: {
    backgroundColor: "#EDEDFF",
    borderRadius: 10,
  },
});
