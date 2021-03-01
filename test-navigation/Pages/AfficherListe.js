import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    Button,
    StyleSheet,
    FlatList,
    TouchableHighlight,
    Modal,
    Pressable,
    TextInput,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const getMyObject = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem("products");
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (error) {
        console.log(error);
    }

    console.log("Done.");
};

const slugify = (str) => (str ? str.replace("/s+/g", "-") : "");

async function testStorage() {
    const greet = await getMyObject();
    console.log("liste :\n", greet, "\n___________fin_____________");
}

function AfficherListe({ navigation }) {
    const [page, setPage] = useState(0);
    const [productList, setProductList] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [textName, setTextName] = useState("");
    const [textPrice, setTextPrice] = useState("");
    const [updateId, setUpdateId] = useState(0);
    const [updateProd, setUpdateProd] = useState("");

    useEffect(() => {
       // testStorage()
    }, []);

    useEffect(() => {
        if (!productList.length) {
            getMyObject().then((value) => {
                value = [...value];
                if (value.length >= page + 10) {
                    setProductList(value.slice(0, page + 10));
                } else {
                    setProductList(value.slice(0, value.length));
                }
            });
        }
    });

    const loadNextPage = () => {
        // console.log(page);
        const nextPage = page + 5;
        getMyObject().then((value) => {
            value = [...value];
            //console.log(value.length);
            if (value.length >= nextPage + 10) {
                setProductList(value.slice(0, nextPage + 10));
                setPage(nextPage);
                //console.log(nextPage);
            } else {
                setProductList(value.slice(0, value.length));
                //console.log(nextPage);
            }
        });
    };

    // Ici le handler sur le touchable qu'on va ajouter
    const deleteProduct = (prodIndex) => {
        // Do product delete prodIndex
        //alert('clicked !!');
        //console.log(prodIndex);

        getMyObject().then((value) => {
            value.splice(prodIndex, 1);
            AsyncStorage.setItem("products", JSON.stringify(value));
            setProductList(value);
        });
    };

    const OpenMaj = (prodIndex,prodItem) => {
        if (!modalVisible) {
            setModalVisible(!modalVisible);
        } 
        setUpdateId(prodIndex);
        setUpdateProd(prodItem);
        console.log("state ",updateProd);
        console.log("id ",prodIndex);
    };

    const MajProduct = (index,prod) => {
            getMyObject().then((value) => {
            value.splice(index, 0,prod);
            AsyncStorage.setItem("products", JSON.stringify(value));
            setProductList(value);
        });
        console.log();
    };

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.list}>
                {!productList.length && (
                    <Text style={styles.texttitle}>No product found ...</Text>
                )}
                {productList.length > 0 && (
                    <FlatList
                        data={productList}
                        ListHeaderComponent={
                            <View style={styles.title}>
                                <Text style={styles.texttitle}>
                                    Afficher la liste
                                </Text>
                            </View>
                        }
                        ListFooterComponent={
                            <View style={styles.boutonHome}>
                                <Button
                                    title="Go to Home"
                                    onPress={() => navigation.navigate("Home")}
                                />
                            </View>
                        }
                        initialNumToRender={5}
                        renderItem={({ item, index }) => (
                            <View
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <Text style={styles.item}>
                                    {item.name} : {item.price}
                                </Text>
                                <View
                                    style={{
                                        flexDirection: "column",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    <TouchableHighlight
                                        onPress={() => deleteProduct(index)}
                                        style={{
                                            alignItems: "center",
                                            justifyContent: "center",
                                            width: 30,
                                            height: 30,
                                        }}
                                    >
                                        <Text style={{ color: "red" }}>X</Text>
                                    </TouchableHighlight>

                                    <TouchableHighlight
                                        onPress={() => OpenMaj(index,item)}
                                        style={{
                                            alignItems: "center",
                                            justifyContent: "center",
                                            width: 30,
                                            height: 30,
                                        }}
                                    >
                                        <Text style={{ color: "green" }}>
                                            maj
                                        </Text>
                                    </TouchableHighlight>
                                </View>
                            </View>
                        )}
                        keyExtractor={(item) => slugify(item.name)}
                        onEndReached={loadNextPage}
                        onEndReachedThreshold={0.5}
                    />
                )}
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.title}>
                    <View style={styles.modalView}>
                        <Pressable
                            onPress={() => setModalVisible(!modalVisible)}
                        >
                            <Text>quitter</Text>
                        </Pressable>

                        <Text style={{ fontSize: 25 }}>à mettre à jour:</Text>
                        <Text style={{ fontSize: 25 }}>Nom:</Text>
                        <TextInput
                            style={styles.inputproduit}
                            placeholder="insérer un nom"
                            onChangeText={(textName) => setTextName(textName)}
                        > 
                        <Text>{updateProd.name}</Text>
                        </TextInput>

                        <Text style={{ fontSize: 25 }}>Prix:</Text>
                        <TextInput
                            style={styles.inputproduit}
                            placeholder="insérer un prix"
                            onChangeText={(textPrice) => setTextPrice(textPrice)}
                        > 
                        <Text>{updateProd.price}</Text>
                        </TextInput>

                        <Button
                            title="submit"
                            onPress={() => MajProduct(updateId,setUpdateProd([textName, textPrice]))}
                        />
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    title: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    texttitle: {
        flex: 1,
        fontSize: 40,
    },
    list: {
        flex: 1,
        width: "100%",
        height: 500,
        alignItems: "center",
    },
    item: {
        flex: 1,
        width: "100%",
        marginVertical: 10,
        padding: 25,
        fontSize: 25,
        backgroundColor: "#ccc",
    },
    boutonHome: {
        flex: 1,
        position: "absolute",
        justifyContent: "center",
        alignItems: "flex-end",
        flexDirection: "row",
    },
    boutons: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    inputproduit: {
        justifyContent: "center",
        fontSize: 25,
        backgroundColor: "#CCC",
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
});

export default AfficherListe;
