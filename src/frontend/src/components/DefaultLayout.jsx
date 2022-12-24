import { useEffect } from "react";
import { Link, Navigate, Outlet } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextsProvider";

export default function DefaultLayout() {
  const {user, token, notification, setUser, setToken} = useStateContext()

  if(!token) {
    return <Navigate to="/login" />
  }

  const onLogout = (ev) => {
    ev.preventDefault()

    axiosClient.post('/logout')
    .then(() => {
      setUser({})
      setToken(null)
    })
  }

  useEffect(() => {
    axiosClient.get('/user')
    .then(({data}) => {
      setUser(data)
    })
  }, [])

  return (
    <div id="defaultLayout">
      <aside>
        <Link to="/dashboard">ダッシュボード</Link>
        <Link to="/users">社員一覧</Link>
      </aside>
      <div className="content">
        <header>
          <div>

          </div>
          社員情報
          <div>
            {user.name} &nbsp; &nbsp;
            <a onClick={onLogout} className="btn-logout" href="#">ログアウト</a>
          </div>
        </header>
        <main>
          <Outlet/>
        </main>
        {notification &&
          <div className="notification">
            {notification}
          </div>
        }
      </div>
    </div>
  )
}
