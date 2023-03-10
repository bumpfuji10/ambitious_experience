import {useEffect, useState} from "react";
import axiosClient from "../axios-client.js";
import {Link} from "react-router-dom";
import {useStateContext} from "../contexts/ContextsProvider";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const {setNotification} = useStateContext()

  useEffect(() => {
    getUsers();
  }, [])

  const onDeleteClick = user => {
    if (!window.confirm("社員情報を削除しますか?")) {
      return
    }
    axiosClient.delete(`/users/${user.id}`)
      .then(() => {
        setNotification('社員情報が削除されました')
        getUsers()
      })
  }

  const getUsers = () => {
    setLoading(true)
    axiosClient.get('/users')
      .then(({ data }) => {
        setLoading(false)
        setUsers(data.data)
      })
      .catch(() => {
        setLoading(false)
      })
  }


  return (
    <div>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <h1>社員情報</h1>
        <Link to="/users/new" className="btn-add">新規登録</Link>
      </div>
      <div className="card animated fadeInDown">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>社員名</th>
              <th>所属</th>
              <th>住所</th>
              <th>電話番号</th>
              <th>メールアドレス</th>
              <th>作成日時</th>
              <th>更新日時</th>
              <th>アクション</th>
            </tr>
          </thead>
          {loading && <tbody>
            <tr>
              <td colSpan="5" className="text-center">
                読み込み中...
              </td>
            </tr>
            </tbody>
            }
          {!loading  &&
          <tbody>
            {users.map(u => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.name}</td>
                <td>{u.department}</td>
                <td>{u.address}</td>
                <td>{u.phone}</td>
                <td>{u.email}</td>
                <td>{u.created_at}</td>
                <td>{u.updated_at}</td>
                <td>
                <Link className="btn-edit" to={'/users/' + u.id}>編集</Link>
                  &nbsp;
                  <button className="btn-delete" onClick={ev => onDeleteClick(u)}>削除</button>
                </td>
              </tr>
            ))}
          </tbody>
          }
        </table>
      </div>
    </div>
  )
}
