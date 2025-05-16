import React from 'react';
import { FlatList, View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Card, Title } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const zooAnimalData = [
  { id: '1', thumbnail: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/020_The_lion_king_Snyggve_in_the_Serengeti_National_Park_Photo_by_Giles_Laurent.jpg/2880px-020_The_lion_king_Snyggve_in_the_Serengeti_National_Park_Photo_by_Giles_Laurent.jpg', fullImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/020_The_lion_king_Snyggve_in_the_Serengeti_National_Park_Photo_by_Giles_Laurent.jpg/2880px-020_The_lion_king_Snyggve_in_the_Serengeti_National_Park_Photo_by_Giles_Laurent.jpg', name: 'Lion', description: 'The majestic king of the jungle.' },
  { id: '2', thumbnail: 'https://paigntonzoo.org.uk/wp-content/uploads/2021/04/230202-PZ-Sumatran-Tiger-HR-CC-02-scaled.jpg', fullImage: 'https://paigntonzoo.org.uk/wp-content/uploads/2021/04/230202-PZ-Sumatran-Tiger-HR-CC-02-scaled.jpg', name: 'Tiger', description: 'A powerful and striped big cat.' },
  { id: '3', thumbnail: 'https://khwaiexpeditionscamp.com/wp-content/uploads/2024/06/The-African-Elephant-1536x864.jpg', fullImage: 'https://khwaiexpeditionscamp.com/wp-content/uploads/2024/06/The-African-Elephant-1536x864.jpg', name: 'Elephant', description: 'The largest land animal, known for its trunk.' },
  { id: '4', thumbnail: 'https://c02.purpledshub.com/uploads/sites/62/2018/06/GettyImages-538590347-744de9f.jpg?webp=1&w=1200', fullImage: 'https://c02.purpledshub.com/uploads/sites/62/2018/06/GettyImages-538590347-744de9f.jpg?webp=1&w=1200', name: 'Giraffe', description: 'Famous for its extremely long neck.' },
  { id: '5', thumbnail: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Equus_quagga_burchellii_-_Etosha%2C_2014.jpg/2880px-Equus_quagga_burchellii_-_Etosha%2C_2014.jpg', fullImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Equus_quagga_burchellii_-_Etosha%2C_2014.jpg/2880px-Equus_quagga_burchellii_-_Etosha%2C_2014.jpg', name: 'Zebra', description: 'A horse-like animal with black and white stripes.' },
  { id: '6', thumbnail: 'https://media.npr.org/assets/img/2017/09/12/macaca_nigra_self-portrait-fd5e770d3e129efe4b0ed6c19271ed29afc807dc.jpg?s=1600&c=85&f=webp', fullImage: 'https://media.npr.org/assets/img/2017/09/12/macaca_nigra_self-portrait-fd5e770d3e129efe4b0ed6c19271ed29afc807dc.jpg?s=1600&c=85&f=webp', name: 'Monkey', description: 'A clever, funny and agile primate.' },
  { id: '7', thumbnail: 'https://www.oregonzoo.org/sites/default/files/styles/16x9_2588w/public/2023-08/7-28-2021rA-114.jpg.webp?itok=cRvXHuOJ', fullImage: 'https://www.oregonzoo.org/sites/default/files/styles/16x9_2588w/public/2023-08/7-28-2021rA-114.jpg.webp?itok=cRvXHuOJ', name: ' Red Panda', description: 'A cute, Red and brown panda.' },
  { id: '8', thumbnail: 'https://cdn-kmfel.nitrocdn.com/uMVObCziJWycROCfTnqalPiKHatgnzNl/assets/images/optimized/rev-f03995e/polar-latitudes.com/wp-content/uploads/2021/06/Brown-Bluff-Antarctic-Sound-Philip-Stone-8508930-copy-980x653.jpg', fullImage: 'https://cdn-kmfel.nitrocdn.com/uMVObCziJWycROCfTnqalPiKHatgnzNl/assets/images/optimized/rev-f03995e/polar-latitudes.com/wp-content/uploads/2021/06/Brown-Bluff-Antarctic-Sound-Philip-Stone-8508930-copy-980x653.jpg', name: 'Penguin', description: 'A flightless bird that lives in cold climates.' },
];

const GalleryScreen = () => {
  const navigation = useNavigation();

  const handleAnimalPress = (animal) => {
    navigation.navigate('PictureView', { fullImage: animal.fullImage, caption: animal.name });
  };

  const renderAnimalItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleAnimalPress(item)} style={styles.item}>
      <Card style={styles.animalCard}>
        <Card.Cover source={{ uri: item.thumbnail }} style={styles.thumbnail} />
        <Card.Content>
          <Title variant="titleMedium" style={styles.animalName}>{item.name}</Title> {}
          <Text variant="bodySmall" style={styles.animalDescription}>{item.description}</Text> {}
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Title style={styles.header}>Rohit's Zoo</Title>
      </View>
      <FlatList
        data={zooAnimalData}
        renderItem={renderAnimalItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#606c38',
  },
  headerContainer: {
    marginTop: 30,
    marginBottom: 16,
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#dda15e',
  },
  listContainer: {
    paddingBottom: 16,
  },
  item: {
    flex: 0.5,
    margin: 5,
  },
  thumbnail: {
    height: 150,
  },
  animalCard: {
    backgroundColor: '#283618', 
  },
  animalName: {
    color: '#dda15e',
  },
  animalDescription: {
    color: '#fefae0', 
  },
});

export default GalleryScreen;