import { Link } from "react-router-dom"
import { useRef, useState } from "react";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextsProvider";

export default function Signup() {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();
  const {setUser, setToken} = useStateContext()
  const [errors, setErrors] = useState(null)

  const onSubmit = (ev) => {
    ev.preventDefault()
    const payload = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      password_confirmation: passwordConfirmationRef.current.value,
    }
    console.log(payload);
    axiosClient.post('/signup', payload)
      .then(({data}) => {
        setUser(data.user)
        setToken(data.token)
      })
      .catch(err => {
        const response = err.response;
        if (response && response.status === 422) {
          setErrors(response.data.errors)
        }
      })
  }

  return (
    <div className="login-signup-form animated fadeInDown">
      <div className="form">
        <form onSubmit={onSubmit}>
          <h1 className="title">
            アカウントを作成
          </h1>
          {errors &&
            <div className="alert">
              {Object.keys(errors).map(key => (
                <p key={key}>{errors[key][0]}</p>
              ))}
            </div>
          }
          <input ref={nameRef} placeholder="お名前" />
          <input ref={emailRef} type="email" placeholder="メールアドレス" />
          <input ref={passwordRef} type="password" placeholder="パスワード" />
          <input ref={passwordConfirmationRef} type="password" placeholder="パスワード確認" />
          <button className="btn btn-block">アカウント作成</button>
          <p className="message">
            アカウントをすでにお持ちですか？<Link to="/login"><p>ログインする</p></Link>
          </p>
        </form>
      </div>
    </div>
  )
}
