import React from 'react';
import { HighlightCard } from '../../components/HightlightCard';
import { TransactionCard } from '../../components/TransactionCard';
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
} from './styles';


export function Dashboard(){
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
                <TransactionCard type='up'/>
            </Transactions>
        </Container>
    )
}
