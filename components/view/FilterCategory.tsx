import { View, Text, FlatList, ScrollView } from "react-native";
import React from "react";
import { Category } from "../../utils/types";
import TagButton from "../button/TagButton";

type FilterCategoryProps = {
  kategori: Category[];
  selectedCategory: number | null;
  onCategorySelect: (categoryId: number | null) => void;
};

export default function FilterCategory({
  kategori,
  selectedCategory,
  onCategorySelect,
}: FilterCategoryProps) {
  return (
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        flexDirection: "row",
        gap: 10,
        marginVertical: 12,
      }}
    >
      <TagButton
        item={{ id: null!, nama: "Semua" }}
        selectedCategory={selectedCategory}
        onCategorySelect={onCategorySelect}
      />
      {kategori.map((item) => (
        <TagButton
          key={item.id}
          item={item}
          selectedCategory={selectedCategory}
          onCategorySelect={onCategorySelect}
        />
      ))}
    </ScrollView>
  );
}
