'use client'

import { useState } from 'react'
import styles from './Profile.module.css'
import { useSelector } from 'react-redux'

export default function Profile() {

  const [isEditingPassword, setIsEditingPassword] = useState(false)
  const [newPassword, setNewPassword] = useState('')
  const user = useSelector(state=>state.user.user)
  console.log(user);
  
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Профиль</h1>
      
      <div className={styles.profileSection}>
        <div className={styles.profileHeader}>
          <h2 className={styles.sectionTitle}>{user.name}</h2>
        </div>
        
        <div className={styles.infoItem}>
          <div className={styles.infoLabel}>Телефон:</div>
          <div className={styles.infoValue}>{user.phone}</div>

        </div>
        
        <div className={styles.infoItem}>
          <div className={styles.infoLabel}>E-mail:</div>
          <div className={styles.infoValue}>{user.email}</div>
        </div>
        
        <div className={styles.infoItem}>
          <div className={styles.infoLabel}>Пароль:</div>
          {isEditingPassword ? (
            <div className={styles.passwordEdit}>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className={styles.passwordInput}
                placeholder="Новый пароль"
              />
              <button 
                className={styles.saveButton}
                onClick={() => setIsEditingPassword(false)}
              >
                Сохранить
              </button>
              <button 
                className={styles.cancelButton}
                onClick={() => setIsEditingPassword(false)}
              >
                Отмена
              </button>
            </div>
          ) : (
            <button 
              className={styles.changeButton}
              onClick={() => setIsEditingPassword(true)}
            >
              Сменить пароль
            </button>
          )}
        </div>
      </div>
    </div>
  )
}