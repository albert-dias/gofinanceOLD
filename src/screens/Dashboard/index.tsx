import React, { useEffect, useState, useCallback } from 'react';
import { HighlightCard } from '../../components/HightlightCard';
import { TransactionCard, TransactionCardsProps } from '../../components/TransactionCard';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import { useFocusEffect } from '@react-navigation/native';

import { 
    Container, 
    Header,
    Photo,
    User,
    UserInfo,
    UserGreeting,
    UserName,
    UserWrapper,
    Icon,
    HighlightCards,
    Title,
    Transactions,
    TransactionList,
    LogoutButton,
} from './styles';

export interface DataListProps extends TransactionCardsProps{
    id:string,
}

export function Dashboard(){
    const [data, setData] = useState<DataListProps[]>([])

    async function loadTransactions(){
        const dataKey = '@gofinance:transactions';
        const response = await AsyncStorage.getItem(dataKey);

        const transactions = response ? JSON.parse(response) : [];

        const transactionsFormatted: DataListProps[] = transactions
            .map((item: DataListProps) => {
                const amount = Number(item.amount)
                    .toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                    });
                const date = Intl.DateTimeFormat('pt-BR', {
                    day: '2-digit',
                    month: '2-digit',
                    year: '2-digit',
                }).format(new Date(item.date));

                return{ 
                    id: item.id,
                    name: item.name,
                    amount,
                    type: item.type,
                    category: item.category,
                    date,

                }
            })

        setData(transactionsFormatted);
    }

    useEffect(() => {
        loadTransactions();
    }, []);


    useFocusEffect(useCallback(() => {
        loadTransactions();
    },[]))

    return (
        <Container>
            <Header>
                <UserWrapper>
                    <UserInfo>
                        <Photo source={{uri: ('https://avatars.githubusercontent.com/u/1467125?v=4')}} />
                        <User>
                            <UserGreeting>Olá,</UserGreeting>
                            <UserName>Albert</UserName>
                        </User>
                    </UserInfo>
                    <LogoutButton onPress={() => {}}>
                        <Icon name="power"/>
                    </LogoutButton>
                </UserWrapper>
            </Header>
            <HighlightCards>
                <HighlightCard 
                    type="up"
                    title="Entradas"
                    amount="R$ 17.400,00"
                    lastTransaction="Ultima entrada 13 de abril"
                />
                <HighlightCard 
                    type="down"
                    title="Saídas"
                    amount="R$ 1.400,00"
                    lastTransaction="Ultima saída 03 de abril"
                />
                <HighlightCard 
                    type="total"
                    title="Entradas"
                    amount="R$ 16.000,00"
                    lastTransaction="01 à 16 de abril"
                />
            </HighlightCards>

            <Transactions>
                <Title>Listagem</Title>
                <TransactionList 
                    data={data}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => <TransactionCard data={item} />}
                />
                
            </Transactions>
        </Container>
    )
}
