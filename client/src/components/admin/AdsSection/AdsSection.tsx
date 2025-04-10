'use client'


import { useState , useEffect } from 'react'
import styles from './AdsSection.module.css';
export default function AdsSection() {
 
  return (
    <div className={styles.sectionContainer}>
    <h2 className={styles.sectionTitle}>Управление объявлениями</h2>
    <p className="text-gray-500">Модерация и управление объявлениями</p>
  </div>
  )
}