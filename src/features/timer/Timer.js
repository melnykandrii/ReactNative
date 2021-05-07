import React, { useState } from 'react';
import { View, Text, StyleSheet, Platform, Vibration } from 'react-native';
import {ProgressBar} from 'react-native-paper'

import Colors from '../../utils/Colors';
import { Countdown } from '../../components/Countdown';
import { RoundedButton } from '../../components/RoundedButton';
import { spacing, fontSizes } from '../../utils/sizes';
import {Timing} from './Timing';

import { useKeepAwake } from 'expo-keep-awake';

const DEFAULT_TIME = 0.1;

export const Timer = ({focusSubject, onTimerEnd, clearSubjest}) => {  
    useKeepAwake();

    const interval = React.useRef(null);
    const [minutes, setMinutes] = useState(DEFAULT_TIME);
    const [isStarted, setIsStarted] = useState(false);
    const [progress, setProgress] = useState(1);

    const onProgress = (progress) => {
        setProgress(progress);
    };

    const vibrate = () => {
        if (Platform.OS === 'android') {
            Vibration.vibrate(10000);
        } else {
            const interval = setInterval(() => Vibration.vibrate(), 1000);
            setTimeout(() => clearInterval(interval), 10000);
        }
    }

    const onEnd = () => {
        vibrate();
        setMinutes(DEFAULT_TIME);
        setProgress(1);
        setIsStarted(false);
        onTimerEnd();
    }

    const changeTime = (min) => {
        setMinutes(min);
        setProgress(1);
        setIsStarted(false);
    };

    return (
        <View style={styles.container}>
            <View style={styles.countdown}>
                <Countdown 
                    minutes={minutes} 
                    isPaused={!isStarted} 
                    onProgress={onProgress}
                    onEnd={onEnd}
                />
            </View>
            <View>
                <Text style={styles.title}>Focusing on:</Text>
                <Text style={styles.task}>{focusSubject}</Text>
            </View>
            <View style={styles.progressCont}>
                <ProgressBar style={styles.progress}
                    progress={progress}
                    color= {Platform.OS === 'android' ?'grey': 'grey'}
                />
            </View>
            <View style={styles.buttonWrapper}>
                <Timing onChangeTime={changeTime} />
            </View>
            <View style={styles.buttonStartWrapper}>
                {isStarted ? (<RoundedButton 
                    title='Pause'
                    onPress = {() => setIsStarted(false)}
                />) : (<RoundedButton 
                    title='Start'
                    onPress = {() => setIsStarted(true)}
                />)}
                
                    <RoundedButton 
                        title="Cancel"
                        onPress={() => clearSubjest()}
                    />
              
            </View>
            
        </View>
            
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
    },
    countdown: {
        flex:0.5,
        alignItems: 'center',
        justifyContent:'center',
    },
    title: {
        color: Platform.OS === 'android' ? Colors.headdroid : Colors.labelios,
        textAlign: 'center'
    },
    task: {
        color: Platform.OS === 'android' ? Colors.accentColor : Colors.labelios,
        textAlign:'center',
        fontWeight: 'bold',
        fontSize: fontSizes.xl
    },
    buttonWrapper: {
        flex: 0.2,
        flexDirection: 'row',
        paddingTop: 10,
        paddingBottom: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonStartWrapper: {
        flex: 0.2,
        flexDirection:'row-reverse',
        paddingTop: 30,
        paddingBottom: 15,
        justifyContent:'space-between',
        alignItems:'stretch'
    },
    progress: {
        height: 10,
    },
    progressCont: {
        paddingTop: spacing.md,
    },
    clearSubjest: {
        paddingBottom: 25,
        paddingLeft: 25
    }

});