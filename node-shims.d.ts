declare module 'node:fs' { const fs:any; export default fs; export function readFileSync(...args:any[]): any; }
declare module 'node:test' { const test:any; export default test; }
declare module 'node:assert/strict' { const assert:any; export default assert; }
declare module 'node:http' { const http:any; export default http; }
declare module 'node:dns/promises' { export function lookup(host:string,opts:any): Promise<{address:string}[]>; }
declare var Buffer: any;
