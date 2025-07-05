import { css } from 'lit-element';  // Añade esta línea

export const sharedStyles = css`
  :host {
    --text-primary: white;
    --text-secondary: #8ecdb7;
    --border-color: #2f6a55;
    --accent-color: #019863;
    --bg-primary: #10231c;
    --bg-secondary: #17352b;
    --bg-tertiary: #214a3c;
    --primary-hover: #017f56;
  }

  :host([theme="light"]) {
    --text-primary: #1f2937;
    --text-secondary: #6b7280;
    --border-color: #d1d5db;
    --accent-color: #059669;
    --bg-primary: #f0f9ff;
    --bg-secondary: #ffffff;
    --bg-tertiary: #e0f2fe;
    --primary-hover: #047857;
  }

  .modal {
    display: flex;
    position: fixed;
    z-index: 1000;
    left: 0; top: 0;
    width: 100vw; height: 100vh;
    background: rgba(16,35,28,0.9);
    align-items: center;
    justify-content: center;
    animation: fadeIn 0.2s;
  }

  .modal[hidden] { display: none; }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes slideIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

export function dispatchEvent(element, name, detail = {}) {
  element.dispatchEvent(new CustomEvent(name, {
    detail,
    bubbles: true,
    composed: true
  }));
}