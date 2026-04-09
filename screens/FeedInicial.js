import React, { useState } from 'react';
import { 
  View, 
  Text, 
  Image, 
  StyleSheet, 
  SafeAreaView, 
  FlatList, 
  Platform,
  Pressable, 
  Modal,
  Button
} from 'react-native';

// COMPONENTES BÁSICOS
const Avatar = ({ url }) => {
  
  const imageSource = typeof url === 'string' ? { uri: url } : url;
  
  return <Image source={imageSource} style={styles.avatar} />;
};

const Heading = ({ children }) => (
  <Text style={styles.heading}>{children}</Text>
);

const Title = ({ children, style }) => (
  <Text style={[styles.title, style]}>{children}</Text>
);

// COMPONENTES ESPECÍFICOS 

// Cartão de Tendências 
const WoofCard = ({ name, avatar, onPress }) => (
  <Pressable 
    onPress={onPress}
    style={({ hovered, pressed }) => [
      styles.woofCard,
      pressed && { transform: [{ scale: 0.95 }], opacity: 0.8 }
    ]}
  >
    <Avatar url={avatar} />
    <View style={styles.woofCardTitleContainer}>
      <Title style={styles.centerText}>{name}</Title>
    </View>
  </Pressable>
);

// Post do Feed (Com Like e Card Clicável)
const WoofPost = ({ image, title, description, onPress }) => {
  const [liked, setLiked] = useState(false);

  return (
    <Pressable 
      onPress={onPress}
      style={({ hovered, pressed }) => [
        styles.woofPost,
        pressed && { transform: [{ scale: 0.96 }], opacity: 0.9 },
        hovered && { opacity: 0.95 }
      ]}
    >
      
      <View style={styles.woofPostImageContainer}>
        <Image source={{ uri: image }} style={styles.woofPostImage} />
      </View>
      
      <View style={styles.woofPostContent}>
        <View>
          <Title>{title}</Title>
          <Text style={styles.woofPostDescription} numberOfLines={2}>
            {description}
          </Text>
        </View>

        {/* Botão de Like isolado para não abrir o modal ao curtir */}
        <Pressable 
          style={({ hovered, pressed }) => [
            styles.likeButton,
            (hovered || pressed) && { opacity: 0.8, transform: [{ scale: 0.95 }] } 
          ]} 
          onPress={() => setLiked(!liked)}
        >
          <Text style={styles.likeText}>
            {liked ? '❤️' : '🤍'}
          </Text>
        </Pressable>
      </View>

    </Pressable>
  );
};

// TELA PRINCIPAL 
export default function HomeScreen() {
  const [selectedPost, setSelectedPost] = useState(null);
  const [selectedWoof, setSelectedWoof] = useState(null);

  const renderHeader = () => (
    <View>
      <View style={styles.headerContainer}>
        <Heading>Trending Woofs</Heading>
      </View>
      
      <FlatList
        data={data.woofs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <WoofCard 
            name={item.name} 
            avatar={item.avatar} 
            onPress={() => setSelectedWoof(item)} 
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.woofListContainer} 
      />
      
      <View style={styles.headerContainer}>
        <Heading>New Posts</Heading>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={data.posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <WoofPost 
            image={item.image} 
            title={item.title} 
            description={item.description} 
            onPress={() => setSelectedPost(item)}
          />
        )}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={styles.postListContainer}
        showsVerticalScrollIndicator={false}
      />

      {/* MODAL: DETALHES DO POST*/}
      {/* animationType="slide" faz deslizar de baixo para cima */}
      <Modal visible={!!selectedPost} animationType="slide" transparent={false}>
        <SafeAreaView style={styles.modalContainer}>
          {selectedPost && (
            <View style={styles.modalContent}>
              <Image source={{ uri: selectedPost.image }} style={styles.modalImage} />
              <View style={styles.modalTextContainer}>
                <Title style={styles.modalTitle}>{selectedPost.title}</Title>
                <Text style={styles.modalDescription}>{selectedPost.description}</Text>
              </View>
              <Button title="Voltar para o Feed" onPress={() => setSelectedPost(null)} color="#841584" />
            </View>
          )}
        </SafeAreaView>
      </Modal>

      {/* MODAL: DETALHES DO PET */}
      {/* animationType="fade" faz esmaecer */}
      <Modal visible={!!selectedWoof} animationType="fade" transparent={true}>
        <View style={styles.modalOverlay}>
          {selectedWoof && (
            <View style={styles.petModalCard}>
              <Image 
                source={typeof selectedWoof.avatar === 'string' ? { uri: selectedWoof.avatar } : selectedWoof.avatar} 
                style={styles.petModalAvatar} 
              />              <Title style={{ fontSize: 24, marginTop: 10 }}>{selectedWoof.name}</Title>
              <Text style={{ color: '#666', marginTop: 10, textAlign: 'center' }}>
                Este é o perfil oficial do {selectedWoof.name}! Em breve você poderá ver todas as fotos dele aqui.
              </Text>
              <View style={{ marginTop: 20 }}>
                <Button title="Fechar" onPress={() => setSelectedWoof(null)} color="#841584" />
              </View>
            </View>
          )}
        </View>
      </Modal>

    </SafeAreaView>
  );
}

