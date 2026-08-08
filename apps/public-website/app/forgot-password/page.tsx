"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

export default function ForgotPasswordPage() {
  const [message, setMessage] = useState("");

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setMessage("If this email exists, a reset link will be sent once auth is connected.");
  }

  return (
    <main className="auth-shell">
      <p className="eyebrow">Account</p>
      <h1>Reset your password</h1>
      <p style={{ color: "var(--ink-soft)" }}>Enter the email associated with your UPCHAR account.</p>
      <form className="form-stack soft-panel" style={{ marginTop: "1.5rem" }} onSubmit={onSubmit}>
        <label>
          Email
          <input name="email" type="email" required />
        </label>
        <button type="submit" className="btn btn--primary">
          Send reset link
        </button>
        {message ? <p>{message}</p> : null}
      </form>
      <p style={{ marginTop: "1rem" }}>
        <Link href="/login">Back to sign in</Link>
      </p>
    </main>
  );
}
