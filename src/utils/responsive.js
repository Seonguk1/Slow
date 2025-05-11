import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const BASE_WIDTH = 414;
const BASE_HEIGHT = 896;

const scaleWidth = (designWidth) => (designWidth * width) / BASE_WIDTH;
const scaleHeight = (designHeight) => (designHeight * height) / BASE_HEIGHT;
const scaleFont = (size, max) => {
    const scaled = (size * width) / BASE_WIDTH;
    console.log(`sca: ${scaled}`)
    console.log(max)
    return max ? Math.min(scaled, max) : scaled;
};

export { scaleWidth, scaleHeight, scaleFont };
