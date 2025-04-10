'use client'

import { useState, useEffect } from 'react';
import styles from './UsersSection.module.css';

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  isBlocked: boolean;
  createdAt: string;
  company?: string;
  isVerified?: boolean;
  newsletterSubscription?: boolean;
  phone?: string;
}

export default function UsersSection() {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    filterUsers();
  }, [users, searchTerm, activeTab]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/users`);
      
      if (!response.ok) {
        throw new Error('Ошибка при загрузке пользователей');
      }

      const data = await response.json();
      setUsers(data.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Неизвестная ошибка');
    } finally {
      setLoading(false);
    }
  };

  const filterUsers = () => {
    let result = [...users];
  
    // Filter by role
    if (activeTab !== 'all') {
      result = result.filter(user => user.role === activeTab);
    }
  
    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(user => 
        user.name.toLowerCase().includes(term) || 
        user.email.toLowerCase().includes(term) ||
        (user.phone && user.phone.toLowerCase().includes(term)) ||
        (user.company && user.company.toLowerCase().includes(term))
      );
    }
  
    setFilteredUsers(result);
  };
  const handleBlockUser = async (userId: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/users/${userId}/block`, {
        method: 'PATCH'
      });

      if (!response.ok) {
        throw new Error('Ошибка при блокировке пользователя');
      }

      // Обновляем список пользователей после блокировки
      fetchUsers();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Неизвестная ошибка');
    }
  };

  if (loading) return <div className={styles.loading}>Загрузка...</div>;
  if (error) return <div className={styles.error}>Ошибка: {error}</div>;

  return (
    <div className={styles.sectionContainer}>
      <h2 className={styles.sectionTitle}>Управление пользователями</h2>
      
      <div className={styles.controls}>
        <input
          type="text"
          placeholder="Поиск по имени, email, телефону или компании..."
          className={styles.searchInput}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button 
          onClick={fetchUsers}
          className={styles.refreshButton}
        >
          Обновить
        </button>
      </div>
      <div className={styles.tabs}>
  <button 
    className={activeTab === 'all' ? styles.activeTab : styles.tab}
    onClick={() => setActiveTab('all')}
  >
    Все
  </button>
  <button 
    className={activeTab === 'investor' ? styles.activeTab : styles.tab}  // Fixed typo here
    onClick={() => setActiveTab('investor')}
  >
    Инвесторы
  </button>
  <button 
    className={activeTab === 'partner' ? styles.activeTab : styles.tab}
    onClick={() => setActiveTab('partner')}
  >
    Партнеры
  </button>
  <button 
    className={activeTab === 'realtor' ? styles.activeTab : styles.tab}
    onClick={() => setActiveTab('realtor')}
  >
    Продавцы
  </button>
</div>

      <div className={styles.users}>
        {filteredUsers.length > 0 ? (
          filteredUsers.map(user => (
            <div key={user._id} className={styles.userCard}>
              <div className={styles.userInfo}>
                <h3>{user.name}</h3>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Роль:</strong> {user.role === 'investor' ? 'Инвестор' : 
                                         user.role === 'partner' ? 'Партнер' : 
                                         user.role === 'realtor' ? 'Продавец' : user.role}</p>
                <p><strong>Компания:</strong> {user.company || 'Не указана'}</p>
                <p><strong>Телефон:</strong> {user.phone || 'Не указан'}</p>
                <p><strong>Дата регистрации:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
                <p><strong>Статус:</strong> {user.isBlocked ? 'Заблокирован' : 'Активен'}</p>
                <p><strong>Подписка на рассылку:</strong> {user.newsletterSubscription ? 'Да' : 'Нет'}</p>
                <p><strong>Верификация:</strong> {user.isVerified ? 'Подтверждена' : 'Не подтверждена'}</p>
              </div>
              <button 
                className={styles.blockButton}
                onClick={() => handleBlockUser(user._id)}
              >
                {user.isBlocked ? 'Разблокировать' : 'Заблокировать'}
              </button>
            </div>
          ))
        ) : (
          <div className={styles.noResults}>Пользователи не найдены</div>
        )}
      </div>
    </div>
  );
}