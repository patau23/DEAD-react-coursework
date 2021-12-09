import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'

export default function BankUpd () {
  const { id } = useParams('')
  const [bank_name, setName] = useState('')

  const history = useNavigate()

  useEffect(() => {
    const loadInfo = async () => {
      const { data } = await axios.get(`http://127.0.0.1:8000/api/bank/${id}/`)
      console.log(data)

      setName(data.bank_name)
    }

    loadInfo()
  }, [id])

  const UpdateInfo = async () => {
    let formField = new FormData()
    formField.append('bank_name', bank_name)

    await axios({
      method: 'PUT',
      url: `http://127.0.0.1:8000/api/bank/${id}/`,
      data: formField
    }).then(response => {
      console.log(response.data)
      history('/bank')
    })
  }

  return (
    <div>
      <h1>Изменить элемент</h1>
      <div className='container'>
        <div className='form-group'>
          Наименование Банка:
          <div>
            <input
              type='text'
              className='form-control form-control-lg'
              name='name'
              value={bank_name}
              placeholder='Наименование банка'
              onChange={e => setName(e.target.value)}
            />
          </div>
          <br />
          <button className='btn btn-outline-success' onClick={UpdateInfo}>
            Обновить
          </button>
        </div>
      </div>
    </div>
  )
}
