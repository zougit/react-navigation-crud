import * as React from 'react';
import { useState } from 'react';
import { View, Text, Button, StyleSheet, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const clearAll = async () => {
  try {
    await AsyncStorage.clear()
  } catch (e) {
    // clear error
  }

  console.log('\nclear Done.\n')
}

const ajtprod = async (prod) => {
  try {
    let value = await getMyObject('products')
    if (value == null || value == undefined) {
      await AsyncStorage.setItem('products', JSON.stringify([prod]))
    } else {
      //await AsyncStorage.mergeItem('products', JSON.stringify([prod]))
      value.push(prod)
      await AsyncStorage.setItem('products', JSON.stringify(value))
    }
    //console.log('produit :\n', prod);
    //console.log('valeur :\n', value);
    //console.log(typeof value);
  }
  catch (error) {
    console.error(error)
  }
  //console.log(prod)
}

const getMyObject = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('products')
    return jsonValue != null ? JSON.parse(jsonValue) : null
  } catch (error) {
    console.log(error)
  }

  console.log('Done.')
}

function AjouterProduitScreen({ navigation }) {
  const [textName, setTextName] = useState("");
  const [textPrice, setTextPrice] = useState("");
  
  React.useEffect(() => {
    //testStorage()
  }, []);
  
  async function testStorage() {
    const greet = await getMyObject();
    console.log('liste :\n', greet, '\n___________fin_____________');
  }

  const saveProduct = () => {
    let prod = { name: textName, price: textPrice };
    ajtprod(prod);
  }

  //console.log(textName,textPrice);
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.title}>
        <Text style={styles.texttitle}>Ajouter un produit</Text>
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

        <Button title="submit" onPress={() => saveProduct()} />
        <Button title="clear" onPress={() => clearAll()} />
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

export default AjouterProduitScreen