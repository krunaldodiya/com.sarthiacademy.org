import styled from 'styled-components/native';
import {typography, space, color, layout} from 'styled-system';

export const Title: any = styled.Text`
  font-family: ${({theme}: any) => theme.fontFamily.QuicksandBold};

  ${typography};
  ${space};
  ${color};
  ${layout};
`;
