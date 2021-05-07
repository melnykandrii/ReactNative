import React from "react";
import { View, StyleSheet, FlatList, SafeAreaView, Text } from "react-native";

import { fontSizes, spacing } from '../../utils/sizes';
import { RoundedButton } from '../../components/RoundedButton';

const HistoryItem = ({ item, index }) => {
    return (
        <Text style={styles.historyItem(item.status)}>
            {item.subject}      
        </Text>
    )
}
//JSON.stringify(item) to check the string on the requst
export const FocusHistory = ({ focusHistory, onClear }) => {
    const clearHistory = () => {
        onClear();
    }

    return (
        <>
            <SafeAreaView style={{flex:1, alignItems:'center'}}>
                {!!focusHistory.length && (
                    <>
                    <Text style={styles.title}> Things we've focused on:</Text>
                    <FlatList 
                        style={{flex:1}}
                        contentContainerStyle={{flex:1, alignItems: 'center'}}
                        data={focusHistory}
                        renderItem={HistoryItem}
                    />
                    <View style={styles.clearContainer}>
                        <RoundedButton 
                            size={75} 
                            title="Clear" 
                            onPress={() => onClear()} 
                        />
                    </View>
                    </>
                )}
            </SafeAreaView>
            
        </>
    );
};

const styles = StyleSheet.create({
    historyItem: (status) => ({
        color: status > 0 ? 'green' : 'red',
        fontSize: fontSizes.md
    }),
    title: {
        color: 'black',
        fontSize: fontSizes.lg
    },
    clearContainer: {
        alignItems: 'center',
        padding: spacing.md
    }
})