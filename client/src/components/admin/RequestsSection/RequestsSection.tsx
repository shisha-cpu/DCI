'use client'


import { useState , useEffect } from 'react'
import styles from './RequestsSection.module.css';
export default function RequestsSection() {
 
  return (
    <div className={styles.sectionContainer}>
    <h2 className={styles.sectionTitle}>Управление заявками</h2>
    <p className="text-gray-500">Просмотр и обработка заявок</p>
  </div>
  )
}