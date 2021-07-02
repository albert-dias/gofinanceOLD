import React, {useState} from 'react';
import { Button } from '../../components/Forms/Button';
import { Input } from '../../components/Forms/Input';
import { TransactionTypeButton } from '../../components/Forms/TransactionTypeButton';
import { CategorySelect } from '../../components/Forms/CategorySelect';

import {
    Container,
    Header,
    Title,
    Form,
    Fields,
    TransactionType,
} from './styles';

export function Register(){
    const [transactionType, setTransactionType] = useState('');

    function handleTransactionTypeSelect(type: 'up' | 'down' ){
        setTransactionType(type);
    }
    return (
        <Container>
            <Header>
                <Title> Cadastro</Title>
            </Header>
            <Form>
                <Fields>
                    <Input placeholder='Nome' />

                    <Input placeholder='Preço' />

                    <TransactionType>
                        <TransactionTypeButton 
                            title='Income'
                            type='up'
                            onPress={() => handleTransactionTypeSelect('up')}
                            isActive={transactionType ==='up'}
                        />
                        <TransactionTypeButton 
                            title='Outcome' 
                            type='down'
                            onPress={() => handleTransactionTypeSelect('down')}
                            isActive={transactionType ==='down'}
                        />
                    </TransactionType>

                    <CategorySelect title="Categorias" />
                </Fields>

                <Button title="Enviar"></Button>
            </Form>
            
        </Container>
    );
}