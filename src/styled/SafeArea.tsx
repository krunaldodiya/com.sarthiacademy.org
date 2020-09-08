import styled from 'styled-components/native';

export const SafeArea = styled.SafeAreaView`
  display: flex;
  flex: 1;
  justify-content: center;
  background-color: ${(props: any) => props.theme.backgroundColor.primary};
`;
