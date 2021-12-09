import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'

export default function StaffUpd () {
  const { id } = useParams('')

  const [curator_name, setCurator_name] = useState('')

  const history = useNavigate()

  useEffect(() => {
    const loadInfo = async () => {
      const { data } = await axios.get(`http://127.0.0.1:8000/api/staff/${id}/`)
      console.log(data)

      setCurator_name(data.curator_name)
    }
    loadInfo()
  }, [id])

  const UpdateInfo = async () => {
    let formField = new FormData()

    formField.append('curator_name', curator_name)

    await axios({
      method: 'PUT',
      url: `http://127.0.0.1:8000/api/staff/${id}/`,
      data: formField
    }).then(response => {
      console.log(response.data)
      history('/staff')
    })
  }

  return (
    <div>
      <h1>Изменить элемент</h1>
      <div className='container'>
        <div className='form-group'>
          ФИО Сотрудника
          <div>
            <input
              type='text'
              className='form-control form-control-lg'
              name='curator_name'
              value={curator_name}
              placeholder='ФИО'
              onChange={e => setCurator_name(e.target.value)}
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
