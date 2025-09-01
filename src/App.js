import React, { useState, useEffect } from 'react';
import { WebApp } from '@tma.js/sdk';
import './App.css';

// Главная страница
const HomePage = ({ onNavigate }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Инициализация Telegram Mini App
    WebApp.ready();
    WebApp.expand();
    
    // Получаем информацию о пользователе
    if (WebApp.initDataUnsafe?.user) {
      setUser(WebApp.initDataUnsafe.user);
    }
  }, []);

  const handleMainButton = () => {
    WebApp.MainButton.setText('ОТКРЫТЬ ПРОФИЛЬ');
    WebApp.MainButton.show();
    WebApp.MainButton.onClick(() => onNavigate('profile'));
  };

  const handleBackButton = () => {
    WebApp.BackButton.hide();
    WebApp.MainButton.hide();
  };

  return (
    <div className="page home-page">
      <div className="header">
        <h1>🏠 Главная страница</h1>
        {user && (
          <div className="user-info">
            <p>Привет, {user.first_name}!</p>
          </div>
        )}
      </div>
      
      <div className="content">
        <p>Добро пожаловать в нашу мини-апку!</p>
        
        <div className="button-grid">
          <button 
            className="nav-button primary"
            onClick={() => onNavigate('about')}
          >
            📖 О нас
          </button>
          
          <button 
            className="nav-button secondary"
            onClick={() => onNavigate('services')}
          >
            🛠️ Услуги
          </button>
          
          <button 
            className="nav-button accent"
            onClick={() => onNavigate('contact')}
          >
            📞 Контакты
          </button>
          
          <button 
            className="nav-button special"
            onClick={handleMainButton}
          >
            🎯 Главная кнопка
          </button>
        </div>
      </div>
    </div>
  );
};

// Страница "О нас"
const AboutPage = ({ onNavigate }) => {
  useEffect(() => {
    WebApp.BackButton.show();
    WebApp.BackButton.onClick(() => onNavigate('home'));
    WebApp.MainButton.hide();
  }, [onNavigate]);

  return (
    <div className="page about-page">
      <div className="header">
        <h1>📖 О нас</h1>
      </div>
      
      <div className="content">
        <div className="info-card">
          <h2>Наша компания</h2>
          <p>Мы создаем инновационные решения для Telegram Mini Apps.</p>
          <p>Наша миссия - сделать использование Telegram еще удобнее!</p>
        </div>
        
        <div className="features">
          <div className="feature">
            <span className="feature-icon">🚀</span>
            <h3>Быстро</h3>
            <p>Мгновенная загрузка</p>
          </div>
          <div className="feature">
            <span className="feature-icon">🔒</span>
            <h3>Безопасно</h3>
            <p>Защищенные данные</p>
          </div>
          <div className="feature">
            <span className="feature-icon">💡</span>
            <h3>Удобно</h3>
            <p>Простой интерфейс</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Страница "Услуги"
const ServicesPage = ({ onNavigate }) => {
  useEffect(() => {
    WebApp.BackButton.show();
    WebApp.BackButton.onClick(() => onNavigate('home'));
    WebApp.MainButton.hide();
  }, [onNavigate]);

  const services = [
    { id: 1, name: 'Разработка Mini Apps', icon: '💻', description: 'Создание приложений для Telegram' },
    { id: 2, name: 'Дизайн интерфейсов', icon: '🎨', description: 'Современный и удобный дизайн' },
    { id: 3, name: 'Техническая поддержка', icon: '🛠️', description: '24/7 поддержка вашего проекта' },
    { id: 4, name: 'Консультации', icon: '📋', description: 'Профессиональные консультации' }
  ];

  return (
    <div className="page services-page">
      <div className="header">
        <h1>🛠️ Услуги</h1>
      </div>
      
      <div className="content">
        <div className="services-grid">
          {services.map(service => (
            <div key={service.id} className="service-card">
              <div className="service-icon">{service.icon}</div>
              <h3>{service.name}</h3>
              <p>{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Страница "Контакты"
const ContactPage = ({ onNavigate }) => {
  useEffect(() => {
    WebApp.BackButton.show();
    WebApp.BackButton.onClick(() => onNavigate('home'));
    WebApp.MainButton.hide();
  }, [onNavigate]);

  const handleContact = (type) => {
    switch(type) {
      case 'telegram':
        WebApp.openTelegramLink('https://t.me/your_channel');
        break;
      case 'email':
        WebApp.openLink('mailto:info@example.com');
        break;
      case 'website':
        WebApp.openLink('https://example.com');
        break;
      default:
        break;
    }
  };

  return (
    <div className="page contact-page">
      <div className="header">
        <h1>📞 Контакты</h1>
      </div>
      
      <div className="content">
        <div className="contact-info">
          <div className="contact-card">
            <h3>Свяжитесь с нами</h3>
            <p>Мы всегда готовы помочь вам!</p>
          </div>
          
          <div className="contact-buttons">
            <button 
              className="contact-button telegram"
              onClick={() => handleContact('telegram')}
            >
              📱 Telegram канал
            </button>
            
            <button 
              className="contact-button email"
              onClick={() => handleContact('email')}
            >
              📧 Email
            </button>
            
            <button 
              className="contact-button website"
              onClick={() => handleContact('website')}
            >
              🌐 Веб-сайт
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Страница "Профиль"
const ProfilePage = ({ onNavigate }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    WebApp.BackButton.show();
    WebApp.BackButton.onClick(() => onNavigate('home'));
    WebApp.MainButton.hide();
    
    if (WebApp.initDataUnsafe?.user) {
      setUser(WebApp.initDataUnsafe.user);
    }
  }, [onNavigate]);

  return (
    <div className="page profile-page">
      <div className="header">
        <h1>👤 Профиль</h1>
      </div>
      
      <div className="content">
        {user ? (
          <div className="profile-card">
            <div className="profile-avatar">
              {user.photo_url ? (
                <img src={user.photo_url} alt="Avatar" />
              ) : (
                <div className="avatar-placeholder">👤</div>
              )}
            </div>
            
            <div className="profile-info">
              <h2>{user.first_name} {user.last_name || ''}</h2>
              <p>ID: {user.id}</p>
              {user.username && <p>@{user.username}</p>}
              <p>Язык: {user.language_code}</p>
            </div>
          </div>
        ) : (
          <p>Информация о пользователе недоступна</p>
        )}
      </div>
    </div>
  );
};

// Основное приложение
function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const navigateTo = (page) => {
    setCurrentPage(page);
  };

  const renderPage = () => {
    switch(currentPage) {
      case 'home':
        return <HomePage onNavigate={navigateTo} />;
      case 'about':
        return <AboutPage onNavigate={navigateTo} />;
      case 'services':
        return <ServicesPage onNavigate={navigateTo} />;
      case 'contact':
        return <ContactPage onNavigate={navigateTo} />;
      case 'profile':
        return <ProfilePage onNavigate={navigateTo} />;
      default:
        return <HomePage onNavigate={navigateTo} />;
    }
  };

  return (
    <div className="App">
      {renderPage()}
    </div>
  );
}

export default App;
