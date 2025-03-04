import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { useLocation } from 'react-router-dom';

// Регистрация необходимых компонентов
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ResultsPage = () => {
    const location = useLocation(); // Получаем состояние из навигации
    const { result } = location.state || {}; // Извлекаем результат из состояния

  // Функция для
    // Функция для обработки коммитов и подготовки данных для графика
    const prepareChartData = () => {
        console.log("Result Data:", result); 
        if (!result || typeof result.commits_info !== 'object' || Object.keys(result.commits_info).length === 0) {
          return { labels: [], data: [] }; // Возвращаем пустые массивы, если данных нет
        }
    
        const commitsInfo = result.commits_info;
    
        // Извлекаем даты и количество коммитов
        const labels = Object.keys(commitsInfo); // Даты
        const data = Object.values(commitsInfo); // Количество коммитов
    
        return { labels, data };
      };
    
      const chartData = prepareChartData();
    
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
              labels: chartData.labels,
              datasets: [
                {
                  label: 'Количество коммитов',
                  data: chartData.data,
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
                  text: 'Коммиты по датам',
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
    