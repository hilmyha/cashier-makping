import { View, Text, StyleSheet } from "react-native";
import { ReactNode } from "react";

type SheetTrigger = {
  children: ReactNode;
};

export default function SheetTrigger({ children }: SheetTrigger) {
  return <View style={styles.container}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#FFFFFF",
    // Shadow for iOS
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    // Elevation for Android
    elevation: 24,
  },
});
