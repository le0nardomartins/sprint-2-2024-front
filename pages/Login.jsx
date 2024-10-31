import React, { useState } from 'react';
import './style/LoginScreen.css';

export default function LoginScreen({ navigation }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isPressed, setIsPressed] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const handleLogin = async () => {
        setErrorMessage('');
        setIsLoading(true);

        const url = `http://localhost:4000/login`;
        console.log("URL da API:", url);

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const contentType = response.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
                const text = await response.text();
                console.error('Resposta não JSON:', text);
                throw new Error('A resposta do servidor não é JSON.');
            }

            const data = await response.json();

            if (!response.ok) {
                setErrorMessage(data.message || 'Erro no login: Usuário ou senha incorretos.');
                setIsLoading(false);
                return;
            }

            // Verifica se o usuário é "adm" para determinar se é administrador
            const isAdmin = username === 'adm'; // Verificação do nome do usuário

            // Salva o token e navega de acordo com o tipo de usuário
            await localStorage.setItem('jwtToken', data.token);
            if (isAdmin) {
                navigation.navigate('SettingsPage'); // Navega para a tela de configurações
            } else {
                navigation.navigate('GraphScreen', { token: data.token }); // Navega para a tela de gráficos
            }

        } catch (error) {
            console.error('Erro ao tentar se conectar ao servidor:', error);
            setErrorMessage('Erro ao conectar-se ao servidor. Verifique a URL da API ou sua conexão.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container">
            <div className="loginBox">
                <h1 className="title">Login</h1>
                {errorMessage && <p className="error">{errorMessage}</p>}

                <input
                    className="input"
                    placeholder="Usuário"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    autoComplete="username"
                />
                <input
                    className="input"
                    type="password"
                    placeholder="Senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                />

                <button
                    type="button"
                    className={`button ${isHovered ? 'buttonHover' : ''}`}
                    style={{ transform: isPressed ? 'scale(0.95)' : 'scale(1)' }}
                    onMouseDown={() => setIsPressed(true)}
                    onMouseUp={() => setIsPressed(false)}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    onClick={handleLogin}
                    disabled={isLoading}
                >
                    {isLoading ? 'Entrando...' : 'Entrar'}
                </button>

                <p
                    className="linkText"
                    onClick={() => navigation.navigate('RegisterScreen')}
                >
                    Não tem cadastro? Registrar
                </p>
            </div>
        </div>
    );
}
