'use client';

// Gate de acceso por token compartido. Validación puramente en cliente
// (sitio estático, sin backend): es disuasivo, no seguridad real — el token
// vive en el bundle JS. Al acertar, el acceso se recuerda TTL_DAYS días.

import { useEffect, useState } from "react";

const TOKEN = "0Fa9iQ2qSq8o";
const TTL_DAYS = 5;
const KEY = "access-granted-at";

export function AccessGate({ children }: { children: React.ReactNode }) {
  // 'checking' hasta leer localStorage (solo en cliente) para no parpadear
  // ni el contenido ni el formulario durante la hidratación.
  const [status, setStatus] = useState<"checking" | "locked" | "granted">("checking");
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    try {
      const at = Number(localStorage.getItem(KEY));
      const fresh = at && Date.now() - at < TTL_DAYS * 24 * 60 * 60 * 1000;
      setStatus(fresh ? "granted" : "locked");
    } catch {
      setStatus("locked");
    }
  }, []);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim() === TOKEN) {
      try { localStorage.setItem(KEY, String(Date.now())); } catch {}
      setStatus("granted");
    } else {
      setError(true);
    }
  };

  if (status === "granted") return <>{children}</>;
  if (status === "checking") return null;

  return (
    <div className="gate">
      <form className="gate-card" onSubmit={submit}>
        <span className="gate-name">Canvas</span>
        <span className="gate-project">Proyecto Cajar</span>
        <label className="gate-label" htmlFor="gate-token">Token de acceso</label>
        <input
          id="gate-token"
          type="password"
          autoFocus
          autoComplete="off"
          value={value}
          onChange={(e) => { setValue(e.target.value); setError(false); }}
        />
        {error && <span className="gate-error">Token incorrecto.</span>}
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}
