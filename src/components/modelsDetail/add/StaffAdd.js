import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function StaffAdd () {
  const [name, setName] = useState('')

  const history = useNavigate()

  const AddInfo = async () => {
    let formField = new FormData()

    formField.append('curator_name', name)

    await axios({
      method: 'post',
      url: 'http://127.0.0.1:8000/api/staff/',
      data: formField
    }).then(response => {
      console.log(response.data)
      history('/staff')
    })
  }

  return (
    <div>
      <h1> Добавить сотрудников </h1>
      <div className='container'>
        <div className='form-group'>
          <div>
            ФИО:
            <input
              type='text'
              name='name'
              value={name}
              className='form-control form-control-lg'
              placeholder='Введите ФИО сотрундика'
              onChange={e => setName(e.target.value)}
            />
          </div>
          <br />
          <button className='btn btn-outline-success' onClick={AddInfo}>
            Добавить
          </button>
        </div>
      </div>
    </div>
  )
}
