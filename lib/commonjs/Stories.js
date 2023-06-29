"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Stories;
var _react = require("react");
var _reactNative = require("react-native");
var _expoAv = require("expo-av");
const {
  width,
  height
} = _reactNative.Dimensions.get('window');
function Stories(_ref) {
  var _content$current4, _content$current5, _content$current6, _content$current7, _content$current8;
  let {
    stories,
    currentIndex = 0,
    onPrevious,
    onPreviousFirstStory,
    onNext,
    onAllStoriesEnd,
    videoVolume = 1.0,
    isMuted = false,
    isAnimationBarRounded = true,
    animationBarHeight = 2,
    animationBarColor = "#fff",
    seeMoreText = "View Details",
    seeMoreStyles = {},
    seeMoreTextStyles = {},
    loadingComponent = undefined
  } = _ref;
  //to hold the stories and add a proeprty finish to keep track of finished stories for animation
  const [content, setContent] = (0, _react.useState)([]);
  //to check if image/video is ready to play to show a loader
  const [isLoading, setIsLoading] = (0, _react.useState)(true);
  //to control video pause and play on long press
  const [shouldPlay, setShouldPlay] = (0, _react.useState)(true);
  //to check from which position to resume
  const [position, setPosition] = (0, _react.useState)(0);
  //to get the duration
  const [end, setEnd] = (0, _react.useState)(0);
  //current is for get the current content is now playing
  const [current, setCurrent] = (0, _react.useState)(currentIndex);
  //progress is the animation value of the bars content playing the current state
  const progress = (0, _react.useRef)(new _reactNative.Animated.Value(0)).current;
  (0, _react.useEffect)(() => {
    //adding a finish property to story object to keep track of which stories are viewed for animation bars
    const _temp = [];
    stories.forEach(story => {
      _temp.push({
        ...story,
        finish: 0
      });
    });
    setContent(_temp);
  }, []);

  // start() is for starting the animation bars at the top
  const start = n => {
    var _content$current;
    // checking if the content type is video or not
    if (((_content$current = content[current]) === null || _content$current === void 0 ? void 0 : _content$current.mediaType) == 'video') {
      // type video
      if (!isLoading) {
        _reactNative.Animated.timing(progress, {
          toValue: 1,
          duration: n,
          useNativeDriver: false
        }).start(_ref2 => {
          let {
            finished
          } = _ref2;
          if (finished) {
            next();
          }
        });
      }
    } else {
      var _content$current2, _content$current3;
      // type image
      _reactNative.Animated.timing(progress, {
        toValue: 1,
        duration: (_content$current2 = content[current]) !== null && _content$current2 !== void 0 && _content$current2.duration ? (_content$current3 = content[current]) === null || _content$current3 === void 0 ? void 0 : _content$current3.duration : 3000,
        useNativeDriver: false
      }).start(_ref3 => {
        let {
          finished
        } = _ref3;
        if (finished) {
          next();
        }
      });
    }
  };
  // handle playing the animation
  const play = () => {
    start(end);
  };
  const next = () => {
    setPosition(0);
    if (onNext) {
      onNext();
    }
    // check if the next content is not empty
    if (current !== content.length - 1) {
      let _temp = [...content];
      _temp[current].finish = 1;
      setContent(_temp);
      setCurrent(current + 1);
      progress.setValue(0);
    } else {
      // progress.setValue(1);
      if (onAllStoriesEnd) {
        onAllStoriesEnd();
      }
    }
  };

  // previous() is for changing the content of the current content to -1
  const previous = () => {
    setPosition(0);
    progress.setValue(0);
    if (onPrevious) onPrevious();
    // checking if the previous content is not empty
    if (current - 1 >= 0) {
      let _temp = [...content];
      _temp[current].finish = 0;
      setContent(_temp);
      setCurrent(current - 1);
    } else {
      // progress.setValue(0);
      start(end);
      if (onPreviousFirstStory) {
        onPreviousFirstStory();
      }
    }
  };
  const longPressHandler = () => {
    progress.stopAnimation(value => {
      setPosition(end * value);
    });
    setShouldPlay(false);
  };
  const pressOutHandler = () => {
    setShouldPlay(true);
    start(end);
  };
  return /*#__PURE__*/React.createElement(_reactNative.SafeAreaView, {
    style: [styles.container]
  }, /*#__PURE__*/React.createElement(_reactNative.Modal, {
    animationType: "fade",
    transparent: false,
    visible: true
  }, /*#__PURE__*/React.createElement(_reactNative.View, {
    style: styles.containerModal
  }, /*#__PURE__*/React.createElement(_reactNative.View, {
    style: styles.backgroundContainer
  }, ((_content$current4 = content[current]) === null || _content$current4 === void 0 ? void 0 : _content$current4.mediaType) == 'video' ? /*#__PURE__*/React.createElement(_expoAv.Video, {
    source: {
      uri: (_content$current5 = content[current]) === null || _content$current5 === void 0 ? void 0 : _content$current5.media
    },
    rate: 1.0,
    volume: videoVolume,
    resizeMode: _expoAv.ResizeMode.COVER,
    shouldPlay: shouldPlay,
    isMuted: isMuted,
    positionMillis: Number.isNaN(position) ? 0 : position,
    onReadyForDisplay: play,
    onLoadStart: () => setIsLoading(true),
    onPlaybackStatusUpdate: AVPlaybackStatus => {
      setIsLoading(!AVPlaybackStatus.isLoaded);
      //@ts-ignore
      setEnd(AVPlaybackStatus.durationMillis);
    },
    style: {
      height: height,
      width: width
    }
  }) : /*#__PURE__*/React.createElement(_reactNative.Image, {
    onLoadStart: () => setIsLoading(true),
    onLoadEnd: () => {
      setIsLoading(false);
      progress.setValue(0);
      play();
    },
    source: {
      uri: (_content$current6 = content[current]) === null || _content$current6 === void 0 ? void 0 : _content$current6.media
    },
    style: {
      width: width,
      height: height,
      resizeMode: 'cover'
    }
  })), /*#__PURE__*/React.createElement(_reactNative.View, {
    style: {
      flexDirection: 'column',
      flex: 1
    }
  }, /*#__PURE__*/React.createElement(_reactNative.View, {
    style: [styles.topContainer]
  }, /*#__PURE__*/React.createElement(_reactNative.View, {
    style: [styles.animationBarsContainer]
  }, content.map((item, index) => {
    var _content$index;
    return (
      /*#__PURE__*/
      // THE BACKGROUND
      React.createElement(_reactNative.View, {
        key: item.mediaType + index,
        style: {
          height: animationBarHeight,
          borderRadius: isAnimationBarRounded ? 16 : 0,
          flex: 1,
          flexDirection: 'row',
          backgroundColor: 'rgba(117, 117, 117, 0.5)',
          marginHorizontal: 2
        }
      }, /*#__PURE__*/React.createElement(_reactNative.Animated.View, {
        style: {
          flex: current == index ? progress : (_content$index = content[index]) === null || _content$index === void 0 ? void 0 : _content$index.finish,
          height: animationBarHeight,
          backgroundColor: animationBarColor,
          borderRadius: isAnimationBarRounded ? 16 : 0
        }
      }))
    );
  })), (_content$current7 = content[current]) === null || _content$current7 === void 0 ? void 0 : _content$current7.header), /*#__PURE__*/React.createElement(_reactNative.View, {
    style: {
      flex: 1,
      flexDirection: 'row',
      zIndex: -1
    }
  }, /*#__PURE__*/React.createElement(_reactNative.TouchableWithoutFeedback, {
    onLongPress: longPressHandler,
    delayLongPress: 150,
    onPressOut: pressOutHandler,
    onPress: previous
  }, /*#__PURE__*/React.createElement(_reactNative.View, {
    style: {
      flex: 1
    }
  })), /*#__PURE__*/React.createElement(_reactNative.TouchableWithoutFeedback, {
    onLongPress: longPressHandler,
    delayLongPress: 150,
    onPressOut: pressOutHandler,
    onPress: next
  }, /*#__PURE__*/React.createElement(_reactNative.View, {
    style: {
      flex: 1
    }
  })))), isLoading && /*#__PURE__*/React.createElement(_reactNative.View, {
    style: {
      backgroundColor: '#000',
      width: width,
      height: height
    }
  }, loadingComponent ? loadingComponent : /*#__PURE__*/React.createElement(_reactNative.Text, {
    style: {
      position: 'absolute',
      color: '#fff',
      bottom: height / 2,
      left: width / 2,
      transform: [{
        translateX: -30
      }]
    }
  }, "Loading...")), (_content$current8 = content[current]) !== null && _content$current8 !== void 0 && _content$current8.seeMoreUrl ? /*#__PURE__*/React.createElement(_reactNative.View, {
    style: [styles.seeMoreContainer]
  }, /*#__PURE__*/React.createElement(_reactNative.Pressable, {
    onPress: () => {
      var _content$current9;
      _reactNative.Linking.openURL(((_content$current9 = content[current]) === null || _content$current9 === void 0 ? void 0 : _content$current9.seeMoreUrl) || "");
    },
    style: [styles.seeMore, seeMoreStyles]
  }, /*#__PURE__*/React.createElement(_reactNative.Text, {
    style: [{
      color: "#fff"
    }, seeMoreTextStyles]
  }, seeMoreText))) : null)));
}
const styles = _reactNative.StyleSheet.create({
  container: {},
  containerModal: {
    height: height,
    backgroundColor: '#000',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flex: 1
  },
  backgroundContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0
  },
  topContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: _reactNative.Platform.OS === "ios" ? 47 : 0,
    height: 100
  },
  animationBarsContainer: {
    flexDirection: 'row',
    paddingTop: 8,
    paddingHorizontal: 12
  },
  seeMoreContainer: {
    position: 'absolute',
    alignItems: 'center',
    width: width,
    bottom: 32
  },
  seeMore: {
    backgroundColor: '#000',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 50
  }
});
//# sourceMappingURL=Stories.js.map