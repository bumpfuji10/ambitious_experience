import { Link } from "react-router-dom"
import { useRef, useState } from "react";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextsProvider";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const {setUser, setToken} = useStateContext()
  const [errors, setErrors] = useState(null)

  const onSubmit = (ev) => {
    ev.preventDefault()
    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    }
    setErrors(null);
    axiosClient.post('/login', payload)
      .then(({data}) => {
        setUser(data.user)
        setToken(data.token)
      })
      .catch(err => {
        const response = err.response;
        if (response && response.status === 422) {
          if (response.data.errors) {
            setErrors(response.data.errors)
          } else {
            setErrors({
              email: [response.data.message]
            })
          }
        }
        console.log(payload);
      })
  }

  return (
    <div className="login-signup-form animated fadeInDown">
      <div className="form">
        <form onSubmit={onSubmit}>
          <h1 className="title">
            ログイン
          </h1>
          {errors &&
            <div className="alert">
              {Object.keys(errors).map(key => (
                <p key={key}>{errors[key][0]}</p>
              ))}
            </div>
          }
          <input ref={emailRef} type="email" placeholder="メールアドレス" />
          <input ref={passwordRef} type="password" placeholder="パスワード" />
          <button className="btn btn-block">ログイン</button>
          <p className="message">
            アカウントをお持ちでないですか? <Link to="/signup"><p>アカウントを作成</p></Link>
          </p>
        </form>
      </div>
    </div>
  )
}
