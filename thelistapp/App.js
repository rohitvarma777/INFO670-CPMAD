import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, Alert, TouchableOpacity } from 'react-native';

export default function App() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);

  const addTask = () => {
    if (task.trim() === '') {
      Alert.alert('Error', 'Task name cannot be empty');
      return;
    }
    const isDuplicate = tasks.some(t => t.name.toLowerCase() === task.trim().toLowerCase());
    if (isDuplicate) {
      Alert.alert('Error', 'Task already exists');
      return;
    }
    const newTask = {
      key: Math.random().toString(),
      name: task,
      completed: false
    };
    setTasks(prevTasks => [...prevTasks, newTask]);
    setTask('');
  };

  const toggleCompletion = (key) => {
    setTasks(prevTasks => {
      return prevTasks.map(t => {
        if (t.key === key) {
          return { ...t, completed: !t.completed };
        }
        return t;
      }).sort((a, b) => a.completed - b.completed);
    });
  };

  const deleteTask = (key) => {
    setTasks(tasks.filter(t => t.key !== key));
  };

  const markAllComplete = () => {
    setTasks(prevTasks => prevTasks.map(t => ({ ...t, completed: true })));
  };

  const renderTaskItem = ({ item }) => (
    <View style={[styles.item, item.completed && styles.itemCompleted]}>
      <TouchableOpacity style={{ flex: 1 }} onPress={() => toggleCompletion(item.key)}>
        <Text style={[styles.itemText, item.completed && styles.completedTask]}>{item.name}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => deleteTask(item.key)} style={styles.deleteButton}>
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>URec Drexel</Text>
      <Text style={styles.subtitle}>Admin Task Panel</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add a new task"
          placeholderTextColor="#ccc"
          value={task}
          onChangeText={setTask}
        />
        <TouchableOpacity onPress={addTask} style={styles.button}>
          <Text style={styles.buttonLabel}>➕ Add</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        style={styles.taskList}
        data={tasks}
        keyExtractor={(item) => item.key}
        ListEmptyComponent={<Text style={styles.empty}>No tasks yet. Add one above!</Text>}
        renderItem={renderTaskItem}
      />
      {tasks.length > 0 && (
        <TouchableOpacity onPress={markAllComplete} style={styles.markAllButton}>
          <Text style={styles.markAllButtonLabel}>Mark All Complete</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#07294d',
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 38,
    fontWeight: '700',
    color: '#ffffff',
    textAlign: 'center',
    fontFamily: 'MillerDisplay',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 20,
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 30,
    opacity: 0.85,
    fontFamily: 'MillerDisplay'
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    color: '#07294d',
    marginRight: 10,
    fontFamily: 'MillerDisplay'
  },
  button: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 16,
    elevation: 3,
  },
  buttonLabel: {
    color: '#07294d',
    fontSize: 16,
    fontWeight: 'bold',
  },
  taskList: {
    flex: 1,
  },
  empty: {
    color: '#ffffff',
    textAlign: 'center',
    marginTop: 40,
    fontSize: 16,
    fontStyle: 'italic',
    opacity: 0.6,
    fontFamily: 'MillerDisplay'
  },
  item: {
    backgroundColor: '#ffffff',
    padding: 18,
    marginBottom: 14,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  itemCompleted: {
    opacity: 0.6,
  },
  itemText: {
    fontSize: 16,
    color: '#07294d',
    fontFamily: 'MillerDisplay'
  },
  completedTask: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
  deleteButton: {
    marginLeft: 10,
    backgroundColor: '#ff4444',
    borderRadius: 8,
    padding: 8,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  markAllButton: {
    backgroundColor: '#388e3c',
    borderRadius: 12,
    paddingVertical: 12,
    marginVertical: 20,
    alignItems: 'center',
    elevation: 3,
  },
  markAllButtonLabel: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'MillerDisplay'
  },
});