import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TextInputProps,
  Pressable,
} from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

type InputTextProps = {
  placeholder: string;
  secureTextEntry?: boolean;
  type?: TextInputProps["keyboardType"] | "password";
  onChangeText?: TextInputProps["onChangeText"];
  value?: string;
  editable?: boolean;
};

export default function InputText({
  placeholder,
  type,
  onChangeText,
  value,
}: InputTextProps) {
  const [isHidden, setIsHidden] = useState(true);
  const [iconName, setIconName] = useState<"eye" | "eye-off">("eye");

  return (
    <View style={styles.container}>
      {type === "phone-pad" && (
        <View
          style={{
            paddingHorizontal: 16,
            borderRightWidth: 1,
            borderRightColor: "gray",
          }}
        >
          <Text style={styles.text}>+62</Text>
        </View>
      )}
      <TextInput
        style={styles.textInput}
        placeholder={placeholder}
        autoCapitalize="none"
        secureTextEntry={type === "password" && isHidden}
        keyboardType={type === "password" ? "default" : type}
        onChangeText={onChangeText}
        value={value}
      />
      {type === "password" && (
        <Pressable
          onPress={() => {
            setIsHidden(!isHidden);
            setIconName(isHidden ? "eye" : "eye-off");
          }}
          style={{ marginRight: 16 }}
        >
          <Ionicons name={iconName} size={24} color="#9E9C98" />
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EDEDFF",
    borderRadius: 10,
  },
  textInput: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 10,
    color: "gray",
  },
  text: {
    color: "gray",
    fontSize: 14,
  },
  texterror: {
    color: "red",
    fontSize: 12,
    marginTop: 2,
  },
});
