
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Avatar } from '@mui/material';
import { useTheme } from '@mui/material/styles';


const NotFoundView = () => {



    const theme = useTheme();

    const styles = StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      text: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
      },
      avatar: {
        width: 200,
        height: 200,
        borderRadius: 100,
      },
    });
  
    return (
      <View style={styles.container}>
        <Text style={[styles.text, { color: theme.palette.text.primary }]}>
          Coś poszło nie tak, strony nie znaleziono!
        </Text>
        <Avatar
            style={styles.avatar}
            src={require("./logo.jpg")}
        />
      </View>
    );
};


export default NotFoundView;