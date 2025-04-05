import Link from 'next/link'
import styles from './footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div>
            <h3 className={styles.logo}>GreenInvest</h3>
            <p className={styles.description}>
              Платформа для инвестиций в недвижимость и бизнес
            </p>
          </div>
          <div>
            <h4 className={styles.sectionTitle}>Навигация</h4>
            <ul className={styles.linkList}>
              <li><Link href="/" className={styles.link}>Главная</Link></li>
              <li><Link href="/catalog" className={styles.link}>Каталог</Link></li>
              <li><Link href="/about" className={styles.link}>О платформе</Link></li>
            </ul>
          </div>
          <div>
            <h4 className={styles.sectionTitle}>Контакты</h4>
            <ul className={styles.linkList}>
              <li className={styles.contactItem}>info@greeninvest.ru</li>
              <li className={styles.contactItem}>+7 (495) 123-45-67</li>
              <li className={styles.contactItem}>Москва, ул. Инвестиционная, 1</li>
            </ul>
          </div>
          {/* <div>
            <h4 className={styles.sectionTitle}>Подписка</h4>
            <p className={styles.subscribeText}>
              Подпишитесь на новости и актуальные предложения
            </p>
            <form className={styles.subscribeForm}>
              <input 
                type="email" 
                placeholder="Ваш email" 
                className={styles.emailInput}
                required
              />
              <button type="submit" className={styles.submitButton}>
                OK
              </button>
            </form>
          </div> */}
        </div>
        <div className={styles.copyright}>
          <p>© {new Date().getFullYear()} GreenInvest. Все права защищены.</p>
        </div>
      </div>
    </footer>
  )
}