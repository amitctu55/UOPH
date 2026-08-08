"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

export default function SignupPage() {
  const [message, setMessage] = useState("");

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setMessage("Account creation will call the UPCHAR auth service when configured.");
  }

  return (
    <main className="auth-shell">
      <p className="eyebrow">Account</p>
      <h1>Create your UPCHAR account</h1>
      <p style={{ color: "var(--ink-soft)" }}>
        Start booking care or managing a clinical workspace.
      </p>
      <form className="form-stack soft-panel" style={{ marginTop: "1.5rem" }} onSubmit={onSubmit}>
        <label>
          Full name
          <input name="name" type="text" required />
        </label>
        <label>
          Email
          <input name="email" type="email" required />
        </label>
        <label>
          Password
          <input name="password" type="password" required minLength={8} />
        </label>
        <label>
          I am a
          <select name="role" defaultValue="patient" required>
            <option value="patient">Patient</option>
            <option value="doctor">Doctor</option>
            <option value="hospital">Hospital admin</option>
          </select>
        </label>
        <button type="submit" className="btn btn--primary">
          Create account
        </button>
        {message ? <p>{message}</p> : null}
      </form>
      <p style={{ marginTop: "1rem" }}>
        Already have an account? <Link href="/login">Sign in</Link>
      </p>
    </main>
  );
}
