import { useEffect } from "react";
import { Link, Navigate, Outlet } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextsProvider";

export default function DefaultLayout() {
  const {user, token, setUser, setToken} = useStateContext()

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
        <Link to="/users">社員情報</Link>
      </aside>
      <div className="content">
        <header>
          <div>
            社員マスタ
          </div>
          <div>
            {user.name}
            <a href="#" onClick={onLogout} className="btn-logout" >ログアウト</a>
          </div>
        </header>
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  )
}
