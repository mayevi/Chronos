import * as React from "react";
import { Dimensions, View, StyleSheet } from "react-native";
import { clamp, onGestureEvent, snapPoint, timing } from "react-native-redash";
import Animated, { cond, eq, set, useCode } from "react-native-reanimated";
import { PanGestureHandler, State } from "react-native-gesture-handler";

const { Value, add } = Animated;

const totalWidth = Dimensions.get("window").width / 2;
const count = 5;
const width = totalWidth / count;
const height = width;

export default Slider = (props) => {
    const snapPoints = new Array(count).fill(0).map((e, i) => i * height);
    const translationX = new Value(0);
    const velocityX = new Value(0);
    const state = new Value(State.UNDETERMINED);
    const offset = new Value(0);
    const value = add(offset, translationX);
    const translateX = clamp(
        cond(
            eq(state, State.END),
            set( offset, timing({ from: value, to: snapPoint(value, velocityX, snapPoints) }) ),
            value
        ), 
        0,
        (count - 1) * height
    );
    useCode(() => set(x, translateX), [x, translateX]);
    const x = new Value(0);

    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <View style={{
                width: totalWidth,
                height : height,
                borderRadius: height / 2,
            }}>
                <PanGestureHandler {...onGestureEvent({ state, translationX, velocityX })}>
                    <Animated.View style={{
                        ...StyleSheet.absoluteFillObject,
                        width: props.width,
                        height: props.height,
                        borderRadius: props.borderRadius,
                        backgroundColor: props.color,
                        elevation: 5,
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,
                        transform: [{ translateX: x, rotate: props.rotate + 'deg' }],
                    }}/>
                </PanGestureHandler>
            </View>
        </View>
    );
};