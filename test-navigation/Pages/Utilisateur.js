import * as React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

function UserScreen({ navigation }) {
    return (
        <View>
           
        </View>
    );
}

const styles = StyleSheet.create({
    title: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    texttitle: {
        flex: 1,
        fontSize: 40,
    },
    produit: {
        alignItems: 'center',
    },
    inputproduit: {
        justifyContent: 'center',
        fontSize: 25,
        backgroundColor: '#CCC',
    },
    boutons: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end',
        flexDirection: 'row',
    },
});

export default UserScreen