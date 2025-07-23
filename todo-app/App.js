import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import API from './src/services/api';
import axios from 'axios';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchTasks();
    // console.log("App loaded");
  }, []);

  const fetchTasks = async () => {
    const res = await API.get('/tasks');
    setTasks(res.data);
  };

  const handleAddTask = async () => {
    if (!input) return;

try {

    if (editId) {
      await API.put(`/tasks/${editId}`, { title: input });
      setEditId(null);
    } else {
      // console.log("Task added");
      await API.post('/tasks', { title: input });
    }

    setInput('');
    fetchTasks();
    
 } catch (error) {
    console.error('Error adding/updating task:', error.message);
    console.log('Full error:', error.response?.data || error);
  }

  };

  const handleDelete = async (id) => {
    await API.delete(`/tasks/${id}`);
    fetchTasks();
  };

  const handleEdit = (task) => {
    setInput(task.title);
    setEditId(task._id);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Todo List</Text>

      <View style={styles.inputContainer}>
        <TextInput
          value={input}
          onChangeText={setInput}
          placeholder="Enter task..."
          style={styles.input}
        />
        <Button title={editId ? "Update" : "Add"} onPress={handleAddTask} />
      </View>

      <Text style={styles.subHeader}>My Tasks</Text>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.taskItem}>
            <Text style={styles.taskText}>{item.title}</Text>
            <View style={styles.actions}>
              <TouchableOpacity onPress={() => handleEdit(item)}>
                <Text style={styles.edit}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDelete(item._id)}>
                <Text style={styles.delete}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 30, flex: 1, backgroundColor: '#e2fefe' },
  header: { fontSize: 28, fontWeight: 'bold', marginBottom: 10 , marginTop:20},
  subHeader: { fontSize: 22, marginTop: 20, marginBottom: 10 },
  inputContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  input: { flex: 1, borderColor: '#181a1a', borderWidth: 1, padding: 10, marginRight: 10, borderRadius: 5 },
  taskItem: { flexDirection: 'row', justifyContent: 'space-between', padding: 10, backgroundColor: '#eee', marginVertical: 5, borderRadius: 5 },
  taskText: { fontSize: 16 },
  actions: { flexDirection: 'row', gap: 10 },
  edit: { color: 'blue', marginRight: 10 },
  delete: { color: 'red' },
});
