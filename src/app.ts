import {html, css, LitElement} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('x-app')
export class App extends LitElement {
  static styles = css`h1 { color: blue }`;

  render() {
    return html`<h1>Hello World</h1>`;
  }
}
