import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './style/Settings.css';

// Componente de Seção de Configurações
const SettingSection = ({ title, children }) => (
    <motion.div
        className="setting-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
    >
        <h2>{title}</h2>
        {children}
    </motion.div>
);

// Componente de Switch
const ToggleSwitch = ({ label, isOn, onToggle }) => (
    <div className="toggle-switch">
        <span>{label}</span>
        <button className={`toggle-button ${isOn ? 'on' : 'off'}`} onClick={onToggle}>
            <span className={`toggle-circle ${isOn ? 'translate-x-6' : 'translate-x-1'}`} />
        </button>
    </div>
);

// Componente de Perfil
const Profile = () => (
    <SettingSection title="Perfil">
        <div className="profile-info">
            <div>
                <h3>Administrador</h3>
                <p>admservice@gmail.com</p>
            </div>
        </div>
    </SettingSection>
);

// Componente de Segurança
const Security = () => {
    const [twoFactor, setTwoFactor] = useState(false);

    return (
        <SettingSection title="Segurança">
            <ToggleSwitch
                label="Autenticação de Dois Fatores"
                isOn={twoFactor}
                onToggle={() => setTwoFactor(!twoFactor)}
            />
            <div className="change-password">
                <button>Trocar Senha</button>
            </div>
        </SettingSection>
    );
};

// Componente de Contas Conectadas
const ConnectedAccounts = () => {
    const [connectedAccounts, setConnectedAccounts] = useState([
        { id: 1, name: 'Google', connected: true },
    ]);

    return (
        <SettingSection title="Conectar Contas">
            {connectedAccounts.map((account) => (
                <div key={account.id} className="account-item">
                    <span>{account.name}</span>
                    <button
                        className={`connect-button ${account.connected ? 'connected' : 'disconnected'}`}
                        onClick={() =>
                            setConnectedAccounts(
                                connectedAccounts.map((acc) =>
                                    acc.id === account.id ? { ...acc, connected: !acc.connected } : acc
                                )
                            )
                        }
                    >
                        {account.connected ? 'Conectado' : 'Conectar'}
                    </button>
                </div>
            ))}
            <button className="add-account-button">Adicionar Conta</button>
        </SettingSection>
    );
};

// Página de Configurações
const SettingsPage = () => (
    <main>
        <div>
            <Profile />
            <Security />
            <ConnectedAccounts />
        </div>
    </main>
);

export default SettingsPage;
