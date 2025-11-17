import React from "react";

function LoginPage() {
  return (
    <form>
      <label htmlFor="username" id="username">
        Username:
        <input type="text" />
      </label>
      <label htmlFor="password" id="password">
        Password:
        <input type="text" />
      </label>
      <button type="submit">Login</button>
    </form>
  );
}

export default LoginPage;
