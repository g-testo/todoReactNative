// import { StatusBar } from 'expo-status-bar';
// import React from 'react';
// import { StyleSheet, Text, View } from 'react-native';

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Hellos World</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

import * as React from 'react';
import { Button, Text, ScrollView } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const HomeScreen = ({ navigation }) => {
    let [items, setItems] = React.useState([]);
    React.useEffect(()=>{
        fetch("http://192.168.1.9:8000/api/lists/")
            .then((res)=>res.json())
            .then((data)=>{
                console.log(data);
                setItems(data);
            })
            // .catch(err=>console.log(err));
    }, []);
      let itemsToDisplay = items.map((item)=>{
        return <Text key={item.id}>{item.name}</Text>
      })

    return (
        <ScrollView>
            {itemsToDisplay}
        </ScrollView>
    //   <Button
    //     title="Go to Jane's profile"
    //     onPress={() =>
    //       navigation.navigate('Profile', { name: 'Jane' })
    //     }
    //   />
    );
};
  
const ProfileScreen = ({ navigation, route }) => {
    return <Text>This is {route.params.name}'s profile</Text>;
};

export default function App(){
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
        //   options={{ title: 'Welcome' }}
        />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
