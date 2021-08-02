import { RFValue } from 'react-native-responsive-fontsize';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    background-color: ${({theme}) => theme.colors.background};
`;


export const Header = styled.View`
    background-color: ${({ theme }) => theme.colors.primary};
    margin-top: ${getStatusBarHeight()}px;

    width: 100%;
    height: ${RFValue(113)}px;

    align-items: center;
    justify-content: flex-end;
    padding-bottom: 19px;
`;

export const Title = styled.Text`
    font-family: ${({theme}) => theme.fonts.regular};
    font-size: ${RFValue(18)}px;
    color: ${({theme})=>theme.colors.shape};
`;

export const Content = styled.ScrollView.attrs({
    contentContainerStyle:{ flex: 1, padding: 24 }
})``;