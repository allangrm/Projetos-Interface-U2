import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

// Tela inicial do app — primeira coisa que o usuário vê ao abrir
export default function SignInScreen({ navigation }) {
  return (
    <View style={styles.container}>

      {/* Logo e slogan do Woofstagram */}
      <Text style={styles.logo}>🐾 Woofstagram</Text>
      <Text style={styles.slogan}>O Instagram dos seus pets</Text>

      {/* Botão que leva para a tela de cadastro do pet */}
      <Button
        title="Criar conta para o meu pet"
        onPress={() => navigation.navigate('SignUp')}
        color="#841584"
      />

    </View>
  );
}

// Estilos da tela
const styles = StyleSheet.create({
  // Centraliza tudo na tela
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  logo: { fontSize: 32, fontWeight: 'bold', marginBottom: 8 },
  slogan: { fontSize: 16, color: '#888', marginBottom: 40 },
});