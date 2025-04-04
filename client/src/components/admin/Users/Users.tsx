'use client'

import { useState, useEffect } from 'react'
import styles from './admin.module.css'

type User = {
  id: number
  name: string
  email: string
  role: string
  lastLogin: string
}

export default function AdminUsers() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // const response = await fetch('/api/admin/users')
        // const data = await response.json()
        // Имитация запроса
        setTimeout(() => {
          setUsers([
            { id: 1, name: 'Иван Иванов', email: 'ivan@example.com', role: 'user', lastLogin: '2023-05-15' },
            { id: 2, name: 'Петр Петров', email: 'petr@example.com', role: 'admin', lastLogin: '2023-05-16' }
          ])
          setLoading(false)
        }, 500)
      } catch (error) {
        console.error('Ошибка загрузки пользователей:', error)
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  return (
    <div className={styles.section}>
      <h2>Управление пользователями</h2>
      
      {loading ? (
        <p>Загрузка...</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Имя</th>
              <th>Email</th>
              <th>Роль</th>
              <th>Последний вход</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <select defaultValue={user.role}>
                    <option value="user">Пользователь</option>
                    <option value="admin">Администратор</option>
                  </select>
                </td>
                <td>{user.lastLogin}</td>
                <td>
                  <button className={styles.smallButton}>Редактировать</button>
                  <button className={styles.smallButtonDanger}>Удалить</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}