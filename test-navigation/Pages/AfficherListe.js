import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
 
const getMyObject = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('products')
    return jsonValue != null ? JSON.parse(jsonValue) : null
  } catch (error) {
    console.log(error)
  }

  console.log('Done.')
}


const slugify = str => str ? str.replace('/\s+/g', '-') : '';

async function testStorage() {
    const greet = await getMyObject();
    console.log('liste :\n', greet, '\n___________fin_____________');
  }

function AfficherListe({ navigation }) {
  const [page, setPage] = useState(0);
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    //testStorage()
  }, []);
  
  useEffect(() => {
    if (!productList.length) {
      getMyObject().then((value) => {
        value = [...value]
        if (value.length >= page+10){
          setProductList(value.slice(0,page+10));
        } else {
          setProductList(value.slice(0,value.length));
        }
        })
    }
  })

  const loadNextPage = () => {
   // console.log(page);
    const nextPage = page + 5;
    getMyObject().then((value) => {
      value = [...value]
      //console.log(value.length);
      if (value.length >= nextPage+10){
        setProductList(value.slice(0,nextPage+10));
        setPage(nextPage);
        //console.log(nextPage);
      } else {
        setProductList(value.slice(0,value.length));
        //console.log(nextPage);
      }
    })

  }

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.list}>
        {!productList.length && <Text style={styles.texttitle}>No product found ...</Text>}
        {productList.length > 0 &&
          <FlatList
            data={productList}
            ListHeaderComponent={
              <View style={styles.title}>
                <Text style={styles.texttitle}>Afficher la liste</Text>
              </View>
            }
            ListFooterComponent={
              <View style={styles.boutonHome}>
                <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
              </View>
            }
            initialNumToRender={5}
            renderItem={({ item }) => <Text style={styles.item}>{item.name} : {item.price}</Text>}
            keyExtractor={item => slugify(item.name)}
            onEndReached={loadNextPage}
            onEndReachedThreshold={0.5}
          />}
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
  list: {
    flex: 1,
    width: '100%',
    height: 500,
    alignItems: 'center',
  },
  item: {
    flex: 1,
    width: '100%',
    marginVertical: 10,
    padding: 25,
    fontSize: 25,
    backgroundColor: '#ccc',
  },
  boutonHome: {
    flex: 1,
    position: "absolute",
    justifyContent: 'center',
    alignItems: 'flex-end',
    flexDirection: 'row',
  },
  boutons: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

});

export default AfficherListe