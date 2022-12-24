import { useEffect, useState } from "react"
import {useParams, useNavigate} from "react-router-dom"
import axiosClient from "../axios-client"
import { useStateContext } from "../contexts/ContextsProvider";

export default function UserForm() {
  const navigate = useNavigate();
  let {id} = useParams();
  const [user, setUser] = useState({
    id: null,
    name: '',
    email: '',
    department: '',
    address: '',
    phone: '',
    password: '',
    password_confirmation: ''
  })
  const [errors, setErrors] = useState(null)
  const [loading, setLoading] = useState(false)
  const {setNotification} = useStateContext()

  if (id) {
    useEffect(() => {
      setLoading(true)
      axiosClient.get(`/users/${id}`)
        .then(({data}) => {
          setLoading(false)
          setUser(data)
        })
        .catch(() => {
          setLoading(false)
        })
    }, [])
  }

  const onSubmit = ev => {
    ev.preventDefault()
    if (user.id) {
      axiosClient.put(`/users/${user.id}`, user)
        .then(() => {
          setNotification('社員情報が更新されました')
          navigate('/users')
        })
        .catch(err => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors)
          }
        })
    } else {
      axiosClient.post('/users', user)
        .then(() => {
          setNotification('社員情報が作成されました')
          navigate('/users')
        })
        .catch(err => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors)
          }
        })
    }
  }

  return (
    <>
      {user.id && <h1>社員情報更新： {user.name}</h1>}
      {!user.id && <h1>新規登録</h1>}
      <div className="card animated fadeInDown">
        {loading && (
          <div className="text-center">読み込み中...</div>
        )}
        {errors && <div className="alert">
          {Object.keys(errors).map(key => (
            <p key={key}>{errors[key][0]}</p>
          ))}
          </div>
          }
          {!loading &&
          <form onSubmit={onSubmit}>
            <input value={user.name} onChange={ev => setUser({...user, name: ev.target.value})} placeholder="お名前" />
            <input value={user.email} onChange={ev => setUser({...user, email: ev.target.value})} placeholder="メールアドレス" />
            <input value={user.department} onChange={ev => setUser({...user, department: ev.target.value})} placeholder="所属" />
            <input value={user.address} onChange={ev => setUser({...user, address: ev.target.value})} placeholder="住所" />
            <input value={user.phone} onChange={ev => setUser({...user, phone: ev.target.value})} placeholder="電話番号" />
            <input onChange={ev => setUser({...user, password: ev.target.value})} placeholder="パスワード" />
            <input onChange={ev => setUser({...user, password_confirmation: ev.target.value})}  placeholder="パスワード確認" />
            <button className="btn">保存</button>
          </form>
          }
      </div>
    </>
  )
}
