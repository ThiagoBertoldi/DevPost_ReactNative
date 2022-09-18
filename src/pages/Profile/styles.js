import styled from "styled-components/native";

export const Container = styled.SafeAreaView`
    flex: 1;
    background-color: #353840;
    align-items: center;
`;

export const UploadButton = styled.TouchableOpacity`
    width: 170px;
    height: 170px;
    margin-top: 60px;
    margin-bottom: 30px;
    border-radius: 85px;
    justify-content: center;
    align-items: center;
    background-color: #DDD;
    z-index: 9;
`;

export const UploadText = styled.Text`
    font-size: 35px;
    color: red;
    position: absolute;
    z-index: 8;
    opacity: 0.4;
`;

export const ProfileImage = styled.Image`
    width: 160px;
    height: 160px;
    border-radius: 85px;
    
`;

export const Name = styled.Text`
    color: #f1f1f1;
    font-size: 24px;
    font-weight: bold;
    font-style: italic;
    margin-bottom: 5px;
`;

export const Email = styled.Text`
    color: #f1f1f1;
    font-style: italic;
    font-size: 16px;
    margin-bottom: 20px;
`;

export const Button = styled.TouchableOpacity`
    width: 90%;
    height: 50px;
    margin: 6px 15px;
    background-color: ${props => props.bg};
    border-radius: 8px;
    align-items: center;
    justify-content: center;
`;

export const ButtonText = styled.Text`
    color: ${props => props.color};
    font-size: 18px;
    font-style: italic;
`;

export const ModalContainer = styled.KeyboardAvoidingView`
   width: 100%;
   height: 70%;
   background-color: #fff;
   position: absolute;
   bottom: 0;
   align-items: center;
   justify-content: center;
`;

export const ButtonBack = styled.TouchableOpacity`
    position: absolute;
    top: 15px;
    left: 25px;
    flex-direction: row;
    align-items: center;
`;

export const Input = styled.TextInput`
    background-color: #DDD;
    width: 90%;
    border-radius: 8px;
    padding: 10px;
    font-size: 18px;
    text-align: center;
    color: #121212;
`;