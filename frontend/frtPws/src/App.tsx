import { useState } from 'react'
import './App.css'

//import sssImg from './assets/sss.png'
import hgyghh from './assets/hgyghh.gif'

function App() {
  const [password, setPassword] = useState('')
  const [result, setResult] = useState('Result when press Start button')
  const [loading, setLoading] = useState(false)

  const handleStart = async () => {
    if (!password) {
      setResult('Enter Password Before Start!')
      return
    }

    setLoading(true)
    setResult('Predicting...')

    try {
      // เชื่อมต่อพอร์ต 8000 ตามที่ตั้งไว้ใน docker-compose
      const response = await fetch('http://localhost:8000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password: password }),
      })

      if (response.ok) {
        const data = await response.json()
        // แปลผลลัพธ์ risk_level จาก AI ของคุณ
        const riskMapping: { [key: number]: string } = {
          0: "🔴 VERY WEAK (High Risk)",
          1: "🟡 MODERATE",
          2: "🟢 STRONG",
        }
        setResult(`PWD: ${password} \n AI RISK LEVEL: ${riskMapping[data.risk_level] || 'Unknown'}`)
      } else {
        setResult('Error: Cannot connect to Backend')
      }
    } catch (error) {
      setResult('Error: Backend service is offline')
    } finally {
      setLoading(false)
    }
  }

  // ... ส่วนของ handleStart เหมือนเดิม ...

  return (
    <div className="main-wrapper">
      <div className="app-container">
        {/* 1. ส่วนหัว */}
        <div className="box header-box">
          <h1>Congrats, Your Password is Gone</h1>
        </div>

        {/* 2. ส่วนช่องกรอกรหัส */}
        <div className="box input-box">
          <input
            type="text"
            placeholder="Enter PASSWORD here!"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />
        </div>

        {/* 3. ส่วนเลย์เอาต์ล่าง (ต้องคลุมทั้งรูปและผลลัพธ์) */}
        <div className="bottom-layout">

          {/* กล่องรูปภาพ (อยู่ฝั่งซ้าย) */}
          <div className="box image-box">
            <img
              src={hgyghh}
              alt="Status"
              className="status-image"
            />
          </div>

          {/* กล่องกลุ่มผลลัพธ์ (อยู่ฝั่งขวา) */}
          <div className="result-group">
            <div className="box result-box">
              <p style={{ whiteSpace: 'pre-line' }}>{result}</p>
            </div>

            <div className="button-area">
              <button
                className="start-btn"
                onClick={handleStart}
                disabled={loading}
              >
                {loading ? 'Processing...' : 'Start →'}
              </button>
            </div>
          </div>
          {/* ปิด result-group */}

        </div>
        {/* ปิด bottom-layout */}

      </div>
    </div>
  )
}

export default App