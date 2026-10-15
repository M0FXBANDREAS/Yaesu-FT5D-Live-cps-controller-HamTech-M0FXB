const assert=require('node:assert/strict'),fs=require('node:fs');
const {parse}=require('../radio-file.js');
assert.throws(()=>parse(new Uint8Array(0).buffer),/recognised/);
assert.throws(()=>parse(new Uint8Array(2000001).buffer),/large/);
// Synthetic .NET byte-array envelope; contains no user data.
const a=new Uint8Array(130752+240),d=new DataView(a.buffer);a.set(Buffer.from('ADMS14, Version=1.0.1.0'),20);a[200]=15;d.setUint32(201,3,true);d.setUint32(205,130752,true);a[209]=2;const start=210;a.set(Buffer.from('AH82M'),start);a.fill(255,start+0x1540,start+0x1540+4800);a[start+0x2800+41]=3;const off=start+0x2d40+41*32;a[off+2]=0x14;a[off+3]=0x55;a[off+4]=0;a.set(Buffer.from('TEST'),off+8);a[off+12]=255;
const before=Buffer.from(a),r=parse(a.buffer);assert.equal(r.channels.length,1);assert.equal(r.channels[0].id,42);assert.equal(r.channels[0].frequency,145.5);assert.equal(r.channels[0].name,'TEST');assert.deepEqual(Buffer.from(r.source),before);assert.deepEqual(Buffer.from(a),before);assert.equal(r.checksum.matches,false);
a[off+2]=0xfa;assert.throws(()=>parse(a.buffer),/BCD/);a[off+2]=0x14;a[start]=0;assert.throws(()=>parse(a.buffer),/layout/);
if(process.argv[2]){const file=fs.readFileSync(process.argv[2]);const original=Buffer.from(file),r=parse(file);assert.equal(r.format,'ADMS-14 .ft5d');assert.equal(r.model,'AH82M');assert.equal(r.sourceLength,131327);assert.equal(r.imageLength,130752);assert.equal(r.channels.length,86);assert.equal(r.checksum.matches,false);assert.deepEqual(Buffer.from(r.source),original);assert.deepEqual(file,original);assert(r.channels.every(m=>m.id>=1&&m.id<=900&&Number.isFinite(m.frequency)));console.log('Uploaded file: 86 channels decoded; original preserved byte-for-byte; unresolved checksum correctly reported.');}
console.log('Reader tests passed: non-executing array parsing, sparse channel IDs, decoded frequencies, source preservation, malformed data and checksum reporting.');
