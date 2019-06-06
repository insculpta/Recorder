import React from 'react';
import {
    View,
    StyleSheet, 
    Text,
    TouchableHighlight,
    AsyncStorage
} from 'react-native';

import Record from './Record';
import Play from './Play';

export default class RecorderMode extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            fileList: [],
            isRecord: true
        };

        this.recordPress = this.recordPress.bind(this);
        this.playPress = this.playPress.bind(this);
        this.addNewFile = this.addNewFile.bind(this);
    }

    componentDidMount() {
        AsyncStorage.getItem('fileList').then(value => {
            if(JSON.parse(value)){
                this.setState({
                    fileList: JSON.parse(value)
                });
            }
            else{
                this.setState({
                    fileList: []
                });
            }
        });
    }

    componentWillUnmount() {
        AsyncStorage.setItem('fileList', JSON.stringify(this.state.fileList));
    }

    recordPress() {
        this.setState({
            isRecord: true
        });
    }

    playPress() {
        this.setState({
            isRecord: false
        });
    }

    addNewFile(filename) {
        this.setState((prevState, props) => ({
            fileList: [...prevState.fileList, filename]
        }));
        AsyncStorage.setItem('fileList', JSON.stringify(this.state.fileList));
    }

    render() {
        return (
            <View style={styles.root}>
                <View style={styles.menuBar}></View>
                <View style={styles.rpBar}>
                    <TouchableHighlight onPress={this.recordPress}>
                        <Text style={ this.state.isRecord ? styles.rpOn : styles.rpOff }>Record</Text>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={this.playPress}>
                        <Text style={ this.state.isRecord ? styles.rpOff : styles.rpOn }>Play</Text>
                    </TouchableHighlight>
                </View>
                <View style={styles.content}>
                {
                    this.state.isRecord ? 
                    <Record addNewFile={this.addNewFile} /> :
                    <Play fileList={this.state.fileList} />
                }
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    root: {
        flex: 1
    },
    menuBar: {
        flex: 1,
        backgroundColor: 'black'
    },
    rpBar: {
        flex: 1,
        backgroundColor: 'gray',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    content: {
        flex: 6,
        backgroundColor: 'gray'
    },
    rpOn: {
        fontSize: 32,
        color: 'green'
    },
    rpOff: {
        fontSize: 32,
        color: 'white'
    }
});