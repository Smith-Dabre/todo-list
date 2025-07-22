import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useTailwind } from 'tailwindcss-react-native';
import { getTasks, addTask, updateTask, deleteTask } from '../services/api';
import TaskItem from '../components/TaskItem';

/**
 * TodoScreen is the main screen managing tasks list, input, and API calls.
 */
export default function TodoScreen() {
  const tailwind = useTailwind();
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const [editingTask, setEditingTask] = useState(null);

  // Fetch tasks from server on component mount
  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    const res = await getTasks();
    setTasks(res.data);
  };

  const handleAddOrEdit = async () => {
    if (!input.trim()) return;

    if (editingTask) {
      await updateTask(editingTask._id, input);
      setEditingTask(null);
    } else {
      await addTask(input);
    }

    setInput('');
    loadTasks();
  };

  const handleEdit = (task) => {
    setInput(task.title);
    setEditingTask(task);
  };

  const handleDelete = (id) => {
    Alert.alert('Confirm', 'Are you sure to delete?', [
      { text: 'Cancel' },
      { text: 'Delete', onPress: async () => {
        await deleteTask(id);
        loadTasks();
      }}
    ]);
  };

  return (
    <View style={tailwind('flex-1 p-4 bg-white')}>
      <Text style={tailwind('text-2xl font-bold text-center mb-4')}>Todo List</Text>

      <View style={tailwind('flex-row mb-4')}>
        <TextInput
          value={input}
          onChangeText={setInput}
          placeholder="Enter task"
          style={tailwind('border p-2 flex-1 mr-2 rounded')}
        />
        <TouchableOpacity onPress={handleAddOrEdit} style={tailwind('bg-green-500 px-4 py-2 rounded')}>
          <Text style={tailwind('text-white')}>{editingTask ? 'Update' : 'Add'}</Text>
        </TouchableOpacity>
      </View>

      <Text style={tailwind('text-xl mb-2')}>My Tasks</Text>

      <ScrollView>
        {tasks.map(task => (
          <TaskItem
            key={task._id}
            task={task}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </ScrollView>
    </View>
  );
}
