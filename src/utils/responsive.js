import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const BASE_WIDTH = 414;
const BASE_HEIGHT = 896;

// const scaleWidth = (designWidth) => (designWidth * width) / BASE_WIDTH;
// const scaleHeight = (designHeight) => (designHeight * height) / BASE_HEIGHT;
// const scaleFont = (size) => (size * width) / BASE_WIDTH;

const scaleWidth = (designWidth) => (designWidth * BASE_WIDTH) / BASE_WIDTH;
const scaleHeight = (designHeight) => (designHeight * BASE_HEIGHT) / BASE_HEIGHT;
const scaleFont = (size) => (size * BASE_WIDTH) / BASE_WIDTH;

export { scaleWidth, scaleHeight, scaleFont };
