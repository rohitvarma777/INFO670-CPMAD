import React, { useState, useEffect } from 'react';
import { Picker } from '@react-native-picker/picker';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { TextInput, Button, RadioButton, Switch, Card, Title } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('male');
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [country, setCountry] = useState('');
  const countries = ['USA', 'Canada', 'UK', 'Other'];
  const [saveMessage, setSaveMessage] = useState('');
  const [saveError, setSaveError] = useState('');

  useEffect(() => {
    loadProfileData();
  }, []);

  const loadProfileData = async () => {
    try {
      const savedProfile = await AsyncStorage.getItem('userProfile');
      if (savedProfile) {
        const profile = JSON.parse(savedProfile);
        setName(profile.name || '');
        setEmail(profile.email || '');
        setGender(profile.gender || 'male');
        setNotificationsEnabled(profile.notificationsEnabled || false);
        setCountry(profile.country || '');
      }
    } catch (error) {
      console.error('Failed to load profile data', error);
    }
  };

  const saveProfileData = async () => {
    if (!name.trim()) {
      Alert.alert('Error', 'Name cannot be empty.');
      return;
    }

    if (!email.trim()) {
      Alert.alert('Error', 'Email cannot be empty.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Error', 'Invalid email format.');
      return;
    }

    const profileData = { name, email, gender, notificationsEnabled, country };
    try {
      await AsyncStorage.setItem('userProfile', JSON.stringify(profileData));
      Alert.alert('Success', 'Profile saved successfully!');
      setSaveMessage('');
      setSaveError('');
    } catch (error) {
      console.error('Failed to save profile data', error);
      Alert.alert('Error', 'Failed to save profile.');
      setSaveMessage('');
      setSaveError('');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.title}>My Profile</Title>
          <Text style={styles.fixedLabel}>Name:</Text>
          <TextInput
            value={name}
            onChangeText={setName}
            mode="flat" 
            style={styles.input}
          />
          <Text style={styles.fixedLabel}>Email:</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            mode="flat" 
            keyboardType="email-address"
            style={styles.input}
          />
          <Text style={styles.label}>Gender:</Text>
          <RadioButton.Group onValueChange={setGender} value={gender}>
            <View style={styles.radioContainer}>
              <RadioButton value="male" />
              <Text style={styles.radioText}>Male</Text>
            </View>
            <View style={styles.radioContainer}>
              <RadioButton value="female" />
              <Text style={styles.radioText}>Female</Text>
            </View>
            <View style={styles.radioContainer}>
              <RadioButton value="other" />
              <Text style={styles.radioText}>Other</Text>
            </View>
          </RadioButton.Group>
          <View style={styles.switchContainer}>
            <Text style={styles.label}>Enable Notifications:</Text>
            <Switch value={notificationsEnabled} onValueChange={setNotificationsEnabled} />
          </View>
          <Text style={styles.label}>Country:</Text>
          <Picker
            selectedValue={country}
            style={styles.picker}
            onValueChange={(itemValue) => setCountry(itemValue)}
          >
            <Picker.Item label="Select a country" value="" />
            {countries.map((c) => (
              <Picker.Item key={c} label={c} value={c} />
            ))}
          </Picker>
          <Button mode="contained" onPress={saveProfileData} style={styles.saveButton}>
            Save Profile
          </Button>
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    justifyContent: 'center',
    backgroundColor: '#606c38', 
  },
  card: {
    padding: 16,
  },
  title: {
    marginBottom: 24,
    textAlign: 'center',
    color: '#283618', 
  },
  input: {
    marginBottom: 16, 
  },
  label: {
    marginTop: 16,
    marginBottom: 8,
    fontWeight: 'bold',
    color: '#283618', 
  },
  fixedLabel: {
    marginBottom: 4, 
    fontWeight: 'bold',
    color: '#283618',
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    marginRight: 16, 
  },
  radioText: {
    marginLeft: 8, 
    color: '#212121', 
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  picker: {
    marginBottom: 16,
    color: '#212121', 
  },
  saveButton: {
    marginTop: 24,
    backgroundColor: '#283618', 
    color: '#fff', 
  },
  successMessage: {
    marginTop: 16,
    color: '#283618',
    textAlign: 'center',
  },
  errorMessage: {
    marginTop: 16,
    color: 'red',
    textAlign: 'center',
  },
});

export default ProfileScreen;