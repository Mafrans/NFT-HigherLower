import {html, css, LitElement} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {getRandomEvent} from './opensea';

// Import css
import './global.css'

// Import components
import './components/nft-card';


@customElement('x-app')
export class App extends LitElement {
  static styles = css`h1 { color: blue }`;
  event = null;

  constructor() {
    super();
    getRandomEvent().then(event => {
      this.event = event;
      this.requestUpdate();
    });
  }

  render() {
    return html`
      <x-nft-card .nft=${this.event}></nft-card>
    `;
  }
}
