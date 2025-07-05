import { LitElement, html, css } from 'lit-element';
import { sharedStyles } from './shared-styles.js';

class TaskDetail extends LitElement {
  static get properties() {
    return {
      open: { type: Boolean, reflect: true },
      task: { type: Object },
      theme: { type: String }
    };
  }

  static get styles() {
    return [sharedStyles, css`
      .detail-container {
        background: var(--bg-secondary);
        border-radius: 8px;
        border: 1px solid var(--border-color);
        width: 100%;
        max-width: 500px;
        box-shadow: 0 4px 20px 0 rgba(0,0,0,0.25);
        padding: 2rem;
        position: relative;
      }

      .close-btn {
        position: absolute;
        top: 1rem; right: 1rem;
        color: var(--text-secondary);
        background: none;
        border: none;
        font-size: 1.8rem;
        cursor: pointer;
      }

      .close-btn:hover { color: var(--accent-color); }

      .detail-title {
        color: var(--text-primary);
        font-size: 1.5rem;
        font-weight: bold;
        margin-bottom: 1.5rem;
      }

      .detail-row {
        margin-bottom: 1rem;
      }

      .detail-label {
        color: var(--text-secondary);
        font-size: 0.875rem;
        margin-bottom: 0.25rem;
        display: block;
      }

      .detail-value {
        color: var(--text-primary);
        font-size: 1rem;
      }

      .priority-badge {
        display: inline-block;
        padding: 0.25rem 0.75rem;
        border-radius: 12px;
        font-size: 0.75rem;
        font-weight: bold;
      }

      .priority-alta { background-color: #ef4444; }
      .priority-media { background-color: #f59e0b; }
      .priority-baja { background-color: #10b981; }

      .actions {
        display: flex;
        justify-content: space-between;
        margin-top: 2rem;
      }

      .complete-btn, .edit-btn {
        padding: 0.75rem 1.5rem;
        border-radius: 8px;
        font-weight: bold;
        cursor: pointer;
        border: none;
      }

      .complete-btn {
        background: var(--accent-color);
        color: white;
      }

      .complete-btn:hover {
        background: var(--primary-hover);
      }

      .edit-btn {
        background: none;
        color: var(--text-secondary);
        border: 1px solid var(--border-color);
      }

      .edit-btn:hover {
        color: var(--text-primary);
        border-color: var(--text-secondary);
      }
    `];
  }

  constructor() {
    super();
    this.open = false;
    this.task = null;
  }

  render() {
    if (!this.open || !this.task) return html``;
    
    return html`
      <div class="modal" @click=${e => e.target.classList.contains('modal') && this._close()}>
        <div class="detail-container">
          <button type="button" class="close-btn" @click=${this._close}>&times;</button>
          <h2 class="detail-title">${this.task.name}</h2>
          
          <div class="detail-row">
            <span class="detail-label">Hora</span>
            <span class="detail-value">${this.task.time}</span>
          </div>
          
          <div class="detail-row">
            <span class="detail-label">Fecha</span>
            <span class="detail-value">${this.task.date}</span>
          </div>
          
          <div class="detail-row">
            <span class="detail-label">Prioridad</span>
            <span class="detail-value">
              <span class="priority-badge priority-${this.task.priority}">
                ${this.task.priority.toUpperCase()}
              </span>
            </span>
          </div>
          
          <div class="detail-row">
            <span class="detail-label">Notas</span>
            <div class="detail-value">${this.task.notes || 'Sin notas'}</div>
          </div>
          
          <div class="actions">
            <button class="edit-btn" @click=${this._editTask}>Editar</button>
            <button class="complete-btn" @click=${this._completeTask}>Marcar como completada</button>
          </div>
        </div>
      </div>
    `;
  }

  _close() {
    this.dispatchEvent(new CustomEvent('close', { bubbles: true, composed: true }));
  }

  _completeTask() {
    this.dispatchEvent(new CustomEvent('task-completed', {
      detail: { task: this.task },
      bubbles: true,
      composed: true
    }));
    this._close();
  }

  _editTask() {
    this.dispatchEvent(new CustomEvent('edit-task', {
      detail: { task: this.task },
      bubbles: true,
      composed: true
    }));
    this._close();
  }
}

customElements.define('task-detail', TaskDetail);