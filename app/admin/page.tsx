"use client";

import { useEffect, useState } from "react";

type Message = {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
};

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [messages, setMessages] = useState<Message[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [dbError, setDbError] = useState("");

  async function loadMessages() {
    setLoading(true);
    setDbError("");
    const res = await fetch("/api/admin/messages");
    if (res.ok) {
      setMessages(await res.json());
      setAuthed(true);
    } else if (res.status === 401) {
      setAuthed(false);
    } else {
      // Authenticated, but something else went wrong (e.g. MongoDB not configured yet)
      const data = await res.json().catch(() => ({}));
      setAuthed(true);
      setDbError(data.error || "Something went wrong loading messages.");
    }
    setLoading(false);
  }

  useEffect(() => {
    loadMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoginError("");
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      setPassword("");
      await loadMessages();
    } else {
      const data = await res.json();
      setLoginError(data.error || "Login failed.");
    }
  }

  async function handleLogout() {
    await fetch("/api/admin/login", { method: "DELETE" });
    setAuthed(false);
    setMessages(null);
  }

  if (!authed) {
    return (
      <div className="admin-login">
        <h2 style={{ marginBottom: 24 }}>Admin Login</h2>
        <form onSubmit={handleLogin}>
          <div className="form-field">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoFocus
            />
          </div>
          <button type="submit" className="btn btn-solid">Log in</button>
          {loginError && <div className="form-status error">{loginError}</div>}
        </form>
      </div>
    );
  }

  return (
    <div className="admin-wrap">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2>Contact Messages</h2>
        <button className="btn btn-outline" onClick={handleLogout}>Log out</button>
      </div>

      {loading && <p style={{ marginTop: 20, color: "var(--ink-soft)" }}>Loading…</p>}

      {!loading && dbError && (
        <div className="form-status error" style={{ marginTop: 20 }}>{dbError}</div>
      )}

      {!loading && !dbError && messages && messages.length === 0 && (
        <p style={{ marginTop: 20, color: "var(--ink-soft)" }}>
          No messages yet — they&apos;ll show up here once someone submits the contact form.
        </p>
      )}

      {!loading && messages && messages.length > 0 && (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Message</th>
              <th>Received</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((m) => (
              <tr key={m.id}>
                <td>{m.name}</td>
                <td>{m.email}</td>
                <td style={{ maxWidth: 320 }}>{m.message}</td>
                <td>{new Date(m.created_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
