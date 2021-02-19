import * as React from 'react';
import { useEffect,useState } from 'react';
import { View, Text, Button, StyleSheet, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getMyObject = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('products')
      return jsonValue != null ? JSON.parse(jsonValue) : null
    } catch (error) {
      console.log(error)
    }
}
const supprprod = async (prod) => {
    try {
        let value = await getMyObject('products')
        const supprvalue = prod
        const pos = value.indexOf(prod)
         console.log(pos);
        if (supprvalue == value[pos] && supprvalue != null) {
            value.splice(pos,1)
        } 
      }
      catch (error) {
        console.error(error)
      }
}

function SupprimerProduitScreen({ navigation }) {
    const [textName, setTextName] = useState("");
    const [textPrice, setTextPrice] = useState("");

    async function testStorage() {
        const greet = await getMyObject();
        console.log('liste :\n', greet, '\n___________fin_____________');
      }
      useEffect(() => {
        //testStorage()
      }, []);

    const supprProduct = () => {
        let prod = { name: textName, price: textPrice };
        supprprod(prod);
      }
    return (
        <View style={{ flex: 1 }}>
            <View style={styles.title}>
                <Text style={styles.texttitle}>Supprimer un produit</Text>
            </View>

            <View style={styles.produit}>
                <Text style={{ fontSize: 25 }}>Nom:</Text>
                <TextInput
                    style={styles.inputproduit}
                    placeholder="insérer un nom"
                    onChangeText={(textName) => setTextName(textName)}
                />

                <Text style={{ fontSize: 25 }}>Prix:</Text>
                <TextInput style={styles.inputproduit}
                    placeholder="insérer un prix"
                    onChangeText={(textPrice) => setTextPrice(textPrice)}
                />

                <Button title="submit" onPress={() => supprProduct()} />
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

export default SupprimerProduitScreen