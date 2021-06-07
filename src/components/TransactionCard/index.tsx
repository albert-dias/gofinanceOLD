import React from 'react';

import { 
    Container,
    Title,
    Amount,
    Footer,
    Category,
    Icon,
    CategoryName,
    Date,
 } from './styles';

 interface Props {
    title?: string;
    amount?: string;
    type: 'up' | 'down';
}

export function TransactionCard({
    type,
}: Props){
    return(
        <Container>
            <Title>Desenvolvimento de site</Title>
            <Amount type={type}>R$ 12.000,00</Amount>
            <Footer>
                <Category>
                    <Icon name="dollar-sign"/>
                    <CategoryName>Vendas</CategoryName>
                </Category>
                <Date>13/04/2021</Date>
            </Footer>
        </Container>
    );
}