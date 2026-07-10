import test from 'node:test'; import assert from 'node:assert/strict'; import { normalizeUrl,isPrivateIp,redactUrl,validateRedirect } from '../lib/security/url.js'; import { stores } from '../lib/stores.js';
test('requires https',()=>assert.throws(()=>normalizeUrl('http://industrial.example.com/x'),/HTTPS/));
test('rejects private ips',()=>{ assert.equal(isPrivateIp('127.0.0.1'),true); assert.equal(isPrivateIp('10.0.0.1'),true); assert.equal(isPrivateIp('169.254.169.254'),true); });
test('redacts tokens',()=>assert.equal(redactUrl('https://x.com/a/verysecrettoken123?token=abc').includes('abc'),false));
test('validates redirect hosts',()=>assert.throws(()=>validateRedirect(new URL('https://industrial.example.com/a'),'https://evil.example/a',stores[0]),/not approved/));
