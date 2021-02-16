import * as React from 'react';
import { useState } from 'react';
import { View, Text, Button, StyleSheet, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


  console.log(keys)
  // example console.log result:
  // ['@MyApp_user', '@MyApp_key']
}

const clearAll = async () => {
  try {
    await AsyncStorage.clear()
  } catch(e) {
    // clear error
  }

  console.log('Done.')

}

function AjouterProduitScreen({ navigation }) {
  const [textName,setTextName]=useState("");
  const [textPrice,setTextPrice]=useState("");
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
        onChangeText ={(textName) => setTextName(textName)} 
        />
        
        <Text style={{ fontSize: 25 }}>Prix:</Text>
        <TextInput style={styles.inputproduit} 
        placeholder="insérer un prix" 
        onChangeText ={(textPrice) => setTextPrice(textPrice)}
        />

        <Button title="submit" onPress={() => ajtprod(textName,[textName,textPrice])} />
        <Button title="submit ALL" onPress={() => getAllKeys()} />
        <Button title="clear ALL" onPress={() => clearAll()} />
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