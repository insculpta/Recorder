import React from 'react';
import {
    View,
    StyleSheet
} from 'react-native';

import RecorderMode from './components/RecorderMode';

export default class App extends React.Component {

    render() {
        return (
            <View style={styles.root}>
                <RecorderMode />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    root: {
        flex: 1
    }
});