import { LitElement, html, css } from 'lit-element';
import { sharedStyles } from './shared-styles.js';

class TaskForm extends LitElement {
  static get properties() {
    return {
      open: { type: Boolean, reflect: true },
      task: { type: Object },
      theme: { type: String }
    };
  }

  static get styles() {
    return [sharedStyles, css`
      .form-container {
        background: var(--bg-secondary);
        border-radius: 8px;
        border: 1px solid var(--border-color);
        width: 100%;
        max-width: 420px;
        box-shadow: 0 4px 20px 0 rgba(0,0,0,0.25);
        padding: 2rem 1.5rem;
        position: relative;
      }

      .form-title {
        color: var(--text-primary);
        font-size: 1.5rem;
        font-weight: bold;
        margin-bottom: 1rem;
        text-align: center;
      }

      label {
        display: block;
        color: var(--text-secondary);
        margin-bottom: 0.25rem;
        font-size: 1rem;
        font-weight: 500;
      }

      input, textarea, select {
        width: 95%;
        border: none;
        border-radius: 8px;
        padding: 0.75rem;
        margin-bottom: 1rem;
        background: var(--bg-tertiary);
        color: var(--text-primary);
      }

      textarea { min-height: 80px; }

      .actions {
        display: flex;
        justify-content: flex-end;
        gap: 1rem;
      }

      .save-btn {
        background: var(--accent-color);
        color: white;
        border: none;
        border-radius: 8px;
        padding: 0.75rem 1.5rem;
        font-weight: bold;
        cursor: pointer;
      }

      .save-btn:hover { background: var(--primary-hover); }
    `];
  }

  constructor() {
    super();
    this.open = false;
    this.task = null;
  }

  render() {
    if (!this.open) return html``;
    const t = this.task || {};
    return html`
      <div class="modal" @click=${e => e.target.classList.contains('modal') && this._close()}>
        <form class="form-container" @submit=${this._handleSubmit}>
          <button type="button" class="close-btn" @click=${this._close}>&times;</button>
          <div class="form-title">${t.id ? 'Editar tarea' : 'Nueva tarea'}</div>
          
          <label for="name">Nombre</label>
          <input id="name" type="text" .value=${t.name || ''} placeholder="Nombre de la tarea" required />
          
          <label for="notes">Notas</label>
          <textarea id="notes" placeholder="Notas">${t.notes || ''}</textarea>
          
          <label for="time">Hora</label>
          <input id="time" type="time" .value=${t.time || '10:00'} required />
          
          <label for="priority">Prioridad</label>
          <select id="priority">
            <option value="alta" ?selected=${t.priority === 'alta'}>Alta</option>
            <option value="media" ?selected=${!t.priority || t.priority === 'media'}>Media</option>
            <option value="baja" ?selected=${t.priority === 'baja'}>Baja</option>
          </select>
          
          <div class="actions">
            <button type="submit" class="save-btn">${t.id ? 'Guardar' : 'Agregar'}</button>
          </div>
        </form>
      </div>
    `;
  }

  _close() {
    this.dispatchEvent(new CustomEvent('close', { bubbles: true, composed: true }));
  }

  _handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value.trim();
    
    if (!name) {
      alert('Por favor, ingresa un nombre para la tarea.');
      return;
    }

    this.dispatchEvent(new CustomEvent('save-task', {
      detail: {
        id: this.task?.id || null,
        name,
        notes: form.notes.value.trim(),
        time: form.time.value,
        priority: form.priority.value,
        date: this.task?.date || 'hoy'
      },
      bubbles: true,
      composed: true
    }));
    this._close();
  }
}

customElements.define('task-form', TaskForm);