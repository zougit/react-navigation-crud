import * as React from 'react';
import { View, Text, Button, StyleSheet, TextInput } from 'react-native';

function MajProduitScreen({ navigation }) {
    return (
        <View style={{ flex: 1 }}>
            <View style={styles.title}>
                <Text style={styles.texttitle}>Mettre à jour un produit</Text>
            </View>

            <View style={styles.produit}>
                <Text style={{ fontSize: 25 }}>à mettre à jour:</Text>
                <Text style={{ fontSize: 25 }}>Nom:</Text>
                <TextInput style={styles.inputproduit} placeholder="insérer un nom" />
                <Text style={{ fontSize: 25 }}>Prix:</Text>
                <TextInput style={styles.inputproduit} placeholder="insérer un prix" />
                <Text style={{ fontSize: 25 }}>to:</Text>
                <Text style={{ fontSize: 25 }}>Nom:</Text>
                <TextInput style={styles.inputproduit} placeholder="insérer un nom" />
                <Text style={{ fontSize: 25 }}>Prix:</Text>
                <TextInput style={styles.inputproduit} placeholder="insérer un prix" />
            </View>

            <View style={styles.boutons}>
                <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
                <Button title="voir la liste" onPress={() => navigation.navigate('AfficherListe')} />
            </View>
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

export default MajProduitScreen