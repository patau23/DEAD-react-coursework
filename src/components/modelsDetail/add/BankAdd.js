import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const BankAdd = () => {
  const [name, setName] = useState('')

  const history = useNavigate()

  const AddBankInfo = async () => {
    let formField = new FormData()

    formField.append('bank_name', name)

    await axios({
      method: 'post',
      url: 'http://127.0.0.1:8000/api/bank/',
      data: formField
    }).then(response => {
      console.log(response.data)
      history('/bank')
    })
  }

  return (
    <div>
      <h1> Добавить новый банк </h1>

      <div className='container'>
        <div className='form-group'>
          <div>
            Наименование:
            <input
              type='text'
              name='name'
              value={name}
              className='form-control form-control-lg'
              onChange={e => setName(e.target.value)}
            />
          </div>

          <br />

          <button className='btn btn-outline-success' onClick={AddBankInfo}>
            Добавить
          </button>
        </div>
      </div>
    </div>
  )
}

export default BankAdd
