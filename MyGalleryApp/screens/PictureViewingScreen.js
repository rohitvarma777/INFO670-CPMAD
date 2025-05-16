import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { IconButton, Title, Paragraph } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';

const PictureViewingScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { fullImage, caption, description } = route.params;

  return (
    <View style={styles.container}>
      <IconButton
        icon="arrow-left"
        onPress={() => navigation.goBack()}
        style={styles.backButton}
        color="#dda15e"
      />
      <ScrollView contentContainerStyle={styles.imageContainer}>
        <Image source={{ uri: fullImage }} style={styles.fullImage} resizeMode="contain" />
        <Title style={styles.caption}>{caption}</Title>
        {description && (
          <Paragraph style={styles.description}>{description}</Paragraph>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#606c38',
  },
  imageContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 1,
  },
  fullImage: {
    width: '90%',
    height: 300,
    marginBottom: 16,
  },
  caption: {
    fontSize: 40,
    textAlign: 'center',
    color: '#dda15e',
    fontWeight: 'bold',
    marginTop: 16,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#dda15e',
    marginTop: 8,
    paddingHorizontal: 16,
  },
});

export default PictureViewingScreen;