// ESTILOS
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F8F8F8' },
  headerContainer: { paddingHorizontal: 16, marginVertical: 12 },
  avatar: { width: 64, height: 64, borderRadius: 32 },
  heading: { fontSize: 24, fontWeight: 'bold', color: '#1C1C1E' },
  title: { fontSize: 16, fontWeight: '600', color: '#1C1C1E' },
  centerText: { textAlign: 'center' },
  woofCard: {
    backgroundColor: '#FFFFFF', padding: 12, borderRadius: 12, marginRight: 16, alignItems: 'center',
    borderWidth: 1, borderColor: '#E5E5EA',
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4 },
      android: { elevation: 3 },
      web: { boxShadow: '0px 2px 4px rgba(0,0,0,0.1)' }
    }),
  },
  woofCardTitleContainer: { marginTop: 8 },
  woofListContainer: { paddingLeft: 16, paddingBottom: 16 },
  woofPost: {
    flexDirection: 'row', backgroundColor: '#FFFFFF', marginHorizontal: 16, marginBottom: 16, borderRadius: 12,
    overflow: 'hidden', borderWidth: 1, borderColor: '#E5E5EA',
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4 },
      android: { elevation: 3 },
      web: { boxShadow: '0px 2px 4px rgba(0,0,0,0.1)' }
    }),
  },
  woofPostImageContainer: { flex: 1 },
  // minHeight garante que a imagem apareça mesmo com pouco texto
  woofPostImage: { flex: 1, minHeight: 140 },
  woofPostContent: { flex: 1.5, padding: 16, justifyContent: 'space-between' },
  woofPostDescription: { fontSize: 14, color: '#8E8E93', marginTop: 6, lineHeight: 20 },
  postListContainer: { paddingBottom: 24 },
  
  // Botão de Like
  likeButton: {
    marginTop: 12,
    paddingVertical: 6,
    paddingHorizontal: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  likeText: { fontSize: 14, fontWeight: 'bold', color: '#333' },

  // Estilos dos Modais
  modalContainer: { flex: 1, backgroundColor: '#fff' },
  modalContent: { flex: 1 },
  modalImage: { width: '100%', height: 350, resizeMode: 'cover' },
  modalTextContainer: { padding: 20, flex: 1 },
  modalTitle: { fontSize: 24, marginBottom: 10 },
  modalDescription: { fontSize: 16, color: '#444', lineHeight: 24 },
  
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  petModalCard: { width: '80%', backgroundColor: '#fff', borderRadius: 20, padding: 20, alignItems: 'center' },
  petModalAvatar: { width: 120, height: 120, borderRadius: 60, marginBottom: 10 }
});

// DADOS
const data = {
  woofs: [
    { id: '1', name: 'John', avatar: require('./img/John.jpeg') },
    { id: '2', name: 'Azulla', avatar: require('./img/Azulla.jpeg') },
    { id: '3', name: 'Max', avatar: require('./img/Max.jpeg') },
    { id: '4', name: 'Chloe', avatar: require('./img/Chloe.jpeg') },
  ],
  posts: [
    { id: '1', image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=400&q=80', title: 'Passeio maravilhoso', description: 'O passeio no Açude Velho aqui em Campina Grande hoje foi sensacional! O clima estava perfeito.' },
    { id: '2', image: 'https://st.depositphotos.com/1063397/1965/i/450/depositphotos_19659581-stock-photo-bathroom-to-a-dog.jpg', title: 'Hora do Banho', description: 'Não sou muito fã de água, mas confesso que o cheirinho de shampoo depois compensa todo o estresse.' },
    { id: '3', image: 'https://super.abril.com.br/wp-content/uploads/2018/12/cachorroosso.png?quality=70&w=1024&crop=1', title: 'Presente do Vinícius', description: 'Ganhamos um osso de borracha novo hoje do Vinícius. Já estou mastigando há horas e não me canso de brincar.' },
  ]
};