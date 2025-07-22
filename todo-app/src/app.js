// import React from 'react';
// import TodoScreen from './screens/TodoScreen';

// export default function App() {
//   return <TodoScreen />;
// }


import React from 'react';
import { Text, View } from 'react-native';

export default function App() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24 }}>Hello, Todo App!</Text>
    </View>
  );
}
