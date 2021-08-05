import React, { useEffect, useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { VictoryPie } from 'victory-native';

import { HistoryCard } from '../../components/HistoryCard';
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs"
import { addMonths, subMonths, format } from 'date-fns';
import { ptBR } from 'date-fns/locale'

import { useTheme } from 'styled-components';

import {
    Container,
    Header,
    Title,
    Content,
    ChartContainer,
    MonthSelect,
    MonthSelectButton,
    MonthSelectIcon,
    Month,
    LoadingContainer,
} from './styles';
import { categories } from '../../utils/categories';
import { RFValue } from 'react-native-responsive-fontsize';
import { ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

interface TransactionData {
    type: 'positive' | 'negative';
    name: string;
    amount: string;
    category: string;
    date: string;
}

interface CategoryData {
    key: string;
    name: string;
    total: number;
    totalFormatted: string;
    color: string;
    percent: string;
}


export function Resume() {
    const [isLoading, setIsLoading] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [totalByCategoies, setTotalByCategories] = useState<CategoryData[]>([])

    const theme = useTheme();

    function handleDateChange(action: 'next' | 'prev') {
        
        if (action === 'next') {
            setSelectedDate(addMonths(selectedDate, 1));
        } else {
            setSelectedDate(subMonths(selectedDate, 1));
        }

    }

    async function loadData() {
        setIsLoading(true);

        const dataKey = "@gofinance:transactions";
        const response = await AsyncStorage.getItem(dataKey);
        const responseFormatted = response ? JSON.parse(response) : [];

        const expensives = responseFormatted
            .filter((expensive: TransactionData) =>
                expensive.type === 'negative' &&
                new Date(expensive.date).getMonth() === selectedDate.getMonth() &&
                new Date(expensive.date).getFullYear() === selectedDate.getFullYear()
            )

        const expensivesTotal = expensives
            .reduce((acumllator: number, expensive: TransactionData) => {
                return acumllator + Number(expensive.amount)
            }, 0)

        const totalByCategory: CategoryData[] = [];

        categories.forEach(category => {
            let categorySum = 0;

            expensives.forEach((expensive: TransactionData) => {
                if (expensive.category === category.key) {
                    categorySum += Number(expensive.amount);
                }
            });

            if (categorySum > 0) {
                const totalFormatted = categorySum
                    .toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                    })

                const percent = `${(categorySum / expensivesTotal * 100).toFixed(0)}%`;

                totalByCategory.push({
                    key: category.key,
                    name: category.name,
                    color: category.color,
                    total: categorySum,
                    totalFormatted,
                    percent,
                });
            }

        })
        setTotalByCategories(totalByCategory)
        setIsLoading(false)
    }

    useFocusEffect(useCallback(() => {
        loadData();
    }, [selectedDate]))

    return (
        <Container>
            <Header>
                <Title>Resumo por categoria</Title>
            </Header>
            {
                isLoading ?
                    <LoadingContainer>
                        <ActivityIndicator
                            color={theme.colors.primary}
                        />
                    </LoadingContainer>
                    :

                    <Content
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{
                            paddingBottom: useBottomTabBarHeight(),
                            paddingHorizontal: 24,
                        }}
                    >
                        <MonthSelect>
                            <MonthSelectButton onPress={() => handleDateChange('prev')}>
                                <MonthSelectIcon name="chevron-left" />
                            </MonthSelectButton>
                            <Month>{format(selectedDate, 'MMMM, yyyy', { locale: ptBR })}</Month>
                            <MonthSelectButton onPress={() => handleDateChange('next')}>
                                <MonthSelectIcon name="chevron-right" />
                            </MonthSelectButton>
                        </MonthSelect>
                        <ChartContainer>
                            <VictoryPie
                                data={totalByCategoies}
                                colorScale={totalByCategoies.map(category => category.color)}
                                style={{
                                    labels: {
                                        fontSize: RFValue(18),
                                        fontWeight: 'bold',
                                        fill: theme.colors.shape,
                                    }
                                }}
                                labelRadius={80}
                                x="percent"
                                y="total"
                            />
                        </ChartContainer>

                        {
                            totalByCategoies.map(item => (
                                <HistoryCard
                                    key={item.key}
                                    color={item.color}
                                    amount={item.totalFormatted}
                                    title={item.name}
                                />
                            ))
                        }
                    </Content>

            }
        </Container>
    )
}