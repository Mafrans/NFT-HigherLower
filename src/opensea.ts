const baseURL = new URL('events', 'https://api.opensea.io/api/v1/');

export async function getRandomEvent(): Promise<any> {
    const url = baseURL;
    url.searchParams.append('offset', String(Math.floor(Math.random() * 10000)));
    url.searchParams.append('limit', '1');
    url.searchParams.append('event_type', 'successful');
    url.searchParams.append('only_opensea', 'true');
    url.searchParams.append('occurred_after', String(new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).getTime() / 1000));

    console.log(`Fetching from ${url.href}`);

    const res = await fetch(url.href, {
        headers: {
            'Accept': 'application/json'
        }
    });

    const { asset_events } = await res.json();

    const firstValid = asset_events.find((it: any) => 
        it.total_price !== null 
        && it.total_price !== '0' 
        && it.asset.image_preview_url !== null
    );

    if (firstValid === null) {
        return await getRandomEvent();
    }
    return firstValid;
}

export function getPrice(price: number, token: { decimals: number }) {
    return price / Math.pow(10, token.decimals);
}

export function getPriceUSD(price: number, token: { decimals: number, usd_price: string}) {
    return price / Math.pow(10, token.decimals) * parseFloat(token.usd_price);
}

export function getPriceETH(price: number, token: { decimals: number, eth_price: string}) {
    return price / Math.pow(10, token.decimals) * parseFloat(token.eth_price);
}
