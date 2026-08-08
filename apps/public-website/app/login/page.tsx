"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setMessage("Sign-in will connect to the UPCHAR auth service when the API is configured.");
  }

  return (
    <main className="auth-shell">
      <p className="eyebrow">Account</p>
      <h1>Sign in to UPCHAR</h1>
      <p style={{ color: "var(--ink-soft)" }}>Access patient, doctor, or hospital workspaces.</p>
      <form className="form-stack soft-panel" style={{ marginTop: "1.5rem" }} onSubmit={onSubmit}>
        <label>
          Email
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit" className="btn btn--primary">
          Sign in
        </button>
        {message ? <p>{message}</p> : null}
      </form>
      <p style={{ marginTop: "1rem" }}>
        <Link href="/forgot-password">Forgot password</Link>
        {" · "}
        <Link href="/signup">Create account</Link>
      </p>
    </main>
  );
}
