import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  PointElement,
  Legend
} from 'chart.js';
import { useLocation } from 'react-router-dom';

// Регистрация необходимых компонентов
ChartJS.register(CategoryScale, LinearScale, LineElement, BarElement, Title, Tooltip, Legend,  PointElement);

const ResultsPage = () => {
    const location = useLocation(); // Получаем состояние из навигации
    const { result } = location.state || {}; // Извлекаем результат из состояния

  // Функция для
    // Функция для обработки коммитов и подготовки данных для графика
    const prepareChartData = () => {
        console.log("Result Data:", result); 
        if (!result || typeof result.commits_info_users !== 'object' || Object.keys(result.commits_info_users).length === 0) {
          return { labels: [], data: [] }; // Возвращаем пустые массивы, если данных нет
        }
    
        const commitsInfo = result.commits_info_users;
    
        // Извлекаем даты и количество коммитов
        const labels_users = Object.keys(commitsInfo); // Даты
        const data_users = Object.values(commitsInfo); // Количество коммитов
    
        return { labels_users, data_users };
      };

      const prepareDateChartData = () => {
        if (!result || typeof result.commits_info_dates !== 'object' || Object.keys(result.commits_info_dates).length === 0) {
            return { labels: [], data: [] }; // Возвращаем пустые массивы, если данных нет
        }

        const commitsInfoDates = result.commits_info_dates;

        // Извлекаем даты и количество коммитов
        const labels_dates = Object.keys(commitsInfoDates); // Даты
        const data_dates = Object.values(commitsInfoDates); // Количество коммитов

        return { labels_dates, data_dates };
    };
    
      const chartData = prepareChartData();
      const dateChartData = prepareDateChartData();
    
      return (
        <div 
            style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center', 
            minHeight: '100vh',
            padding: '20px',
            backgroundColor: '#f5f5f5' // Светлый фон
        }}>
         <h2 style={{ marginBottom: '20px' }}>Результаты:</h2>
            <div style={{ 
                width: '100%', 
                maxWidth: '600px', // Максимальная ширина графика
                margin: '0 auto', // Центрирование
                background: '#fff', // Белый фон для графика
                borderRadius: '8px', // Закругленные углы
                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)', // Тень для глубины
                padding: '20px' // Отступы внутри контейнера
            }}>
          <Bar
            data={{
              labels: chartData.labels_users,
              datasets: [
                {
                  label: 'Количество коммитов',
                  data: chartData.data_users,
                  backgroundColor: 'rgba(75, 192, 192, 0.6)',
                  borderColor: 'rgba(75, 192, 192, 1)',
                  borderWidth: 1,
                },
              ],
            }}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'top',
                },
                title: {
                  display: true,
                  text: 'Количество коммитов пользователей',
                },
              },
            }}
            width={400} // Ширина графика
            height={300} 
          />
        </div>
        {/* Линейный график количества коммитов по датам */}
        <div style={{ 
                width: '100%', 
                maxWidth: '600px', // Максимальная ширина графика
                margin: '20px auto', // Центрирование
                background: '#fff', // Белый фон для графика
                borderRadius: '8px', // Закругленные углы
                boxShadow: '0 2px 10',
                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)', // Тень для глубины
                padding: '20px' // Отступы внутри контейнера
            }}>
                <Line
                    data={{
                        labels: dateChartData.labels_dates,
                        datasets: [
                            {
                                label: 'Количество коммитов по датам',
                                data: dateChartData.data_dates,
                                borderColor: 'rgba(255, 99, 132, 1)',
                                backgroundColor: 'rgba(255, 99, 132, 0.6)',
                                fill: true, // Заполнение под графиком
                            },
                        ],
                    }}
                    options={{
                        responsive: true,
                        plugins: {
                            legend: {
                                position: 'top',
                            },
                            title: {
                                display: true,
                                text: 'Количество коммитов по датам',
                            },
                        },
                    }}
                    width={400} // Ширина графика
                    height={300} 
                />
            </div>
        </div>
      );
    };
export default ResultsPage;
    