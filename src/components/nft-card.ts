import {html, css, LitElement} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {getPrice, getPriceUSD} from '../opensea';

@customElement('x-nft-card')
export class NFTCard extends LitElement {
  static styles = css`
    .thumbnail * {
      display: none;
    }
  `;

  @property()
  nft = null

  render() {
    if (this.nft) {
      const { asset, payment_token, total_price }: any = this.nft;

      console.log(this.nft)
      return html`
        <div>
          <div class="thumbnail">
            <img src=${asset.image_preview_url} onload="this.style.display=''">
            <video controls onloadedmetadata="this.style.display=''">
              <source src=${asset.image_preview_url} type='video/webm'>
              <source src=${asset.image_preview_url} type='video/mp4'>
            </video>
          </div>
          <p class="name">${asset.name ?? 'Unnamed'}</p>
          <p class="price-usd">
            <span class="symbol">$</span>  
            ${getPriceUSD(parseFloat(total_price), payment_token)}
          </p>
          <p class="price-eth">
            ${getPrice(parseFloat(total_price), payment_token)}
            <span class="symbol">${payment_token.symbol}</span>
          </p>
        </div>
      `;
    }
    return null;
  }
}