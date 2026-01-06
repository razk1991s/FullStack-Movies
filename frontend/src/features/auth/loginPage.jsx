import "../auth/loginPage.scss";
export default function LoginPage() {
  return (
    <div className="rs-login-root">
      <div className="rs-login-bg-blob" aria-hidden />

      <div className="rs-card" role="main" aria-labelledby="rs-heading">
        <div className="rs-logo">MOVIES</div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            alert("Login functionality to be implemented");
          }}
        >
          <div className="rs-field">
            <label className="sr-only" htmlFor="username">
              Username
            </label>
            <input
              id="username"
              className="rs-input"
              placeholder="Enter your username"
              autoComplete="username"
            />
          </div>

          <div className="rs-field">
            <label className="sr-only" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="rs-input"
              placeholder="Enter your password"
              autoComplete="current-password"
            />
          </div>

          <div className="rs-field">
            <button className="rs-button" type="submit">
              Connect
            </button>
          </div>

          <div className="rs-divider" />

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: 12,
            }}
          ></div>
        </form>
      </div>
    </div>
  );
}
