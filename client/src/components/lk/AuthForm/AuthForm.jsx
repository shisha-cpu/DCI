'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { loginStart, loginSuccess, loginFailure } from '@/store/slices/userSlice'
import styles from './AuthForm.module.css'
import api from '@/lib/api'

export default function AuthForm() {
  const router = useRouter()
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    company: '',
    referrer: '',
    role: 'investor',
    newsletterSubscription: false
  })
  const [agree, setAgree] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [isLoginForm, setIsLoginForm] = useState(true)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccessMessage('')
    
    try {
      if (isLoginForm) {
        dispatch(loginStart())
        setIsLoading(true)
        
        const response = await api.auth.login({
          email: formData.email,
          password: formData.password
        })

        if (response.token) {
          localStorage.setItem('token', response.token)
          dispatch(loginSuccess({
            token: response.token,
            user: response.user
          }))
          router.push('/lk')
        } else {
          throw new Error('Не получили токен от сервера')
        }
      } else {
        setIsLoading(true)
        const response = await api.auth.register(formData)
        setSuccessMessage('Регистрация прошла успешно! Теперь вы можете войти.')
        setIsLoginForm(true)
        setFormData({
          name: '',
          email: '',
          phone: '',
          password: '',
          company: '',
          referrer: '',
          role: 'investor',
          newsletterSubscription: false
        })
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 
                         (isLoginForm ? 'Ошибка авторизации' : 'Ошибка регистрации')
      setError(errorMessage)
      if (isLoginForm) {
        dispatch(loginFailure(errorMessage))
      }
    } finally {
      setIsLoading(false)
    }
  }

  const switchForm = () => {
    setError('')
    setSuccessMessage('')
    setIsLoginForm(!isLoginForm)
    setFormData(prev => ({ ...prev, password: '' }))
  }

  return (
    <div className={styles.authContainer}>
      <div className={styles.authCard}>
        <div className={styles.authHeader}>
          <h2 className={styles.authTitle}>
            {isLoginForm ? 'Вход в аккаунт' : 'Создать аккаунт'}
          </h2>
          <p className={styles.authSubtitle}>
            {isLoginForm ? 'Введите свои данные для входа' : 'Заполните форму для регистрации'}
          </p>
        </div>

        <div className={styles.authTabs}>
          <button
            type="button"
            className={`${styles.tabButton} ${isLoginForm ? styles.activeTab : ''}`}
            onClick={() => setIsLoginForm(true)}
          >
            Вход
          </button>
          <button
            type="button"
            className={`${styles.tabButton} ${!isLoginForm ? styles.activeTab : ''}`}
            onClick={() => setIsLoginForm(false)}
          >
            Регистрация
          </button>
        </div>

        {error && <div className={styles.errorMessage}>{error}</div>}
        {successMessage && <div className={styles.successMessage}>{successMessage}</div>}
        
        <form onSubmit={handleSubmit} className={styles.authForm}>
          {!isLoginForm && (
            <>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Ваше имя*</label>
                <input
                  type="text"
                  name="name"
                  className={styles.formInput}
                  value={formData.name}
                  onChange={handleChange}
                  required
                  minLength={2}
                />
              </div>
              
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Телефон*</label>
                <input
                  type="tel"
                  name="phone"
                  className={styles.formInput}
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  pattern="\+?[0-9\s\-\(\)]+"
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Компания</label>
                <input
                  type="text"
                  name="company"
                  className={styles.formInput}
                  value={formData.company}
                  onChange={handleChange}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Реферальный ID</label>
                <input
                  type="text"
                  name="referrer"
                  className={styles.formInput}
                  value={formData.referrer}
                  onChange={handleChange}
                  placeholder="Кто вас пригласил?"
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Тип аккаунта*</label>
                <select
                  name="role"
                  className={styles.formInput}
                  value={formData.role}
                  onChange={handleChange}
                  required
                >
                  <option value="investor">Инвестор</option>
                  <option value="partner">Партнер</option>
                  <option value="realtor">Продавец</option>
              
                </select>
              </div>
            </>
          )}

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Email*</label>
            <input
              type="email"
              name="email"
              className={styles.formInput}
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Пароль*</label>
            <input
              type="password"
              name="password"
              className={styles.formInput}
              value={formData.password}
              onChange={handleChange}
              required
              minLength={6}
            />
            {!isLoginForm && (
              <p className={styles.passwordHint}>Минимум 6 символов</p>
            )}
          </div>
          
          {!isLoginForm && (
            <div className={styles.checkboxGroup}>
              <input
                type="checkbox"
                name="newsletterSubscription"
                id="newsletter"
                className={styles.checkbox}
                checked={formData.newsletterSubscription}
                onChange={handleChange}
              />
              <label htmlFor="newsletter" className={styles.checkboxLabel}>
                Подписаться на рассылку
              </label>
            </div>
          )}
          
          <div className={styles.checkboxGroup}>
            <input
              type="checkbox"
              id="agree"
              className={styles.checkbox}
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
              required
            />
            <label htmlFor="agree" className={styles.checkboxLabel}>
              Я согласен с обработкой персональных данных*
            </label>
          </div>
          
          {isLoginForm && (
            <div className={styles.forgotPassword}>
              <Link href="/forgot-password">
                Забыли пароль?
              </Link>
            </div>
          )}
          
          <button 
            type="submit" 
            className={styles.submitButton}
            disabled={isLoading || !agree}
          >
            {isLoading ? (
              <span className={styles.loader}></span>
            ) : isLoginForm ? 'Войти' : 'Зарегистрироваться'}
          </button>
        </form>

        <div className={styles.switchForm}>
          {isLoginForm ? 'Ещё нет аккаунта? ' : 'Уже есть аккаунт? '}
          <button 
            type="button" 
            className={styles.switchButton}
            onClick={switchForm}
          >
            {isLoginForm ? 'Создать аккаунт' : 'Войти'}
          </button>
        </div>
      </div>
    </div>
  )
}