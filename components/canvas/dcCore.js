// dcCore.js — tokens, contexto y helpers compartidos por los módulos del canvas.
import { createContext, Children, Fragment } from "react";

export const DC = {
  bg: "#f0eee9",
  grid: "rgba(0,0,0,0.06)",
  label: "rgba(60,50,40,0.7)",
  title: "rgba(40,30,20,0.85)",
  subtitle: "rgba(60,50,40,0.6)",
  postitBg: "#fef4a8",
  postitText: "#5a4a2a",
  font: '-apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif',
};

export const DCCtx = createContext(null);

// Recursively unwrap React.Fragment so <>…</> grouping doesn't hide
// DCSection/DCArtboard children from the type-based walks.
export function dcFlatten(children) {
  const out = [];
  Children.forEach(children, (c) => {
    if (c && c.type === Fragment) out.push(...dcFlatten(c.props.children));
    else out.push(c);
  });
  return out;
}
