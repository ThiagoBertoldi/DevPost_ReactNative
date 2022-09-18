import styled from "styled-components/native";

export const Container = styled.SafeAreaView`
    flex: 1;
    background-color: #353840;
    padding-top: 15px;
`;

export const AreaInput = styled.View`
    flex-direction: row;
    align-items: center;
    margin: 10px;
    background-color: #F1F1F1;
    border-radius: 4px;
    padding: 5px 10px;
`;

export const Input = styled.TextInput`
    width: 90%;
    background-color: #F1F1F1;
    height: 40px;
    padding-left: 8px;
    font-size: 17px;
    color: #121212;
`;

export const List = styled.FlatList`
    flex: 1
`;