import type { Story } from './types';
import type { TextStyle } from 'react-native';
import type { ViewStyle } from 'react-native';
type PropTypes = {
    /**
     * An array of story objects
     * @see https://www.npmjs.com/package/rn-story#story-object
     */
    stories: Story[];
    /**
     * Set the current story index.
     */
    currentIndex?: number;
    /**
     * Callback when the user taps/press to go back to the previous story.
     */
    onPrevious?: Function;
    /**
     * Callback when the user taps/press to go back to the previous story but you are on the first story,
     * i.e there are no more stories to go back (suitable for closing story view or update index to show previous profile story)
     */
    onPreviousFirstStory?: Function;
    /**
     * Callback when the user taps/press to proceed to the next story
     */
    onNext?: Function;
    /**
     * Callback when the user taps/press to proceed to next story but you are on the last story,
     *  i.e there are no more stories to go forward (suitable for closing story view or update index to show next story)
     */
    onAllStoriesEnd?: Function;
    /**
     * Control the volume of video.
     */
    videoVolume?: number;
    /**
     * Switch to mute video.
     * @default 1.0
     */
    isMuted?: boolean;
    /**
     * Switch to changed the shape from rectangular animation bar to rounded.
     * @default false
     */
    isAnimationBarRounded?: boolean;
    /**
     * Modify the height of animation bar @default 2
     */
    animationBarHeight?: number;
    /**
     * Modify the color of animation @default "#fff"
     */
    animationBarColor?: string;
    /**
     * Change the text of **See More** button, *required `seeMoreUrl` to be set is Story Object.
     * @default "View Details"
     */
    seeMoreText?: string;
    /**
     * Override the styles of **See More** button container, *required `seeMoreUrl` to be set is Story Object.
     * @default {}
     */
    seeMoreStyles?: ViewStyle;
    /**
     * Override the styles of **See More** button text, *required `seeMoreUrl` to be set is Story Object.
     * @default {}
     */
    seeMoreTextStyles?: TextStyle;
    /**
     * Override default LoadingComponent with custom loading component
     */
    loadingComponent?: JSX.Element;
};
export default function Stories({ stories, currentIndex, onPrevious, onPreviousFirstStory, onNext, onAllStoriesEnd, videoVolume, isMuted, isAnimationBarRounded, animationBarHeight, animationBarColor, seeMoreText, seeMoreStyles, seeMoreTextStyles, loadingComponent }: PropTypes): JSX.Element;
export {};
//# sourceMappingURL=Stories.d.ts.map