import React from 'react';
import {Text, TouchableOpacity, StyleSheet, Platform} from 'react-native';
import Colors from '../utils/Colors';
import {fontSizes, spacing} from '../utils/sizes';

export const RoundedButton = ({
    style = {},
    textStyle = {},
    size = 100,
    ...props
}) => {
   
    return (
        <TouchableOpacity 
             {...props} 
            style={[styles(size).conteiner, style]} 
            onPress={props.onPress}
        >
            <Text style={[styles(size).text, textStyle]}>
                {props.title}
            </Text>
        </TouchableOpacity>
    );
}

const styles = (size) => StyleSheet.create({
    conteiner: {
        borderRadius: size / 2,
        width: size,
        height: size,
        alignItems: 'center',
        borderColor: Platform.OS === 'android' ? Colors.headdroid : Colors.labelios,
        borderWidth:2        
    },
    text:{
        color: Platform.OS === 'android' ? Colors.headdroid : Colors.labelios,
        fontSize: size / 3.5,
        paddingTop: 18
    }
});