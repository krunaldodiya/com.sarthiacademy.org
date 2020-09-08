import styled from 'styled-components/native';

export const TextInputBox = styled.TextInput.attrs({
  autoCompleteType: 'off',
  autoCapitalize: 'none',
  autoCorrect: false,
})`
  background-color: white;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 20px;
  border-radius: 50px;
  font-family: ${(props: any) => {
    return props.theme.fontFamily.QuicksandBold;
  }};
`;
