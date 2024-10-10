import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import React from "react";
import { globalStyles } from "../../constants/constant";
import { router } from "expo-router";
import MenuButton from "../../components/button/MenuButton";
import { Ionicons } from "@expo/vector-icons";

export default function home() {
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
    {
      name: "Kategori",
      iconName: "archive",
      href: "/kategori",
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

        <View style={{ gap: 8 }}>
          
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}
