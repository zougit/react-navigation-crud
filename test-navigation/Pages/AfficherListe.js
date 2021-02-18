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

function* Products(genPage) {
  let current = 1 + 10 * (genPage - 1);
  let max = 10 * genPage;
  let p = [];
  //console.log(p.length);
  let i = 0;
  while (current <= 40  ) {
    while (current <= max  ) {
      p[i];
      // p.push ({
      //   name : "truc"+current,
      //   price : "",        
      // });
      current++;
    }
    let next = yield p;
  } 
  return [];
}
const slugify = str => str ? str.replace('/\s+/g', '-') : '';

async function testStorage() {
    const greet = await getMyObject();
    console.log('liste :\n', greet, '\n___________fin_____________');
    return greet;
  }

function AfficherListe({ navigation }) {
  const [page, setPage] = useState(0);
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    testStorage()
  }, []);
  
  

  useEffect(() => {
    if (!productList.length) {
      loadNextPage();
    }
  })

  const loadNextPage = () => {
   // console.log(page);
    const nextPage = page + 1;
    const prods = [...productList, ...Products(nextPage).next().value];

    setProductList(prods);

    setPage(nextPage);
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