import type { Money } from './quote-data';
const SYMBOLS: Record<string,string> = {'$':'USD','€':'EUR','£':'GBP','CA$':'CAD','A$':'AUD'};
export function parseMoney(input: string, fallbackCurrency='USD'): Money | undefined { const raw=input.replace(/\s+/g,' ').trim(); if(!raw) return; const code=(raw.match(/\b[A-Z]{3}\b/)||[])[0] || Object.entries(SYMBOLS).find(([s])=>raw.includes(s))?.[1] || fallbackCurrency; let numeric=raw.replace(/[^0-9,.-]/g,''); if(!numeric) return; if(/,\d{2}$/.test(numeric)&&!numeric.includes('.')) numeric=numeric.replace(/\./g,'').replace(',','.'); else numeric=numeric.replace(/,/g,''); const n=Number(numeric); if(!Number.isFinite(n)) return; return { amountMinor: Math.round(n*100), currencyCode: code, display: raw }; }
export const money = (minor:number,currencyCode='USD'): Money => ({amountMinor:minor,currencyCode});
export const add = (items:(Money|undefined)[], currency='USD'): Money => ({amountMinor:items.reduce((s,m)=>s+(m?.amountMinor||0),0),currencyCode:items.find(Boolean)?.currencyCode||currency});
export const formatMoney = (m?:Money) => m ? new Intl.NumberFormat('en-US',{style:'currency',currency:m.currencyCode}).format(m.amountMinor/100) : '';
