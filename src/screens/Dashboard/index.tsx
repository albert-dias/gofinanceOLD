import React from 'react';
import { HighlightCard } from '../../components/HightlightCard';
import { TransactionCard, TransactionCardsProps } from '../../components/TransactionCard';
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
} from './styles';

export interface DataListProps extends TransactionCardsProps{
    id:string,
}

export function Dashboard(){
    const data: DataListProps[] = [
        {
            id: '1',
            type: 'positive',
            title: 'Desenvolimento Site', 
            amount: "R$ 14.003,00",
            category: {
                name: 'Vendas',
                icon: 'dollar-sign',
            },
            date: '13/04/2021',
        },{
            id: '2',
            type: 'negative',
            title: 'up', 
            amount: "R$ 14.003,00",
            category: {
                name: 'Vendas',
                icon: 'coffee',
            },
            date: '13/04/2021',
        },{
            id: '3',
            type: 'positive',
            title: 'up', 
            amount: "R$ 14.003,00",
            category: {
                name: 'Vendas',
                icon: 'shopping-bag',
            },
            date: '13/04/2021',
        }
    ];

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
                    <Icon name="power"/>
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
