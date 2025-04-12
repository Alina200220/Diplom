import React from 'react';
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

ChartJS.register(CategoryScale, LinearScale, LineElement, BarElement, Title, Tooltip, Legend, PointElement);

const ResultsPage = () => {
    const location = useLocation();
    const { result } = location.state || {};

    const prepareChartData = () => {
        if (!result || typeof result.commits_info_users !== 'object' || Object.keys(result.commits_info_users).length === 0) {
            return { labels_users: [], data_users: [] };
        }
    
        const commitsInfo = result.commits_info_users;
        return {
            labels_users: Object.keys(commitsInfo),
            data_users: Object.values(commitsInfo)
        };
    };

    const prepareDateChartData = () => {
        if (!result || typeof result.commits_info_dates !== 'object' || Object.keys(result.commits_info_dates).length === 0) {
            return { labels_dates: [], data_dates: [] };
        }

        const commitsInfoDates = result.commits_info_dates;
        return {
            labels_dates: Object.keys(commitsInfoDates),
            data_dates: Object.values(commitsInfoDates)
        };
    };
    
    const prepareDateIssuesChartData = () => {
        if (!result || typeof result.issues !== 'object' || Object.keys(result.issues).length === 0) {
            return { labels_dates: [], data_dates: [] };
        }

        const commitsInfoDates = result.issues;
        return {
            labels_dates: Object.keys(commitsInfoDates),
            data_dates: Object.values(commitsInfoDates)
        };
    };
    
    const chartData = prepareChartData();
    const dateChartData = prepareDateChartData();
    const dateIssuesChartData = prepareDateIssuesChartData();

    // Стили для контейнера графиков
    const chartContainerStyle = {
        flex: '1 1 300px',
        maxWidth: '100%',
        background: '#fff',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        padding: '20px',
        margin: '10px',
        minHeight: '400px'
    };

    // Общие настройки графиков
    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
            duration: 0
        },
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    boxWidth: 12
                }
            },
            title: {
                display: true,
                font: {
                    size: 14
                }
            }
        },
        elements: {
            point: {
                hoverRadius: 6,
                radius: 4
            }
        },
        onHover: (e) => {
            e.native.target.style.transform = 'none';
        }
    };
    
    return (
        <div style={{ 
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            minHeight: '100vh',
            padding: '20px',
            backgroundColor: '#f5f5f5'
        }}>
            <div style={{ 
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                width: '100%',
                maxWidth: '1400px',
                gap: '20px'
            }}>
                {/* График количества коммитов пользователей */}
                <div style={chartContainerStyle}>
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
                            ...chartOptions,
                            plugins: {
                                ...chartOptions.plugins,
                                title: {
                                    ...chartOptions.plugins.title,
                                    text: 'Количество коммитов пользователей',
                                },
                            },
                        }}
                    />
                </div>

                {/* Линейный график количества коммитов по датам */}
                <div style={chartContainerStyle}>
                    <Line
                        data={{
                            labels: dateChartData.labels_dates,
                            datasets: [
                                {
                                    label: 'Количество коммитов по датам',
                                    data: dateChartData.data_dates,
                                    borderColor: 'rgba(255, 99, 132, 1)',
                                    backgroundColor: 'rgba(255, 99, 132, 0.6)',
                                    fill: true,
                                    tension: 0.1
                                },
                            ],
                        }}
                        options={{
                            ...chartOptions,
                            plugins: {
                                ...chartOptions.plugins,
                                title: {
                                    ...chartOptions.plugins.title,
                                    text: 'Количество коммитов по датам',
                                },
                            },
                        }}
                    />
                </div>

               {/* Гистограмма количества pull request'ов (открытых и закрытых) */}
                <div style={chartContainerStyle}>
                    <Bar
                        data={{
                            labels: ['Pull Requests'], // Общая метка для обоих столбцов
                            datasets: [
                                {
                                    label: 'Closed Pull Requests',
                                    data: [result?.pull_requests_closed || 0],
                                    backgroundColor: 'rgba(153, 102, 255, 0.6)',
                                    borderColor: 'rgba(153, 102, 255, 1)',
                                    borderWidth: 1,
                                },
                                {
                                    label: 'Opened Pull Requests',
                                    data: [result?.pull_requests_opened || 0],
                                    backgroundColor: 'rgba(255, 102, 207, 0.6)',
                                    borderColor: 'rgba(255, 102, 207, 1)',
                                    borderWidth: 1,
                                }
                            ],
                        }}
                        options={{
                            ...chartOptions,
                            plugins: {
                                ...chartOptions.plugins,
                                title: {
                                    ...chartOptions.plugins.title,
                                    text: 'Pull Requests (Opened vs Closed)'
                                },
                            },
                            scales: {
                                y: {
                                    beginAtZero: true
                                }
                            }
                        }}
                    />
                </div>
                {/* Линейный график количества коммитов по датам */}
                <div style={chartContainerStyle}>
                    <Line
                        data={{
                            labels: dateIssuesChartData.labels_dates,
                            datasets: [
                                {
                                    label: 'Issues за последний месяц',
                                    data: dateIssuesChartData.data_dates,
                                    borderColor: 'rgba(255, 99, 132, 1)',
                                    backgroundColor: 'rgba(255, 99, 132, 0.6)',
                                    fill: true,
                                    tension: 0.1
                                },
                            ],
                        }}
                        options={{
                            ...chartOptions,
                            plugins: {
                                ...chartOptions.plugins,
                                title: {
                                    ...chartOptions.plugins.title,
                                    text: 'Issues за последний месяц',
                                },
                            },
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default ResultsPage;