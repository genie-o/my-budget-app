import { useState, useEffect } from 'react'
import './App.css'

const CATEGORIES = ['식비', '교통', '주거', '쇼핑', '월급', '기타']

const INITIAL_FORM = { type: '지출', amount: '', category: '식비', memo: '' }

function App() {
  const [transactions, setTransactions] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('transactions')) ?? []
    } catch {
      return []
    }
  })
  const [form, setForm] = useState(INITIAL_FORM)

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions))
  }, [transactions])

  const income = transactions
    .filter((t) => t.type === '수입')
    .reduce((sum, t) => sum + t.amount, 0)

  const expense = transactions
    .filter((t) => t.type === '지출')
    .reduce((sum, t) => sum + t.amount, 0)

  const balance = income - expense

  function handleSubmit(e) {
    e.preventDefault()
    const amount = Number(form.amount)
    if (!amount || amount <= 0) return
    const newTransaction = {
      id: Date.now(),
      type: form.type,
      amount,
      category: form.category,
      memo: form.memo.trim(),
      date: new Date().toLocaleDateString('ko-KR'),
    }
    setTransactions((prev) => [newTransaction, ...prev])
    setForm(INITIAL_FORM)
  }

  function handleDelete(id) {
    setTransactions((prev) => prev.filter((t) => t.id !== id))
  }

  function formatKRW(amount) {
    return amount.toLocaleString('ko-KR') + '원'
  }

  return (
    <div className="container">
      {/* 잔액 카드 */}
      <div className="balance-card">
        <p className="balance-label">현재 잔액</p>
        <p className={`balance-amount ${balance >= 0 ? 'positive' : 'negative'}`}>
          {formatKRW(balance)}
        </p>
        <div className="balance-summary">
          <div className="summary-item income">
            <span className="summary-icon">↑</span>
            <span className="summary-label">수입</span>
            <span className="summary-value">{formatKRW(income)}</span>
          </div>
          <div className="summary-divider" />
          <div className="summary-item expense">
            <span className="summary-icon">↓</span>
            <span className="summary-label">지출</span>
            <span className="summary-value">{formatKRW(expense)}</span>
          </div>
        </div>
      </div>

      {/* 입력 폼 */}
      <div className="card">
        <h2 className="card-title">내역 추가</h2>
        <form onSubmit={handleSubmit} className="form">
          <div className="type-toggle">
            {['지출', '수입'].map((t) => (
              <button
                key={t}
                type="button"
                className={`toggle-btn ${form.type === t ? (t === '수입' ? 'active-income' : 'active-expense') : ''}`}
                onClick={() => setForm((f) => ({ ...f, type: t }))}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">금액</label>
              <input
                className="form-input"
                type="number"
                placeholder="0"
                min="1"
                value={form.amount}
                onChange={(e) => setForm((f) => ({ ...f, amount: e.target.value }))}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">카테고리</label>
              <select
                className="form-input"
                value={form.category}
                onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">메모 (선택)</label>
            <input
              className="form-input"
              type="text"
              placeholder="메모를 입력하세요"
              value={form.memo}
              onChange={(e) => setForm((f) => ({ ...f, memo: e.target.value }))}
              maxLength={50}
            />
          </div>

          <button type="submit" className="submit-btn">추가하기</button>
        </form>
      </div>

      {/* 거래 목록 */}
      <div className="card">
        <h2 className="card-title">거래 내역</h2>
        {transactions.length === 0 ? (
          <p className="empty-message">아직 내역이 없습니다.</p>
        ) : (
          <ul className="transaction-list">
            {transactions.map((t) => (
              <li key={t.id} className={`transaction-item ${t.type === '수입' ? 'income-item' : 'expense-item'}`}>
                <div className="transaction-left">
                  <span className="transaction-badge">{t.category}</span>
                  <div>
                    <p className="transaction-memo">{t.memo || t.category}</p>
                    <p className="transaction-date">{t.date}</p>
                  </div>
                </div>
                <div className="transaction-right">
                  <span className={`transaction-amount ${t.type === '수입' ? 'income-text' : 'expense-text'}`}>
                    {t.type === '수입' ? '+' : '-'}{formatKRW(t.amount)}
                  </span>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(t.id)}
                    aria-label="삭제"
                  >
                    ✕
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default App
