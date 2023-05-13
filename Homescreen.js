import * as React from 'react';
import { StyleSheet, Text, View, TextInput, Button, Touchable, TouchableOpacity } from 'react-native';

export default class Homescreen extends React.Component{
    constructor(){
        super()
        this.state={
            text : "",
            isSearchPressed : "",
            word : "",
            lexicalCategory : "",
            examples : [],
            defination: "",
        }
    }
    render(){
        return (
            <View>
                <TextInput                  
                 style={StyleSheet.inputBox}
                    onChangeText={text => {
                        this.setState{{
                            text: text,
                            isSearchPressed : false,
                            word : "Loading...",
                            lexicallCategory : '',
                            examples : [],
                            defination : ""
                        }}
                    }}
                    value={this.state.text}
                />
                <TouchableOpacity
                    style={StyleSheet.searchButton}
                    onPress={() => {
                        this.setState{{ isSearchPressed: true }}
                        this.getWord(this.state.text)
                    }}>
                </TouchableOpacity>
                <View style={styles.detailsContaniner}>
                    <Text style={styles.detailsTitle}>
                        Word :{" "}
                    </Text>
                    <Text style={{fontSize:18}}>
                        {this.state.word}
                    </Text>
                </View>
                <View style={styles.detailsContaniner}>
                    <Text style={styles.detailsTitle}>
                        Type :{" "}
                    
                    </Text>
                    <Text style={{fontSize:18}}>
                        {this.state.lexicalCategory}
                    </Text>
                </View>
                <View style={{flexDirection:'row', flexWrap: 'wrap'}}>
                    <Text style={styles.detailsTitle}>
                        Defintion :{" "}
                    </Text>
                    <Text style={{fontSize:18}}>
                        {this.state.defination}
                    </Text>                    
                </View>               
            </View>
        )
    }
}

getWord=(word)=>{
    var searchKeyword=word.toLowerCase()
    var url = "https://rupinwhitehatjr.github.io/dictionary/"+searchKeyword+".json"
    return fetch(url)
    .then((data)=>{
        if(data.status===200)
        {
            return data.json()
        }
        else
        {
            return null
        }
    update(url)
    .then((response)=>{
        var responseObject = response 
        if(responseObject)
        {
            var wordData = responseObject.defination[0]
            var defination=wordData.description
            var lexicalCategory=wordData.wordtype

            this.setState({
                "word" : this.state.text,
                "defination" :defination,
                "lexicalCategory": lexicalCategory
            })
        }
        else
        {
            this.setState({
                "word": this.state.text,
                "defination" :"Not Foun",
            })
        }
    })
    })
}

const styles = StyleSheet.create({
    searchButton: {

    },
    detailsContaniner: {

    },
    detailsTitle: {

    }
})