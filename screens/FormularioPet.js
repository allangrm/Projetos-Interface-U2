import React from 'react';
import { 
  ScrollView, 
  StyleSheet, 
  Text, 
  TextInput, 
  View, 
  Button, 
  Alert, 
  KeyboardAvoidingView, 
  Platform 
} from 'react-native';
import { Formik } from 'formik';

// --- COMPONENTE CUSTOMIZADO (ETAPA 1) ---
const InputWithLabel = (props) => {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{props.label}</Text>
      <TextInput
        style={styles.input}
        onChangeText={props.onChangeText}
        value={props.value}
        placeholder={props.placeholder}
        placeholderTextColor="#888"
        secureTextEntry={props.secureTextEntry}
      />
    </View>
  );
};

// --- CLASSE PARA FORMULARIO DO PET (ETAPA 2, 5 e 7) ---
export default function FormularioPet({ navigation }) {
  // Função de validação para os extras (Campos vazios e formato de data)
  const validar = (values) => {
    const errors = {};

    // Validação de Campos Obrigatórios
    if (!values.email) errors.email = 'O e-mail é obrigatório';
    if (!values.senha) errors.senha = 'A senha é obrigatória';
    if (!values.confirmarSenha) errors.confirmarSenha = 'A confirmação é obrigatória';
    if (!values.nome) errors.nome = 'O nome do pet é obrigatório';
    if (!values.raca) errors.raca = 'A raça é obrigatória';

    // Validação de Aniversário (Formato XX/XX/XXXX)
    if (!values.aniversario) {
      errors.aniversario = 'A data é obrigatória';
    } else if (!/^\d{2}\/\d{2}\/\d{4}$/.test(values.aniversario)) {
      errors.aniversario = 'Use o formato DD/MM/AAAA';
    }

    return errors;
  };

  return (
    <KeyboardAvoidingView 
      style={styles.screen} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Formik
        initialValues={{
          email: '',
          senha: '',
          confirmarSenha: '',
          nome: '',
          aniversario: '',
          raca: '',
          brinquedo: ''
        }}
        validate={validar}
        onSubmit={(values) => {
          // ETAPA 4 e 7: Verificação de senha movida para o onSubmit

          if (values.senha !== values.confirmarSenha) {
            Alert.alert('Erro', 'As senhas não coincidem, por favor tente novamente.');
            return;
          }
          
          console.log(values);
          Alert.alert('Sucesso', 'Dados do pet salvos com sucesso!');
          
          // Essencial para a navegação:
          navigation.navigate('Main');
        }}
      >
        {({ handleChange, handleSubmit, values, errors, touched }) => (
          <ScrollView 
            style={styles.scrollView}
            contentContainerStyle={styles.contentContainer}
            keyboardShouldPersistTaps="handled"
          >
            <Text style={styles.title}>Woofstagram</Text>

            <InputWithLabel
              label="E-mail"
              placeholder="Digite seu e-mail aqui"
              onChangeText={handleChange('email')}
              value={values.email}
            />
            {touched.email && errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
            
            <InputWithLabel
              label="Senha"
              placeholder="Digite sua senha aqui"
              onChangeText={handleChange('senha')}
              value={values.senha}
              secureTextEntry
            />
            {touched.senha && errors.senha && <Text style={styles.errorText}>{errors.senha}</Text>}
            
            <InputWithLabel
              label="Confirmar senha"
              placeholder="Digite a senha novamente aqui"
              onChangeText={handleChange('confirmarSenha')}
              value={values.confirmarSenha}
              secureTextEntry
            />
            {touched.confirmarSenha && errors.confirmarSenha && <Text style={styles.errorText}>{errors.confirmarSenha}</Text>}
            
            <InputWithLabel
              label="Nome do Pet"
              placeholder="Digite o nome do seu cachorro aqui"
              onChangeText={handleChange('nome')}
              value={values.nome}
            />
            {touched.nome && errors.nome && <Text style={styles.errorText}>{errors.nome}</Text>}
            
            <InputWithLabel
              label="Aniversário"
              placeholder="DD/MM/AAAA"
              onChangeText={handleChange('aniversario')}
              value={values.aniversario}
            />
            {touched.aniversario && errors.aniversario && <Text style={styles.errorText}>{errors.aniversario}</Text>}
            
            <InputWithLabel
              label="Raça"
              placeholder="Digite a raça do cachorro aqui"
              onChangeText={handleChange('raca')}
              value={values.raca}
            />
            {touched.raca && errors.raca && <Text style={styles.errorText}>{errors.raca}</Text>}
            
            <InputWithLabel
              label="Brinquedo favorito"
              placeholder="Digite o brinquedo favorito aqui"
              onChangeText={handleChange('brinquedo')}
              value={values.brinquedo}
            />

            <View style={styles.buttonWrapper}>
              <Button 
                title="Cadastrar Pet" 
                onPress={handleSubmit} 
                color="#841584" 
              />
            </View>
          </ScrollView>
        )}
      </Formik>
    </KeyboardAvoidingView>
  );
}

// --- ESTILOS ---
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingTop: 40,
    paddingBottom: 40,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#2c3e50',
  },
  inputContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingBottom: 5,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    fontSize: 16,
    borderRadius: 6,
    backgroundColor: '#fff',
  },
  buttonWrapper: {
    padding: 20,
    marginTop: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginLeft: 20,
    marginTop: -5,
    marginBottom: 10,
  },
});