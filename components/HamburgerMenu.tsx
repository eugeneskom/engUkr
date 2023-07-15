import React, { useState } from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";

function HamburgerMenu() {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleMenuToggle} style={styles.menuButton}>
        <Text style={styles.menuIcon}>{menuOpen ? "X" : "☰"}</Text>
      </TouchableOpacity>

      {menuOpen && (
        <View style={styles.menuContent}>
          {/* Add your menu content here */}
          <Text style={styles.menuItem}>Menu Item 1</Text>
          <Text style={styles.menuItem}>Menu Item 2</Text>
          <Text style={styles.menuItem}>Menu Item 3</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  menuButton: {
    padding: 10,
  },
  menuIcon: {
    fontSize: 24,
    fontWeight: "bold",
  },
  menuContent: {
    position: "absolute",
    top: 0,
    right: 0,
    backgroundColor: "#fff",
    padding: 10,
  },
  menuItem: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default HamburgerMenu;
