import React, { useState } from 'react';
import './style/RegisterScreen.css';

export default function RegisterScreen({ navigation }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isPressed, setIsPressed] = useState(false);

    const handleRegister = async () => {
        try {
            const response = await fetch(`http://localhost:4000/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }), // Envia dados em formato JSON
            });

            // Verifica se o servidor respondeu com sucesso
            if (!response.ok) {
                const data = await response.json();
                setErrorMessage(data.message || 'Erro no registro');
                return;
            }

            // Se o registro for bem-sucedido, navega para a tela de login
            navigation.navigate('LoginScreen');
        } catch (error) {
            // Define uma mensagem de erro personalizada caso o servidor não esteja acessível
            console.error('Erro ao tentar se conectar ao servidor:', error);
            setErrorMessage('Erro ao conectar-se ao servidor. Verifique sua conexão.');
        }
    };

    const handlePressIn = () => setIsPressed(true);
    const handlePressOut = () => setIsPressed(false);

    return (
        <div className="container">
            <div className="registerBox">
                <h1 className="title">Registrar</h1>
                {errorMessage && <p className="error">{errorMessage}</p>}

                <input
                    className="input"
                    placeholder="Usuário"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    className="input"
                    type="password"
                    placeholder="Senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button
                    className={`button ${isPressed ? 'buttonPressed' : ''}`}
                    onMouseDown={handlePressIn}
                    onMouseUp={handlePressOut}
                    onClick={handleRegister}
                >
                    Registrar
                </button>

                <p className="linkText" onClick={() => navigation.navigate('LoginScreen')}>
                    Já tem cadastro? Login
                </p>
            </div>
        </div>
    );
}
