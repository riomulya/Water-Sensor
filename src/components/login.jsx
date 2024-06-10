import { useState, useEffect } from "react"

useState 
useEffect

const login = () => {
  return (
    <div>
      <div class="login">
                <h1>LOGIN</h1>
                <img src="./Security-pana.svg" />
                
                <form action="./dashboard.html">
                
                    <div class="form-input">
                        <input type="text" id="username" required />
                        <span></span>
                        <label><b>Username</b></label>
                    </div>

                    <div class="form-input">
                        <input type="password" id="password" required />
                        <span></span>
                        <label><b>Password</b></label>
                    </div>
                    <input type="submit" name="login" value="LOGIN" onclick="Login()" />
                </form>
                <a href="./home"><p>Home</p></a>
            </div>
    </div>
  )
}

export default login