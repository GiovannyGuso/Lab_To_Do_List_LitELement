import { LitElement, html, css } from 'lit-element';
import './task-items.js';
import { sharedStyles } from './shared-styles.js';

class TaskList extends LitElement {
  static get properties() {
    return {
      tasks: { type: Array },
      theme: { type: String },
      view: { type: String },
      _groupedTasks: { type: Object, state: true }
    };
  }

  static get styles() {
    return [sharedStyles, css`
      :host {
        display: block;
        width: 100%;
      }

      .date-section {
        margin-bottom: 1.5rem;
        animation: slideIn 0.3s ease-out;
      }

      .date-heading {
        color: var(--text-primary);
        font-size: 1.125rem;
        font-weight: 700;
        margin: 0 0 0.5rem 0.75rem;
        padding: 1rem 0 0.5rem;
        border-bottom: 1px solid var(--border-color);
      }

      .tasks-group {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      }

      .empty-state {
        text-align: center;
        color: var(--text-secondary);
        padding: 2rem;
        font-size: 1.125rem;
      }

      .empty-icon {
        width: 64px;
        height: 64px;
        margin: 0 auto 1rem;
        opacity: 0.5;
      }

      .add-task-button {
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        background: var(--accent-color);
        color: white;
        border: none;
        border-radius: 50%;
        width: 56px;
        height: 56px;
        cursor: pointer;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
        transition: all 0.2s;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 100;
      }

      .add-task-button:hover {
        background: var(--primary-hover);
        transform: scale(1.05);
      }

      @media (max-width: 768px) {
        .add-task-button {
          bottom: 1rem;
          right: 1rem;
          width: 48px;
          height: 48px;
        }
      }
    `];
  }

  constructor() {
    super();
    this.tasks = [];
    this._groupedTasks = {};
  }

  updated(changedProperties) {
    if (changedProperties.has('tasks') || changedProperties.has('view')) {
      this._groupTasks();
    }
  }

  _groupTasks() {
    this._groupedTasks = this.tasks.reduce((acc, task) => {
      const key = this.view === 'prioridad' ? (task.priority || 'media') : (task.date || 'hoy');
      (acc[key] = acc[key] || []).push(task);
      return acc;
    }, {});
  }

  _dispatchEvent(name, detail = {}) {
    this.dispatchEvent(new CustomEvent(name, { detail, bubbles: true, composed: true }));
  }

  render() {
    const dates = Object.keys(this._groupedTasks);
    
    return html`
      <div class="task-list-container">
        ${dates.length ? dates.map(date => html`
          <div class="date-section">
            <h3 class="date-heading">${this._capitalizeFirstLetter(date)}</h3>
            <div class="tasks-group">
              ${this._groupedTasks[date].map(task => html`
                <task-item 
                  .task=${task}
                  .theme=${this.theme}
                  @task-selected=${e => this._dispatchEvent('task-selected', e.detail)}
                  @task-edit=${e => this._dispatchEvent('task-edit', e.detail)}
                  @task-deleted=${e => this._dispatchEvent('task-deleted', e.detail)}>
                </task-item>
              `)}
            </div>
          </div>
        `) : this._renderEmptyState()}
        
        <button class="add-task-button" @click=${() => this._dispatchEvent('add-task-requested')} 
                title="Agregar nueva tarea">
          <svg width="24" height="24" viewBox="0 0 256 256">
            <path d="M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z"/>
          </svg>
        </button>
      </div>
    `;
  }

  _capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  _renderEmptyState() {
    return html`
      <div class="empty-state">
        <svg class="empty-icon" viewBox="0 0 256 256" fill="currentColor">
          <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Z"/>
        </svg>
        <p>No hay tareas para mostrar</p>
        <p>¡Agrega tu primera tarea!</p>
      </div>
    `;
  }
}

customElements.define('task-list', TaskList);