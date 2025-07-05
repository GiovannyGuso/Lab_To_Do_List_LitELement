import { LitElement, html, css } from 'lit-element';
import { sharedStyles } from './shared-styles.js';

class Header extends LitElement {
  static get properties() {
    return {
      theme: { type: String },
      _mobileMenuOpen: { type: Boolean, state: true }
    };
  }

  static get styles() {
    return [sharedStyles, css`
      .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        white-space: nowrap;
        border-bottom: 1px solid var(--border-color);
        padding: 12px 30px;
        background-color: var(--bg-primary);
      }

      .header-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
      }

      .logo-section {
        display: flex;
        align-items: center;
        gap: 16px;
      }

      svg{
        color: #fff
      } 

      .logo-text {
        font-size: 18px;
        font-weight: bold;
        line-height: 1.2;
        color: #fff;
      }

      .navigation {
        display: flex;
        flex: 1;
        justify-content: end;
        gap: 16px;
      }

      .nav-links {
        display: flex;
        gap: 36px;
      }

      .nav-link {
        color: var(--text-primary);
        font-size: 14px;
        font-weight: 500;
        text-decoration: none;
        padding: 8px 0;
      }

      .nav-link:hover {
        color: var(--accent-color);
      }

      .user-actions {
        display: flex;
        align-items: center;
        gap: 16px;
      }

      .icon-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 8px;
        height: 40px;
        background-color: var(--bg-tertiary);
        color: #fff;
        border: none;
        cursor: pointer;
        transition: all 0.3s ease;
      }

      .icon-btn:hover {
        background-color: var(--accent-color);
      }

      .theme-toggle { width: 40px; border-radius: 50%; }
      .notification-btn { gap: 8px; padding: 0 10px; font-size: 14px; }

      .user-avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: url("https://lh3.googleusercontent.com/aida-public/AB6AXuAUzbhRDPH52Ss-Ql1Kstpq8__VDTbphGYY-9UgUHdZixDcApAa_zH_jyNFx7KCFj1Mv0ih-eBAFEYS3IaraBO68eNTolMNgXldxmtwWAEixg7Uh8kPOAQd1pcZmBoZc6Yysk5ETk53EOEDeIwZHq8l2aOzNo_-Gt-WyVP-aQsyNtZhvNLtnP3Kl6aQ3L_0MWEjO-68MeSlaXLXjXVHNzafLx2pC3EX_lVQHhKPO4LE7vh81PRwNfTlCMB6_4YytLwlW9EjimB-7EU") center/cover;
      }

      @media (max-width: 768px) {
        .header {
          flex-direction: column;
          padding: 12px 16px;
        }

        .navigation {
          display: none;
          flex-direction: column;
          width: 100%;
          margin-top: 16px;
        }
        .navigation.mobile-open { display: flex; }
        .nav-links, .user-actions {
          flex-direction: column;
          gap: 16px;
        }
      }
    `];
  }

  constructor() {
    super();
    this._mobileMenuOpen = false;
  }

  render() {
    return html`
      <header class="header">
        <div class="header-content">
          <div class="logo-section">
            <svg width="16" height="16" viewBox="0 0 48 48" fill="currentColor">
              <path d="M42.1739 20.1739L27.8261 5.82609C29.1366 7.13663 28.3989 10.1876 26.2002 13.7654C24.8538 15.9564 22.9595 18.3449 20.6522 20.6522C18.3449 22.9595 15.9564 24.8538 13.7654 26.2002C10.1876 28.3989 7.13663 29.1366 5.82609 27.8261L20.1739 42.1739C21.4845 43.4845 24.5355 42.7467 28.1133 40.548C30.3042 39.2016 32.6927 37.3073 35 35C37.3073 32.6927 39.2016 30.3042 40.548 28.1133C42.7467 24.5355 43.4845 21.4845 42.1739 20.1739Z"/>
            </svg>
            <h2 class="logo-text">ESPE Tasks</h2>
          </div>
          
          <div class="navigation ${this._mobileMenuOpen ? 'mobile-open' : ''}">
            <div class="nav-links">
              <a class="nav-link" href="#" @click=${() => this._mobileMenuOpen = false}>Inicio</a>
              <a class="nav-link" href="#" @click=${() => this._mobileMenuOpen = false}>Tareas</a>
              <a class="nav-link" href="#" @click=${() => this._mobileMenuOpen = false}>Calendario</a>
              <a class="nav-link" href="#" @click=${() => this._mobileMenuOpen = false}>Notas</a>
            </div>
            
            <div class="user-actions">
              <button class="notification-btn icon-btn">
                <svg width="20" height="20" viewBox="0 0 256 256">
                  <path d="M221.8,175.94C216.25,166.38,208,139.33,208,104a80,80,0,1,0-160,0c0,35.34-8.26,62.38-13.81,71.94A16,16,0,0,0,48,200H88.81a40,40,0,0,0,78.38,0H208a16,16,0,0,0,13.8-24.06ZM128,216a24,24,0,0,1-22.62-16h45.24A24,24,0,0,1,128,216ZM48,184c7.7-13.24,16-43.92,16-80a64,64,0,1,1,128,0c0,36.05,8.28,66.73,16,80Z"/>
                </svg>
              </button>
              <div class="user-avatar"></div>
            </div>
          </div>
        </div>
      </header>
    `;
  }

  _toggleTheme() {
    this.dispatchEvent(new CustomEvent('theme-toggle', { bubbles: true }));
  }
}

customElements.define('espe-header', Header);