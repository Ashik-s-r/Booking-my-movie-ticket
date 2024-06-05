import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/authSlice";
import Navbar from "../Navbar";
import { useNavigate } from "react-router-dom";

function Login() {
    var [name, setName] = useState('');
    var [password, setPassword] = useState('');
    var [errorMessage, setErrorMessage] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    function attemptLogin() {
        axios.post('http://127.0.0.1:8000/login', { username: name, password: password }).then(response => {
            setErrorMessage('')
            var user = { username: name, token: response.data.token }
            dispatch(setUser(user));
            navigate("/list");
        }).catch(error => {
            if (error.response.data.errors) {
                setErrorMessage(Object.values(error.response.data.errors).join(''))
            } else if (error.response.data.message) {
                setErrorMessage(error.response.data.message)
            } else {
                setErrorMessage('Failed to login user. Please contact admin')
            }
        })
    }
    return (<div className="login">
        <Navbar />
        <div className="container-fluid pt-5">
            <div className="row d-flex justify-content-center movee">
                <div className="col-8 offset-2">
                    <h1>LOGIN</h1>
                    {errorMessage ? <div className="alert alert-danger">{errorMessage}</div> : ''}
                    <div className="form-group">
                        <label style={{color:'white'}}>USER NAME :</label>
                        <input style={{ width: '40%' }} placeholder="ENTER USER NAME" type="text" className="form-control" value={name} onInput={(event) => setName(event.target.value)} />
                    </div>
                    <div className="form-group">
                        <label style={{color:'white'}}>PASSWORD :</label>
                        <input style={{ width: '40%' }} placeholder="ENTER PASSWORD" type="password" className="form-control" value={password} onInput={(event) => setPassword(event.target.value)}/>
                    </div><br />
                    <div className="form-group">
                        <button className="btn btn-primary float-center" onClick={attemptLogin}>LOGIN</button>
                    </div>
                </div>
            </div>
        </div>
    </div>)
}

export default Login;