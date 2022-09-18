import styled from "styled-components/native";

export const Container = styled.SafeAreaView`
    flex: 1;
    background-color: #36393F;
    justify-content: center;
    align-items: center;
`;

export const Title = styled.Text`
    color: '#FFF';
    font-size: 55px;
    font-weight: bold ;
    font-style: italic;
`;

export const Input = styled.TextInput`
    width: 80%;
    background-color: #FFF;
    margin-top: 10px;
    padding: 10px;
    border-radius: 8px;
    font-size: 17px;
`;

export const Button = styled.TouchableOpacity`
    width: 80%;
    background-color: #418CFD;
    border-radius: 8px;
    margin-top: 10px;
    padding: 10px;
    align-items: center;
    justify-content: center;
`;

export const ButtonText = styled.Text`
    color: #fff;
    font-size: 20px;
`;

export const SignUpButton = styled.TouchableOpacity`
    margin-top: 20px;
`;

export const SignUpButtonText = styled.Text`
    color: #FFF;
    font-size: 15px;
`;