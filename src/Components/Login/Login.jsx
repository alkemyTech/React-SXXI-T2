function Login() {
    return(
        <>

          <form onSubmit={"submitHandler"}>
            <label className="form-label d-block mt-2">
              <input type="text" name="email" placeholder="Email" autoComplete="false"/>
            </label>
            <br />
            <label >
              <input  type="password" name="password" placeholder="Contraseña" autoComplete="false"/>
            </label>
            <br />
            <button className="btn btn-success mt-2" type="submit">Login</button>
          </form>
        </>
    )
    
}

export default Login;