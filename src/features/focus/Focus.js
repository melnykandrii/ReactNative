import React, {useState} from 'react';
import {View, Text, StyleSheet, Platform} from 'react-native';
import * as Colors from '../../utils/Colors';
import {TextInput} from 'react-native-paper';
import { RoundedButton } from '../../components/RoundedButton';
import { fontSizes, spacing } from '../../utils/sizes';

export const Focus = ({ addSubject }) => {
    const [subject, setSubject] = useState(null);
    return (
        <View style={styles.conteiner}>
            <View style={styles.innerContainer}>
                <Text style={styles.title}>What would you like to focus on?</Text>
                <View style={styles.inputContainer}>
                    <TextInput 
                        style={{flex:1, marginRight: spacing.md}} 
                        placeholder='Please enter your goal!'
                        onSubmitEditing={
                            ({ nativeEvent }) => {
                            setSubject(nativeEvent.text)
                            }
                        }
                    />
                    <RoundedButton 
                        size={50} 
                        title='+' 
                        onPress={() => {addSubject(subject)}}/>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    conteiner: {
        flex:0.5
    },
    innerContainer:{
        flex:1,
        padding: spacing.sm,
        justifyContent: 'center'
    },
    title:{
        color: Platform.OS === 'android' ? Colors.headdroid : Colors.labelios,
        fontFamily: 'open-sans-bold',
        fontSize: fontSizes.lg,
    },
    inputContainer:{
        paddingTop: spacing.md,
        flexDirection: 'row',
        alignItems: 'center'

    }
});