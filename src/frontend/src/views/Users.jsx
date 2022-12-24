import { useEffect,useState } from "react";
import axiosClient from "../axios-client";
import { Link } from "react-router-dom";

export default function Users() {
const [users, setUsers] = useState([]);
const [loading, setLoading] = useState(false)

useEffect(() => {
  getUsers();
}, [])

const onDelete = (u) => {
  if (window.confirm("Are you sure want to delete this user?")) {
    return
  }

  axiosClient.delete(`/users/${user.id}`)
      .then(() => {
        // TODO: setNotification
        getUsers()
      })
}
const getUsers = () => {
  axiosClient.get('/users')
  .then(({data}) => {
    setLoading(false)
    console.log(data);
    setUsers(data.data)
  })
}

  return (
    <div>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <h1>Users</h1>
        <Link to="/users/new" className="btn-add">新規登録</Link>
      </div>
      <div className="card animated fadeInDown">
        <table>
          <thead>
            <tr>
              <th>社員ID</th>
              <th>社員名</th>
              <th>所属</th>
              <th>メールアドレス</th>
              <th>作成日時</th>
            </tr>
          </thead>
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
                <td>
                  <Link className="btn-edit" to={'/users/'+u.id}>Edit</Link>
                    &nbsp;
                    <button onClick={ev => onDelete(u)} className="btn-delete">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
