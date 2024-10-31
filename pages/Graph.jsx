import 'chart.js/auto';
import React, { useEffect, useState } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import io from 'socket.io-client';
import './style/GraphScreen.css';

const GraphScreen = ({ route }) => {
    const [sensorData, setSensorData] = useState([]);
    const [chartType, setChartType] = useState('line');
    const [timeRange, setTimeRange] = useState('lastHour');
    const { token } = route.params;

    const sensorNames = {
        1: 'Cozinha',
        2: 'Sala',
        3: 'Quarto',
        4: 'Escritório',
    };

    const chartColors = {
        1: 'rgb(75, 192, 192)',
        2: 'rgb(255, 99, 132)',
        3: 'rgb(54, 162, 235)',
        4: 'rgb(255, 205, 86)',
    };

    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const response = await fetch(`http://localhost:4000/dados-sensores`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                if (!response.ok) {
                    throw new Error('Falha ao buscar dados do servidor');
                }
                const data = await response.json();
                setSensorData(data);
            } catch (error) {
                console.error('Erro ao buscar dados iniciais:', error);
            }
        };

        fetchInitialData();
        const intervalId = setInterval(fetchInitialData, 2000);

        const socket = io(`http://localhost:4000`, {
            auth: {
                token: `Bearer ${token}`,
            }
        });

        socket.on('connect', () => {
            console.log('Conectado ao servidor:', socket.id);
        });

        socket.on('sensorDataUpdate', (newData) => {
            setSensorData(prevData => [...prevData, newData]);
        });

        return () => {
            clearInterval(intervalId);
            socket.disconnect();
        };
    }, [token]);

    const getFilteredData = () => {
        const now = new Date();
        return sensorData.filter(item => {
            const itemDate = new Date(item.timestamp.replace(' ', 'T'));
            switch (timeRange) {
                case 'lastHour':
                    return itemDate >= new Date(now - 60 * 60 * 1000);
                case 'last24Hours':
                    return itemDate >= new Date(now - 24 * 60 * 60 * 1000);
                case 'lastWeek':
                    return itemDate >= new Date(now - 7 * 24 * 60 * 60 * 1000);
                case 'last30Days':
                    return itemDate >= new Date(now - 30 * 24 * 60 * 60 * 1000);
                case 'last60Seconds':
                    return itemDate >= new Date(now - 60 * 1000);
                case 'last3Months':
                    return itemDate >= new Date(now - 3 * 30 * 24 * 60 * 60 * 1000);
                case 'lastYear':
                    return itemDate >= new Date(now - 365 * 24 * 60 * 60 * 1000);
                default:
                    return true;
            }
        });
    };

    const getGroupedData = () => {
        const filteredData = getFilteredData();
        const groupedData = {};

        filteredData.forEach(item => {
            const { sensor_id } = item;
            if (!groupedData[sensor_id]) {
                groupedData[sensor_id] = [];
            }
            groupedData[sensor_id].push(item);
        });

        return groupedData;
    };

    const groupedData = getGroupedData();

    const renderCharts = () => {
        return Object.keys(groupedData).map(sensorId => {
            const data = {
                labels: groupedData[sensorId].map(item => new Date(item.timestamp.replace(' ', 'T')).toLocaleTimeString()),
                datasets: [
                    {
                        label: `Temperatura (${sensorNames[sensorId]})`,
                        data: groupedData[sensorId].map(item => item.temperatura),
                        borderColor: chartColors[sensorId],
                        backgroundColor: chartColors[sensorId],
                        fill: false,
                        tension: 0.4, // Deixa as linhas mais curvas
                        pointRadius: 3, // Define o tamanho dos pontos
                    },
                ],
            };

            const options = {
                responsive: true,
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Tempo',
                        },
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Temperatura (°C)',
                        },
                        beginAtZero: true,
                    },
                },
            };

            return (
                <div key={sensorId} className="chart-container">
                    <h3 className="sensor-title">Gráfico do Sensor {sensorNames[sensorId]}</h3>
                    {chartType === 'line' ? <Line data={data} options={options} /> : <Bar data={data} options={options} />}
                </div>
            );
        });
    };

    return (
        <div className="graph-screen">
            <h2 className="title">Gráfico de Dados dos Sensores</h2>

            <select
                className="picker"
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
            >
                <option value="last60Seconds">Últimos 60 Segundos</option>
                <option value="lastHour">Última Hora</option>
                <option value="last24Hours">Últimas 24 Horas</option>
                <option value="lastWeek">Última Semana</option>
                <option value="last30Days">Últimos 30 Dias</option>
                <option value="last3Months">Últimos 3 meses</option>
                <option value="lastYear">Último Ano</option>
            </select>

            <select
                className="picker"
                value={chartType}
                onChange={(e) => setChartType(e.target.value)}
            >
                <option value="line">Linha</option>
                <option value="bar">Barra</option>
            </select>

            <div className="scroll-view">
                {renderCharts()}
            </div>
        </div>
    );
};

export default GraphScreen;
