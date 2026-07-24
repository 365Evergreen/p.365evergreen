import { createLightTheme, type BrandVariants } from '@fluentui/react-components';

const brandVariants: BrandVariants = {
  10: '#f5faf0',
  20: '#eaf5d9',
  30: '#d9e9c4',
  40: '#c5db9f',
  50: '#aecf7a',
  60: '#96c256',
  70: '#7fae46',
  80: '#6a9a36',
  90: '#528810',
  100: '#427800',
  110: '#3b6c00',
  120: '#325b00',
  130: '#254300',
  140: '#1e3600',
  150: '#162800',
  160: '#0f1b00',
};

export const appTheme = createLightTheme(brandVariants);
