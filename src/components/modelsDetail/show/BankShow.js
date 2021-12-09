import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function BankShow () {
  const [bank, setBank] = useState([])
  const history = useNavigate()

  const getBank = async () => {
    const response = await axios.get('http://127.0.0.1:8000/api/bank/')
    setBank(response.data)
  }

  useEffect(() => {
    getBank()
  }, [])

  const deleteBank = async id => {
    await axios.delete(`http://127.0.0.1:8000/api/bank/${id}/`)
    history('/bank')
  }

  return (
    <div className='centered'>
      <h1>Список Банков,</h1>
      <p>которые обслуживают универ</p>

      <Link className='btn btn-outline-success' to={'/bank/add/'}>
        Добавить банк
      </Link>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Код банка</th>
            <th>Наименование</th>
            <th>Обновление</th>
            <th>Удаление</th>
          </tr>
        </thead>
        <tbody>
          {bank.map((bank, id) => (
            <tr key={id}>
              <td valign='middle' key='{id}-code'>
                {bank.bank_code}
              </td>
              <td valign='middle' key='{id}-name'>
                {bank.bank_name}
              </td>
              <td valign='middle' key='{id}-upd'>
                <Link
                  key='{id}-updlink'
                  to={`/bank/${bank.bank_code}/update`}
                  className='btn btn-outline-warning'
                >
                  Обновить
                </Link>
              </td>
              <td valign='middle' key='{id}-del'>
                <a
                  key='{id}-dellink'
                  href='http://localhost:3000/bank/'
                  className='btn btn-outline-danger'
                  onClick={() => deleteBank(bank.bank_code)}
                >
                  Удалить
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}
