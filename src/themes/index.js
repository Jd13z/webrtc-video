import { createMuiTheme } from '@material-ui/core/styles';

const primary = {
  '50': '#e6e6e9',
  '100': '#bfc0c9',
  '200': '#9597a5',
  '300': '#6b6d80',
  '400': '#4b4d65',
  '500': '#2b2e4a',
  '600': '#262943',
  '700': '#20233a',
  '800': '#1a1d32',
  '900': '#101222',
  'A100': '#646fff',
  'A200': '#3140ff',
  'A400': '#0012fd',
  'A700': '#0010e4'
}

const secondary = {
  '50': '#fce9e9',
  '100': '#f8c7c7',
  '200': '#f4a2a2',
  '300': '#ef7d7d',
  '400': '#eb6161',
  '500': '#e84545',
  '600': '#e53e3e',
  '700': '#e23636',
  '800': '#de2e2e',
  '900': '#d81f1f',
  'A100': '#ffffff',
  'A200': '#ffdcdc',
  'A400': '#ffa9a9',
  'A700': '#ff9090'
}

const theme = createMuiTheme({
  palette:{
    primary: {
      ...primary,
      light: primary[300],
      main: primary[500],
      dark: primary[800]
    },
    secondary: {
      ...secondary,
      light: secondary[300],
      main: secondary[500],
      dark: secondary[800]
    },
    Typography: {
      body1: {
        fontSize: 12
      },
      h6: {
        
      }
    }
  }
})

export default theme;