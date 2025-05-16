import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

export default function GalleryItem({ image, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.item}>
      <Image source={{ uri: image.thumbnailUrl }} style={styles.thumbnail} />
      <Text style={styles.title}>{image.title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: { flexDirection: 'row', padding: 10, alignItems: 'center', borderBottomWidth: 1, borderColor: '#ccc' },
  thumbnail: { width: 80, height: 80, marginRight: 10, borderRadius: 10 },
  title: { fontSize: 16 },
});