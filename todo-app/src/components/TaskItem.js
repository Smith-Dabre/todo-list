import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTailwind } from 'tailwindcss-react-native';

/**
 * TaskItem Component displays a single task with Edit and Delete buttons
 */
export default function TaskItem({ task, onEdit, onDelete }) {
  const tailwind = useTailwind();

  return (
    <View style={tailwind('flex-row justify-between items-center p-2 bg-gray-100 rounded mb-2')}>
      <Text style={tailwind('text-lg')}>{task.title}</Text>
      <View style={tailwind('flex-row')}>
        <TouchableOpacity onPress={() => onEdit(task)} style={tailwind('bg-blue-500 px-2 py-1 rounded mr-2')}>
          <Text style={tailwind('text-white')}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onDelete(task._id)} style={tailwind('bg-red-500 px-2 py-1 rounded')}>
          <Text style={tailwind('text-white')}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
