import React from "react";
import View from 'react-native';
import PanGestureHandler from 'react-native-gesture-handler';
import { Animated, useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

const MiniSlider = (props) => {

  const translateX = useSharedValue(props.minPosition + 5);

  const onGestureEvent = useAnimatedGestureHandler({
    onStart: (_event, ctx) => {
      ctx.x = translateX.value;
    },
    onActive: ({translationX}, ctx) => {
      if (translateX.value < props.maxPosition && translateX.value > props.minPosition) translateX.value = ctx.x + translationX
    },
    onEnd: () => {
      if (translateX.value < props.minPosition && translateX.value > props.minPosition - 25) translateX.value = withSpring(props.minPosition + 5)
      if (translateX.value > props.maxPosition && translateX.value < props.maxPosition + 25) translateX.value = withSpring(props.maxPosition - 5)
      if (translateX.value > props.minPosition + 6 && translateX.value < props.maxPosition - 6) {
        console.log('Siii')
        // if (translateX.value > Position2 - 12 && translateX.value < Position2 + 12) translateX.value = withSpring(Position2)
        // if (translateX.value > Position3 - 12 && translateX.value < Position3 + 12) translateX.value = withSpring(Position3)
        // if (translateX.value > Position4 - 12 && translateX.value < Position4 + 12) translateX.value = withSpring(Position4)
      }
      // console.log(translateX.value)
    },
  });

  // . . . . .

  // const SliderWeight = props.maxPosition - props.minPosition

  // const Position2 = SliderWeight / 4 * 2 + 20
  // const Position3 = SliderWeight / 4 * 3 + 20
  // const Position4 = SliderWeight / 4 * 4 + 20

  // const Space = SliderWeight / 8

  // const animatedStyle = useAnimatedStyle(() => {
  //   return {
  //     transform: [{translateX: translateX.value}],
  //   };
  // });

  const style = useAnimatedStyle(() => {
    return {
      width: props.width,
      height: props.height,
      borderRadius: props.borderRadius,
      backgroundColor: props.color,
      aspectRatio: 1,
      position: 'absolute',
      top: 0,
      elevation: 5,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      transform: [{translateX: translateX.value}],
    }
  })

  return (
    <View style={{marginVertical: 1}}>
      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View style={style}/>
      </PanGestureHandler>
      {/* <View style={{height: 40, width: 40, backgroundColor: '#682'}}></View> */}
    </View>
  );
};

export default MiniSlider;