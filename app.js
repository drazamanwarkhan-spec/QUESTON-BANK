/* Question Bank app — single bundle. Includes JSZip 3.10.2 (MIT, (c) Stuart Knightley et al.). PDF reading uses pdf.js (Apache-2.0, Mozilla), loaded on demand. */
/* Trusted Types: the only script URLs this app may load at runtime are its own PDF reader files. */
(function () {
  'use strict';
  if (window.trustedTypes && trustedTypes.createPolicy) {
    try {
      trustedTypes.createPolicy('default', {
        createScriptURL: function (u) {
          var url = new URL(u, location.href);
          if (url.origin === location.origin && /\/(?:vendor\/)?pdf(?:\.worker)?\.min\.js$/.test(url.pathname)) return u;
          throw new TypeError('Blocked script URL');
        }
      });
    } catch (e) { /* policy already exists */ }
  }
})();

;
/*!

JSZip v3.10.2 - A JavaScript class for generating and reading zip files
<http://stuartk.com/jszip>

(c) 2009-2016 Stuart Knightley <stuart [at] stuartk.com>
Dual licenced under the MIT license or GPLv3. See https://raw.github.com/Stuk/jszip/main/LICENSE.markdown.

JSZip uses the library pako released under the MIT license :
https://github.com/nodeca/pako/blob/main/LICENSE
*/

!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{("undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this).JSZip=e()}}(function(){return function s(a,o,h){function u(r,e){if(!o[r]){if(!a[r]){var t="function"==typeof require&&require;if(!e&&t)return t(r,!0);if(l)return l(r,!0);var n=new Error("Cannot find module '"+r+"'");throw n.code="MODULE_NOT_FOUND",n}var i=o[r]={exports:{}};a[r][0].call(i.exports,function(e){var t=a[r][1][e];return u(t||e)},i,i.exports,s,a,o,h)}return o[r].exports}for(var l="function"==typeof require&&require,e=0;e<h.length;e++)u(h[e]);return u}({1:[function(e,t,r){"use strict";var d=e("./utils"),c=e("./support"),p="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";r.encode=function(e){for(var t,r,n,i,s,a,o,h=[],u=0,l=e.length,f=l,c="string"!==d.getTypeOf(e);u<e.length;)f=l-u,n=c?(t=e[u++],r=u<l?e[u++]:0,u<l?e[u++]:0):(t=e.charCodeAt(u++),r=u<l?e.charCodeAt(u++):0,u<l?e.charCodeAt(u++):0),i=t>>2,s=(3&t)<<4|r>>4,a=1<f?(15&r)<<2|n>>6:64,o=2<f?63&n:64,h.push(p.charAt(i)+p.charAt(s)+p.charAt(a)+p.charAt(o));return h.join("")},r.decode=function(e){var t,r,n,i,s,a,o=0,h=0,u="data:";if(e.substr(0,u.length)===u)throw new Error("Invalid base64 input, it looks like a data url.");var l,f=3*(e=e.replace(/[^A-Za-z0-9+/=]/g,"")).length/4;if(e.charAt(e.length-1)===p.charAt(64)&&f--,e.charAt(e.length-2)===p.charAt(64)&&f--,f%1!=0)throw new Error("Invalid base64 input, bad content length.");for(l=c.uint8array?new Uint8Array(0|f):new Array(0|f);o<e.length;)t=p.indexOf(e.charAt(o++))<<2|(i=p.indexOf(e.charAt(o++)))>>4,r=(15&i)<<4|(s=p.indexOf(e.charAt(o++)))>>2,n=(3&s)<<6|(a=p.indexOf(e.charAt(o++))),l[h++]=t,64!==s&&(l[h++]=r),64!==a&&(l[h++]=n);return l}},{"./support":30,"./utils":32}],2:[function(e,t,r){"use strict";var n=e("./external"),i=e("./stream/DataWorker"),s=e("./stream/Crc32Probe"),a=e("./stream/DataLengthProbe");function o(e,t,r,n,i){this.compressedSize=e,this.uncompressedSize=t,this.crc32=r,this.compression=n,this.compressedContent=i}o.prototype={getContentWorker:function(){var e=new i(n.Promise.resolve(this.compressedContent)).pipe(this.compression.uncompressWorker()).pipe(new a("data_length")),t=this;return e.on("end",function(){if(this.streamInfo.data_length!==t.uncompressedSize)throw new Error("Bug : uncompressed data size mismatch")}),e},getCompressedWorker:function(){return new i(n.Promise.resolve(this.compressedContent)).withStreamInfo("compressedSize",this.compressedSize).withStreamInfo("uncompressedSize",this.uncompressedSize).withStreamInfo("crc32",this.crc32).withStreamInfo("compression",this.compression)}},o.createWorkerFrom=function(e,t,r){return e.pipe(new s).pipe(new a("uncompressedSize")).pipe(t.compressWorker(r)).pipe(new a("compressedSize")).withStreamInfo("compression",t)},t.exports=o},{"./external":6,"./stream/Crc32Probe":25,"./stream/DataLengthProbe":26,"./stream/DataWorker":27}],3:[function(e,t,r){"use strict";var n=e("./stream/GenericWorker");r.STORE={magic:"\0\0",compressWorker:function(){return new n("STORE compression")},uncompressWorker:function(){return new n("STORE decompression")}},r.DEFLATE=e("./flate")},{"./flate":7,"./stream/GenericWorker":28}],4:[function(e,t,r){"use strict";var n=e("./utils");var o=function(){for(var e,t=[],r=0;r<256;r++){e=r;for(var n=0;n<8;n++)e=1&e?3988292384^e>>>1:e>>>1;t[r]=e}return t}();t.exports=function(e,t){return void 0!==e&&e.length?"string"!==n.getTypeOf(e)?function(e,t,r,n){var i=o,s=n+r;e^=-1;for(var a=n;a<s;a++)e=e>>>8^i[255&(e^t[a])];return-1^e}(0|t,e,e.length,0):function(e,t,r,n){var i=o,s=n+r;e^=-1;for(var a=n;a<s;a++)e=e>>>8^i[255&(e^t.charCodeAt(a))];return-1^e}(0|t,e,e.length,0):0}},{"./utils":32}],5:[function(e,t,r){"use strict";r.base64=!1,r.binary=!1,r.dir=!1,r.createFolders=!0,r.date=null,r.compression=null,r.compressionOptions=null,r.comment=null,r.unixPermissions=null,r.dosPermissions=null},{}],6:[function(e,t,r){"use strict";var n=null;n="undefined"!=typeof Promise?Promise:e("lie"),t.exports={Promise:n}},{lie:37}],7:[function(e,t,r){"use strict";var n="undefined"!=typeof Uint8Array&&"undefined"!=typeof Uint16Array&&"undefined"!=typeof Uint32Array,i=e("pako"),s=e("./utils"),a=e("./stream/GenericWorker"),o=n?"uint8array":"array";function h(e,t){a.call(this,"FlateWorker/"+e),this._pako=null,this._pakoAction=e,this._pakoOptions=t,this.meta={}}r.magic="\b\0",s.inherits(h,a),h.prototype.processChunk=function(e){this.meta=e.meta,null===this._pako&&this._createPako(),this._pako.push(s.transformTo(o,e.data),!1)},h.prototype.flush=function(){a.prototype.flush.call(this),null===this._pako&&this._createPako(),this._pako.push([],!0)},h.prototype.cleanUp=function(){a.prototype.cleanUp.call(this),this._pako=null},h.prototype._createPako=function(){this._pako=new i[this._pakoAction]({raw:!0,level:this._pakoOptions.level||-1});var t=this;this._pako.onData=function(e){t.push({data:e,meta:t.meta})}},r.compressWorker=function(e){return new h("Deflate",e)},r.uncompressWorker=function(){return new h("Inflate",{})}},{"./stream/GenericWorker":28,"./utils":32,pako:38}],8:[function(e,t,r){"use strict";function A(e,t){var r,n="";for(r=0;r<t;r++)n+=String.fromCharCode(255&e),e>>>=8;return n}function n(e,t,r,n,i,s){var a,o,h=e.file,u=e.compression,l=s!==O.utf8encode,f=I.transformTo("string",s(h.name)),c=I.transformTo("string",O.utf8encode(h.name)),d=h.comment,p=I.transformTo("string",s(d)),m=I.transformTo("string",O.utf8encode(d)),_=c.length!==h.name.length,g=m.length!==d.length,b="",v="",y="",w=h.dir,k=h.date,x={crc32:0,compressedSize:0,uncompressedSize:0};t&&!r||(x.crc32=e.crc32,x.compressedSize=e.compressedSize,x.uncompressedSize=e.uncompressedSize);var S=0;t&&(S|=8),l||!_&&!g||(S|=2048);var z=0,C=0;w&&(z|=16),"UNIX"===i?(C=798,z|=function(e,t){var r=e;return e||(r=t?16893:33204),(65535&r)<<16}(h.unixPermissions,w)):(C=20,z|=function(e){return 63&(e||0)}(h.dosPermissions)),a=k.getUTCHours(),a<<=6,a|=k.getUTCMinutes(),a<<=5,a|=k.getUTCSeconds()/2,o=k.getUTCFullYear()-1980,o<<=4,o|=k.getUTCMonth()+1,o<<=5,o|=k.getUTCDate(),_&&(v=A(1,1)+A(B(f),4)+c,b+="up"+A(v.length,2)+v),g&&(y=A(1,1)+A(B(p),4)+m,b+="uc"+A(y.length,2)+y);var E="";return E+="\n\0",E+=A(S,2),E+=u.magic,E+=A(a,2),E+=A(o,2),E+=A(x.crc32,4),E+=A(x.compressedSize,4),E+=A(x.uncompressedSize,4),E+=A(f.length,2),E+=A(b.length,2),{fileRecord:R.LOCAL_FILE_HEADER+E+f+b,dirRecord:R.CENTRAL_FILE_HEADER+A(C,2)+E+A(p.length,2)+"\0\0\0\0"+A(z,4)+A(n,4)+f+b+p}}var I=e("../utils"),i=e("../stream/GenericWorker"),O=e("../utf8"),B=e("../crc32"),R=e("../signature");function s(e,t,r,n){i.call(this,"ZipFileWorker"),this.bytesWritten=0,this.zipComment=t,this.zipPlatform=r,this.encodeFileName=n,this.streamFiles=e,this.accumulate=!1,this.contentBuffer=[],this.dirRecords=[],this.currentSourceOffset=0,this.entriesCount=0,this.currentFile=null,this._sources=[]}I.inherits(s,i),s.prototype.push=function(e){var t=e.meta.percent||0,r=this.entriesCount,n=this._sources.length;this.accumulate?this.contentBuffer.push(e):(this.bytesWritten+=e.data.length,i.prototype.push.call(this,{data:e.data,meta:{currentFile:this.currentFile,percent:r?(t+100*(r-n-1))/r:100}}))},s.prototype.openedSource=function(e){this.currentSourceOffset=this.bytesWritten,this.currentFile=e.file.name;var t=this.streamFiles&&!e.file.dir;if(t){var r=n(e,t,!1,this.currentSourceOffset,this.zipPlatform,this.encodeFileName);this.push({data:r.fileRecord,meta:{percent:0}})}else this.accumulate=!0},s.prototype.closedSource=function(e){this.accumulate=!1;var t=this.streamFiles&&!e.file.dir,r=n(e,t,!0,this.currentSourceOffset,this.zipPlatform,this.encodeFileName);if(this.dirRecords.push(r.dirRecord),t)this.push({data:function(e){return R.DATA_DESCRIPTOR+A(e.crc32,4)+A(e.compressedSize,4)+A(e.uncompressedSize,4)}(e),meta:{percent:100}});else for(this.push({data:r.fileRecord,meta:{percent:0}});this.contentBuffer.length;)this.push(this.contentBuffer.shift());this.currentFile=null},s.prototype.flush=function(){for(var e=this.bytesWritten,t=0;t<this.dirRecords.length;t++)this.push({data:this.dirRecords[t],meta:{percent:100}});var r=this.bytesWritten-e,n=function(e,t,r,n,i){var s=I.transformTo("string",i(n));return R.CENTRAL_DIRECTORY_END+"\0\0\0\0"+A(e,2)+A(e,2)+A(t,4)+A(r,4)+A(s.length,2)+s}(this.dirRecords.length,r,e,this.zipComment,this.encodeFileName);this.push({data:n,meta:{percent:100}})},s.prototype.prepareNextSource=function(){this.previous=this._sources.shift(),this.openedSource(this.previous.streamInfo),this.isPaused?this.previous.pause():this.previous.resume()},s.prototype.registerPrevious=function(e){this._sources.push(e);var t=this;return e.on("data",function(e){t.processChunk(e)}),e.on("end",function(){t.closedSource(t.previous.streamInfo),t._sources.length?t.prepareNextSource():t.end()}),e.on("error",function(e){t.error(e)}),this},s.prototype.resume=function(){return!!i.prototype.resume.call(this)&&(!this.previous&&this._sources.length?(this.prepareNextSource(),!0):this.previous||this._sources.length||this.generatedError?void 0:(this.end(),!0))},s.prototype.error=function(e){var t=this._sources;if(!i.prototype.error.call(this,e))return!1;for(var r=0;r<t.length;r++)try{t[r].error(e)}catch(e){}return!0},s.prototype.lock=function(){i.prototype.lock.call(this);for(var e=this._sources,t=0;t<e.length;t++)e[t].lock()},t.exports=s},{"../crc32":4,"../signature":23,"../stream/GenericWorker":28,"../utf8":31,"../utils":32}],9:[function(e,t,r){"use strict";var u=e("../compressions"),n=e("./ZipFileWorker");r.generateWorker=function(e,a,t){var o=new n(a.streamFiles,t,a.platform,a.encodeFileName),h=0;try{e.forEach(function(e,t){h++;var r=function(e,t){var r=e||t,n=u[r];if(!n)throw new Error(r+" is not a valid compression method !");return n}(t.options.compression,a.compression),n=t.options.compressionOptions||a.compressionOptions||{},i=t.dir,s=t.date;t._compressWorker(r,n).withStreamInfo("file",{name:e,dir:i,date:s,comment:t.comment||"",unixPermissions:t.unixPermissions,dosPermissions:t.dosPermissions}).pipe(o)}),o.entriesCount=h}catch(e){o.error(e)}return o}},{"../compressions":3,"./ZipFileWorker":8}],10:[function(e,t,r){"use strict";function n(){if(!(this instanceof n))return new n;if(arguments.length)throw new Error("The constructor with parameters has been removed in JSZip 3.0, please check the upgrade guide.");this.files=Object.create(null),this.comment=null,this.root="",this.clone=function(){var e=new n;for(var t in this)"function"!=typeof this[t]&&(e[t]=this[t]);return e}}(n.prototype=e("./object")).loadAsync=e("./load"),n.support=e("./support"),n.defaults=e("./defaults"),n.version="3.10.2",n.loadAsync=function(e,t){return(new n).loadAsync(e,t)},n.external=e("./external"),t.exports=n},{"./defaults":5,"./external":6,"./load":11,"./object":15,"./support":30}],11:[function(e,t,r){"use strict";var u=e("./utils"),i=e("./external"),n=e("./utf8"),s=e("./zipEntries"),a=e("./stream/Crc32Probe"),l=e("./nodejsUtils");function f(n){return new i.Promise(function(e,t){var r=n.decompressed.getContentWorker().pipe(new a);r.on("error",function(e){t(e)}).on("end",function(){r.streamInfo.crc32!==n.decompressed.crc32?t(new Error("Corrupted zip : CRC32 mismatch")):e()}).resume()})}t.exports=function(e,o){var h=this;return o=u.extend(o||{},{base64:!1,checkCRC32:!1,optimizedBinaryString:!1,createFolders:!1,decodeFileName:n.utf8decode}),l.isNode&&l.isStream(e)?i.Promise.reject(new Error("JSZip can't accept a stream when loading a zip file.")):u.prepareContent("the loaded zip file",e,!0,o.optimizedBinaryString,o.base64).then(function(e){var t=new s(o);return t.load(e),t}).then(function(e){var t=[i.Promise.resolve(e)],r=e.files;if(o.checkCRC32)for(var n=0;n<r.length;n++)t.push(f(r[n]));return i.Promise.all(t)}).then(function(e){for(var t=e.shift(),r=t.files,n=0;n<r.length;n++){var i=r[n],s=i.fileNameStr,a=u.resolve(i.fileNameStr);h.file(a,i.decompressed,{binary:!0,optimizedBinaryString:!0,date:i.date,dir:i.dir,comment:i.fileCommentStr.length?i.fileCommentStr:null,unixPermissions:i.unixPermissions,dosPermissions:i.dosPermissions,createFolders:o.createFolders}),i.dir||(h.file(a).unsafeOriginalName=s)}return t.zipComment.length&&(h.comment=t.zipComment),h})}},{"./external":6,"./nodejsUtils":14,"./stream/Crc32Probe":25,"./utf8":31,"./utils":32,"./zipEntries":33}],12:[function(e,t,r){"use strict";var n=e("../utils"),i=e("../stream/GenericWorker");function s(e,t){i.call(this,"Nodejs stream input adapter for "+e),this._upstreamEnded=!1,this._bindStream(t)}n.inherits(s,i),s.prototype._bindStream=function(e){var t=this;(this._stream=e).pause(),e.on("data",function(e){t.push({data:e,meta:{percent:0}})}).on("error",function(e){t.isPaused?this.generatedError=e:t.error(e)}).on("end",function(){t.isPaused?t._upstreamEnded=!0:t.end()})},s.prototype.pause=function(){return!!i.prototype.pause.call(this)&&(this._stream.pause(),!0)},s.prototype.resume=function(){return!!i.prototype.resume.call(this)&&(this._upstreamEnded?this.end():this._stream.resume(),!0)},t.exports=s},{"../stream/GenericWorker":28,"../utils":32}],13:[function(e,t,r){"use strict";var i=e("readable-stream").Readable;function n(e,t,r){i.call(this,t),this._helper=e;var n=this;e.on("data",function(e,t){n.push(e)||n._helper.pause(),r&&r(t)}).on("error",function(e){n.emit("error",e)}).on("end",function(){n.push(null)})}e("../utils").inherits(n,i),n.prototype._read=function(){this._helper.resume()},t.exports=n},{"../utils":32,"readable-stream":16}],14:[function(e,t,r){"use strict";t.exports={isNode:"undefined"!=typeof Buffer,newBufferFrom:function(e,t){if(Buffer.from&&Buffer.from!==Uint8Array.from)return Buffer.from(e,t);if("number"==typeof e)throw new Error('The "data" argument must not be a number');return new Buffer(e,t)},allocBuffer:function(e){if(Buffer.alloc)return Buffer.alloc(e);var t=new Buffer(e);return t.fill(0),t},isBuffer:function(e){return Buffer.isBuffer(e)},isStream:function(e){return e&&"function"==typeof e.on&&"function"==typeof e.pause&&"function"==typeof e.resume}}},{}],15:[function(e,t,r){"use strict";function s(e,t,r){var n,i=u.getTypeOf(t),s=u.extend(r||{},f);s.date=s.date||new Date,null!==s.compression&&(s.compression=s.compression.toUpperCase()),"string"==typeof s.unixPermissions&&(s.unixPermissions=parseInt(s.unixPermissions,8)),s.unixPermissions&&16384&s.unixPermissions&&(s.dir=!0),s.dosPermissions&&16&s.dosPermissions&&(s.dir=!0),s.dir&&(e=g(e)),s.createFolders&&(n=_(e))&&b.call(this,n,!0);var a="string"===i&&!1===s.binary&&!1===s.base64;r&&void 0!==r.binary||(s.binary=!a),(t instanceof c&&0===t.uncompressedSize||s.dir||!t||0===t.length)&&(s.base64=!1,s.binary=!0,t="",s.compression="STORE",i="string");var o=null;o=t instanceof c||t instanceof l?t:p.isNode&&p.isStream(t)?new m(e,t):u.prepareContent(e,t,s.binary,s.optimizedBinaryString,s.base64);var h=new d(e,o,s);this.files[e]=h}var i=e("./utf8"),u=e("./utils"),l=e("./stream/GenericWorker"),a=e("./stream/StreamHelper"),f=e("./defaults"),c=e("./compressedObject"),d=e("./zipObject"),o=e("./generate"),p=e("./nodejsUtils"),m=e("./nodejs/NodejsStreamInputAdapter"),_=function(e){"/"===e.slice(-1)&&(e=e.substring(0,e.length-1));var t=e.lastIndexOf("/");return 0<t?e.substring(0,t):""},g=function(e){return"/"!==e.slice(-1)&&(e+="/"),e},b=function(e,t){return t=void 0!==t?t:f.createFolders,e=g(e),this.files[e]||s.call(this,e,null,{dir:!0,createFolders:t}),this.files[e]};function h(e){return"[object RegExp]"===Object.prototype.toString.call(e)}var n={load:function(){throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")},forEach:function(e){var t,r,n;for(t in this.files)n=this.files[t],(r=t.slice(this.root.length,t.length))&&t.slice(0,this.root.length)===this.root&&e(r,n)},filter:function(r){var n=[];return this.forEach(function(e,t){r(e,t)&&n.push(t)}),n},file:function(e,t,r){if(1!==arguments.length)return e=this.root+e,s.call(this,e,t,r),this;if(h(e)){var n=e;return this.filter(function(e,t){return!t.dir&&n.test(e)})}var i=this.files[this.root+e];return i&&!i.dir?i:null},folder:function(r){if(!r)return this;if(h(r))return this.filter(function(e,t){return t.dir&&r.test(e)});var e=this.root+r,t=b.call(this,e),n=this.clone();return n.root=t.name,n},remove:function(r){r=this.root+r;var e=this.files[r];if(e||("/"!==r.slice(-1)&&(r+="/"),e=this.files[r]),e&&!e.dir)delete this.files[r];else for(var t=this.filter(function(e,t){return t.name.slice(0,r.length)===r}),n=0;n<t.length;n++)delete this.files[t[n].name];return this},generate:function(){throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")},generateInternalStream:function(e){var t,r={};try{if((r=u.extend(e||{},{streamFiles:!1,compression:"STORE",compressionOptions:null,type:"",platform:"DOS",comment:null,mimeType:"application/zip",encodeFileName:i.utf8encode})).type=r.type.toLowerCase(),r.compression=r.compression.toUpperCase(),"binarystring"===r.type&&(r.type="string"),!r.type)throw new Error("No output type specified.");u.checkSupport(r.type),"darwin"!==r.platform&&"freebsd"!==r.platform&&"linux"!==r.platform&&"sunos"!==r.platform||(r.platform="UNIX"),"win32"===r.platform&&(r.platform="DOS");var n=r.comment||this.comment||"";t=o.generateWorker(this,r,n)}catch(e){(t=new l("error")).error(e)}return new a(t,r.type||"string",r.mimeType)},generateAsync:function(e,t){return this.generateInternalStream(e).accumulate(t)},generateNodeStream:function(e,t){return(e=e||{}).type||(e.type="nodebuffer"),this.generateInternalStream(e).toNodejsStream(t)}};t.exports=n},{"./compressedObject":2,"./defaults":5,"./generate":9,"./nodejs/NodejsStreamInputAdapter":12,"./nodejsUtils":14,"./stream/GenericWorker":28,"./stream/StreamHelper":29,"./utf8":31,"./utils":32,"./zipObject":35}],16:[function(e,t,r){"use strict";t.exports=e("stream")},{stream:void 0}],17:[function(e,t,r){"use strict";var n=e("./DataReader");function i(e){n.call(this,e);for(var t=0;t<this.data.length;t++)e[t]=255&e[t]}e("../utils").inherits(i,n),i.prototype.byteAt=function(e){return this.data[this.zero+e]},i.prototype.lastIndexOfSignature=function(e){for(var t=e.charCodeAt(0),r=e.charCodeAt(1),n=e.charCodeAt(2),i=e.charCodeAt(3),s=this.length-4;0<=s;--s)if(this.data[s]===t&&this.data[s+1]===r&&this.data[s+2]===n&&this.data[s+3]===i)return s-this.zero;return-1},i.prototype.readAndCheckSignature=function(e){var t=e.charCodeAt(0),r=e.charCodeAt(1),n=e.charCodeAt(2),i=e.charCodeAt(3),s=this.readData(4);return t===s[0]&&r===s[1]&&n===s[2]&&i===s[3]},i.prototype.readData=function(e){if(this.checkOffset(e),0===e)return[];var t=this.data.slice(this.zero+this.index,this.zero+this.index+e);return this.index+=e,t},t.exports=i},{"../utils":32,"./DataReader":18}],18:[function(e,t,r){"use strict";var n=e("../utils");function i(e){this.data=e,this.length=e.length,this.index=0,this.zero=0}i.prototype={checkOffset:function(e){this.checkIndex(this.index+e)},checkIndex:function(e){if(this.length<this.zero+e||e<0)throw new Error("End of data reached (data length = "+this.length+", asked index = "+e+"). Corrupted zip ?")},setIndex:function(e){this.checkIndex(e),this.index=e},skip:function(e){this.setIndex(this.index+e)},byteAt:function(){},readInt:function(e){var t,r=0;for(this.checkOffset(e),t=this.index+e-1;t>=this.index;t--)r=(r<<8)+this.byteAt(t);return this.index+=e,r},readString:function(e){return n.transformTo("string",this.readData(e))},readData:function(){},lastIndexOfSignature:function(){},readAndCheckSignature:function(){},readDate:function(){var e=this.readInt(4);return new Date(Date.UTC(1980+(e>>25&127),(e>>21&15)-1,e>>16&31,e>>11&31,e>>5&63,(31&e)<<1))}},t.exports=i},{"../utils":32}],19:[function(e,t,r){"use strict";var n=e("./Uint8ArrayReader");function i(e){n.call(this,e)}e("../utils").inherits(i,n),i.prototype.readData=function(e){this.checkOffset(e);var t=this.data.slice(this.zero+this.index,this.zero+this.index+e);return this.index+=e,t},t.exports=i},{"../utils":32,"./Uint8ArrayReader":21}],20:[function(e,t,r){"use strict";var n=e("./DataReader");function i(e){n.call(this,e)}e("../utils").inherits(i,n),i.prototype.byteAt=function(e){return this.data.charCodeAt(this.zero+e)},i.prototype.lastIndexOfSignature=function(e){return this.data.lastIndexOf(e)-this.zero},i.prototype.readAndCheckSignature=function(e){return e===this.readData(4)},i.prototype.readData=function(e){this.checkOffset(e);var t=this.data.slice(this.zero+this.index,this.zero+this.index+e);return this.index+=e,t},t.exports=i},{"../utils":32,"./DataReader":18}],21:[function(e,t,r){"use strict";var n=e("./ArrayReader");function i(e){n.call(this,e)}e("../utils").inherits(i,n),i.prototype.readData=function(e){if(this.checkOffset(e),0===e)return new Uint8Array(0);var t=this.data.subarray(this.zero+this.index,this.zero+this.index+e);return this.index+=e,t},t.exports=i},{"../utils":32,"./ArrayReader":17}],22:[function(e,t,r){"use strict";var n=e("../utils"),i=e("../support"),s=e("./ArrayReader"),a=e("./StringReader"),o=e("./NodeBufferReader"),h=e("./Uint8ArrayReader");t.exports=function(e){var t=n.getTypeOf(e);return n.checkSupport(t),"string"!==t||i.uint8array?"nodebuffer"===t?new o(e):i.uint8array?new h(n.transformTo("uint8array",e)):new s(n.transformTo("array",e)):new a(e)}},{"../support":30,"../utils":32,"./ArrayReader":17,"./NodeBufferReader":19,"./StringReader":20,"./Uint8ArrayReader":21}],23:[function(e,t,r){"use strict";r.LOCAL_FILE_HEADER="PK",r.CENTRAL_FILE_HEADER="PK",r.CENTRAL_DIRECTORY_END="PK",r.ZIP64_CENTRAL_DIRECTORY_LOCATOR="PK",r.ZIP64_CENTRAL_DIRECTORY_END="PK",r.DATA_DESCRIPTOR="PK\b"},{}],24:[function(e,t,r){"use strict";var n=e("./GenericWorker"),i=e("../utils");function s(e){n.call(this,"ConvertWorker to "+e),this.destType=e}i.inherits(s,n),s.prototype.processChunk=function(e){this.push({data:i.transformTo(this.destType,e.data),meta:e.meta})},t.exports=s},{"../utils":32,"./GenericWorker":28}],25:[function(e,t,r){"use strict";var n=e("./GenericWorker"),i=e("../crc32");function s(){n.call(this,"Crc32Probe"),this.withStreamInfo("crc32",0)}e("../utils").inherits(s,n),s.prototype.processChunk=function(e){this.streamInfo.crc32=i(e.data,this.streamInfo.crc32||0),this.push(e)},t.exports=s},{"../crc32":4,"../utils":32,"./GenericWorker":28}],26:[function(e,t,r){"use strict";var n=e("../utils"),i=e("./GenericWorker");function s(e){i.call(this,"DataLengthProbe for "+e),this.propName=e,this.withStreamInfo(e,0)}n.inherits(s,i),s.prototype.processChunk=function(e){if(e){var t=this.streamInfo[this.propName]||0;this.streamInfo[this.propName]=t+e.data.length}i.prototype.processChunk.call(this,e)},t.exports=s},{"../utils":32,"./GenericWorker":28}],27:[function(e,t,r){"use strict";var n=e("../utils"),i=e("./GenericWorker");function s(e){i.call(this,"DataWorker");var t=this;this.dataIsReady=!1,this.index=0,this.max=0,this.data=null,this.type="",this._tickScheduled=!1,e.then(function(e){t.dataIsReady=!0,t.data=e,t.max=e&&e.length||0,t.type=n.getTypeOf(e),t.isPaused||t._tickAndRepeat()},function(e){t.error(e)})}n.inherits(s,i),s.prototype.cleanUp=function(){i.prototype.cleanUp.call(this),this.data=null},s.prototype.resume=function(){return!!i.prototype.resume.call(this)&&(!this._tickScheduled&&this.dataIsReady&&(this._tickScheduled=!0,n.delay(this._tickAndRepeat,[],this)),!0)},s.prototype._tickAndRepeat=function(){this._tickScheduled=!1,this.isPaused||this.isFinished||(this._tick(),this.isFinished||(n.delay(this._tickAndRepeat,[],this),this._tickScheduled=!0))},s.prototype._tick=function(){if(this.isPaused||this.isFinished)return!1;var e=null,t=Math.min(this.max,this.index+16384);if(this.index>=this.max)return this.end();switch(this.type){case"string":e=this.data.substring(this.index,t);break;case"uint8array":e=this.data.subarray(this.index,t);break;case"array":case"nodebuffer":e=this.data.slice(this.index,t)}return this.index=t,this.push({data:e,meta:{percent:this.max?this.index/this.max*100:0}})},t.exports=s},{"../utils":32,"./GenericWorker":28}],28:[function(e,t,r){"use strict";function n(e){this.name=e||"default",this.streamInfo={},this.generatedError=null,this.extraStreamInfo={},this.isPaused=!0,this.isFinished=!1,this.isLocked=!1,this._listeners={data:[],end:[],error:[]},this.previous=null}n.prototype={push:function(e){this.emit("data",e)},end:function(){if(this.isFinished)return!1;this.flush();try{this.emit("end"),this.cleanUp(),this.isFinished=!0}catch(e){this.emit("error",e)}return!0},error:function(e){return!this.isFinished&&(this.isPaused?this.generatedError=e:(this.isFinished=!0,this.emit("error",e),this.previous&&this.previous.error(e),this.cleanUp()),!0)},on:function(e,t){return this._listeners[e].push(t),this},cleanUp:function(){this.streamInfo=this.generatedError=this.extraStreamInfo=null,this._listeners=[]},emit:function(e,t){if(this._listeners[e])for(var r=0;r<this._listeners[e].length;r++)this._listeners[e][r].call(this,t)},pipe:function(e){return e.registerPrevious(this)},registerPrevious:function(e){if(this.isLocked)throw new Error("The stream '"+this+"' has already been used.");this.streamInfo=e.streamInfo,this.mergeStreamInfo(),this.previous=e;var t=this;return e.on("data",function(e){t.processChunk(e)}),e.on("end",function(){t.end()}),e.on("error",function(e){t.error(e)}),this},pause:function(){return!this.isPaused&&!this.isFinished&&(this.isPaused=!0,this.previous&&this.previous.pause(),!0)},resume:function(){if(!this.isPaused||this.isFinished)return!1;var e=this.isPaused=!1;return this.generatedError&&(this.error(this.generatedError),e=!0),this.previous&&this.previous.resume(),!e},flush:function(){},processChunk:function(e){this.push(e)},withStreamInfo:function(e,t){return this.extraStreamInfo[e]=t,this.mergeStreamInfo(),this},mergeStreamInfo:function(){for(var e in this.extraStreamInfo)Object.prototype.hasOwnProperty.call(this.extraStreamInfo,e)&&(this.streamInfo[e]=this.extraStreamInfo[e])},lock:function(){if(this.isLocked)throw new Error("The stream '"+this+"' has already been used.");this.isLocked=!0,this.previous&&this.previous.lock()},toString:function(){var e="Worker "+this.name;return this.previous?this.previous+" -> "+e:e}},t.exports=n},{}],29:[function(e,t,r){"use strict";var h=e("../utils"),i=e("./ConvertWorker"),s=e("./GenericWorker"),u=e("../base64"),n=e("../support"),a=e("../external"),o=null;if(n.nodestream)try{o=e("../nodejs/NodejsStreamOutputAdapter")}catch(e){}function l(e,o){return new a.Promise(function(t,r){var n=[],i=e._internalType,s=e._outputType,a=e._mimeType;e.on("data",function(e,t){n.push(e),o&&o(t)}).on("error",function(e){n=[],r(e)}).on("end",function(){try{var e=function(e,t,r){switch(e){case"blob":return h.newBlob(h.transformTo("arraybuffer",t),r);case"base64":return u.encode(t);default:return h.transformTo(e,t)}}(s,function(e,t){var r,n=0,i=null,s=0;for(r=0;r<t.length;r++)s+=t[r].length;switch(e){case"string":return t.join("");case"array":return Array.prototype.concat.apply([],t);case"uint8array":for(i=new Uint8Array(s),r=0;r<t.length;r++)i.set(t[r],n),n+=t[r].length;return i;case"nodebuffer":return Buffer.concat(t);default:throw new Error("concat : unsupported type '"+e+"'")}}(i,n),a);t(e)}catch(e){r(e)}n=[]}).resume()})}function f(e,t,r){var n=t;switch(t){case"blob":case"arraybuffer":n="uint8array";break;case"base64":n="string"}try{this._internalType=n,this._outputType=t,this._mimeType=r,h.checkSupport(n),this._worker=e.pipe(new i(n)),e.lock()}catch(e){this._worker=new s("error"),this._worker.error(e)}}f.prototype={accumulate:function(e){return l(this,e)},on:function(e,t){var r=this;return"data"===e?this._worker.on(e,function(e){t.call(r,e.data,e.meta)}):this._worker.on(e,function(){h.delay(t,arguments,r)}),this},resume:function(){return h.delay(this._worker.resume,[],this._worker),this},pause:function(){return this._worker.pause(),this},toNodejsStream:function(e){if(h.checkSupport("nodestream"),"nodebuffer"!==this._outputType)throw new Error(this._outputType+" is not supported by this method");return new o(this,{objectMode:"nodebuffer"!==this._outputType},e)}},t.exports=f},{"../base64":1,"../external":6,"../nodejs/NodejsStreamOutputAdapter":13,"../support":30,"../utils":32,"./ConvertWorker":24,"./GenericWorker":28}],30:[function(e,t,r){"use strict";if(r.base64=!0,r.array=!0,r.string=!0,r.arraybuffer="undefined"!=typeof ArrayBuffer&&"undefined"!=typeof Uint8Array,r.nodebuffer="undefined"!=typeof Buffer,r.uint8array="undefined"!=typeof Uint8Array,"undefined"==typeof ArrayBuffer)r.blob=!1;else{var n=new ArrayBuffer(0);try{r.blob=0===new Blob([n],{type:"application/zip"}).size}catch(e){try{var i=new(self.BlobBuilder||self.WebKitBlobBuilder||self.MozBlobBuilder||self.MSBlobBuilder);i.append(n),r.blob=0===i.getBlob("application/zip").size}catch(e){r.blob=!1}}}try{r.nodestream=!!e("readable-stream").Readable}catch(e){r.nodestream=!1}},{"readable-stream":16}],31:[function(e,t,s){"use strict";for(var o=e("./utils"),h=e("./support"),r=e("./nodejsUtils"),n=e("./stream/GenericWorker"),u=new Array(256),i=0;i<256;i++)u[i]=252<=i?6:248<=i?5:240<=i?4:224<=i?3:192<=i?2:1;u[254]=u[254]=1;function a(){n.call(this,"utf-8 decode"),this.leftOver=null}function l(){n.call(this,"utf-8 encode")}s.utf8encode=function(e){return h.nodebuffer?r.newBufferFrom(e,"utf-8"):function(e){var t,r,n,i,s,a=e.length,o=0;for(i=0;i<a;i++)55296==(64512&(r=e.charCodeAt(i)))&&i+1<a&&56320==(64512&(n=e.charCodeAt(i+1)))&&(r=65536+(r-55296<<10)+(n-56320),i++),o+=r<128?1:r<2048?2:r<65536?3:4;for(t=h.uint8array?new Uint8Array(o):new Array(o),i=s=0;s<o;i++)55296==(64512&(r=e.charCodeAt(i)))&&i+1<a&&56320==(64512&(n=e.charCodeAt(i+1)))&&(r=65536+(r-55296<<10)+(n-56320),i++),r<128?t[s++]=r:(r<2048?t[s++]=192|r>>>6:(r<65536?t[s++]=224|r>>>12:(t[s++]=240|r>>>18,t[s++]=128|r>>>12&63),t[s++]=128|r>>>6&63),t[s++]=128|63&r);return t}(e)},s.utf8decode=function(e){return h.nodebuffer?o.transformTo("nodebuffer",e).toString("utf-8"):function(e){var t,r,n,i,s=e.length,a=new Array(2*s);for(t=r=0;t<s;)if((n=e[t++])<128)a[r++]=n;else if(4<(i=u[n]))a[r++]=65533,t+=i-1;else{for(n&=2===i?31:3===i?15:7;1<i&&t<s;)n=n<<6|63&e[t++],i--;1<i?a[r++]=65533:n<65536?a[r++]=n:(n-=65536,a[r++]=55296|n>>10&1023,a[r++]=56320|1023&n)}return a.length!==r&&(a.subarray?a=a.subarray(0,r):a.length=r),o.applyFromCharCode(a)}(e=o.transformTo(h.uint8array?"uint8array":"array",e))},o.inherits(a,n),a.prototype.processChunk=function(e){var t=o.transformTo(h.uint8array?"uint8array":"array",e.data);if(this.leftOver&&this.leftOver.length){if(h.uint8array){var r=t;(t=new Uint8Array(r.length+this.leftOver.length)).set(this.leftOver,0),t.set(r,this.leftOver.length)}else t=this.leftOver.concat(t);this.leftOver=null}var n=function(e,t){var r;for((t=t||e.length)>e.length&&(t=e.length),r=t-1;0<=r&&128==(192&e[r]);)r--;return r<0?t:0===r?t:r+u[e[r]]>t?r:t}(t),i=t;n!==t.length&&(h.uint8array?(i=t.subarray(0,n),this.leftOver=t.subarray(n,t.length)):(i=t.slice(0,n),this.leftOver=t.slice(n,t.length))),this.push({data:s.utf8decode(i),meta:e.meta})},a.prototype.flush=function(){this.leftOver&&this.leftOver.length&&(this.push({data:s.utf8decode(this.leftOver),meta:{}}),this.leftOver=null)},s.Utf8DecodeWorker=a,o.inherits(l,n),l.prototype.processChunk=function(e){this.push({data:s.utf8encode(e.data),meta:e.meta})},s.Utf8EncodeWorker=l},{"./nodejsUtils":14,"./stream/GenericWorker":28,"./support":30,"./utils":32}],32:[function(e,t,a){"use strict";var o=e("./support"),h=e("./base64"),r=e("./nodejsUtils"),u=e("./external");function n(e){return e}function l(e,t){for(var r=0;r<e.length;++r)t[r]=255&e.charCodeAt(r);return t}e("setimmediate"),a.newBlob=function(t,r){a.checkSupport("blob");try{return new Blob([t],{type:r})}catch(e){try{var n=new(self.BlobBuilder||self.WebKitBlobBuilder||self.MozBlobBuilder||self.MSBlobBuilder);return n.append(t),n.getBlob(r)}catch(e){throw new Error("Bug : can't construct the Blob.")}}};var i={stringifyByChunk:function(e,t,r){var n=[],i=0,s=e.length;if(s<=r)return String.fromCharCode.apply(null,e);for(;i<s;)"array"===t||"nodebuffer"===t?n.push(String.fromCharCode.apply(null,e.slice(i,Math.min(i+r,s)))):n.push(String.fromCharCode.apply(null,e.subarray(i,Math.min(i+r,s)))),i+=r;return n.join("")},stringifyByChar:function(e){for(var t="",r=0;r<e.length;r++)t+=String.fromCharCode(e[r]);return t},applyCanBeUsed:{uint8array:function(){try{return o.uint8array&&1===String.fromCharCode.apply(null,new Uint8Array(1)).length}catch(e){return!1}}(),nodebuffer:function(){try{return o.nodebuffer&&1===String.fromCharCode.apply(null,r.allocBuffer(1)).length}catch(e){return!1}}()}};function s(e){var t=65536,r=a.getTypeOf(e),n=!0;if("uint8array"===r?n=i.applyCanBeUsed.uint8array:"nodebuffer"===r&&(n=i.applyCanBeUsed.nodebuffer),n)for(;1<t;)try{return i.stringifyByChunk(e,r,t)}catch(e){t=Math.floor(t/2)}return i.stringifyByChar(e)}function f(e,t){for(var r=0;r<e.length;r++)t[r]=e[r];return t}a.applyFromCharCode=s;var c={};c.string={string:n,array:function(e){return l(e,new Array(e.length))},arraybuffer:function(e){return c.string.uint8array(e).buffer},uint8array:function(e){return l(e,new Uint8Array(e.length))},nodebuffer:function(e){return l(e,r.allocBuffer(e.length))}},c.array={string:s,array:n,arraybuffer:function(e){return new Uint8Array(e).buffer},uint8array:function(e){return new Uint8Array(e)},nodebuffer:function(e){return r.newBufferFrom(e)}},c.arraybuffer={string:function(e){return s(new Uint8Array(e))},array:function(e){return f(new Uint8Array(e),new Array(e.byteLength))},arraybuffer:n,uint8array:function(e){return new Uint8Array(e)},nodebuffer:function(e){return r.newBufferFrom(new Uint8Array(e))}},c.uint8array={string:s,array:function(e){return f(e,new Array(e.length))},arraybuffer:function(e){return e.buffer},uint8array:n,nodebuffer:function(e){return r.newBufferFrom(e)}},c.nodebuffer={string:s,array:function(e){return f(e,new Array(e.length))},arraybuffer:function(e){return c.nodebuffer.uint8array(e).buffer},uint8array:function(e){return f(e,new Uint8Array(e.length))},nodebuffer:n},a.transformTo=function(e,t){if(t=t||"",!e)return t;a.checkSupport(e);var r=a.getTypeOf(t);return c[r][e](t)},a.resolve=function(e){for(var t=e.split("/"),r=[],n=0;n<t.length;n++){var i=t[n];"."===i||""===i&&0!==n&&n!==t.length-1||(".."===i?r.pop():r.push(i))}return r.join("/")},a.getTypeOf=function(e){if("string"==typeof e)return"string";var t=Object.prototype.toString.call(e);return"[object Array]"===t?"array":o.nodebuffer&&r.isBuffer(e)?"nodebuffer":o.uint8array&&"[object Uint8Array]"===t?"uint8array":o.arraybuffer&&"[object ArrayBuffer]"===t?"arraybuffer":void 0},a.checkSupport=function(e){if(!o[e.toLowerCase()])throw new Error(e+" is not supported by this platform")},a.MAX_VALUE_16BITS=65535,a.MAX_VALUE_32BITS=-1,a.pretty=function(e){var t,r,n="";for(r=0;r<(e||"").length;r++)n+="\\x"+((t=e.charCodeAt(r))<16?"0":"")+t.toString(16).toUpperCase();return n},a.delay=function(e,t,r){setImmediate(function(){e.apply(r||null,t||[])})},a.inherits=function(e,t){function r(){}r.prototype=t.prototype,e.prototype=new r},a.extend=function(){var e,t,r={};for(e=0;e<arguments.length;e++)for(t in arguments[e])Object.prototype.hasOwnProperty.call(arguments[e],t)&&void 0===r[t]&&(r[t]=arguments[e][t]);return r},a.prepareContent=function(r,e,n,i,s){return u.Promise.resolve(e).then(function(n){return o.blob&&(n instanceof Blob||-1!==["[object File]","[object Blob]"].indexOf(Object.prototype.toString.call(n)))?void 0!==Blob.prototype.arrayBuffer?n.arrayBuffer():"undefined"!=typeof FileReader?new u.Promise(function(t,r){var e=new FileReader;e.onload=function(e){t(e.target.result)},e.onerror=function(e){r(e.target.error)},e.readAsArrayBuffer(n)}):u.Promise.reject(new Error(r+" is a Blob, but we have no way of reading it.")):n}).then(function(e){var t=a.getTypeOf(e);return t?("arraybuffer"===t?e=a.transformTo("uint8array",e):"string"===t&&(s?e=h.decode(e):n&&!0!==i&&(e=function(e){return l(e,o.uint8array?new Uint8Array(e.length):new Array(e.length))}(e))),e):u.Promise.reject(new Error("Can't read the data of '"+r+"'. Is it in a supported JavaScript type (String, Blob, ArrayBuffer, etc) ?"))})}},{"./base64":1,"./external":6,"./nodejsUtils":14,"./support":30,setimmediate:54}],33:[function(e,t,r){"use strict";var n=e("./reader/readerFor"),i=e("./utils"),s=e("./signature"),a=e("./zipEntry"),o=e("./support");function h(e){this.files=[],this.loadOptions=e}h.prototype={checkSignature:function(e){if(!this.reader.readAndCheckSignature(e)){this.reader.index-=4;var t=this.reader.readString(4);throw new Error("Corrupted zip or bug: unexpected signature ("+i.pretty(t)+", expected "+i.pretty(e)+")")}},isSignature:function(e,t){var r=this.reader.index;this.reader.setIndex(e);var n=this.reader.readString(4)===t;return this.reader.setIndex(r),n},readBlockEndOfCentral:function(){this.diskNumber=this.reader.readInt(2),this.diskWithCentralDirStart=this.reader.readInt(2),this.centralDirRecordsOnThisDisk=this.reader.readInt(2),this.centralDirRecords=this.reader.readInt(2),this.centralDirSize=this.reader.readInt(4),this.centralDirOffset=this.reader.readInt(4),this.zipCommentLength=this.reader.readInt(2);var e=this.reader.readData(this.zipCommentLength),t=o.uint8array?"uint8array":"array",r=i.transformTo(t,e);this.zipComment=this.loadOptions.decodeFileName(r)},readBlockZip64EndOfCentral:function(){this.zip64EndOfCentralSize=this.reader.readInt(8),this.reader.skip(4),this.diskNumber=this.reader.readInt(4),this.diskWithCentralDirStart=this.reader.readInt(4),this.centralDirRecordsOnThisDisk=this.reader.readInt(8),this.centralDirRecords=this.reader.readInt(8),this.centralDirSize=this.reader.readInt(8),this.centralDirOffset=this.reader.readInt(8),this.zip64ExtensibleData={};for(var e,t,r,n=this.zip64EndOfCentralSize-44;0<n;)e=this.reader.readInt(2),t=this.reader.readInt(4),r=this.reader.readData(t),this.zip64ExtensibleData[e]={id:e,length:t,value:r}},readBlockZip64EndOfCentralLocator:function(){if(this.diskWithZip64CentralDirStart=this.reader.readInt(4),this.relativeOffsetEndOfZip64CentralDir=this.reader.readInt(8),this.disksCount=this.reader.readInt(4),1<this.disksCount)throw new Error("Multi-volumes zip are not supported")},readLocalFiles:function(){var e,t;for(e=0;e<this.files.length;e++)t=this.files[e],this.reader.setIndex(t.localHeaderOffset),this.checkSignature(s.LOCAL_FILE_HEADER),t.readLocalPart(this.reader),t.handleUTF8(),t.processAttributes()},readCentralDir:function(){var e;for(this.reader.setIndex(this.centralDirOffset);this.reader.readAndCheckSignature(s.CENTRAL_FILE_HEADER);)(e=new a({zip64:this.zip64},this.loadOptions)).readCentralPart(this.reader),this.files.push(e);if(this.centralDirRecords!==this.files.length&&0!==this.centralDirRecords&&0===this.files.length)throw new Error("Corrupted zip or bug: expected "+this.centralDirRecords+" records in central dir, got "+this.files.length)},readEndOfCentral:function(){var e=this.reader.lastIndexOfSignature(s.CENTRAL_DIRECTORY_END);if(e<0)throw!this.isSignature(0,s.LOCAL_FILE_HEADER)?new Error("Can't find end of central directory : is this a zip file ? If it is, see https://stuk.github.io/jszip/documentation/howto/read_zip.html"):new Error("Corrupted zip: can't find end of central directory");this.reader.setIndex(e);var t=e;if(this.checkSignature(s.CENTRAL_DIRECTORY_END),this.readBlockEndOfCentral(),this.diskNumber===i.MAX_VALUE_16BITS||this.diskWithCentralDirStart===i.MAX_VALUE_16BITS||this.centralDirRecordsOnThisDisk===i.MAX_VALUE_16BITS||this.centralDirRecords===i.MAX_VALUE_16BITS||this.centralDirSize===i.MAX_VALUE_32BITS||this.centralDirOffset===i.MAX_VALUE_32BITS){if(this.zip64=!0,(e=this.reader.lastIndexOfSignature(s.ZIP64_CENTRAL_DIRECTORY_LOCATOR))<0)throw new Error("Corrupted zip: can't find the ZIP64 end of central directory locator");if(this.reader.setIndex(e),this.checkSignature(s.ZIP64_CENTRAL_DIRECTORY_LOCATOR),this.readBlockZip64EndOfCentralLocator(),!this.isSignature(this.relativeOffsetEndOfZip64CentralDir,s.ZIP64_CENTRAL_DIRECTORY_END)&&(this.relativeOffsetEndOfZip64CentralDir=this.reader.lastIndexOfSignature(s.ZIP64_CENTRAL_DIRECTORY_END),this.relativeOffsetEndOfZip64CentralDir<0))throw new Error("Corrupted zip: can't find the ZIP64 end of central directory");this.reader.setIndex(this.relativeOffsetEndOfZip64CentralDir),this.checkSignature(s.ZIP64_CENTRAL_DIRECTORY_END),this.readBlockZip64EndOfCentral()}var r=this.centralDirOffset+this.centralDirSize;this.zip64&&(r+=20,r+=12+this.zip64EndOfCentralSize);var n=t-r;if(0<n)this.isSignature(t,s.CENTRAL_FILE_HEADER)||(this.reader.zero=n);else if(n<0)throw new Error("Corrupted zip: missing "+Math.abs(n)+" bytes.")},prepareReader:function(e){this.reader=n(e)},load:function(e){this.prepareReader(e),this.readEndOfCentral(),this.readCentralDir(),this.readLocalFiles()}},t.exports=h},{"./reader/readerFor":22,"./signature":23,"./support":30,"./utils":32,"./zipEntry":34}],34:[function(e,t,r){"use strict";var n=e("./reader/readerFor"),s=e("./utils"),i=e("./compressedObject"),a=e("./crc32"),o=e("./utf8"),h=e("./compressions"),u=e("./support");function l(e,t){this.options=e,this.loadOptions=t}l.prototype={isEncrypted:function(){return 1==(1&this.bitFlag)},useUTF8:function(){return 2048==(2048&this.bitFlag)},readLocalPart:function(e){var t,r;if(e.skip(22),this.fileNameLength=e.readInt(2),r=e.readInt(2),this.fileName=e.readData(this.fileNameLength),e.skip(r),-1===this.compressedSize||-1===this.uncompressedSize)throw new Error("Bug or corrupted zip : didn't get enough information from the central directory (compressedSize === -1 || uncompressedSize === -1)");if(null===(t=function(e){for(var t in h)if(Object.prototype.hasOwnProperty.call(h,t)&&h[t].magic===e)return h[t];return null}(this.compressionMethod)))throw new Error("Corrupted zip : compression "+s.pretty(this.compressionMethod)+" unknown (inner file : "+s.transformTo("string",this.fileName)+")");this.decompressed=new i(this.compressedSize,this.uncompressedSize,this.crc32,t,e.readData(this.compressedSize))},readCentralPart:function(e){this.versionMadeBy=e.readInt(2),e.skip(2),this.bitFlag=e.readInt(2),this.compressionMethod=e.readString(2),this.date=e.readDate(),this.crc32=e.readInt(4),this.compressedSize=e.readInt(4),this.uncompressedSize=e.readInt(4);var t=e.readInt(2);if(this.extraFieldsLength=e.readInt(2),this.fileCommentLength=e.readInt(2),this.diskNumberStart=e.readInt(2),this.internalFileAttributes=e.readInt(2),this.externalFileAttributes=e.readInt(4),this.localHeaderOffset=e.readInt(4),this.isEncrypted())throw new Error("Encrypted zip are not supported");e.skip(t),this.readExtraFields(e),this.parseZIP64ExtraField(e),this.fileComment=e.readData(this.fileCommentLength)},processAttributes:function(){this.unixPermissions=null,this.dosPermissions=null;var e=this.versionMadeBy>>8;this.dir=!!(16&this.externalFileAttributes),0==e&&(this.dosPermissions=63&this.externalFileAttributes),3==e&&(this.unixPermissions=this.externalFileAttributes>>16&65535),this.dir||"/"!==this.fileNameStr.slice(-1)||(this.dir=!0)},parseZIP64ExtraField:function(){if(this.extraFields[1]){var e=n(this.extraFields[1].value);this.uncompressedSize===s.MAX_VALUE_32BITS&&(this.uncompressedSize=e.readInt(8)),this.compressedSize===s.MAX_VALUE_32BITS&&(this.compressedSize=e.readInt(8)),this.localHeaderOffset===s.MAX_VALUE_32BITS&&(this.localHeaderOffset=e.readInt(8)),this.diskNumberStart===s.MAX_VALUE_32BITS&&(this.diskNumberStart=e.readInt(4))}},readExtraFields:function(e){var t,r,n,i=e.index+this.extraFieldsLength;for(this.extraFields||(this.extraFields={});e.index+4<i;)t=e.readInt(2),r=e.readInt(2),n=e.readData(r),this.extraFields[t]={id:t,length:r,value:n};e.setIndex(i)},handleUTF8:function(){var e=u.uint8array?"uint8array":"array";if(this.useUTF8())this.fileNameStr=o.utf8decode(this.fileName),this.fileCommentStr=o.utf8decode(this.fileComment);else{var t=this.findExtraFieldUnicodePath();if(null!==t)this.fileNameStr=t;else{var r=s.transformTo(e,this.fileName);this.fileNameStr=this.loadOptions.decodeFileName(r)}var n=this.findExtraFieldUnicodeComment();if(null!==n)this.fileCommentStr=n;else{var i=s.transformTo(e,this.fileComment);this.fileCommentStr=this.loadOptions.decodeFileName(i)}}},findExtraFieldUnicodePath:function(){var e=this.extraFields[28789];if(e){var t=n(e.value);return 1!==t.readInt(1)?null:a(this.fileName)!==t.readInt(4)?null:o.utf8decode(t.readData(e.length-5))}return null},findExtraFieldUnicodeComment:function(){var e=this.extraFields[25461];if(e){var t=n(e.value);return 1!==t.readInt(1)?null:a(this.fileComment)!==t.readInt(4)?null:o.utf8decode(t.readData(e.length-5))}return null}},t.exports=l},{"./compressedObject":2,"./compressions":3,"./crc32":4,"./reader/readerFor":22,"./support":30,"./utf8":31,"./utils":32}],35:[function(e,t,r){"use strict";function n(e,t,r){this.name=e,this.dir=r.dir,this.date=r.date,this.comment=r.comment,this.unixPermissions=r.unixPermissions,this.dosPermissions=r.dosPermissions,this._data=t,this._dataBinary=r.binary,this.options={compression:r.compression,compressionOptions:r.compressionOptions}}var s=e("./stream/StreamHelper"),i=e("./stream/DataWorker"),a=e("./utf8"),o=e("./compressedObject"),h=e("./stream/GenericWorker");n.prototype={internalStream:function(e){var t=null,r="string";try{if(!e)throw new Error("No output type specified.");var n="string"===(r=e.toLowerCase())||"text"===r;"binarystring"!==r&&"text"!==r||(r="string"),t=this._decompressWorker();var i=!this._dataBinary;i&&!n&&(t=t.pipe(new a.Utf8EncodeWorker)),!i&&n&&(t=t.pipe(new a.Utf8DecodeWorker))}catch(e){(t=new h("error")).error(e)}return new s(t,r,"")},async:function(e,t){return this.internalStream(e).accumulate(t)},nodeStream:function(e,t){return this.internalStream(e||"nodebuffer").toNodejsStream(t)},_compressWorker:function(e,t){if(this._data instanceof o&&this._data.compression.magic===e.magic)return this._data.getCompressedWorker();var r=this._decompressWorker();return this._dataBinary||(r=r.pipe(new a.Utf8EncodeWorker)),o.createWorkerFrom(r,e,t)},_decompressWorker:function(){return this._data instanceof o?this._data.getContentWorker():this._data instanceof h?this._data:new i(this._data)}};for(var u=["asText","asBinary","asNodeBuffer","asUint8Array","asArrayBuffer"],l=function(){throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")},f=0;f<u.length;f++)n.prototype[u[f]]=l;t.exports=n},{"./compressedObject":2,"./stream/DataWorker":27,"./stream/GenericWorker":28,"./stream/StreamHelper":29,"./utf8":31}],36:[function(e,l,t){(function(t){"use strict";var r,n,e=t.MutationObserver||t.WebKitMutationObserver;if(e){var i=0,s=new e(u),a=t.document.createTextNode("");s.observe(a,{characterData:!0}),r=function(){a.data=i=++i%2}}else if(t.setImmediate||void 0===t.MessageChannel)r="document"in t&&"onreadystatechange"in t.document.createElement("script")?function(){var e=t.document.createElement("script");e.onreadystatechange=function(){u(),e.onreadystatechange=null,e.parentNode.removeChild(e),e=null},t.document.documentElement.appendChild(e)}:function(){setTimeout(u,0)};else{var o=new t.MessageChannel;o.port1.onmessage=u,r=function(){o.port2.postMessage(0)}}var h=[];function u(){var e,t;n=!0;for(var r=h.length;r;){for(t=h,h=[],e=-1;++e<r;)t[e]();r=h.length}n=!1}l.exports=function(e){1!==h.push(e)||n||r()}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],37:[function(e,t,r){"use strict";var i=e("immediate");function u(){}var l={},s=["REJECTED"],a=["FULFILLED"],n=["PENDING"];function o(e){if("function"!=typeof e)throw new TypeError("resolver must be a function");this.state=n,this.queue=[],this.outcome=void 0,e!==u&&d(this,e)}function h(e,t,r){this.promise=e,"function"==typeof t&&(this.onFulfilled=t,this.callFulfilled=this.otherCallFulfilled),"function"==typeof r&&(this.onRejected=r,this.callRejected=this.otherCallRejected)}function f(t,r,n){i(function(){var e;try{e=r(n)}catch(e){return l.reject(t,e)}e===t?l.reject(t,new TypeError("Cannot resolve promise with itself")):l.resolve(t,e)})}function c(e){var t=e&&e.then;if(e&&("object"==typeof e||"function"==typeof e)&&"function"==typeof t)return function(){t.apply(e,arguments)}}function d(t,e){var r=!1;function n(e){r||(r=!0,l.reject(t,e))}function i(e){r||(r=!0,l.resolve(t,e))}var s=p(function(){e(i,n)});"error"===s.status&&n(s.value)}function p(e,t){var r={};try{r.value=e(t),r.status="success"}catch(e){r.status="error",r.value=e}return r}(t.exports=o).prototype.finally=function(t){if("function"!=typeof t)return this;var r=this.constructor;return this.then(function(e){return r.resolve(t()).then(function(){return e})},function(e){return r.resolve(t()).then(function(){throw e})})},o.prototype.catch=function(e){return this.then(null,e)},o.prototype.then=function(e,t){if("function"!=typeof e&&this.state===a||"function"!=typeof t&&this.state===s)return this;var r=new this.constructor(u);this.state!==n?f(r,this.state===a?e:t,this.outcome):this.queue.push(new h(r,e,t));return r},h.prototype.callFulfilled=function(e){l.resolve(this.promise,e)},h.prototype.otherCallFulfilled=function(e){f(this.promise,this.onFulfilled,e)},h.prototype.callRejected=function(e){l.reject(this.promise,e)},h.prototype.otherCallRejected=function(e){f(this.promise,this.onRejected,e)},l.resolve=function(e,t){var r=p(c,t);if("error"===r.status)return l.reject(e,r.value);var n=r.value;if(n)d(e,n);else{e.state=a,e.outcome=t;for(var i=-1,s=e.queue.length;++i<s;)e.queue[i].callFulfilled(t)}return e},l.reject=function(e,t){e.state=s,e.outcome=t;for(var r=-1,n=e.queue.length;++r<n;)e.queue[r].callRejected(t);return e},o.resolve=function(e){if(e instanceof this)return e;return l.resolve(new this(u),e)},o.reject=function(e){var t=new this(u);return l.reject(t,e)},o.all=function(e){var r=this;if("[object Array]"!==Object.prototype.toString.call(e))return this.reject(new TypeError("must be an array"));var n=e.length,i=!1;if(!n)return this.resolve([]);var s=new Array(n),a=0,t=-1,o=new this(u);for(;++t<n;)h(e[t],t);return o;function h(e,t){r.resolve(e).then(function(e){s[t]=e,++a!==n||i||(i=!0,l.resolve(o,s))},function(e){i||(i=!0,l.reject(o,e))})}},o.race=function(e){var t=this;if("[object Array]"!==Object.prototype.toString.call(e))return this.reject(new TypeError("must be an array"));var r=e.length,n=!1;if(!r)return this.resolve([]);var i=-1,s=new this(u);for(;++i<r;)a=e[i],t.resolve(a).then(function(e){n||(n=!0,l.resolve(s,e))},function(e){n||(n=!0,l.reject(s,e))});var a;return s}},{immediate:36}],38:[function(e,t,r){"use strict";var n={};(0,e("./lib/utils/common").assign)(n,e("./lib/deflate"),e("./lib/inflate"),e("./lib/zlib/constants")),t.exports=n},{"./lib/deflate":39,"./lib/inflate":40,"./lib/utils/common":41,"./lib/zlib/constants":44}],39:[function(e,t,r){"use strict";var a=e("./zlib/deflate"),o=e("./utils/common"),h=e("./utils/strings"),i=e("./zlib/messages"),s=e("./zlib/zstream"),u=Object.prototype.toString,l=0,f=-1,c=0,d=8;function p(e){if(!(this instanceof p))return new p(e);this.options=o.assign({level:f,method:d,chunkSize:16384,windowBits:15,memLevel:8,strategy:c,to:""},e||{});var t=this.options;t.raw&&0<t.windowBits?t.windowBits=-t.windowBits:t.gzip&&0<t.windowBits&&t.windowBits<16&&(t.windowBits+=16),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new s,this.strm.avail_out=0;var r=a.deflateInit2(this.strm,t.level,t.method,t.windowBits,t.memLevel,t.strategy);if(r!==l)throw new Error(i[r]);if(t.header&&a.deflateSetHeader(this.strm,t.header),t.dictionary){var n;if(n="string"==typeof t.dictionary?h.string2buf(t.dictionary):"[object ArrayBuffer]"===u.call(t.dictionary)?new Uint8Array(t.dictionary):t.dictionary,(r=a.deflateSetDictionary(this.strm,n))!==l)throw new Error(i[r]);this._dict_set=!0}}function n(e,t){var r=new p(t);if(r.push(e,!0),r.err)throw r.msg||i[r.err];return r.result}p.prototype.push=function(e,t){var r,n,i=this.strm,s=this.options.chunkSize;if(this.ended)return!1;n=t===~~t?t:!0===t?4:0,"string"==typeof e?i.input=h.string2buf(e):"[object ArrayBuffer]"===u.call(e)?i.input=new Uint8Array(e):i.input=e,i.next_in=0,i.avail_in=i.input.length;do{if(0===i.avail_out&&(i.output=new o.Buf8(s),i.next_out=0,i.avail_out=s),1!==(r=a.deflate(i,n))&&r!==l)return this.onEnd(r),!(this.ended=!0);0!==i.avail_out&&(0!==i.avail_in||4!==n&&2!==n)||("string"===this.options.to?this.onData(h.buf2binstring(o.shrinkBuf(i.output,i.next_out))):this.onData(o.shrinkBuf(i.output,i.next_out)))}while((0<i.avail_in||0===i.avail_out)&&1!==r);return 4===n?(r=a.deflateEnd(this.strm),this.onEnd(r),this.ended=!0,r===l):2!==n||(this.onEnd(l),!(i.avail_out=0))},p.prototype.onData=function(e){this.chunks.push(e)},p.prototype.onEnd=function(e){e===l&&("string"===this.options.to?this.result=this.chunks.join(""):this.result=o.flattenChunks(this.chunks)),this.chunks=[],this.err=e,this.msg=this.strm.msg},r.Deflate=p,r.deflate=n,r.deflateRaw=function(e,t){return(t=t||{}).raw=!0,n(e,t)},r.gzip=function(e,t){return(t=t||{}).gzip=!0,n(e,t)}},{"./utils/common":41,"./utils/strings":42,"./zlib/deflate":46,"./zlib/messages":51,"./zlib/zstream":53}],40:[function(e,t,r){"use strict";var c=e("./zlib/inflate"),d=e("./utils/common"),p=e("./utils/strings"),m=e("./zlib/constants"),n=e("./zlib/messages"),i=e("./zlib/zstream"),s=e("./zlib/gzheader"),_=Object.prototype.toString;function a(e){if(!(this instanceof a))return new a(e);this.options=d.assign({chunkSize:16384,windowBits:0,to:""},e||{});var t=this.options;t.raw&&0<=t.windowBits&&t.windowBits<16&&(t.windowBits=-t.windowBits,0===t.windowBits&&(t.windowBits=-15)),!(0<=t.windowBits&&t.windowBits<16)||e&&e.windowBits||(t.windowBits+=32),15<t.windowBits&&t.windowBits<48&&0==(15&t.windowBits)&&(t.windowBits|=15),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new i,this.strm.avail_out=0;var r=c.inflateInit2(this.strm,t.windowBits);if(r!==m.Z_OK)throw new Error(n[r]);this.header=new s,c.inflateGetHeader(this.strm,this.header)}function o(e,t){var r=new a(t);if(r.push(e,!0),r.err)throw r.msg||n[r.err];return r.result}a.prototype.push=function(e,t){var r,n,i,s,a,o,h=this.strm,u=this.options.chunkSize,l=this.options.dictionary,f=!1;if(this.ended)return!1;n=t===~~t?t:!0===t?m.Z_FINISH:m.Z_NO_FLUSH,"string"==typeof e?h.input=p.binstring2buf(e):"[object ArrayBuffer]"===_.call(e)?h.input=new Uint8Array(e):h.input=e,h.next_in=0,h.avail_in=h.input.length;do{if(0===h.avail_out&&(h.output=new d.Buf8(u),h.next_out=0,h.avail_out=u),(r=c.inflate(h,m.Z_NO_FLUSH))===m.Z_NEED_DICT&&l&&(o="string"==typeof l?p.string2buf(l):"[object ArrayBuffer]"===_.call(l)?new Uint8Array(l):l,r=c.inflateSetDictionary(this.strm,o)),r===m.Z_BUF_ERROR&&!0===f&&(r=m.Z_OK,f=!1),r!==m.Z_STREAM_END&&r!==m.Z_OK)return this.onEnd(r),!(this.ended=!0);h.next_out&&(0!==h.avail_out&&r!==m.Z_STREAM_END&&(0!==h.avail_in||n!==m.Z_FINISH&&n!==m.Z_SYNC_FLUSH)||("string"===this.options.to?(i=p.utf8border(h.output,h.next_out),s=h.next_out-i,a=p.buf2string(h.output,i),h.next_out=s,h.avail_out=u-s,s&&d.arraySet(h.output,h.output,i,s,0),this.onData(a)):this.onData(d.shrinkBuf(h.output,h.next_out)))),0===h.avail_in&&0===h.avail_out&&(f=!0)}while((0<h.avail_in||0===h.avail_out)&&r!==m.Z_STREAM_END);return r===m.Z_STREAM_END&&(n=m.Z_FINISH),n===m.Z_FINISH?(r=c.inflateEnd(this.strm),this.onEnd(r),this.ended=!0,r===m.Z_OK):n!==m.Z_SYNC_FLUSH||(this.onEnd(m.Z_OK),!(h.avail_out=0))},a.prototype.onData=function(e){this.chunks.push(e)},a.prototype.onEnd=function(e){e===m.Z_OK&&("string"===this.options.to?this.result=this.chunks.join(""):this.result=d.flattenChunks(this.chunks)),this.chunks=[],this.err=e,this.msg=this.strm.msg},r.Inflate=a,r.inflate=o,r.inflateRaw=function(e,t){return(t=t||{}).raw=!0,o(e,t)},r.ungzip=o},{"./utils/common":41,"./utils/strings":42,"./zlib/constants":44,"./zlib/gzheader":47,"./zlib/inflate":49,"./zlib/messages":51,"./zlib/zstream":53}],41:[function(e,t,r){"use strict";var n="undefined"!=typeof Uint8Array&&"undefined"!=typeof Uint16Array&&"undefined"!=typeof Int32Array;r.assign=function(e){for(var t=Array.prototype.slice.call(arguments,1);t.length;){var r=t.shift();if(r){if("object"!=typeof r)throw new TypeError(r+"must be non-object");for(var n in r)r.hasOwnProperty(n)&&(e[n]=r[n])}}return e},r.shrinkBuf=function(e,t){return e.length===t?e:e.subarray?e.subarray(0,t):(e.length=t,e)};var i={arraySet:function(e,t,r,n,i){if(t.subarray&&e.subarray)e.set(t.subarray(r,r+n),i);else for(var s=0;s<n;s++)e[i+s]=t[r+s]},flattenChunks:function(e){var t,r,n,i,s,a;for(t=n=0,r=e.length;t<r;t++)n+=e[t].length;for(a=new Uint8Array(n),t=i=0,r=e.length;t<r;t++)s=e[t],a.set(s,i),i+=s.length;return a}},s={arraySet:function(e,t,r,n,i){for(var s=0;s<n;s++)e[i+s]=t[r+s]},flattenChunks:function(e){return[].concat.apply([],e)}};r.setTyped=function(e){e?(r.Buf8=Uint8Array,r.Buf16=Uint16Array,r.Buf32=Int32Array,r.assign(r,i)):(r.Buf8=Array,r.Buf16=Array,r.Buf32=Array,r.assign(r,s))},r.setTyped(n)},{}],42:[function(e,t,r){"use strict";var h=e("./common"),i=!0,s=!0;try{String.fromCharCode.apply(null,[0])}catch(e){i=!1}try{String.fromCharCode.apply(null,new Uint8Array(1))}catch(e){s=!1}for(var u=new h.Buf8(256),n=0;n<256;n++)u[n]=252<=n?6:248<=n?5:240<=n?4:224<=n?3:192<=n?2:1;function l(e,t){if(t<65537&&(e.subarray&&s||!e.subarray&&i))return String.fromCharCode.apply(null,h.shrinkBuf(e,t));for(var r="",n=0;n<t;n++)r+=String.fromCharCode(e[n]);return r}u[254]=u[254]=1,r.string2buf=function(e){var t,r,n,i,s,a=e.length,o=0;for(i=0;i<a;i++)55296==(64512&(r=e.charCodeAt(i)))&&i+1<a&&56320==(64512&(n=e.charCodeAt(i+1)))&&(r=65536+(r-55296<<10)+(n-56320),i++),o+=r<128?1:r<2048?2:r<65536?3:4;for(t=new h.Buf8(o),i=s=0;s<o;i++)55296==(64512&(r=e.charCodeAt(i)))&&i+1<a&&56320==(64512&(n=e.charCodeAt(i+1)))&&(r=65536+(r-55296<<10)+(n-56320),i++),r<128?t[s++]=r:(r<2048?t[s++]=192|r>>>6:(r<65536?t[s++]=224|r>>>12:(t[s++]=240|r>>>18,t[s++]=128|r>>>12&63),t[s++]=128|r>>>6&63),t[s++]=128|63&r);return t},r.buf2binstring=function(e){return l(e,e.length)},r.binstring2buf=function(e){for(var t=new h.Buf8(e.length),r=0,n=t.length;r<n;r++)t[r]=e.charCodeAt(r);return t},r.buf2string=function(e,t){var r,n,i,s,a=t||e.length,o=new Array(2*a);for(r=n=0;r<a;)if((i=e[r++])<128)o[n++]=i;else if(4<(s=u[i]))o[n++]=65533,r+=s-1;else{for(i&=2===s?31:3===s?15:7;1<s&&r<a;)i=i<<6|63&e[r++],s--;1<s?o[n++]=65533:i<65536?o[n++]=i:(i-=65536,o[n++]=55296|i>>10&1023,o[n++]=56320|1023&i)}return l(o,n)},r.utf8border=function(e,t){var r;for((t=t||e.length)>e.length&&(t=e.length),r=t-1;0<=r&&128==(192&e[r]);)r--;return r<0?t:0===r?t:r+u[e[r]]>t?r:t}},{"./common":41}],43:[function(e,t,r){"use strict";t.exports=function(e,t,r,n){for(var i=65535&e|0,s=e>>>16&65535|0,a=0;0!==r;){for(r-=a=2e3<r?2e3:r;s=s+(i=i+t[n++]|0)|0,--a;);i%=65521,s%=65521}return i|s<<16|0}},{}],44:[function(e,t,r){"use strict";t.exports={Z_NO_FLUSH:0,Z_PARTIAL_FLUSH:1,Z_SYNC_FLUSH:2,Z_FULL_FLUSH:3,Z_FINISH:4,Z_BLOCK:5,Z_TREES:6,Z_OK:0,Z_STREAM_END:1,Z_NEED_DICT:2,Z_ERRNO:-1,Z_STREAM_ERROR:-2,Z_DATA_ERROR:-3,Z_BUF_ERROR:-5,Z_NO_COMPRESSION:0,Z_BEST_SPEED:1,Z_BEST_COMPRESSION:9,Z_DEFAULT_COMPRESSION:-1,Z_FILTERED:1,Z_HUFFMAN_ONLY:2,Z_RLE:3,Z_FIXED:4,Z_DEFAULT_STRATEGY:0,Z_BINARY:0,Z_TEXT:1,Z_UNKNOWN:2,Z_DEFLATED:8}},{}],45:[function(e,t,r){"use strict";var o=function(){for(var e,t=[],r=0;r<256;r++){e=r;for(var n=0;n<8;n++)e=1&e?3988292384^e>>>1:e>>>1;t[r]=e}return t}();t.exports=function(e,t,r,n){var i=o,s=n+r;e^=-1;for(var a=n;a<s;a++)e=e>>>8^i[255&(e^t[a])];return-1^e}},{}],46:[function(e,t,r){"use strict";var h,c=e("../utils/common"),u=e("./trees"),d=e("./adler32"),p=e("./crc32"),n=e("./messages"),l=0,f=4,m=0,_=-2,g=-1,b=4,i=2,v=8,y=9,s=286,a=30,o=19,w=2*s+1,k=15,x=3,S=258,z=S+x+1,C=42,E=113,A=1,I=2,O=3,B=4;function R(e,t){return e.msg=n[t],t}function T(e){return(e<<1)-(4<e?9:0)}function D(e){for(var t=e.length;0<=--t;)e[t]=0}function F(e){var t=e.state,r=t.pending;r>e.avail_out&&(r=e.avail_out),0!==r&&(c.arraySet(e.output,t.pending_buf,t.pending_out,r,e.next_out),e.next_out+=r,t.pending_out+=r,e.total_out+=r,e.avail_out-=r,t.pending-=r,0===t.pending&&(t.pending_out=0))}function N(e,t){u._tr_flush_block(e,0<=e.block_start?e.block_start:-1,e.strstart-e.block_start,t),e.block_start=e.strstart,F(e.strm)}function U(e,t){e.pending_buf[e.pending++]=t}function P(e,t){e.pending_buf[e.pending++]=t>>>8&255,e.pending_buf[e.pending++]=255&t}function L(e,t){var r,n,i=e.max_chain_length,s=e.strstart,a=e.prev_length,o=e.nice_match,h=e.strstart>e.w_size-z?e.strstart-(e.w_size-z):0,u=e.window,l=e.w_mask,f=e.prev,c=e.strstart+S,d=u[s+a-1],p=u[s+a];e.prev_length>=e.good_match&&(i>>=2),o>e.lookahead&&(o=e.lookahead);do{if(u[(r=t)+a]===p&&u[r+a-1]===d&&u[r]===u[s]&&u[++r]===u[s+1]){s+=2,r++;do{}while(u[++s]===u[++r]&&u[++s]===u[++r]&&u[++s]===u[++r]&&u[++s]===u[++r]&&u[++s]===u[++r]&&u[++s]===u[++r]&&u[++s]===u[++r]&&u[++s]===u[++r]&&s<c);if(n=S-(c-s),s=c-S,a<n){if(e.match_start=t,o<=(a=n))break;d=u[s+a-1],p=u[s+a]}}}while((t=f[t&l])>h&&0!=--i);return a<=e.lookahead?a:e.lookahead}function j(e){var t,r,n,i,s,a,o,h,u,l,f=e.w_size;do{if(i=e.window_size-e.lookahead-e.strstart,e.strstart>=f+(f-z)){for(c.arraySet(e.window,e.window,f,f,0),e.match_start-=f,e.strstart-=f,e.block_start-=f,t=r=e.hash_size;n=e.head[--t],e.head[t]=f<=n?n-f:0,--r;);for(t=r=f;n=e.prev[--t],e.prev[t]=f<=n?n-f:0,--r;);i+=f}if(0===e.strm.avail_in)break;if(a=e.strm,o=e.window,h=e.strstart+e.lookahead,u=i,l=void 0,l=a.avail_in,u<l&&(l=u),r=0===l?0:(a.avail_in-=l,c.arraySet(o,a.input,a.next_in,l,h),1===a.state.wrap?a.adler=d(a.adler,o,l,h):2===a.state.wrap&&(a.adler=p(a.adler,o,l,h)),a.next_in+=l,a.total_in+=l,l),e.lookahead+=r,e.lookahead+e.insert>=x)for(s=e.strstart-e.insert,e.ins_h=e.window[s],e.ins_h=(e.ins_h<<e.hash_shift^e.window[s+1])&e.hash_mask;e.insert&&(e.ins_h=(e.ins_h<<e.hash_shift^e.window[s+x-1])&e.hash_mask,e.prev[s&e.w_mask]=e.head[e.ins_h],e.head[e.ins_h]=s,s++,e.insert--,!(e.lookahead+e.insert<x)););}while(e.lookahead<z&&0!==e.strm.avail_in)}function Z(e,t){for(var r,n;;){if(e.lookahead<z){if(j(e),e.lookahead<z&&t===l)return A;if(0===e.lookahead)break}if(r=0,e.lookahead>=x&&(e.ins_h=(e.ins_h<<e.hash_shift^e.window[e.strstart+x-1])&e.hash_mask,r=e.prev[e.strstart&e.w_mask]=e.head[e.ins_h],e.head[e.ins_h]=e.strstart),0!==r&&e.strstart-r<=e.w_size-z&&(e.match_length=L(e,r)),e.match_length>=x)if(n=u._tr_tally(e,e.strstart-e.match_start,e.match_length-x),e.lookahead-=e.match_length,e.match_length<=e.max_lazy_match&&e.lookahead>=x){for(e.match_length--;e.strstart++,e.ins_h=(e.ins_h<<e.hash_shift^e.window[e.strstart+x-1])&e.hash_mask,r=e.prev[e.strstart&e.w_mask]=e.head[e.ins_h],e.head[e.ins_h]=e.strstart,0!=--e.match_length;);e.strstart++}else e.strstart+=e.match_length,e.match_length=0,e.ins_h=e.window[e.strstart],e.ins_h=(e.ins_h<<e.hash_shift^e.window[e.strstart+1])&e.hash_mask;else n=u._tr_tally(e,0,e.window[e.strstart]),e.lookahead--,e.strstart++;if(n&&(N(e,!1),0===e.strm.avail_out))return A}return e.insert=e.strstart<x-1?e.strstart:x-1,t===f?(N(e,!0),0===e.strm.avail_out?O:B):e.last_lit&&(N(e,!1),0===e.strm.avail_out)?A:I}function W(e,t){for(var r,n,i;;){if(e.lookahead<z){if(j(e),e.lookahead<z&&t===l)return A;if(0===e.lookahead)break}if(r=0,e.lookahead>=x&&(e.ins_h=(e.ins_h<<e.hash_shift^e.window[e.strstart+x-1])&e.hash_mask,r=e.prev[e.strstart&e.w_mask]=e.head[e.ins_h],e.head[e.ins_h]=e.strstart),e.prev_length=e.match_length,e.prev_match=e.match_start,e.match_length=x-1,0!==r&&e.prev_length<e.max_lazy_match&&e.strstart-r<=e.w_size-z&&(e.match_length=L(e,r),e.match_length<=5&&(1===e.strategy||e.match_length===x&&4096<e.strstart-e.match_start)&&(e.match_length=x-1)),e.prev_length>=x&&e.match_length<=e.prev_length){for(i=e.strstart+e.lookahead-x,n=u._tr_tally(e,e.strstart-1-e.prev_match,e.prev_length-x),e.lookahead-=e.prev_length-1,e.prev_length-=2;++e.strstart<=i&&(e.ins_h=(e.ins_h<<e.hash_shift^e.window[e.strstart+x-1])&e.hash_mask,r=e.prev[e.strstart&e.w_mask]=e.head[e.ins_h],e.head[e.ins_h]=e.strstart),0!=--e.prev_length;);if(e.match_available=0,e.match_length=x-1,e.strstart++,n&&(N(e,!1),0===e.strm.avail_out))return A}else if(e.match_available){if((n=u._tr_tally(e,0,e.window[e.strstart-1]))&&N(e,!1),e.strstart++,e.lookahead--,0===e.strm.avail_out)return A}else e.match_available=1,e.strstart++,e.lookahead--}return e.match_available&&(n=u._tr_tally(e,0,e.window[e.strstart-1]),e.match_available=0),e.insert=e.strstart<x-1?e.strstart:x-1,t===f?(N(e,!0),0===e.strm.avail_out?O:B):e.last_lit&&(N(e,!1),0===e.strm.avail_out)?A:I}function M(e,t,r,n,i){this.good_length=e,this.max_lazy=t,this.nice_length=r,this.max_chain=n,this.func=i}function H(){this.strm=null,this.status=0,this.pending_buf=null,this.pending_buf_size=0,this.pending_out=0,this.pending=0,this.wrap=0,this.gzhead=null,this.gzindex=0,this.method=v,this.last_flush=-1,this.w_size=0,this.w_bits=0,this.w_mask=0,this.window=null,this.window_size=0,this.prev=null,this.head=null,this.ins_h=0,this.hash_size=0,this.hash_bits=0,this.hash_mask=0,this.hash_shift=0,this.block_start=0,this.match_length=0,this.prev_match=0,this.match_available=0,this.strstart=0,this.match_start=0,this.lookahead=0,this.prev_length=0,this.max_chain_length=0,this.max_lazy_match=0,this.level=0,this.strategy=0,this.good_match=0,this.nice_match=0,this.dyn_ltree=new c.Buf16(2*w),this.dyn_dtree=new c.Buf16(2*(2*a+1)),this.bl_tree=new c.Buf16(2*(2*o+1)),D(this.dyn_ltree),D(this.dyn_dtree),D(this.bl_tree),this.l_desc=null,this.d_desc=null,this.bl_desc=null,this.bl_count=new c.Buf16(k+1),this.heap=new c.Buf16(2*s+1),D(this.heap),this.heap_len=0,this.heap_max=0,this.depth=new c.Buf16(2*s+1),D(this.depth),this.l_buf=0,this.lit_bufsize=0,this.last_lit=0,this.d_buf=0,this.opt_len=0,this.static_len=0,this.matches=0,this.insert=0,this.bi_buf=0,this.bi_valid=0}function G(e){var t;return e&&e.state?(e.total_in=e.total_out=0,e.data_type=i,(t=e.state).pending=0,t.pending_out=0,t.wrap<0&&(t.wrap=-t.wrap),t.status=t.wrap?C:E,e.adler=2===t.wrap?0:1,t.last_flush=l,u._tr_init(t),m):R(e,_)}function K(e){var t=G(e);return t===m&&function(e){e.window_size=2*e.w_size,D(e.head),e.max_lazy_match=h[e.level].max_lazy,e.good_match=h[e.level].good_length,e.nice_match=h[e.level].nice_length,e.max_chain_length=h[e.level].max_chain,e.strstart=0,e.block_start=0,e.lookahead=0,e.insert=0,e.match_length=e.prev_length=x-1,e.match_available=0,e.ins_h=0}(e.state),t}function Y(e,t,r,n,i,s){if(!e)return _;var a=1;if(t===g&&(t=6),n<0?(a=0,n=-n):15<n&&(a=2,n-=16),i<1||y<i||r!==v||n<8||15<n||t<0||9<t||s<0||b<s)return R(e,_);8===n&&(n=9);var o=new H;return(e.state=o).strm=e,o.wrap=a,o.gzhead=null,o.w_bits=n,o.w_size=1<<o.w_bits,o.w_mask=o.w_size-1,o.hash_bits=i+7,o.hash_size=1<<o.hash_bits,o.hash_mask=o.hash_size-1,o.hash_shift=~~((o.hash_bits+x-1)/x),o.window=new c.Buf8(2*o.w_size),o.head=new c.Buf16(o.hash_size),o.prev=new c.Buf16(o.w_size),o.lit_bufsize=1<<i+6,o.pending_buf_size=4*o.lit_bufsize,o.pending_buf=new c.Buf8(o.pending_buf_size),o.d_buf=1*o.lit_bufsize,o.l_buf=3*o.lit_bufsize,o.level=t,o.strategy=s,o.method=r,K(e)}h=[new M(0,0,0,0,function(e,t){var r=65535;for(r>e.pending_buf_size-5&&(r=e.pending_buf_size-5);;){if(e.lookahead<=1){if(j(e),0===e.lookahead&&t===l)return A;if(0===e.lookahead)break}e.strstart+=e.lookahead,e.lookahead=0;var n=e.block_start+r;if((0===e.strstart||e.strstart>=n)&&(e.lookahead=e.strstart-n,e.strstart=n,N(e,!1),0===e.strm.avail_out))return A;if(e.strstart-e.block_start>=e.w_size-z&&(N(e,!1),0===e.strm.avail_out))return A}return e.insert=0,t===f?(N(e,!0),0===e.strm.avail_out?O:B):(e.strstart>e.block_start&&(N(e,!1),e.strm.avail_out),A)}),new M(4,4,8,4,Z),new M(4,5,16,8,Z),new M(4,6,32,32,Z),new M(4,4,16,16,W),new M(8,16,32,32,W),new M(8,16,128,128,W),new M(8,32,128,256,W),new M(32,128,258,1024,W),new M(32,258,258,4096,W)],r.deflateInit=function(e,t){return Y(e,t,v,15,8,0)},r.deflateInit2=Y,r.deflateReset=K,r.deflateResetKeep=G,r.deflateSetHeader=function(e,t){return e&&e.state?2!==e.state.wrap?_:(e.state.gzhead=t,m):_},r.deflate=function(e,t){var r,n,i,s;if(!e||!e.state||5<t||t<0)return e?R(e,_):_;if(n=e.state,!e.output||!e.input&&0!==e.avail_in||666===n.status&&t!==f)return R(e,0===e.avail_out?-5:_);if(n.strm=e,r=n.last_flush,n.last_flush=t,n.status===C)if(2===n.wrap)e.adler=0,U(n,31),U(n,139),U(n,8),n.gzhead?(U(n,(n.gzhead.text?1:0)+(n.gzhead.hcrc?2:0)+(n.gzhead.extra?4:0)+(n.gzhead.name?8:0)+(n.gzhead.comment?16:0)),U(n,255&n.gzhead.time),U(n,n.gzhead.time>>8&255),U(n,n.gzhead.time>>16&255),U(n,n.gzhead.time>>24&255),U(n,9===n.level?2:2<=n.strategy||n.level<2?4:0),U(n,255&n.gzhead.os),n.gzhead.extra&&n.gzhead.extra.length&&(U(n,255&n.gzhead.extra.length),U(n,n.gzhead.extra.length>>8&255)),n.gzhead.hcrc&&(e.adler=p(e.adler,n.pending_buf,n.pending,0)),n.gzindex=0,n.status=69):(U(n,0),U(n,0),U(n,0),U(n,0),U(n,0),U(n,9===n.level?2:2<=n.strategy||n.level<2?4:0),U(n,3),n.status=E);else{var a=v+(n.w_bits-8<<4)<<8;a|=(2<=n.strategy||n.level<2?0:n.level<6?1:6===n.level?2:3)<<6,0!==n.strstart&&(a|=32),a+=31-a%31,n.status=E,P(n,a),0!==n.strstart&&(P(n,e.adler>>>16),P(n,65535&e.adler)),e.adler=1}if(69===n.status)if(n.gzhead.extra){for(i=n.pending;n.gzindex<(65535&n.gzhead.extra.length)&&(n.pending!==n.pending_buf_size||(n.gzhead.hcrc&&n.pending>i&&(e.adler=p(e.adler,n.pending_buf,n.pending-i,i)),F(e),i=n.pending,n.pending!==n.pending_buf_size));)U(n,255&n.gzhead.extra[n.gzindex]),n.gzindex++;n.gzhead.hcrc&&n.pending>i&&(e.adler=p(e.adler,n.pending_buf,n.pending-i,i)),n.gzindex===n.gzhead.extra.length&&(n.gzindex=0,n.status=73)}else n.status=73;if(73===n.status)if(n.gzhead.name){i=n.pending;do{if(n.pending===n.pending_buf_size&&(n.gzhead.hcrc&&n.pending>i&&(e.adler=p(e.adler,n.pending_buf,n.pending-i,i)),F(e),i=n.pending,n.pending===n.pending_buf_size)){s=1;break}s=n.gzindex<n.gzhead.name.length?255&n.gzhead.name.charCodeAt(n.gzindex++):0,U(n,s)}while(0!==s);n.gzhead.hcrc&&n.pending>i&&(e.adler=p(e.adler,n.pending_buf,n.pending-i,i)),0===s&&(n.gzindex=0,n.status=91)}else n.status=91;if(91===n.status)if(n.gzhead.comment){i=n.pending;do{if(n.pending===n.pending_buf_size&&(n.gzhead.hcrc&&n.pending>i&&(e.adler=p(e.adler,n.pending_buf,n.pending-i,i)),F(e),i=n.pending,n.pending===n.pending_buf_size)){s=1;break}s=n.gzindex<n.gzhead.comment.length?255&n.gzhead.comment.charCodeAt(n.gzindex++):0,U(n,s)}while(0!==s);n.gzhead.hcrc&&n.pending>i&&(e.adler=p(e.adler,n.pending_buf,n.pending-i,i)),0===s&&(n.status=103)}else n.status=103;if(103===n.status&&(n.gzhead.hcrc?(n.pending+2>n.pending_buf_size&&F(e),n.pending+2<=n.pending_buf_size&&(U(n,255&e.adler),U(n,e.adler>>8&255),e.adler=0,n.status=E)):n.status=E),0!==n.pending){if(F(e),0===e.avail_out)return n.last_flush=-1,m}else if(0===e.avail_in&&T(t)<=T(r)&&t!==f)return R(e,-5);if(666===n.status&&0!==e.avail_in)return R(e,-5);if(0!==e.avail_in||0!==n.lookahead||t!==l&&666!==n.status){var o=2===n.strategy?function(e,t){for(var r;;){if(0===e.lookahead&&(j(e),0===e.lookahead)){if(t===l)return A;break}if(e.match_length=0,r=u._tr_tally(e,0,e.window[e.strstart]),e.lookahead--,e.strstart++,r&&(N(e,!1),0===e.strm.avail_out))return A}return e.insert=0,t===f?(N(e,!0),0===e.strm.avail_out?O:B):e.last_lit&&(N(e,!1),0===e.strm.avail_out)?A:I}(n,t):3===n.strategy?function(e,t){for(var r,n,i,s,a=e.window;;){if(e.lookahead<=S){if(j(e),e.lookahead<=S&&t===l)return A;if(0===e.lookahead)break}if(e.match_length=0,e.lookahead>=x&&0<e.strstart&&(n=a[i=e.strstart-1])===a[++i]&&n===a[++i]&&n===a[++i]){s=e.strstart+S;do{}while(n===a[++i]&&n===a[++i]&&n===a[++i]&&n===a[++i]&&n===a[++i]&&n===a[++i]&&n===a[++i]&&n===a[++i]&&i<s);e.match_length=S-(s-i),e.match_length>e.lookahead&&(e.match_length=e.lookahead)}if(e.match_length>=x?(r=u._tr_tally(e,1,e.match_length-x),e.lookahead-=e.match_length,e.strstart+=e.match_length,e.match_length=0):(r=u._tr_tally(e,0,e.window[e.strstart]),e.lookahead--,e.strstart++),r&&(N(e,!1),0===e.strm.avail_out))return A}return e.insert=0,t===f?(N(e,!0),0===e.strm.avail_out?O:B):e.last_lit&&(N(e,!1),0===e.strm.avail_out)?A:I}(n,t):h[n.level].func(n,t);if(o!==O&&o!==B||(n.status=666),o===A||o===O)return 0===e.avail_out&&(n.last_flush=-1),m;if(o===I&&(1===t?u._tr_align(n):5!==t&&(u._tr_stored_block(n,0,0,!1),3===t&&(D(n.head),0===n.lookahead&&(n.strstart=0,n.block_start=0,n.insert=0))),F(e),0===e.avail_out))return n.last_flush=-1,m}return t!==f?m:n.wrap<=0?1:(2===n.wrap?(U(n,255&e.adler),U(n,e.adler>>8&255),U(n,e.adler>>16&255),U(n,e.adler>>24&255),U(n,255&e.total_in),U(n,e.total_in>>8&255),U(n,e.total_in>>16&255),U(n,e.total_in>>24&255)):(P(n,e.adler>>>16),P(n,65535&e.adler)),F(e),0<n.wrap&&(n.wrap=-n.wrap),0!==n.pending?m:1)},r.deflateEnd=function(e){var t;return e&&e.state?(t=e.state.status)!==C&&69!==t&&73!==t&&91!==t&&103!==t&&t!==E&&666!==t?R(e,_):(e.state=null,t===E?R(e,-3):m):_},r.deflateSetDictionary=function(e,t){var r,n,i,s,a,o,h,u,l=t.length;if(!e||!e.state)return _;if(2===(s=(r=e.state).wrap)||1===s&&r.status!==C||r.lookahead)return _;for(1===s&&(e.adler=d(e.adler,t,l,0)),r.wrap=0,l>=r.w_size&&(0===s&&(D(r.head),r.strstart=0,r.block_start=0,r.insert=0),u=new c.Buf8(r.w_size),c.arraySet(u,t,l-r.w_size,r.w_size,0),t=u,l=r.w_size),a=e.avail_in,o=e.next_in,h=e.input,e.avail_in=l,e.next_in=0,e.input=t,j(r);r.lookahead>=x;){for(n=r.strstart,i=r.lookahead-(x-1);r.ins_h=(r.ins_h<<r.hash_shift^r.window[n+x-1])&r.hash_mask,r.prev[n&r.w_mask]=r.head[r.ins_h],r.head[r.ins_h]=n,n++,--i;);r.strstart=n,r.lookahead=x-1,j(r)}return r.strstart+=r.lookahead,r.block_start=r.strstart,r.insert=r.lookahead,r.lookahead=0,r.match_length=r.prev_length=x-1,r.match_available=0,e.next_in=o,e.input=h,e.avail_in=a,r.wrap=s,m},r.deflateInfo="pako deflate (from Nodeca project)"},{"../utils/common":41,"./adler32":43,"./crc32":45,"./messages":51,"./trees":52}],47:[function(e,t,r){"use strict";t.exports=function(){this.text=0,this.time=0,this.xflags=0,this.os=0,this.extra=null,this.extra_len=0,this.name="",this.comment="",this.hcrc=0,this.done=!1}},{}],48:[function(e,t,r){"use strict";t.exports=function(e,t){var r,n,i,s,a,o,h,u,l,f,c,d,p,m,_,g,b,v,y,w,k,x,S,z,C;r=e.state,n=e.next_in,z=e.input,i=n+(e.avail_in-5),s=e.next_out,C=e.output,a=s-(t-e.avail_out),o=s+(e.avail_out-257),h=r.dmax,u=r.wsize,l=r.whave,f=r.wnext,c=r.window,d=r.hold,p=r.bits,m=r.lencode,_=r.distcode,g=(1<<r.lenbits)-1,b=(1<<r.distbits)-1;e:do{p<15&&(d+=z[n++]<<p,p+=8,d+=z[n++]<<p,p+=8),v=m[d&g];t:for(;;){if(d>>>=y=v>>>24,p-=y,0===(y=v>>>16&255))C[s++]=65535&v;else{if(!(16&y)){if(0==(64&y)){v=m[(65535&v)+(d&(1<<y)-1)];continue t}if(32&y){r.mode=12;break e}e.msg="invalid literal/length code",r.mode=30;break e}w=65535&v,(y&=15)&&(p<y&&(d+=z[n++]<<p,p+=8),w+=d&(1<<y)-1,d>>>=y,p-=y),p<15&&(d+=z[n++]<<p,p+=8,d+=z[n++]<<p,p+=8),v=_[d&b];r:for(;;){if(d>>>=y=v>>>24,p-=y,!(16&(y=v>>>16&255))){if(0==(64&y)){v=_[(65535&v)+(d&(1<<y)-1)];continue r}e.msg="invalid distance code",r.mode=30;break e}if(k=65535&v,p<(y&=15)&&(d+=z[n++]<<p,(p+=8)<y&&(d+=z[n++]<<p,p+=8)),h<(k+=d&(1<<y)-1)){e.msg="invalid distance too far back",r.mode=30;break e}if(d>>>=y,p-=y,(y=s-a)<k){if(l<(y=k-y)&&r.sane){e.msg="invalid distance too far back",r.mode=30;break e}if(S=c,(x=0)===f){if(x+=u-y,y<w){for(w-=y;C[s++]=c[x++],--y;);x=s-k,S=C}}else if(f<y){if(x+=u+f-y,(y-=f)<w){for(w-=y;C[s++]=c[x++],--y;);if(x=0,f<w){for(w-=y=f;C[s++]=c[x++],--y;);x=s-k,S=C}}}else if(x+=f-y,y<w){for(w-=y;C[s++]=c[x++],--y;);x=s-k,S=C}for(;2<w;)C[s++]=S[x++],C[s++]=S[x++],C[s++]=S[x++],w-=3;w&&(C[s++]=S[x++],1<w&&(C[s++]=S[x++]))}else{for(x=s-k;C[s++]=C[x++],C[s++]=C[x++],C[s++]=C[x++],2<(w-=3););w&&(C[s++]=C[x++],1<w&&(C[s++]=C[x++]))}break}}break}}while(n<i&&s<o);n-=w=p>>3,d&=(1<<(p-=w<<3))-1,e.next_in=n,e.next_out=s,e.avail_in=n<i?i-n+5:5-(n-i),e.avail_out=s<o?o-s+257:257-(s-o),r.hold=d,r.bits=p}},{}],49:[function(e,t,r){"use strict";var I=e("../utils/common"),O=e("./adler32"),B=e("./crc32"),R=e("./inffast"),T=e("./inftrees"),D=1,F=2,N=0,U=-2,P=1,n=852,i=592;function L(e){return(e>>>24&255)+(e>>>8&65280)+((65280&e)<<8)+((255&e)<<24)}function s(){this.mode=0,this.last=!1,this.wrap=0,this.havedict=!1,this.flags=0,this.dmax=0,this.check=0,this.total=0,this.head=null,this.wbits=0,this.wsize=0,this.whave=0,this.wnext=0,this.window=null,this.hold=0,this.bits=0,this.length=0,this.offset=0,this.extra=0,this.lencode=null,this.distcode=null,this.lenbits=0,this.distbits=0,this.ncode=0,this.nlen=0,this.ndist=0,this.have=0,this.next=null,this.lens=new I.Buf16(320),this.work=new I.Buf16(288),this.lendyn=null,this.distdyn=null,this.sane=0,this.back=0,this.was=0}function a(e){var t;return e&&e.state?(t=e.state,e.total_in=e.total_out=t.total=0,e.msg="",t.wrap&&(e.adler=1&t.wrap),t.mode=P,t.last=0,t.havedict=0,t.dmax=32768,t.head=null,t.hold=0,t.bits=0,t.lencode=t.lendyn=new I.Buf32(n),t.distcode=t.distdyn=new I.Buf32(i),t.sane=1,t.back=-1,N):U}function o(e){var t;return e&&e.state?((t=e.state).wsize=0,t.whave=0,t.wnext=0,a(e)):U}function h(e,t){var r,n;return e&&e.state?(n=e.state,t<0?(r=0,t=-t):(r=1+(t>>4),t<48&&(t&=15)),t&&(t<8||15<t)?U:(null!==n.window&&n.wbits!==t&&(n.window=null),n.wrap=r,n.wbits=t,o(e))):U}function u(e,t){var r,n;return e?(n=new s,(e.state=n).window=null,(r=h(e,t))!==N&&(e.state=null),r):U}var l,f,c=!0;function j(e){if(c){var t;for(l=new I.Buf32(512),f=new I.Buf32(32),t=0;t<144;)e.lens[t++]=8;for(;t<256;)e.lens[t++]=9;for(;t<280;)e.lens[t++]=7;for(;t<288;)e.lens[t++]=8;for(T(D,e.lens,0,288,l,0,e.work,{bits:9}),t=0;t<32;)e.lens[t++]=5;T(F,e.lens,0,32,f,0,e.work,{bits:5}),c=!1}e.lencode=l,e.lenbits=9,e.distcode=f,e.distbits=5}function Z(e,t,r,n){var i,s=e.state;return null===s.window&&(s.wsize=1<<s.wbits,s.wnext=0,s.whave=0,s.window=new I.Buf8(s.wsize)),n>=s.wsize?(I.arraySet(s.window,t,r-s.wsize,s.wsize,0),s.wnext=0,s.whave=s.wsize):(n<(i=s.wsize-s.wnext)&&(i=n),I.arraySet(s.window,t,r-n,i,s.wnext),(n-=i)?(I.arraySet(s.window,t,r-n,n,0),s.wnext=n,s.whave=s.wsize):(s.wnext+=i,s.wnext===s.wsize&&(s.wnext=0),s.whave<s.wsize&&(s.whave+=i))),0}r.inflateReset=o,r.inflateReset2=h,r.inflateResetKeep=a,r.inflateInit=function(e){return u(e,15)},r.inflateInit2=u,r.inflate=function(e,t){var r,n,i,s,a,o,h,u,l,f,c,d,p,m,_,g,b,v,y,w,k,x,S,z,C=0,E=new I.Buf8(4),A=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15];if(!e||!e.state||!e.output||!e.input&&0!==e.avail_in)return U;12===(r=e.state).mode&&(r.mode=13),a=e.next_out,i=e.output,h=e.avail_out,s=e.next_in,n=e.input,o=e.avail_in,u=r.hold,l=r.bits,f=o,c=h,x=N;e:for(;;)switch(r.mode){case P:if(0===r.wrap){r.mode=13;break}for(;l<16;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}if(2&r.wrap&&35615===u){E[r.check=0]=255&u,E[1]=u>>>8&255,r.check=B(r.check,E,2,0),l=u=0,r.mode=2;break}if(r.flags=0,r.head&&(r.head.done=!1),!(1&r.wrap)||(((255&u)<<8)+(u>>8))%31){e.msg="incorrect header check",r.mode=30;break}if(8!=(15&u)){e.msg="unknown compression method",r.mode=30;break}if(l-=4,k=8+(15&(u>>>=4)),0===r.wbits)r.wbits=k;else if(k>r.wbits){e.msg="invalid window size",r.mode=30;break}r.dmax=1<<k,e.adler=r.check=1,r.mode=512&u?10:12,l=u=0;break;case 2:for(;l<16;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}if(r.flags=u,8!=(255&r.flags)){e.msg="unknown compression method",r.mode=30;break}if(57344&r.flags){e.msg="unknown header flags set",r.mode=30;break}r.head&&(r.head.text=u>>8&1),512&r.flags&&(E[0]=255&u,E[1]=u>>>8&255,r.check=B(r.check,E,2,0)),l=u=0,r.mode=3;case 3:for(;l<32;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}r.head&&(r.head.time=u),512&r.flags&&(E[0]=255&u,E[1]=u>>>8&255,E[2]=u>>>16&255,E[3]=u>>>24&255,r.check=B(r.check,E,4,0)),l=u=0,r.mode=4;case 4:for(;l<16;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}r.head&&(r.head.xflags=255&u,r.head.os=u>>8),512&r.flags&&(E[0]=255&u,E[1]=u>>>8&255,r.check=B(r.check,E,2,0)),l=u=0,r.mode=5;case 5:if(1024&r.flags){for(;l<16;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}r.length=u,r.head&&(r.head.extra_len=u),512&r.flags&&(E[0]=255&u,E[1]=u>>>8&255,r.check=B(r.check,E,2,0)),l=u=0}else r.head&&(r.head.extra=null);r.mode=6;case 6:if(1024&r.flags&&(o<(d=r.length)&&(d=o),d&&(r.head&&(k=r.head.extra_len-r.length,r.head.extra||(r.head.extra=new Array(r.head.extra_len)),I.arraySet(r.head.extra,n,s,d,k)),512&r.flags&&(r.check=B(r.check,n,d,s)),o-=d,s+=d,r.length-=d),r.length))break e;r.length=0,r.mode=7;case 7:if(2048&r.flags){if(0===o)break e;for(d=0;k=n[s+d++],r.head&&k&&r.length<65536&&(r.head.name+=String.fromCharCode(k)),k&&d<o;);if(512&r.flags&&(r.check=B(r.check,n,d,s)),o-=d,s+=d,k)break e}else r.head&&(r.head.name=null);r.length=0,r.mode=8;case 8:if(4096&r.flags){if(0===o)break e;for(d=0;k=n[s+d++],r.head&&k&&r.length<65536&&(r.head.comment+=String.fromCharCode(k)),k&&d<o;);if(512&r.flags&&(r.check=B(r.check,n,d,s)),o-=d,s+=d,k)break e}else r.head&&(r.head.comment=null);r.mode=9;case 9:if(512&r.flags){for(;l<16;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}if(u!==(65535&r.check)){e.msg="header crc mismatch",r.mode=30;break}l=u=0}r.head&&(r.head.hcrc=r.flags>>9&1,r.head.done=!0),e.adler=r.check=0,r.mode=12;break;case 10:for(;l<32;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}e.adler=r.check=L(u),l=u=0,r.mode=11;case 11:if(0===r.havedict)return e.next_out=a,e.avail_out=h,e.next_in=s,e.avail_in=o,r.hold=u,r.bits=l,2;e.adler=r.check=1,r.mode=12;case 12:if(5===t||6===t)break e;case 13:if(r.last){u>>>=7&l,l-=7&l,r.mode=27;break}for(;l<3;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}switch(r.last=1&u,l-=1,3&(u>>>=1)){case 0:r.mode=14;break;case 1:if(j(r),r.mode=20,6!==t)break;u>>>=2,l-=2;break e;case 2:r.mode=17;break;case 3:e.msg="invalid block type",r.mode=30}u>>>=2,l-=2;break;case 14:for(u>>>=7&l,l-=7&l;l<32;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}if((65535&u)!=(u>>>16^65535)){e.msg="invalid stored block lengths",r.mode=30;break}if(r.length=65535&u,l=u=0,r.mode=15,6===t)break e;case 15:r.mode=16;case 16:if(d=r.length){if(o<d&&(d=o),h<d&&(d=h),0===d)break e;I.arraySet(i,n,s,d,a),o-=d,s+=d,h-=d,a+=d,r.length-=d;break}r.mode=12;break;case 17:for(;l<14;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}if(r.nlen=257+(31&u),u>>>=5,l-=5,r.ndist=1+(31&u),u>>>=5,l-=5,r.ncode=4+(15&u),u>>>=4,l-=4,286<r.nlen||30<r.ndist){e.msg="too many length or distance symbols",r.mode=30;break}r.have=0,r.mode=18;case 18:for(;r.have<r.ncode;){for(;l<3;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}r.lens[A[r.have++]]=7&u,u>>>=3,l-=3}for(;r.have<19;)r.lens[A[r.have++]]=0;if(r.lencode=r.lendyn,r.lenbits=7,S={bits:r.lenbits},x=T(0,r.lens,0,19,r.lencode,0,r.work,S),r.lenbits=S.bits,x){e.msg="invalid code lengths set",r.mode=30;break}r.have=0,r.mode=19;case 19:for(;r.have<r.nlen+r.ndist;){for(;g=(C=r.lencode[u&(1<<r.lenbits)-1])>>>16&255,b=65535&C,!((_=C>>>24)<=l);){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}if(b<16)u>>>=_,l-=_,r.lens[r.have++]=b;else{if(16===b){for(z=_+2;l<z;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}if(u>>>=_,l-=_,0===r.have){e.msg="invalid bit length repeat",r.mode=30;break}k=r.lens[r.have-1],d=3+(3&u),u>>>=2,l-=2}else if(17===b){for(z=_+3;l<z;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}l-=_,k=0,d=3+(7&(u>>>=_)),u>>>=3,l-=3}else{for(z=_+7;l<z;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}l-=_,k=0,d=11+(127&(u>>>=_)),u>>>=7,l-=7}if(r.have+d>r.nlen+r.ndist){e.msg="invalid bit length repeat",r.mode=30;break}for(;d--;)r.lens[r.have++]=k}}if(30===r.mode)break;if(0===r.lens[256]){e.msg="invalid code -- missing end-of-block",r.mode=30;break}if(r.lenbits=9,S={bits:r.lenbits},x=T(D,r.lens,0,r.nlen,r.lencode,0,r.work,S),r.lenbits=S.bits,x){e.msg="invalid literal/lengths set",r.mode=30;break}if(r.distbits=6,r.distcode=r.distdyn,S={bits:r.distbits},x=T(F,r.lens,r.nlen,r.ndist,r.distcode,0,r.work,S),r.distbits=S.bits,x){e.msg="invalid distances set",r.mode=30;break}if(r.mode=20,6===t)break e;case 20:r.mode=21;case 21:if(6<=o&&258<=h){e.next_out=a,e.avail_out=h,e.next_in=s,e.avail_in=o,r.hold=u,r.bits=l,R(e,c),a=e.next_out,i=e.output,h=e.avail_out,s=e.next_in,n=e.input,o=e.avail_in,u=r.hold,l=r.bits,12===r.mode&&(r.back=-1);break}for(r.back=0;g=(C=r.lencode[u&(1<<r.lenbits)-1])>>>16&255,b=65535&C,!((_=C>>>24)<=l);){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}if(g&&0==(240&g)){for(v=_,y=g,w=b;g=(C=r.lencode[w+((u&(1<<v+y)-1)>>v)])>>>16&255,b=65535&C,!(v+(_=C>>>24)<=l);){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}u>>>=v,l-=v,r.back+=v}if(u>>>=_,l-=_,r.back+=_,r.length=b,0===g){r.mode=26;break}if(32&g){r.back=-1,r.mode=12;break}if(64&g){e.msg="invalid literal/length code",r.mode=30;break}r.extra=15&g,r.mode=22;case 22:if(r.extra){for(z=r.extra;l<z;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}r.length+=u&(1<<r.extra)-1,u>>>=r.extra,l-=r.extra,r.back+=r.extra}r.was=r.length,r.mode=23;case 23:for(;g=(C=r.distcode[u&(1<<r.distbits)-1])>>>16&255,b=65535&C,!((_=C>>>24)<=l);){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}if(0==(240&g)){for(v=_,y=g,w=b;g=(C=r.distcode[w+((u&(1<<v+y)-1)>>v)])>>>16&255,b=65535&C,!(v+(_=C>>>24)<=l);){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}u>>>=v,l-=v,r.back+=v}if(u>>>=_,l-=_,r.back+=_,64&g){e.msg="invalid distance code",r.mode=30;break}r.offset=b,r.extra=15&g,r.mode=24;case 24:if(r.extra){for(z=r.extra;l<z;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}r.offset+=u&(1<<r.extra)-1,u>>>=r.extra,l-=r.extra,r.back+=r.extra}if(r.offset>r.dmax){e.msg="invalid distance too far back",r.mode=30;break}r.mode=25;case 25:if(0===h)break e;if(d=c-h,r.offset>d){if((d=r.offset-d)>r.whave&&r.sane){e.msg="invalid distance too far back",r.mode=30;break}p=d>r.wnext?(d-=r.wnext,r.wsize-d):r.wnext-d,d>r.length&&(d=r.length),m=r.window}else m=i,p=a-r.offset,d=r.length;for(h<d&&(d=h),h-=d,r.length-=d;i[a++]=m[p++],--d;);0===r.length&&(r.mode=21);break;case 26:if(0===h)break e;i[a++]=r.length,h--,r.mode=21;break;case 27:if(r.wrap){for(;l<32;){if(0===o)break e;o--,u|=n[s++]<<l,l+=8}if(c-=h,e.total_out+=c,r.total+=c,c&&(e.adler=r.check=r.flags?B(r.check,i,c,a-c):O(r.check,i,c,a-c)),c=h,(r.flags?u:L(u))!==r.check){e.msg="incorrect data check",r.mode=30;break}l=u=0}r.mode=28;case 28:if(r.wrap&&r.flags){for(;l<32;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}if(u!==(4294967295&r.total)){e.msg="incorrect length check",r.mode=30;break}l=u=0}r.mode=29;case 29:x=1;break e;case 30:x=-3;break e;case 31:return-4;case 32:default:return U}return e.next_out=a,e.avail_out=h,e.next_in=s,e.avail_in=o,r.hold=u,r.bits=l,(r.wsize||c!==e.avail_out&&r.mode<30&&(r.mode<27||4!==t))&&Z(e,e.output,e.next_out,c-e.avail_out)?(r.mode=31,-4):(f-=e.avail_in,c-=e.avail_out,e.total_in+=f,e.total_out+=c,r.total+=c,r.wrap&&c&&(e.adler=r.check=r.flags?B(r.check,i,c,e.next_out-c):O(r.check,i,c,e.next_out-c)),e.data_type=r.bits+(r.last?64:0)+(12===r.mode?128:0)+(20===r.mode||15===r.mode?256:0),(0==f&&0===c||4===t)&&x===N&&(x=-5),x)},r.inflateEnd=function(e){if(!e||!e.state)return U;var t=e.state;return t.window&&(t.window=null),e.state=null,N},r.inflateGetHeader=function(e,t){var r;return e&&e.state?0==(2&(r=e.state).wrap)?U:((r.head=t).done=!1,N):U},r.inflateSetDictionary=function(e,t){var r,n=t.length;return e&&e.state?0!==(r=e.state).wrap&&11!==r.mode?U:11===r.mode&&O(1,t,n,0)!==r.check?-3:Z(e,t,n,n)?(r.mode=31,-4):(r.havedict=1,N):U},r.inflateInfo="pako inflate (from Nodeca project)"},{"../utils/common":41,"./adler32":43,"./crc32":45,"./inffast":48,"./inftrees":50}],50:[function(e,t,r){"use strict";var D=e("../utils/common"),F=[3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,0,0],N=[16,16,16,16,16,16,16,16,17,17,17,17,18,18,18,18,19,19,19,19,20,20,20,20,21,21,21,21,16,72,78],U=[1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577,0,0],P=[16,16,16,16,17,17,18,18,19,19,20,20,21,21,22,22,23,23,24,24,25,25,26,26,27,27,28,28,29,29,64,64];t.exports=function(e,t,r,n,i,s,a,o){var h,u,l,f,c,d,p,m,_,g=o.bits,b=0,v=0,y=0,w=0,k=0,x=0,S=0,z=0,C=0,E=0,A=null,I=0,O=new D.Buf16(16),B=new D.Buf16(16),R=null,T=0;for(b=0;b<=15;b++)O[b]=0;for(v=0;v<n;v++)O[t[r+v]]++;for(k=g,w=15;1<=w&&0===O[w];w--);if(w<k&&(k=w),0===w)return i[s++]=20971520,i[s++]=20971520,o.bits=1,0;for(y=1;y<w&&0===O[y];y++);for(k<y&&(k=y),b=z=1;b<=15;b++)if(z<<=1,(z-=O[b])<0)return-1;if(0<z&&(0===e||1!==w))return-1;for(B[1]=0,b=1;b<15;b++)B[b+1]=B[b]+O[b];for(v=0;v<n;v++)0!==t[r+v]&&(a[B[t[r+v]]++]=v);if(d=0===e?(A=R=a,19):1===e?(A=F,I-=257,R=N,T-=257,256):(A=U,R=P,-1),b=y,c=s,S=v=E=0,l=-1,f=(C=1<<(x=k))-1,1===e&&852<C||2===e&&592<C)return 1;for(;;){for(p=b-S,_=a[v]<d?(m=0,a[v]):a[v]>d?(m=R[T+a[v]],A[I+a[v]]):(m=96,0),h=1<<b-S,y=u=1<<x;i[c+(E>>S)+(u-=h)]=p<<24|m<<16|_|0,0!==u;);for(h=1<<b-1;E&h;)h>>=1;if(0!==h?(E&=h-1,E+=h):E=0,v++,0==--O[b]){if(b===w)break;b=t[r+a[v]]}if(k<b&&(E&f)!==l){for(0===S&&(S=k),c+=y,z=1<<(x=b-S);x+S<w&&!((z-=O[x+S])<=0);)x++,z<<=1;if(C+=1<<x,1===e&&852<C||2===e&&592<C)return 1;i[l=E&f]=k<<24|x<<16|c-s|0}}return 0!==E&&(i[c+E]=b-S<<24|64<<16|0),o.bits=k,0}},{"../utils/common":41}],51:[function(e,t,r){"use strict";t.exports={2:"need dictionary",1:"stream end",0:"","-1":"file error","-2":"stream error","-3":"data error","-4":"insufficient memory","-5":"buffer error","-6":"incompatible version"}},{}],52:[function(e,t,r){"use strict";var i=e("../utils/common"),o=0,h=1;function n(e){for(var t=e.length;0<=--t;)e[t]=0}var s=0,a=29,u=256,l=u+1+a,f=30,c=19,_=2*l+1,g=15,d=16,p=7,m=256,b=16,v=17,y=18,w=[0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0],k=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13],x=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7],S=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15],z=new Array(2*(l+2));n(z);var C=new Array(2*f);n(C);var E=new Array(512);n(E);var A=new Array(256);n(A);var I=new Array(a);n(I);var O,B,R,T=new Array(f);function D(e,t,r,n,i){this.static_tree=e,this.extra_bits=t,this.extra_base=r,this.elems=n,this.max_length=i,this.has_stree=e&&e.length}function F(e,t){this.dyn_tree=e,this.max_code=0,this.stat_desc=t}function N(e){return e<256?E[e]:E[256+(e>>>7)]}function U(e,t){e.pending_buf[e.pending++]=255&t,e.pending_buf[e.pending++]=t>>>8&255}function P(e,t,r){e.bi_valid>d-r?(e.bi_buf|=t<<e.bi_valid&65535,U(e,e.bi_buf),e.bi_buf=t>>d-e.bi_valid,e.bi_valid+=r-d):(e.bi_buf|=t<<e.bi_valid&65535,e.bi_valid+=r)}function L(e,t,r){P(e,r[2*t],r[2*t+1])}function j(e,t){for(var r=0;r|=1&e,e>>>=1,r<<=1,0<--t;);return r>>>1}function Z(e,t,r){var n,i,s=new Array(g+1),a=0;for(n=1;n<=g;n++)s[n]=a=a+r[n-1]<<1;for(i=0;i<=t;i++){var o=e[2*i+1];0!==o&&(e[2*i]=j(s[o]++,o))}}function W(e){var t;for(t=0;t<l;t++)e.dyn_ltree[2*t]=0;for(t=0;t<f;t++)e.dyn_dtree[2*t]=0;for(t=0;t<c;t++)e.bl_tree[2*t]=0;e.dyn_ltree[2*m]=1,e.opt_len=e.static_len=0,e.last_lit=e.matches=0}function M(e){8<e.bi_valid?U(e,e.bi_buf):0<e.bi_valid&&(e.pending_buf[e.pending++]=e.bi_buf),e.bi_buf=0,e.bi_valid=0}function H(e,t,r,n){var i=2*t,s=2*r;return e[i]<e[s]||e[i]===e[s]&&n[t]<=n[r]}function G(e,t,r){for(var n=e.heap[r],i=r<<1;i<=e.heap_len&&(i<e.heap_len&&H(t,e.heap[i+1],e.heap[i],e.depth)&&i++,!H(t,n,e.heap[i],e.depth));)e.heap[r]=e.heap[i],r=i,i<<=1;e.heap[r]=n}function K(e,t,r){var n,i,s,a,o=0;if(0!==e.last_lit)for(;n=e.pending_buf[e.d_buf+2*o]<<8|e.pending_buf[e.d_buf+2*o+1],i=e.pending_buf[e.l_buf+o],o++,0===n?L(e,i,t):(L(e,(s=A[i])+u+1,t),0!==(a=w[s])&&P(e,i-=I[s],a),L(e,s=N(--n),r),0!==(a=k[s])&&P(e,n-=T[s],a)),o<e.last_lit;);L(e,m,t)}function Y(e,t){var r,n,i,s=t.dyn_tree,a=t.stat_desc.static_tree,o=t.stat_desc.has_stree,h=t.stat_desc.elems,u=-1;for(e.heap_len=0,e.heap_max=_,r=0;r<h;r++)0!==s[2*r]?(e.heap[++e.heap_len]=u=r,e.depth[r]=0):s[2*r+1]=0;for(;e.heap_len<2;)s[2*(i=e.heap[++e.heap_len]=u<2?++u:0)]=1,e.depth[i]=0,e.opt_len--,o&&(e.static_len-=a[2*i+1]);for(t.max_code=u,r=e.heap_len>>1;1<=r;r--)G(e,s,r);for(i=h;r=e.heap[1],e.heap[1]=e.heap[e.heap_len--],G(e,s,1),n=e.heap[1],e.heap[--e.heap_max]=r,e.heap[--e.heap_max]=n,s[2*i]=s[2*r]+s[2*n],e.depth[i]=(e.depth[r]>=e.depth[n]?e.depth[r]:e.depth[n])+1,s[2*r+1]=s[2*n+1]=i,e.heap[1]=i++,G(e,s,1),2<=e.heap_len;);e.heap[--e.heap_max]=e.heap[1],function(e,t){var r,n,i,s,a,o,h=t.dyn_tree,u=t.max_code,l=t.stat_desc.static_tree,f=t.stat_desc.has_stree,c=t.stat_desc.extra_bits,d=t.stat_desc.extra_base,p=t.stat_desc.max_length,m=0;for(s=0;s<=g;s++)e.bl_count[s]=0;for(h[2*e.heap[e.heap_max]+1]=0,r=e.heap_max+1;r<_;r++)p<(s=h[2*h[2*(n=e.heap[r])+1]+1]+1)&&(s=p,m++),h[2*n+1]=s,u<n||(e.bl_count[s]++,a=0,d<=n&&(a=c[n-d]),o=h[2*n],e.opt_len+=o*(s+a),f&&(e.static_len+=o*(l[2*n+1]+a)));if(0!==m){do{for(s=p-1;0===e.bl_count[s];)s--;e.bl_count[s]--,e.bl_count[s+1]+=2,e.bl_count[p]--,m-=2}while(0<m);for(s=p;0!==s;s--)for(n=e.bl_count[s];0!==n;)u<(i=e.heap[--r])||(h[2*i+1]!==s&&(e.opt_len+=(s-h[2*i+1])*h[2*i],h[2*i+1]=s),n--)}}(e,t),Z(s,u,e.bl_count)}function X(e,t,r){var n,i,s=-1,a=t[1],o=0,h=7,u=4;for(0===a&&(h=138,u=3),t[2*(r+1)+1]=65535,n=0;n<=r;n++)i=a,a=t[2*(n+1)+1],++o<h&&i===a||(o<u?e.bl_tree[2*i]+=o:0!==i?(i!==s&&e.bl_tree[2*i]++,e.bl_tree[2*b]++):o<=10?e.bl_tree[2*v]++:e.bl_tree[2*y]++,s=i,u=(o=0)===a?(h=138,3):i===a?(h=6,3):(h=7,4))}function V(e,t,r){var n,i,s=-1,a=t[1],o=0,h=7,u=4;for(0===a&&(h=138,u=3),n=0;n<=r;n++)if(i=a,a=t[2*(n+1)+1],!(++o<h&&i===a)){if(o<u)for(;L(e,i,e.bl_tree),0!=--o;);else 0!==i?(i!==s&&(L(e,i,e.bl_tree),o--),L(e,b,e.bl_tree),P(e,o-3,2)):o<=10?(L(e,v,e.bl_tree),P(e,o-3,3)):(L(e,y,e.bl_tree),P(e,o-11,7));s=i,u=(o=0)===a?(h=138,3):i===a?(h=6,3):(h=7,4)}}n(T);var q=!1;function J(e,t,r,n){P(e,(s<<1)+(n?1:0),3),function(e,t,r,n){M(e),n&&(U(e,r),U(e,~r)),i.arraySet(e.pending_buf,e.window,t,r,e.pending),e.pending+=r}(e,t,r,!0)}r._tr_init=function(e){q||(function(){var e,t,r,n,i,s=new Array(g+1);for(n=r=0;n<a-1;n++)for(I[n]=r,e=0;e<1<<w[n];e++)A[r++]=n;for(A[r-1]=n,n=i=0;n<16;n++)for(T[n]=i,e=0;e<1<<k[n];e++)E[i++]=n;for(i>>=7;n<f;n++)for(T[n]=i<<7,e=0;e<1<<k[n]-7;e++)E[256+i++]=n;for(t=0;t<=g;t++)s[t]=0;for(e=0;e<=143;)z[2*e+1]=8,e++,s[8]++;for(;e<=255;)z[2*e+1]=9,e++,s[9]++;for(;e<=279;)z[2*e+1]=7,e++,s[7]++;for(;e<=287;)z[2*e+1]=8,e++,s[8]++;for(Z(z,l+1,s),e=0;e<f;e++)C[2*e+1]=5,C[2*e]=j(e,5);O=new D(z,w,u+1,l,g),B=new D(C,k,0,f,g),R=new D(new Array(0),x,0,c,p)}(),q=!0),e.l_desc=new F(e.dyn_ltree,O),e.d_desc=new F(e.dyn_dtree,B),e.bl_desc=new F(e.bl_tree,R),e.bi_buf=0,e.bi_valid=0,W(e)},r._tr_stored_block=J,r._tr_flush_block=function(e,t,r,n){var i,s,a=0;0<e.level?(2===e.strm.data_type&&(e.strm.data_type=function(e){var t,r=4093624447;for(t=0;t<=31;t++,r>>>=1)if(1&r&&0!==e.dyn_ltree[2*t])return o;if(0!==e.dyn_ltree[18]||0!==e.dyn_ltree[20]||0!==e.dyn_ltree[26])return h;for(t=32;t<u;t++)if(0!==e.dyn_ltree[2*t])return h;return o}(e)),Y(e,e.l_desc),Y(e,e.d_desc),a=function(e){var t;for(X(e,e.dyn_ltree,e.l_desc.max_code),X(e,e.dyn_dtree,e.d_desc.max_code),Y(e,e.bl_desc),t=c-1;3<=t&&0===e.bl_tree[2*S[t]+1];t--);return e.opt_len+=3*(t+1)+5+5+4,t}(e),i=e.opt_len+3+7>>>3,(s=e.static_len+3+7>>>3)<=i&&(i=s)):i=s=r+5,r+4<=i&&-1!==t?J(e,t,r,n):4===e.strategy||s===i?(P(e,2+(n?1:0),3),K(e,z,C)):(P(e,4+(n?1:0),3),function(e,t,r,n){var i;for(P(e,t-257,5),P(e,r-1,5),P(e,n-4,4),i=0;i<n;i++)P(e,e.bl_tree[2*S[i]+1],3);V(e,e.dyn_ltree,t-1),V(e,e.dyn_dtree,r-1)}(e,e.l_desc.max_code+1,e.d_desc.max_code+1,a+1),K(e,e.dyn_ltree,e.dyn_dtree)),W(e),n&&M(e)},r._tr_tally=function(e,t,r){return e.pending_buf[e.d_buf+2*e.last_lit]=t>>>8&255,e.pending_buf[e.d_buf+2*e.last_lit+1]=255&t,e.pending_buf[e.l_buf+e.last_lit]=255&r,e.last_lit++,0===t?e.dyn_ltree[2*r]++:(e.matches++,t--,e.dyn_ltree[2*(A[r]+u+1)]++,e.dyn_dtree[2*N(t)]++),e.last_lit===e.lit_bufsize-1},r._tr_align=function(e){P(e,2,3),L(e,m,z),function(e){16===e.bi_valid?(U(e,e.bi_buf),e.bi_buf=0,e.bi_valid=0):8<=e.bi_valid&&(e.pending_buf[e.pending++]=255&e.bi_buf,e.bi_buf>>=8,e.bi_valid-=8)}(e)}},{"../utils/common":41}],53:[function(e,t,r){"use strict";t.exports=function(){this.input=null,this.next_in=0,this.avail_in=0,this.total_in=0,this.output=null,this.next_out=0,this.avail_out=0,this.total_out=0,this.msg="",this.state=null,this.data_type=2,this.adler=0}},{}],54:[function(e,t,r){(function(e){!function(r,n){"use strict";if(!r.setImmediate){var i,s,t,a,o=1,h={},u=!1,l=r.document,e=Object.getPrototypeOf&&Object.getPrototypeOf(r);e=e&&e.setTimeout?e:r,i="[object process]"==={}.toString.call(r.process)?function(e){process.nextTick(function(){c(e)})}:function(){if(r.postMessage&&!r.importScripts){var e=!0,t=r.onmessage;return r.onmessage=function(){e=!1},r.postMessage("","*"),r.onmessage=t,e}}()?(a="setImmediate$"+Math.random()+"$",r.addEventListener?r.addEventListener("message",d,!1):r.attachEvent("onmessage",d),function(e){r.postMessage(a+e,"*")}):r.MessageChannel?((t=new MessageChannel).port1.onmessage=function(e){c(e.data)},function(e){t.port2.postMessage(e)}):l&&"onreadystatechange"in l.createElement("script")?(s=l.documentElement,function(e){var t=l.createElement("script");t.onreadystatechange=function(){c(e),t.onreadystatechange=null,s.removeChild(t),t=null},s.appendChild(t)}):function(e){setTimeout(c,0,e)},e.setImmediate=function(e){"function"!=typeof e&&(e=new Function(""+e));for(var t=new Array(arguments.length-1),r=0;r<t.length;r++)t[r]=arguments[r+1];var n={callback:e,args:t};return h[o]=n,i(o),o++},e.clearImmediate=f}function f(e){delete h[e]}function c(e){if(u)setTimeout(c,0,e);else{var t=h[e];if(t){u=!0;try{!function(e){var t=e.callback,r=e.args;switch(r.length){case 0:t();break;case 1:t(r[0]);break;case 2:t(r[0],r[1]);break;case 3:t(r[0],r[1],r[2]);break;default:t.apply(n,r)}}(t)}finally{f(e),u=!1}}}}function d(e){e.source===r&&"string"==typeof e.data&&0===e.data.indexOf(a)&&c(+e.data.slice(a.length))}}("undefined"==typeof self?void 0===e?this:e:self)}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}]},{},[10])(10)});
;
/* Paper template generated from Paper_Format.docx (logo, header, footer, styles kept as-is). */
window.QB_TEMPLATE_DOCX_B64 = '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';

;
/* Local storage, optional encryption, PC backup file, import/export validation.
 * Nothing here talks to any server: data lives only in this browser on this PC
 * and in backup files the user chooses to write. */
(function () {
  'use strict';

  var KEY = 'dsuqb.data.v1';
  var ENC_FORMAT = 'dsuqb-encrypted';
  var PBKDF2_ITER = 310000;

  // ---------- small helpers ----------
  function newId() {
    var a = new Uint8Array(9); crypto.getRandomValues(a);
    return Array.from(a, function (b) { return b.toString(16).padStart(2, '0'); }).join('');
  }
  function str(v, max) { return typeof v === 'string' ? v.slice(0, max) : (typeof v === 'number' ? String(v).slice(0, max) : ''); }
  function num(v) { var n = Number(v); if (!isFinite(n) || n < 0) return 0; return Math.min(1000, Math.round(n * 100) / 100); }
  function id(v) { return (typeof v === 'string' && /^[A-Za-z0-9_-]{1,64}$/.test(v)) ? v : newId(); }
  function arr(v, max) { return Array.isArray(v) ? v.slice(0, max) : []; }
  function b64(buf) { var s = '', u = new Uint8Array(buf); for (var i = 0; i < u.length; i++) s += String.fromCharCode(u[i]); return btoa(s); }
  function unb64(s) { var b = atob(s), u = new Uint8Array(b.length); for (var i = 0; i < b.length; i++) u[i] = b.charCodeAt(i); return u; }
  var DIFF = ['', 'Easy', 'Medium', 'Hard'];

  function defaultSettings() {
    return {
      university: 'DHA SUFFA UNIVERSITY', deptPrefix: 'Department of ', department: 'Management Sciences',
      backupMode: 'auto', autoLockMin: 30,
      ai: { geminiKey: '', model: 'gemini-2.5-flash' }
    };
  }
  function defaultPaper() {
    return {
      courseId: '', exam: 'Midterm Semester Examinations', season: 'Fall', year: new Date().getFullYear(), classSection: '', instructor: '',
      courseCode: '', courseTitle: '', examTime: '',
      timeAllowed: '1:30 Hours', date: '', maxMarksOverride: '', instructions: '', questionIds: [], appendCloTable: false
    };
  }

  // ---------- sanitising (used for load, import and AI output) ----------
  function ids(v) { return arr(v, 60).filter(function (x) { return typeof x === 'string'; }).map(function (x) { return x.slice(0, 64); }); }
  function cleanCourse(c) {
    c = c && typeof c === 'object' ? c : {};
    return {
      id: id(c.id), code: str(c.code, 40).trim(), title: str(c.title, 200).trim(),
      clos: arr(c.clos, 60).map(function (x) {
        x = x && typeof x === 'object' ? x : {};
        return { id: id(x.id), label: str(x.label, 30).trim() || 'CLO', desc: str(x.desc, 600), plos: ids(x.plos) };
      }),
      plos: arr(c.plos, 60).map(function (x) {
        x = x && typeof x === 'object' ? x : {};
        return { id: id(x.id), label: str(x.label, 30).trim() || 'PLO', desc: str(x.desc, 600) };
      }),
      topics: arr(c.topics, 150).map(function (t) {
        t = t && typeof t === 'object' ? t : {};
        var w = Math.round(Number(t.week));
        return { id: id(t.id), week: w >= 1 && w <= 99 ? w : null, title: str(t.title, 200).trim(),
          clos: arr(t.clos, 20).filter(function (x) { return typeof x === 'string'; }).map(function (x) { return x.slice(0, 64); }) };
      }).filter(function (t) { return t.title; }),
      outline: c.outline && typeof c.outline === 'object' ? { fileName: str(c.outline.fileName, 200), uploadedAt: str(c.outline.uploadedAt, 40), text: str(c.outline.text, 150000) } : null
    };
  }
  function cleanQuestion(q) {
    q = q && typeof q === 'object' ? q : {};
    return {
      id: id(q.id), courseId: str(q.courseId, 64), title: str(q.title, 300), stem: str(q.stem, 60000), data: str(q.data, 150000),
      parts: arr(q.parts, 40).map(function (p) {
        p = p && typeof p === 'object' ? p : {};
        return { id: id(p.id), text: str(p.text, 5000), marks: num(p.marks) };
      }),
      marks: num(q.marks), clos: ids(q.clos), plos: ids(q.plos),
      tableLines: ['', 'lines', 'none'].indexOf(q.tableLines) >= 0 ? q.tableLines : '', dataLines: ['', 'lines', 'none'].indexOf(q.dataLines) >= 0 ? q.dataLines : '',
      answer: str(q.answer, 20000), qtype: ['', 'Theory', 'Numerical'].indexOf(q.qtype) >= 0 ? q.qtype : '',
      topic: str(q.topic, 200), difficulty: DIFF.indexOf(q.difficulty) >= 0 ? q.difficulty : '',
      createdAt: str(q.createdAt, 40) || new Date().toISOString(), updatedAt: str(q.updatedAt, 40) || new Date().toISOString()
    };
  }
  // edited paper body (see docx.js buildBody): only known block types, text and simple formatting survive
  var FONT_OK = /^[A-Za-z0-9 \-]{1,40}$/;
  function cleanRuns(rs) {
    return arr(rs, 3000).map(function (r) {
      r = r && typeof r === 'object' ? r : {};
      var sz = Number(r.s);
      return { t: str(r.t, 20000), b: !!r.b, i: !!r.i, u: !!r.u, s: sz >= 6 && sz <= 72 ? Math.round(sz * 2) / 2 : 0, f: typeof r.f === 'string' && FONT_OK.test(r.f) ? r.f : '' };
    }).filter(function (r) { return r.t; });
  }
  function cleanBlocks(list) {
    return arr(list, 5000).map(function (b) {
      b = b && typeof b === 'object' ? b : {};
      if (b.k === 'h') return { k: 'h', l: cleanRuns(b.l), r: cleanRuns(b.r) };
      if (b.k === 't') return { k: 't', lines: !!b.lines, rows: arr(b.rows, 500).map(function (row) { return arr(row, 30).map(function (c) { return str(c, 1000); }); }) };
      return { k: 'p', a: ['both', 'left', 'center', 'right'].indexOf(b.a) >= 0 ? b.a : 'both', keep: !!b.keep, runs: cleanRuns(b.runs) };
    });
  }
  // edits are kept per question: { segs: { questionId: { sig, body } } }
  function cleanEdit(e) {
    if (!e || typeof e !== 'object' || !e.segs || typeof e.segs !== 'object') return null;
    var out = {}, n = 0;
    Object.keys(e.segs).slice(0, 300).forEach(function (k) {
      if (!/^[A-Za-z0-9_-]{1,64}$/.test(k)) return;
      var v = e.segs[k]; if (!v || typeof v !== 'object') return;
      out[k] = { sig: str(v.sig, 40), body: cleanBlocks(v.body) }; n++;
    });
    return n ? { segs: out } : null;
  }
  function cleanPaper(p) {
    p = p && typeof p === 'object' ? p : {};
    var dp = defaultPaper();
    var out = {
        id: id(p.id), courseId: str(p.courseId, 64), exam: typeof p.exam === 'string' ? p.exam.slice(0, 120) : dp.exam,
        season: ['Fall', 'Spring', 'Summer'].indexOf(p.season) >= 0 ? p.season : ((/(Fall|Spring|Summer)/.exec(p.term || '') || [])[1] || dp.season),
        year: (function (y) { y = Math.round(Number(y)); return y >= 2000 && y <= 2100 ? y : dp.year; })(p.year != null ? p.year : (/(\d{4})/.exec(p.term || '') || [])[1]),
        courseCode: str(p.courseCode, 40), courseTitle: str(p.courseTitle, 200),
        examTime: /^\d{2}:\d{2}$/.test(p.examTime) ? p.examTime : '',
        classSection: str(p.classSection, 120),
        instructor: str(p.instructor, 120), timeAllowed: typeof p.timeAllowed === 'string' ? p.timeAllowed.slice(0, 40) : dp.timeAllowed,
        date: /^\d{4}-\d{2}-\d{2}$/.test(p.date) ? p.date : '', dateMode: ['exact', 'month', 'none'].indexOf(p.dateMode) >= 0 ? p.dateMode : 'exact',
        dateMonth: Math.min(12, Math.max(1, Math.round(Number(p.dateMonth)) || (new Date().getMonth() + 1))),
        dateYear: (function (y) { y = Math.round(Number(y)); return y >= 2000 && y <= 2100 ? y : new Date().getFullYear(); })(p.dateYear), maxMarksOverride: p.maxMarksOverride === '' || p.maxMarksOverride == null ? '' : num(p.maxMarksOverride),
        instructions: str(p.instructions, 3000), department: str(p.department, 150), university: str(p.university, 120), questionIds: arr(p.questionIds, 200).filter(function (x) { return typeof x === 'string'; }),
        appendCloTable: !!p.appendCloTable, showPlo: p.showPlo !== false,
        stemLines: p.stemLines === 'none' ? 'none' : 'lines', dataLines: p.dataLines === 'lines' ? 'lines' : 'none',
        edit: cleanEdit(p.edit)
      };
    return out;
  }
  function cleanData(d) {
    d = d && typeof d === 'object' ? d : {};
    var s = d.settings && typeof d.settings === 'object' ? d.settings : {};
    var def = defaultSettings();
    var ai = s.ai && typeof s.ai === 'object' ? s.ai : {};
    var p = d.paper && typeof d.paper === 'object' ? d.paper : {};
    var dp = defaultPaper();
    var courses = arr(d.courses, 500).map(cleanCourse);
    var courseIds = {}; courses.forEach(function (c) { courseIds[c.id] = c; });
    var questions = arr(d.questions, 50000).map(cleanQuestion).filter(function (q) { return courseIds[q.courseId]; });
    return {
      app: 'dsu-question-bank', version: 1,
      courses: courses, questions: questions,
      settings: {
        university: str(s.university, 120) || def.university,
        deptPrefix: typeof s.deptPrefix === 'string' ? s.deptPrefix.slice(0, 60) : def.deptPrefix,
        department: typeof s.department === 'string' ? s.department.slice(0, 120) : def.department,
        backupMode: ['auto', 'download', 'browser'].indexOf(s.backupMode) >= 0 ? s.backupMode : def.backupMode,
        autoLockMin: s.autoLockMin == null || !isFinite(Number(s.autoLockMin)) ? def.autoLockMin : Math.min(240, Math.max(0, Math.round(Number(s.autoLockMin)))),
        ai: { geminiKey: str(ai.geminiKey, 300).trim(), model: (str(ai.model, 80).trim().replace(/[^A-Za-z0-9._-]/g, '')) || def.ai.model }
      },
      paper: cleanPaper(p),
      papers: arr(d.papers, 300).map(function (x) {
        x = x && typeof x === 'object' ? x : {};
        return { id: id(x.id), name: str(x.name, 200), savedAt: str(x.savedAt, 40), paper: cleanPaper(x.paper) };
      })
    };
  }

  // Export format: courses + questions + header settings only. NEVER includes the API key.
  function exportable(d) {
    return {
      app: 'dsu-question-bank', version: 1, exportedAt: new Date().toISOString(),
      courses: d.courses, questions: d.questions, papers: d.papers || [], paper: d.paper,
      settings: { university: d.settings.university, deptPrefix: d.settings.deptPrefix, department: d.settings.department }
    };
  }

  function sampleData() {
    var d = cleanData({});
    var c1 = newId(), c2 = newId();
    d.courses.push({ id: 'sample-course', code: 'MS-4711', title: 'Foreign Language', clos: [
      { id: c1, label: 'CLO 1', desc: 'Explain common cognitive heuristics used in decision making.' },
      { id: c2, label: 'CLO 2', desc: 'Analyse how behavioural biases affect investor decisions.' }],
      topics: [{ week: 1, title: 'Introduction to behavioural finance', clos: [c1] }, { week: 2, title: 'Heuristics', clos: [c1] },
        { week: 3, title: 'Biases', clos: [c2] }, { week: 4, title: 'Prospect theory', clos: [c2] }] });
    d.courses[0] = cleanCourse(d.courses[0]);
    d.questions.push(cleanQuestion({ courseId: 'sample-course', title: 'Availability & Anchoring', clos: [c1, c2], topic: 'Heuristics', difficulty: 'Easy', parts: [
      { text: 'Define availability heuristic.', marks: 1 },
      { text: 'Give one example of how recent market news can influence investor decision making.', marks: 1 },
      { text: 'Define anchoring heuristic.', marks: 1 },
      { text: 'Explain how anchoring affects investor expectations and how it can influence decision making.', marks: 1 }] }));
    d.questions.push(cleanQuestion({ courseId: 'sample-course', title: 'Overconfidence & Confirmation Bias', clos: [c2], topic: 'Biases', difficulty: 'Medium', parts: [
      { text: 'Describe overconfidence bias and give one example from day trading.', marks: 2 },
      { text: 'Explain confirmation bias and discuss how it affects investment research and analysis.', marks: 2 }] }));
    d.paper.courseId = 'sample-course';
    d.paper.questionIds = d.questions.map(function (q) { return q.id; });
    return d;
  }

  // ---------- crypto (AES-GCM 256, key from PBKDF2-SHA256) ----------
  async function deriveKey(password, salt, iter) {
    var base = await crypto.subtle.importKey('raw', new TextEncoder().encode(password), 'PBKDF2', false, ['deriveKey']);
    return crypto.subtle.deriveKey({ name: 'PBKDF2', hash: 'SHA-256', salt: salt, iterations: iter }, base,
      { name: 'AES-GCM', length: 256 }, false, ['encrypt', 'decrypt']);
  }
  async function encryptWith(keyInfo, obj) {
    var iv = crypto.getRandomValues(new Uint8Array(12));
    var ct = await crypto.subtle.encrypt({ name: 'AES-GCM', iv: iv }, keyInfo.key, new TextEncoder().encode(JSON.stringify(obj)));
    return { format: ENC_FORMAT, v: 1, kdf: { name: 'PBKDF2', hash: 'SHA-256', iter: keyInfo.iter, salt: b64(keyInfo.salt) }, iv: b64(iv), ct: b64(ct) };
  }
  function isEncrypted(o) { return !!(o && typeof o === 'object' && o.format === ENC_FORMAT && o.kdf && o.iv && o.ct); }
  async function decryptEnvelope(env, password) {
    var salt = unb64(env.kdf.salt), iter = Math.min(5000000, Math.max(100000, Number(env.kdf.iter) || PBKDF2_ITER));
    var key = await deriveKey(password, salt, iter);
    var pt;
    try { pt = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: unb64(env.iv) }, key, unb64(env.ct)); }
    catch (e) { throw new Error('Wrong password'); }
    return { data: JSON.parse(new TextDecoder().decode(pt)), keyInfo: { key: key, salt: salt, iter: iter } };
  }
  async function newKeyInfo(password) {
    var salt = crypto.getRandomValues(new Uint8Array(16));
    return { key: await deriveKey(password, salt, PBKDF2_ITER), salt: salt, iter: PBKDF2_ITER };
  }

  // ---------- browser storage ----------
  function readRaw() {
    var raw = null;
    try { raw = localStorage.getItem(KEY); } catch (e) { return { error: 'Browser storage is blocked. Allow site data for this page.' }; }
    if (!raw) return { empty: true };
    try { return { obj: JSON.parse(raw) }; } catch (e) { return { error: 'Stored data is corrupted.' }; }
  }
  async function writeLocal(data, keyInfo) {
    var payload = keyInfo ? await encryptWith(keyInfo, data) : data;
    localStorage.setItem(KEY, JSON.stringify(payload));
    return payload;
  }
  function wipeLocal() { try { localStorage.removeItem(KEY); } catch (e) { /* ignore */ } }

  // ---------- IndexedDB (only to remember the linked backup-file handle) ----------
  function idb() {
    return new Promise(function (res, rej) {
      var r = indexedDB.open('dsuqb', 1);
      r.onupgradeneeded = function () { r.result.createObjectStore('kv'); };
      r.onsuccess = function () { res(r.result); }; r.onerror = function () { rej(r.error); };
    });
  }
  async function idbGet(k) { var db = await idb(); return new Promise(function (res, rej) { var t = db.transaction('kv').objectStore('kv').get(k); t.onsuccess = function () { res(t.result); }; t.onerror = function () { rej(t.error); }; }); }
  async function idbSet(k, v) { var db = await idb(); return new Promise(function (res, rej) { var t = db.transaction('kv', 'readwrite'); t.objectStore('kv').put(v, k); t.oncomplete = function () { res(); }; t.onerror = function () { rej(t.error); }; }); }
  async function idbDel(k) { var db = await idb(); return new Promise(function (res) { var t = db.transaction('kv', 'readwrite'); t.objectStore('kv').delete(k); t.oncomplete = function () { res(); }; t.onerror = function () { res(); }; }); }

  var fsSupported = typeof window.showSaveFilePicker === 'function';
  async function getLinkedFile() { if (!fsSupported) return null; try { return (await idbGet('backupHandle')) || null; } catch (e) { return null; } }
  async function linkNewFile() {
    var h = await window.showSaveFilePicker({ suggestedName: 'question-bank-backup.json', types: [{ description: 'Question bank backup', accept: { 'application/json': ['.json'] } }] });
    await idbSet('backupHandle', h); return h;
  }
  async function unlinkFile() { try { await idbDel('backupHandle'); } catch (e) { /* ignore */ } }
  async function writeToHandle(h, text) {
    var opts = { mode: 'readwrite' };
    if ((await h.queryPermission(opts)) !== 'granted' && (await h.requestPermission(opts)) !== 'granted') throw new Error('Permission to write the backup file was not granted');
    var w = await h.createWritable(); await w.write(new Blob([text], { type: 'application/json' })); await w.close();
  }

  function download(blob, name) {
    var url = URL.createObjectURL(blob), a = document.createElement('a');
    a.href = url; a.download = name; a.rel = 'noopener'; document.body.appendChild(a); a.click(); a.remove();
    setTimeout(function () { URL.revokeObjectURL(url); }, 4000);
  }
  function stamp() { var d = new Date(), p = function (n) { return String(n).padStart(2, '0'); }; return d.getFullYear() + '-' + p(d.getMonth() + 1) + '-' + p(d.getDate()) + '_' + p(d.getHours()) + p(d.getMinutes()); }

  window.QBStore = {
    newId: newId, cleanData: cleanData, cleanPaper: cleanPaper, cleanCourse: cleanCourse, cleanQuestion: cleanQuestion, exportable: exportable, sampleData: sampleData,
    isEncrypted: isEncrypted, decryptEnvelope: decryptEnvelope, newKeyInfo: newKeyInfo, encryptWith: encryptWith,
    readRaw: readRaw, writeLocal: writeLocal, wipeLocal: wipeLocal,
    fsSupported: fsSupported, getLinkedFile: getLinkedFile, linkNewFile: linkNewFile, unlinkFile: unlinkFile, writeToHandle: writeToHandle,
    download: download, stamp: stamp, MAX_IMPORT_BYTES: 15 * 1024 * 1024,
    getTemplate: function () { return idbGet('template').catch(function () { return null; }); },
    setTemplate: function (t) { return idbSet('template', t); },
    clearTemplate: function () { return idbDel('template'); }
  };
})();

;
/* Builds .docx files from the embedded paper template (js/template.js).
 * The template is the original Paper_Format.docx with placeholders, so the logo,
 * header, footer (Page X of Y), margins, fonts and dotted separator stay identical. */
(function () {
  'use strict';

  // Remove characters that are illegal in XML 1.0, then escape.
  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/[^\t\n\r -퟿-�\u{10000}-\u{10FFFF}]/gu, '')
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&apos;');
  }

  var CAL = '<w:rFonts w:ascii="Calibri" w:hAnsi="Calibri" w:cs="Calibri"/>';

  // A run. Text may contain \n (line break) and \t (tab).
  function run(text, o) {
    o = o || {};
    var fn = o.font && o.font !== 'cal' ? esc(String(o.font).slice(0, 60)) : '';
    var rPr = (o.font === 'cal' ? CAL : fn ? '<w:rFonts w:ascii="' + fn + '" w:hAnsi="' + fn + '" w:cs="' + fn + '"/>' : '') +
      (o.b ? '<w:b/>' : '') + (o.bCs ? '<w:bCs/>' : '') + (o.i ? '<w:i/>' : '') + (o.u ? '<w:u w:val="single"/>' : '') +
      (o.sz ? '<w:sz w:val="' + o.sz + '"/><w:szCs w:val="' + o.sz + '"/>' : '');
    var pr = rPr ? '<w:rPr>' + rPr + '</w:rPr>' : '';
    var out = '';
    String(text == null ? '' : text).replace(/\r\n?/g, '\n').split('\n').forEach(function (line, li) {
      if (li > 0) out += '<w:r>' + pr + '<w:br/></w:r>';
      line.split('\t').forEach(function (seg, ti) {
        if (ti > 0) out += '<w:r>' + pr + '<w:tab/></w:r>';
        if (seg !== '') out += '<w:r>' + pr + '<w:t xml:space="preserve">' + esc(seg) + '</w:t></w:r>';
      });
    });
    return out;
  }
  function tab(o) { return run('\t', o); }
  function br(o) { return run('\n', o); }
  function para(pPr, runs) { return '<w:p>' + (pPr ? '<w:pPr>' + pPr + '</w:pPr>' : '') + (runs || '') + '</w:p>'; }

  function fmtMarks(n) {
    var v = Number(n) || 0;
    var s = (Math.round(v * 100) / 100).toString();
    return s + (v === 1 ? ' mark' : ' marks');
  }
  function letter(i) { // a..z, aa..
    var s = ''; i += 1;
    while (i > 0) { var m = (i - 1) % 26; s = String.fromCharCode(97 + m) + s; i = Math.floor((i - 1) / 26); }
    return s;
  }
  function fmtDate(iso) {
    if (!iso || !/^\d{4}-\d{2}-\d{2}$/.test(iso)) return '';
    var p = iso.split('-').map(Number);
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return months[p[1] - 1] + ' ' + p[2] + ', ' + p[0];
  }

  // ---------- Paper header block (mirrors the original layout) ----------
  function headerBlock(h) {
    var C = { font: 'cal' }, CB = { font: 'cal', b: true }, CU = { font: 'cal', u: true };
    var p0 = para('<w:spacing w:line="480" w:lineRule="auto"/><w:jc w:val="center"/><w:rPr>' + CAL + '<w:b/><w:u w:val="single"/></w:rPr>',
      run('(COURSE TITLE: ', CB) + run(' ', { font: 'Arial Rounded MT Bold' }) + run((h.courseTitle || '') + ' ', CU) + run(' ', C) +
      run('COURSE CODE', CB) + run(':  ', C) + run(h.courseCode || '', CU) + run(')', C));
    var p1 = para('<w:tabs><w:tab w:val="left" w:pos="6710"/></w:tabs><w:rPr>' + CAL + '</w:rPr>',
      run('Class/ Section', CB) + run(' : ' + (h.classSection || ''), C) + tab(C) + run('Time Allowed:', CB) + run('  ' + (h.timeAllowed || ''), C));
    var p2 = para('<w:tabs><w:tab w:val="left" w:pos="6710"/></w:tabs><w:rPr>' + CAL + '</w:rPr>',
      run('Course Instructor', CB) + run(': ' + (h.instructor || ''), C) + tab(C) + run('Max Marks:', CB) + run(' ' + (h.maxMarks == null ? '' : h.maxMarks), C));
    var S = { font: 'cal', sz: 22 }, SB = { font: 'cal', b: true, sz: 22 };
    var dateTxt = (h.dateText != null ? h.dateText : (fmtDate(h.date) || 'December,  , ' + new Date().getFullYear())) + (h.examTime ? '  (' + h.examTime + ')' : '');
    var p3 = para('<w:tabs><w:tab w:val="left" w:pos="7200"/><w:tab w:val="left" w:pos="7445"/></w:tabs><w:rPr>' + CAL + '<w:sz w:val="22"/><w:szCs w:val="22"/></w:rPr>',
      run('Date of Exam', CB) + run(' :  ' + dateTxt, C) + tab(C) + tab(C) + run('Reg. No', CB) + run(': ___________________', C) + br(C) +
      run('Student’s Name:', CB) + run(' _____________________', C) + br(S) + tab(S) + run('Moderated by:', SB) + run(' ________________', S));
    return p0 + p1 + p2 + p3;
  }

  function instructionsBlock(text) {
    var NB = { font: 'cal', b: true, u: true }, pPr = '<w:rPr>' + CAL + '<w:b/><w:u w:val="single"/></w:rPr>';
    var t = String(text || '').trim();
    if (!t) return para(pPr, run('Note/ Instructions:', NB) + run(' ', NB) + run('(if Any)', { font: 'cal', b: true }));
    return para(pPr, run('Note/ Instructions:', NB) + run(' ' + t, { font: 'cal' }));
  }

  // ---------- Questions ----------
  // q = {title, stem, parts:[{text, marks}], marks, cloLabels:[..]}
  function ploText(labels) {
    if (!labels || !labels.length) return '';
    var nums = labels.map(function (l) { var m = /^PLO\s*-?\s*(\d+)$/i.exec(l.trim()); return m ? m[1] : null; });
    return nums.every(Boolean) ? 'PLO ' + nums.join(', ') : labels.join(', ');
  }
  // heading right side: "(10 marks)  CLO 2 | PLO 1, 3, 6" — right-aligned at the page margin ({{RTAB}})
  function rightText(q, showPlo) {
    var clo = q.cloLabels && q.cloLabels.length ? q.cloLabels.join(', ') : '', plo = showPlo ? ploText(q.ploLabels) : '';
    return '(' + fmtMarks(questionTotal(q)) + ')' + (clo || plo ? '  ' + [clo, plo].filter(Boolean).join(' | ') : '');
  }
  // ---------- Paper body as a simple document model ----------
  // blocks: {k:'p', a:'both|left|center|right', keep, runs:[{t,b,i,u,s,f}]}  |  {k:'h', l:[runs], r:[runs]}  |  {k:'t', rows:[[text]], lines}
  // The same model is shown in the editable paper and written to Word, so edits survive the download.
  function P(text, o) { o = o || {}; return { k: 'p', a: o.a || 'both', keep: !!o.keep, runs: text ? [{ t: text, b: !!o.b }] : [] }; }
  // One segment per question: [shared data printed before it] + heading + statement + parts.
  function buildSegments(qs, opts) {
    var flat = buildBody(qs, opts), segs = [], starts = flat.starts;
    qs.forEach(function (q, i) { segs.push({ id: q.id || ('q' + i), blocks: flat.slice(starts[i], i + 1 < qs.length ? starts[i + 1] : flat.length) }); });
    return segs;
  }
  function buildBody(qs, opts) {
    opts = opts || {};
    var out = [], printed = {}, starts = [];
    out.starts = starts;
    qs.forEach(function (q, i) {
      starts.push(out.length);
      if (q.data && q.data.trim() && !printed[q.data]) {
        printed[q.data] = 1;
        var users = []; qs.forEach(function (x, k) { if (x.data === q.data) users.push(k + 1); });
        var lab = users.length > 1 ? 'Use the following information for Questions ' + users.slice(0, -1).join(', ') + ' and ' + users[users.length - 1] + ':'
          : 'Use the following information for Question ' + users[0] + ':';
        out.push(P(lab, { b: true, keep: true }));
        stemBlocks(q.data, q.dataLines === 'none').forEach(function (x) { out.push(x); });
        out.push(P(''));
      }
      out.push({ k: 'h', l: [{ t: 'Q' + (i + 1) + '. ' + (q.title || ''), b: true }], r: [{ t: rightText(q, opts.showPlo !== false), b: true }] });
      out.push(P('', { keep: true }));
      if (q.stem && q.stem.trim()) {
        stemBlocks(q.stem, q.tableLines === 'none').forEach(function (x) { out.push(x); });
        if (q.parts && q.parts.length) out.push(P(''));
      }
      (q.parts || []).forEach(function (p, pi) { out.push(P('(' + letter(pi) + ') ' + (p.text || '') + ' (' + fmtMarks(p.marks) + ')')); });
      out.push(P(''));
    });
    return out;
  }
  function runsXml(runs) {
    return (runs || []).map(function (r) {
      return run(r.t, { b: r.b, i: r.i, u: r.u, sz: r.s ? Math.round(r.s * 2) : 0, font: r.f || '' });
    }).join('');
  }
  var JC = { both: 'both', left: 'left', center: 'center', right: 'right' };
  function modelXml(blocks) {
    return (blocks || []).map(function (bk) {
      if (bk.k === 'h') return para('<w:keepNext/><w:tabs><w:tab w:val="right" w:pos="{{RTAB}}"/></w:tabs><w:jc w:val="both"/>', runsXml(bk.l) + run('\t', {}) + runsXml(bk.r));
      if (bk.k === 't') {
        var rows = (bk.rows || []).filter(function (r) { return r && r.length; });
        if (!rows.length) return '';
        var n = Math.max.apply(null, rows.map(function (r) { return r.length; }));
        rows = rows.map(function (r) { r = r.map(String); while (r.length < n) r.push(''); return r; });
        var lens = []; for (var c = 0; c < n; c++) lens.push(Math.max(4, Math.min(42, Math.max.apply(null, rows.map(function (r) { return r[c].length; })))));
        var sum = lens.reduce(function (a, b) { return a + b; }, 0), totalW = Math.min(10000, Math.max(4000, sum * 150));
        var widths = lens.map(function (L) { return Math.max(800, Math.round(totalW * L / sum)); });
        return table(widths, rows[0], rows.slice(1), true, true, !bk.lines);
      }
      return para((bk.keep ? '<w:keepNext/>' : '') + '<w:jc w:val="' + (JC[bk.a] || 'both') + '"/>', runsXml(bk.runs));
    }).join('');
  }
  function questionsXml(qs, opts) { return modelXml(buildBody(qs, opts)); }

  // Stem text: paragraphs separated by blank lines; consecutive lines containing "|"
  // (e.g. "Year | Cash flow") become a real Word table — handy for numerical data.
  function isRow(l) { return l.indexOf('|') >= 0 && l.replace(/[|\s]/g, '') !== ''; }
  function isSep(l) { return /^\s*\|?\s*:?-{2,}:?\s*(\|\s*:?-{2,}:?\s*)*\|?\s*$/.test(l); }
  function cells(l) {
    var t = l.trim();
    if (t.charAt(0) === '|' && t.charAt(t.length - 1) === '|' && t.length > 1) t = t.slice(1, -1);
    return t.split('|').map(function (c) { return c.trim(); });
  }
  function isNum(c) { return /^[-+\u2013(]?\s*[\d.,]+\s*%?\)?$|^[-\u2013]$/.test(String(c).trim()); }
  function stemBlocks(stem, noLines) {
    var out = [], buf = [], lines = String(stem).replace(/\r\n?/g, '\n').split('\n'), i = 0;
    // each line is its own paragraph (a line break inside a justified paragraph would stretch the line)
    function flush() { buf.forEach(function (l) { if (l.trim()) out.push(P(l)); }); buf = []; }
    while (i < lines.length) {
      if (isRow(lines[i]) && i + 1 < lines.length && (isRow(lines[i + 1]) || isSep(lines[i + 1]))) {
        // a short line right above a table is its title: bold, centred
        var title = buf.length && buf[buf.length - 1].trim().length < 90 && !/[.:;?]$/.test(buf[buf.length - 1].trim()) ? buf.pop().trim() : '';
        flush();
        if (title) out.push(P(title, { a: 'center', b: true, keep: true }));
        var rows = [];
        while (i < lines.length && (isRow(lines[i]) || isSep(lines[i]))) { if (!isSep(lines[i])) rows.push(cells(lines[i])); i++; }
        out.push({ k: 't', rows: rows, lines: !noLines });
      } else if (lines[i].trim() === '') { flush(); i++; }
      else { buf.push(lines[i]); i++; }
    }
    flush();
    return out;
  }
  function stemXml(stem, noLines) { return modelXml(stemBlocks(stem, noLines)); }

  function questionTotal(q) {
    if (q.parts && q.parts.length) return q.parts.reduce(function (s, p) { return s + (Number(p.marks) || 0); }, 0);
    return Number(q.marks) || 0;
  }

  // ---------- Tables ----------
  function table(widths, header, rows, center, alignNums, noLines) {
    var b = '<w:tblBorders>' + ['top', 'left', 'bottom', 'right', 'insideH', 'insideV'].map(function (s) {
      return noLines ? '<w:' + s + ' w:val="nil"/>' : '<w:' + s + ' w:val="single" w:sz="4" w:space="0" w:color="000000"/>';
    }).join('') + '</w:tblBorders>';
    var x = '<w:tbl><w:tblPr><w:tblW w:w="' + widths.reduce(function (a, c) { return a + c; }, 0) + '" w:type="dxa"/>' + b +
      (center ? '<w:jc w:val="center"/>' : '') + '<w:tblLayout w:type="fixed"/><w:tblCellMar><w:left w:w="80" w:type="dxa"/><w:right w:w="80" w:type="dxa"/></w:tblCellMar></w:tblPr><w:tblGrid>' +
      widths.map(function (w) { return '<w:gridCol w:w="' + w + '"/>'; }).join('') + '</w:tblGrid>';
    function row(cells, head) {
      return '<w:tr>' + (head ? '<w:trPr><w:tblHeader/></w:trPr>' : '<w:trPr><w:cantSplit/></w:trPr>') + cells.map(function (c, i) {
        return '<w:tc><w:tcPr><w:tcW w:w="' + widths[i] + '" w:type="dxa"/>' + (head && !noLines ? '<w:shd w:val="clear" w:color="auto" w:fill="D9D9D9"/>' : '') +
          '</w:tcPr>' + para('<w:spacing w:before="40" w:after="40"/>' + (alignNums && i > 0 && (head || isNum(c)) ? '<w:jc w:val="right"/>' : ''), run(c, { b: !!head, sz: 20 })) + '</w:tc>';
      }).join('') + '</w:tr>';
    }
    x += row(header, true);
    rows.forEach(function (r) { x += row(r, false); });
    return x + '</w:tbl>';
  }

  function cloTableXml(qs, cloInfo) {
    // cloInfo: [{label, desc}] in course order
    var rows = [];
    cloInfo.forEach(function (c) {
      var qn = [], m = 0;
      qs.forEach(function (q, i) { if (q.cloLabels.indexOf(c.label) >= 0) { qn.push('Q' + (i + 1)); m += questionTotal(q); } });
      if (qn.length) rows.push([c.label, c.desc || '', qn.join(', '), String(Math.round(m * 100) / 100)]);
    });
    if (!rows.length) return '';
    return para('<w:keepNext/>', run('CLO-wise Marks Distribution', { b: true })) + para('<w:keepNext/>') +
      table([1300, 5900, 2200, 1400], ['CLO', 'Description', 'Questions', 'Marks'], rows) +
      para('', run('Note: a question mapped to more than one CLO is counted under each of them.', { sz: 18 }));
  }

  // ---------- Assembly ----------
  function b64ToBytes(b64) {
    var bin = atob(b64), u = new Uint8Array(bin.length);
    for (var i = 0; i < bin.length; i++) u[i] = bin.charCodeAt(i);
    return u;
  }

  function textWidth(doc) {
    var w = /<w:pgSz[^>]*w:w="(\d+)"/.exec(doc), l = /<w:pgMar[^>]*w:left="(\d+)"/.exec(doc), r = /<w:pgMar[^>]*w:right="(\d+)"/.exec(doc);
    var v = (w ? +w[1] : 12240) - (l ? +l[1] : 720) - (r ? +r[1] : 720);
    return v > 3000 && v < 20000 ? v : 10800;
  }
  async function fill(parts) {
    var b64 = window.QB_CUSTOM_TEMPLATE_B64 || window.QB_TEMPLATE_DOCX_B64;
    if (typeof JSZip === 'undefined' || !b64) throw new Error('Template or JSZip not loaded');
    var zip = await JSZip.loadAsync(b64ToBytes(b64));
    var doc = await zip.file('word/document.xml').async('string');
    // split/join so "$" in user text can never be interpreted as a replace pattern
    function put(s, k, v) { return s.split('{{' + k + '}}').join(v); }
    var rtab = String(textWidth(doc) - 20);
    doc = put(doc, 'HEADER_BLOCK', put(parts.headerBlock, 'RTAB', rtab));
    doc = put(doc, 'INSTRUCTIONS', parts.instructions);
    doc = put(doc, 'QUESTIONS', put(parts.questions, 'RTAB', rtab));
    doc = put(doc, 'UNIVERSITY', esc(parts.university)); doc = put(doc, 'DEPT_PREFIX', esc(parts.deptPrefix));
    doc = put(doc, 'DEPT', esc(parts.department)); doc = put(doc, 'EXAM_TITLE', esc(parts.examTitle));
    zip.file('word/document.xml', doc);
    var heads = Object.keys(zip.files).filter(function (n) { return /^word\/(?:header|footer)\d*\.xml$/.test(n); });
    for (var i = 0; i < heads.length; i++) {
      var hx = await zip.file(heads[i]).async('string');
      hx = put(hx, 'UNIVERSITY', esc(parts.university)); hx = put(hx, 'DEPT_PREFIX', esc(parts.deptPrefix));
      hx = put(hx, 'DEPT', esc(parts.department)); hx = put(hx, 'EXAM_TITLE', esc(parts.examTitle));
      zip.file(heads[i], hx);
    }
    // neutral document properties (no author names leak from the template)
    var now = new Date().toISOString().replace(/\.\d+Z$/, 'Z');
    zip.file('docProps/core.xml', '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n<cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/" xmlns:dcmitype="http://purl.org/dc/dcmitype/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><dc:title>' + esc(parts.docTitle || '') + '</dc:title><dc:creator>Question Bank</dc:creator><dcterms:created xsi:type="dcterms:W3CDTF">' + now + '</dcterms:created><dcterms:modified xsi:type="dcterms:W3CDTF">' + now + '</dcterms:modified></cp:coreProperties>');
    return zip.generateAsync({ type: 'blob', mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', compression: 'DEFLATE' });
  }

  // ---------- custom template: any .docx -> letterhead template ----------
  // Keeps the file's headers/footers/logo/styles/page setup; the body is replaced by the paper.
  // Header lines that look like the exam title / department / university become fill-in fields.
  function bytesToB64(u8) { var s = '', CH = 0x8000; for (var i = 0; i < u8.length; i += CH) s += String.fromCharCode.apply(null, u8.subarray(i, i + CH)); return btoa(s); }
  function ptext(p) { var t = ''; p.replace(/<w:t(?:\s[^>]*)?>([^<]*)<\/w:t>/g, function (m, x) { t += x; return m; }); return t.replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim(); }
  function setParaText(p, ph) {
    var done = false;
    return p.replace(/<w:t(?:\s[^>]*)?>([^<]*)<\/w:t>/g, function (m, x) {
      if (!done) {
        if (!/[A-Za-z0-9]/.test(x)) return m;             // keep leading spacing runs (they position the text)
        done = true; return '<w:t xml:space="preserve">' + ph + '</w:t>';
      }
      return '<w:t></w:t>';                                // everything after the field is replaced
    });
  }
  async function prepareTemplate(buf) {
    var zip;
    try { zip = await JSZip.loadAsync(buf); } catch (e) { throw new Error('Please choose a Word (.docx) file.'); }
    var f = zip.file('word/document.xml');
    if (!f) throw new Error('This is not a Word (.docx) file.');
    var doc = await f.async('string'), found = {};
    if (doc.indexOf('{{QUESTIONS}}') < 0) {
      var bs = doc.indexOf('<w:body>'), be = doc.lastIndexOf('</w:body>');
      if (bs < 0 || be < 0) throw new Error('Could not read this Word file.');
      var body = doc.slice(bs + 8, be), si = body.lastIndexOf('<w:sectPr');
      var sect = si >= 0 ? body.slice(si) : '<w:sectPr><w:pgSz w:w="12240" w:h="15840"/><w:pgMar w:top="1440" w:right="1080" w:bottom="1080" w:left="1080" w:header="567" w:footer="567" w:gutter="0"/></w:sectPr>';
      var sep = '<w:p><w:pPr><w:pBdr><w:bottom w:val="dotted" w:sz="8" w:space="1" w:color="000000"/></w:pBdr><w:spacing w:after="240"/></w:pPr></w:p>';
      doc = doc.slice(0, bs + 8) + '{{HEADER_BLOCK}}{{INSTRUCTIONS}}' + sep + '{{QUESTIONS}}' + sect + doc.slice(be);
      zip.file('word/document.xml', doc);
    }
    var heads = Object.keys(zip.files).filter(function (n) { return /^word\/header\d*\.xml$/.test(n); });
    for (var i = 0; i < heads.length; i++) {
      var hx = await zip.file(heads[i]).async('string');
      if (hx.indexOf('{{') >= 0) continue;
      hx = hx.replace(/<w:p[\s>][\s\S]*?<\/w:p>/g, function (p) {
        var t = ptext(p); if (!t) return p;
        if (!found.exam && /\b(mid|final|sessional|terminal|quiz|exam|examination)s?\b/i.test(t) && /\b(fall|spring|summer|winter|20\d\d)\b/i.test(t)) { found.exam = t; return setParaText(p, '{{EXAM_TITLE}}'); }
        if (!found.dept && /^(?:department|dept\.?|faculty|school)\s+of\b/i.test(t) && t.length < 120) { found.dept = t; return setParaText(p, '{{DEPT_PREFIX}}{{DEPT}}'); }
        if (!found.uni && /\b(universit|institute|college)/i.test(t) && t.length < 90) { found.uni = t; return setParaText(p, '{{UNIVERSITY}}'); }
        return p;
      });
      zip.file(heads[i], hx);
    }
    // no letterhead lines in the header: put a centred title block at the top of the paper instead
    if (!found.exam && !found.uni && !found.dept) {
      var d2 = await zip.file('word/document.xml').async('string');
      var tb = function (ph, sz) { return '<w:p><w:pPr><w:jc w:val="center"/><w:spacing w:after="40"/></w:pPr><w:r><w:rPr><w:b/><w:sz w:val="' + sz + '"/><w:szCs w:val="' + sz + '"/></w:rPr><w:t xml:space="preserve">' + ph + '</w:t></w:r></w:p>'; };
      d2 = d2.replace('{{HEADER_BLOCK}}', tb('{{UNIVERSITY}}', 32) + tb('{{DEPT_PREFIX}}{{DEPT}}', 24) + tb('{{EXAM_TITLE}}', 24) + '{{HEADER_BLOCK}}');
      zip.file('word/document.xml', d2); found.titleBlock = true;
    }
    var out = await zip.generateAsync({ type: 'uint8array', compression: 'DEFLATE' });
    return { b64: bytesToB64(out), found: found, hasHeader: heads.length > 0 };
  }

  // paper = {university, deptPrefix, department, examTitle, courseTitle, courseCode, classSection, instructor,
  //          timeAllowed, maxMarks, date, instructions, questions:[...], appendCloTable, cloInfo}
  function buildPaper(paper) {
    var qx = paper.body ? modelXml(paper.body) : questionsXml(paper.questions, { showPlo: paper.showPlo });
    if (paper.appendCloTable) qx += cloTableXml(paper.questions, paper.cloInfo || []);
    return fill({
      headerBlock: headerBlock(paper), instructions: instructionsBlock(paper.instructions), questions: qx,
      university: paper.university, deptPrefix: paper.deptPrefix, department: paper.department, examTitle: paper.examTitle,
      docTitle: (paper.courseCode || '') + ' ' + (paper.examTitle || '')
    });
  }

  // Question-bank listing: same letterhead, then a table of questions with CLOs and marks.
  function buildBankReport(r) {
    var C = { font: 'cal' }, CB = { font: 'cal', b: true }, CU = { font: 'cal', u: true };
    var head = para('<w:spacing w:line="480" w:lineRule="auto"/><w:jc w:val="center"/>',
      run('QUESTION BANK' + (r.courseCode ? ':  ' : ''), CB) + (r.courseCode ? run((r.courseTitle || '') + ' (' + r.courseCode + ')', CU) : run(' (All courses)', C))) +
      para('<w:rPr>' + CAL + '</w:rPr>', run('Generated: ', CB) + run(r.generated, C) + run('     Total questions: ', CB) + run(String(r.rows.length), C) +
        run('     Total marks: ', CB) + run(String(r.totalMarks), C));
    var rows = r.rows.map(function (q, i) {
      var t = (q.data ? '[Shared data]\n' + q.data + '\n\n' : '') + (q.title ? q.title : '') + (q.stem ? (q.title ? '\n' : '') + q.stem : '');
      (q.parts || []).forEach(function (p, pi) { t += (t ? '\n' : '') + '(' + letter(pi) + ') ' + p.text + ' (' + fmtMarks(p.marks) + ')'; });
      if (r.includeAnswers && q.answer) t += '\n\nAnswer key: ' + q.answer;
      return [String(i + 1), (r.courseCode ? '' : (q.courseCode || '') + '\n') + t, q.cloLabels.join(', ') + (q.ploLabels && q.ploLabels.length ? '\n' + ploText(q.ploLabels) : ''), String(questionTotal(q)), [q.topic, q.qtype, q.difficulty].filter(Boolean).join('\n')];
    });
    var body = table([600, 6600, 1300, 900, 1400], ['#', 'Question', 'CLO / PLO', 'Marks', 'Topic / Level'], rows);
    var cloRows = (r.cloInfo || []).map(function (c) {
      var n = 0, m = 0;
      r.rows.forEach(function (q) { if (q.cloLabels.indexOf(c.label) >= 0) { n++; m += questionTotal(q); } });
      return [c.label, c.desc || '', String(n), String(Math.round(m * 100) / 100)];
    });
    if (cloRows.length) body += para('') + para('<w:keepNext/>', run('CLO Coverage', { b: true })) + table([1300, 6500, 1500, 1500], ['CLO', 'Description', 'Questions', 'Marks'], cloRows);
    return fill({
      headerBlock: head, instructions: '', questions: body, university: r.university, deptPrefix: r.deptPrefix,
      department: r.department, examTitle: 'Question Bank', docTitle: 'Question Bank ' + (r.courseCode || '')
    });
  }

  window.QBDocx = { buildSegments: buildSegments, buildBody: buildBody, modelXml: modelXml, prepareTemplate: prepareTemplate, ploText: ploText, buildPaper: buildPaper, buildBankReport: buildBankReport, questionTotal: questionTotal, fmtMarks: fmtMarks, letter: letter, fmtDate: fmtDate, _esc: esc };
})();

;
/* Reads questions pasted or uploaded as plain text (from Word, PDF, WhatsApp, an AI, etc.) and turns them
 * into structured questions: heading, statement, tables, parts (a)(b)..., marks, CLOs and PLOs.
 * Tables arrive as rows like "cell | cell | cell" and are kept exactly. Data/tables printed before the first
 * question (or "Additional information for Questions 1 and 2") are kept as shared data. Runs locally. */
(function () {
  'use strict';

  var RE_Q = /^\s*(?:Q(?:uestion)?\s*(?:No\.?|#)?\s*[-.]?\s*(\d{1,3})\s*[.:)\-–]?\s*|(\d{1,3})\s*[.)]\s+)(.*)$/i;
  var RE_QSTYLE = /^\s*Q(?:uestion)?\s*(?:No\.?|#)?\s*[-.]?\s*\d{1,3}\b/i;
  var RE_PART = /^\s*(?:part\s*)?(?:\(\s*([a-z]|[ivx]{1,4})\s*\)|([a-z]|[ivx]{2,4})\s*[.)]\s)\s*(.*)$/i;
  var RE_NUMPART = /^\s*(?:\(\s*(\d{1,2})\s*\)|(\d{1,2})\s*[.)])\s+(.*)$/;
  var RE_ANS = /^\s*(?:ans(?:wer)?|solution|answer\s*key|key)\s*[:.\-–]\s*(.*)$/i;
  var RE_SKIP = /^\s*(?:\(?\s*or\s*\)?|section\s+[a-z0-9]+\s*[:.\-]?.*|part\s+[ivx0-9]+\s*[:.\-]?\s*|attempt\s+(?:any|all).*)\s*$/i;
  var RE_STOP = /^\s*(?:CLO[- ]wise\s+marks.*|marks\s+distribution|answer\s+key|marking\s+scheme|solutions?)\s*:?\s*$/i;
  var RE_PAGE = /^\s*(?:page\s+\d+(?:\s*(?:of|\/)\s*\d+)?|-\s*\d+\s*-)\s*$/i;
  var RE_SHARED = /^\s*(?:(?:additional|supplementary|extra|further)\s+(?:information|data|details)\b|(?:exhibit|annex(?:ure)?|appendix)\b|case\s+(?:study|data)\b|data\s+for\s+questions?\b|use\s+the\s+following\s+(?:information|data)\b)/i;
  var RE_REFERS = /\b(?:financial\s+statements?|statements?\s+(?:given|provided)\s+(?:above|on|in)|pages?\s+\d|exhibit|annex(?:ure)?|appendix|(?:table|data|information)\s+(?:given|provided)\s+above|given\s+above|provided\s+(?:above|in\s+this\s+paper|on\s+pages?))/i;
  // question-bank files: "Chapter 3: Risk", "Topic: NPV", "Week 4 - Bonds" set the topic of the questions below them
  var RE_TOPIC = /^\s*(?:chapter|topic|unit|week|module|lecture|lesson)\b\s*(?:no\.?\s*)?[-#.:]?\s*\d{0,3}\s*[:.\-\u2013)]?\s*(.{0,100})$/i;
  var RE_META = /^\s*(difficulty|level|type|question\s+type|topic|bloom(?:'s)?(?:\s+level)?)\s*[:\-\u2013]\s*(.{1,80})$/i;
  var RE_CLO = /\bCLOs?\s*[-:#]?\s*(\d{1,2}(?:\s*(?:,|&|and|\/)\s*(?:CLO\s*[-:#]?\s*)?\d{1,2})*)/gi;
  var RE_PLO = /\bPLOs?\s*[-:#]?\s*(\d{1,2}(?:\s*(?:,|&|and|\/)\s*(?:PLO\s*[-:#]?\s*)?\d{1,2})*)/gi;
  var MARK_PATTERNS = [
    /[\(\[]\s*(\d+(?:\.\d+)?)\s*(?:marks?|mks?|mrks?|pts?|points?|m)\s*[\)\]]/i,
    /\bmarks?\s*[:=\-]\s*(\d+(?:\.\d+)?)/i,
    /(?:^|\s)(\d+(?:\.\d+)?)\s*(?:marks?|mks?)\b\.?/i,
    /[\(\[]\s*(\d+(?:\.\d+)?)\s*[\)\]]\s*$/
  ];

  function extract(s) {
    var clos = [], plos = [], marks = null;
    s = s.replace(RE_CLO, function (m, nums) { (nums.match(/\d+/g) || []).forEach(function (n) { clos.push(Number(n)); }); return ' '; });
    s = s.replace(RE_PLO, function (m, nums) { (nums.match(/\d+/g) || []).forEach(function (n) { plos.push(Number(n)); }); return ' '; });
    for (var i = 0; i < MARK_PATTERNS.length; i++) {
      var m = MARK_PATTERNS[i].exec(s);
      if (m) { marks = Number(m[1]); s = s.slice(0, m.index) + ' ' + s.slice(m.index + m[0].length); break; }
    }
    s = s.replace(/[\(\[]\s*[|,;&\/]*\s*[\)\]]/g, ' ').replace(/\s{2,}/g, ' ').replace(/[\s,;:|\-–]+$/, '').replace(/^[\s,;:|\-–]+/, '').trim();
    return { text: s, marks: marks, clos: clos, plos: plos };
  }
  // A table row is "a | b | c". A heading like "(CLO 2 | PLO 1)" is not.
  function isRow(l) {
    if (l.indexOf('|') < 0) return false;
    var cells = l.split('|');
    if (cells.length === 2 && /\b(?:CLO|PLO)s?\b/i.test(l)) return false;
    return l.replace(/[|\s]/g, '').length > 0;
  }
  function qNums(s) {
    var m = /questions?\s+((?:\d{1,3}\s*(?:,|and|&|-|–|to)\s*)*\d{1,3})/i.exec(s);
    if (!m) return [];
    var out = [];
    m[1].replace(/(\d+)\s*(?:-|–|to)\s*(\d+)|(\d+)/g, function (x, a, b, c) {
      if (c) out.push(Number(c)); else for (var i = Number(a); i <= Number(b) && i - a < 30; i++) out.push(i);
      return x;
    });
    return out;
  }
  function round(n) { return Math.round(n * 2) / 2; }

  function parse(text, opts) {
    opts = opts || {};
    var def = Number(opts.defaultMarks) > 0 ? Number(opts.defaultMarks) : 1;
    var lines = String(text || '').replace(/\r\n?/g, '\n').replace(/ /g, ' ').replace(/[•●▪]\s*/g, '')
      .replace(/\*\*|__|`/g, '').replace(/^[ \t]*(?:#{1,6}|>)[ \t]*/gm, '').replace(/^[ \t]*[-*][ \t]+(?=\(?[a-z]\)|Q\d)/gim, '').split('\n');
    var qStyle = lines.some(function (l) { return RE_QSTYLE.test(l); });
    var hasNumbered = qStyle || lines.some(function (l) { return RE_Q.test(l); });
    var out = [], cur = null, part = null, mode = 'stem', pre = [], shared = [], block = null, stopped = false, topic = '';

    if (!hasNumbered) {
      // No "Q1"/"1." markers: every block separated by a blank line is one question.
      var qs0 = [];
      String(text || '').replace(/\r\n?/g, '\n').split(/\n\s*\n/).forEach(function (blk) {
        var t = blk.trim(); if (!t) return;
        var sub = parse('Q1. ' + t, opts).questions[0];
        if (sub) qs0.push(sub);
      });
      return { questions: qs0, ignored: 0, shared: [] };
    }

    function newQ(num, headText) {
      var e = extract(headText || '');
      cur = { topic: topic, difficulty: '', qtype: '', num: num, head: e.text.replace(/\s*\|\s*/g, ' ').trim(), headMarks: e.marks, clos: e.clos.slice(), plos: e.plos.slice(), stem: [], parts: [], answer: [] };
      out.push(cur); part = null; mode = 'stem'; block = null;
    }

    lines.forEach(function (raw) {
      if (stopped) return;
      var line = raw.replace(/\t+/g, ' ').trimEnd(), m;
      if (RE_STOP.test(line) || /^\s*CLO\s*\|\s*Description\b/i.test(line)) { stopped = true; return; }
      if (RE_PAGE.test(line)) return;
      if (!line.trim()) {
        if (!cur) { pre.push(''); return; }
        if (mode === 'shared') block.lines.push('');
        else if (part) part.text.push('');
        else if (mode === 'stem') cur.stem.push('');
        return;
      }
      // "Question 1 | 10 Marks (CLO 2 | PLO 1)" from a PDF looks like a table row, so Q-style headings are checked first
      if ((qStyle ? RE_QSTYLE.test(line.split('|')[0]) : !isRow(line)) && (m = RE_Q.exec(line))) { newQ(Number(m[1] || m[2]), m[3]); return; }
      var tm = RE_TOPIC.exec(line), mm2 = RE_META.exec(line);
      if (mm2 && cur && !isRow(line)) { // "Difficulty: Hard", "Type: Numerical", "Topic: NPV" inside a question
        var key = mm2[1].toLowerCase(), val = mm2[2].trim();
        if (/^(difficulty|level)/.test(key)) { var dv = /easy|medium|hard/i.exec(val); if (dv) { cur.difficulty = dv[0].charAt(0).toUpperCase() + dv[0].slice(1).toLowerCase(); return; } }
        else if (/type/.test(key)) { if (/numer|calcul|problem/i.test(val)) { cur.qtype = 'Numerical'; return; } if (/theor|concept|descript/i.test(val)) { cur.qtype = 'Theory'; return; } }
        else if (key === 'topic') { cur.topic = val; return; }
        else return;
      }
      if (tm && !isRow(line) && line.trim().length < 110 && !/[.?]$/.test(line.trim()) && !MARK_PATTERNS[0].test(line) && (mode !== 'part' || !part || /[.?)]$/.test(part.text.join(' ').trim()))) {
        topic = (tm[1] || line).replace(/^\s*[:\-\u2013]\s*/, '').trim() || line.trim();
        if (/^(?:chapter|unit|week|module|lecture|lesson)/i.test(line.trim()) && tm[1] && !/^\d/.test(tm[1])) topic = line.trim().replace(/\s*[:\-\u2013]\s*/, ': ');
        block = null; if (cur) { mode = 'stem'; part = null; cur = null; }
        return;
      }
      if (!cur) { pre.push(line); return; }
      if (RE_SHARED.test(line) && !isRow(line)) {
        block = { targets: qNums(line), lines: [line.trim()] }; shared.push(block); mode = 'shared'; part = null; return;
      }
      if (mode === 'shared') { block.lines.push(isRow(line) ? line : line.trim()); return; }
      if ((m = RE_ANS.exec(line))) { mode = 'answer'; part = null; if (m[1]) cur.answer.push(m[1]); return; }
      if (RE_SKIP.test(line) && line.trim().length < 60) return;
      if ((m = RE_PART.exec(line)) || (qStyle && (m = RE_NUMPART.exec(line)))) {
        var e = extract(m[3] || '');
        part = { text: [e.text.replace(/\s*\|\s*/g, ' ').trim()], marks: e.marks }; cur.parts.push(part); mode = 'part';
        e.clos.forEach(function (c) { cur.clos.push(c); }); e.plos.forEach(function (c) { cur.plos.push(c); });
        return;
      }
      if (mode === 'answer') { cur.answer.push(line.trim()); return; }
      if (isRow(line)) { (part ? part.text : cur.stem).push(line); return; } // tables kept exactly
      var e2 = extract(line.trim());
      e2.clos.forEach(function (c) { cur.clos.push(c); }); e2.plos.forEach(function (c) { cur.plos.push(c); });
      if (part) {
        var prev = part.text.join(' ').trim();
        // a new full sentence after a finished part = new paragraph that belongs to the question, not the part
        if (/[.?!)]$/.test(prev) && /^[A-Z]/.test(e2.text) && e2.text.length > 40) { cur.stem.push(e2.text); return; }
        part.text.push(e2.text);
        if (e2.marks != null && part.marks == null) part.marks = e2.marks;
      } else {
        if (e2.marks != null && cur.headMarks == null && !cur.parts.length) cur.headMarks = e2.marks;
        if (e2.text) cur.stem.push(e2.text);
      }
    });

    var qs = out.map(function (q) {
      var stem = q.stem.join('\n').replace(/\n{3,}/g, '\n\n').trim();
      var parts = q.parts.map(function (p) { return { text: p.text.join('\n').replace(/\n{2,}/g, '\n').trim(), marks: p.marks }; })
        .filter(function (p) { return p.text; });
      var title = '', head = q.head || '';
      if (head && (head.length > 90 || /\?\s*$/.test(head) || (!parts.length && !stem))) { stem = head + (stem ? '\n' + stem : ''); }
      else title = head;
      if (parts.length) {
        var known = 0, unknown = 0;
        parts.forEach(function (p) { if (p.marks != null) known += p.marks; else unknown++; });
        if (unknown) {
          var each = q.headMarks != null && q.headMarks > known ? round((q.headMarks - known) / unknown) || def : def;
          parts.forEach(function (p) { if (p.marks == null) p.marks = each; });
        }
      }
      var uniq = function (a) { return Array.from(new Set(a)).sort(function (x, y) { return x - y; }); };
      return {
        num: q.num, title: title, stem: stem, parts: parts, data: '', topic: q.topic || '', difficulty: q.difficulty || '', qtype: q.qtype || '',
        marks: parts.length ? 0 : (q.headMarks != null ? q.headMarks : def),
        cloNums: uniq(q.clos), ploNums: uniq(q.plos), answer: q.answer.join('\n').trim()
      };
    }).filter(function (q) { return q.title || q.stem || q.parts.length; });

    // ---- shared data: tables/text before the first question + "Additional information ..." blocks ----
    var sharedOut = [], mode2 = opts.sharedMode || 'auto';
    var firstRow = pre.findIndex(isRow), preText = '';
    if (firstRow >= 0) {
      var st = firstRow;
      while (st > 0 && pre[st - 1].trim() && pre[st - 1].trim().length < 100 && !/^\s*\d+[.)]\s/.test(pre[st - 1]) && !/instruction|note\s*:/i.test(pre[st - 1])) st--;
      preText = pre.slice(st).join('\n').replace(/\n{3,}/g, '\n\n').trim();
    }
    var blocks = [];
    if (preText) blocks.push({ text: preText, targets: [] , where: 'before Question ' + (qs[0] ? qs[0].num || 1 : 1) });
    shared.forEach(function (b) { var t = b.lines.join('\n').replace(/\n{3,}/g, '\n\n').trim(); if (t) blocks.push({ text: t, targets: b.targets, where: 'after the questions' }); });
    if (mode2 !== 'none' && qs.length) {
      blocks.forEach(function (b) {
        var targets;
        if (mode2 === 'all') targets = qs;
        else if (mode2 === 'first') targets = [qs[0]];
        else {
          targets = b.targets.length ? qs.filter(function (q) { return b.targets.indexOf(q.num) >= 0; })
            : qs.filter(function (q) { return RE_REFERS.test(q.title + ' ' + q.stem + ' ' + q.parts.map(function (p) { return p.text; }).join(' ')); });
          if (!targets.length) targets = [qs[0]];
        }
        targets.forEach(function (q) { q.data = q.data ? q.data + '\n\n' + b.text : b.text; });
        sharedOut.push({ where: b.where, rows: b.text.split('\n').filter(isRow).length, to: targets.map(function (q) { return q.num; }) });
      });
    }
    return { questions: qs, ignored: firstRow >= 0 ? firstRow : pre.filter(function (l) { return l.trim(); }).length, shared: sharedOut };
  }

  window.QBPaste = { parse: parse, isRow: isRow };
})();

;
/* Course outline reader: gets text out of a .docx / .txt / pasted outline, then finds
 * CLOs ("CLO 1: …", CLO tables) and weekly topics ("Week 1 – …", week/topic tables). Runs locally. */
(function () {
  'use strict';

  function decode(s) {
    return s.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&apos;/g, "'")
      .replace(/&#(\d+);/g, function (m, n) { return String.fromCodePoint(Number(n)); })
      .replace(/&#x([0-9a-f]+);/gi, function (m, n) { return String.fromCodePoint(parseInt(n, 16)); }).replace(/&amp;/g, '&');
  }
  function paraText(xml) {
    var out = '';
    xml.replace(/<w:t(?:\s[^>]*)?>([^<]*)<\/w:t>|<w:tab\/>|<w:br\/>/g, function (m, t) { out += t != null ? decode(t) : ' '; return m; });
    return out.replace(/\s+/g, ' ').trim();
  }
  function paragraphs(xml) {
    var res = [];
    xml.replace(/<w:p[\s>][\s\S]*?<\/w:p>/g, function (p) { var t = paraText(p); if (t) res.push(t); return p; });
    return res;
  }
  // .docx -> plain text; table rows become "cell | cell | cell"
  async function docxText(buf) {
    var zip = await JSZip.loadAsync(buf);
    var f = zip.file('word/document.xml');
    if (!f) throw new Error('This does not look like a Word .docx file.');
    var xml = await f.async('string');
    var body = xml.slice(xml.indexOf('<w:body'));
    var lines = [], last = 0, re = /<w:tbl>[\s\S]*?<\/w:tbl>/g, m;
    while ((m = re.exec(body))) {
      lines = lines.concat(paragraphs(body.slice(last, m.index)));
      m[0].replace(/<w:tr[\s>][\s\S]*?<\/w:tr>/g, function (tr) {
        var cells = [];
        tr.replace(/<w:tc>[\s\S]*?<\/w:tc>/g, function (tc) { cells.push(paragraphs(tc).join(' ')); return tc; });
        if (cells.some(function (c) { return c; })) lines.push(cells.join(' | '));
        return tr;
      });
      lines.push('');
      last = m.index + m[0].length;
    }
    lines = lines.concat(paragraphs(body.slice(last)));
    return lines.join('\n');
  }

  // ---------- PDF (pdf.js, loaded only when needed) ----------
  var PDF_BASE = document.querySelector('script[src="app.js"]') ? '' : 'vendor/';
  var PDF_SRI = 'sha384-/1qUCSGwTur9vjf/z9lmu/eCUYbpOTgSjmpbMQZ1/CtX2v/WcAIKqRv+U1DUCG6e';
  var pdfLoading = null;
  function loadPdfJs() {
    if (window.pdfjsLib) return Promise.resolve(window.pdfjsLib);
    if (pdfLoading) return pdfLoading;
    pdfLoading = new Promise(function (res, rej) {
      var s = document.createElement('script');
      if (PDF_SRI.indexOf('sha') === 0) { s.integrity = PDF_SRI; s.crossOrigin = 'anonymous'; }
      s.onload = function () {
        if (!window.pdfjsLib) return rej(new Error('PDF reader failed to load.'));
        window.pdfjsLib.GlobalWorkerOptions.workerSrc = PDF_BASE + 'pdf.worker.min.js';
        res(window.pdfjsLib);
      };
      s.onerror = function () { pdfLoading = null; rej(new Error('PDF reader could not be loaded (pdf.min.js missing on the site?).')); };
      s.src = PDF_BASE + 'pdf.min.js';
      document.head.appendChild(s);
    });
    return pdfLoading;
  }
  async function pdfText(buf) {
    var lib = await loadPdfJs();
    var doc = await lib.getDocument({ data: new Uint8Array(buf), isEvalSupported: false, disableFontFace: true, useSystemFonts: false, enableXfa: false }).promise;
    var out = [];
    for (var p = 1; p <= Math.min(doc.numPages, 80); p++) {
      var page = await doc.getPage(p), tc = await page.getTextContent(), rows = [];
      tc.items.forEach(function (it) {
        if (!it.str || !it.str.trim() || !it.transform) return;
        var y = it.transform[5], x = it.transform[4], row = rows.find(function (r) { return Math.abs(r.y - y) < 2.5; });
        if (!row) { row = { y: y, items: [] }; rows.push(row); }
        row.items.push({ x: x, w: it.width || 0, s: it.str });
      });
      // Each visual line = list of text items sorted left to right.
      var lines = rows.sort(function (a, b) { return b.y - a.y; }).map(function (r) {
        return r.items.sort(function (a, b) { return a.x - b.x; });
      }).filter(function (l) { return l.length; });
      var join = function (arr) { var s = '', end = null; arr.forEach(function (it) { var gap = end == null ? 0 : it.x - end; s += (end != null && gap > 1 && !/\s$/.test(s) && !/^\s/.test(it.s) ? ' ' : '') + it.s; end = it.x + it.w; }); return s.replace(/\s+/g, ' ').trim(); };
      var byGap = function (items) { var segs = [], cur = null, end = null; items.forEach(function (it) { if (!cur || it.x - end > 14) { cur = { x: it.x, items: [] }; segs.push(cur); } cur.items.push(it); end = it.x + it.w; }); return segs.map(function (s) { return { x: s.x, s: join(s.items) }; }); };
      var byCols = function (items, cols) { var cells = cols.map(function () { return []; }); items.forEach(function (it) { var ci = 0; cols.forEach(function (cx, i) { if (cx <= it.x + 8) ci = i; }); cells[ci].push(it); }); return cells.map(join); };
      // Rebuild tables: column positions come from the row that starts the table; wrapped text is put back in its cell.
      var cols = null, prev = null, outRows = [];
      lines.forEach(function (items) {
        var segs = byGap(items);
        if (cols && prev) {
          if (items[0].x > cols[0] + 6) { // continuation of the previous row
            byCols(items, cols).forEach(function (t, i) { if (t) prev[i] = (prev[i] ? prev[i] + ' ' : '') + t; });
            return;
          }
          var cells = byCols(items, cols);
          if (cells.filter(Boolean).length >= 2) {
            if (segs.length > cols.length) { cols = segs.map(function (s) { return s.x; }); cells = segs.map(function (s) { return s.s; }); }
            prev = cells; outRows.push(prev); return;
          }
        }
        if (segs.length >= 2) { cols = segs.map(function (s) { return s.x; }); prev = segs.map(function (s) { return s.s; }); outRows.push(prev); }
        else { cols = null; prev = null; outRows.push([segs[0].s]); }
      });
      outRows.forEach(function (r) { out.push(r.join(' | ')); });
      out.push('');
    }
    var text = out.join('\n');
    if (text.replace(/\s/g, '').length < 30) throw new Error('This PDF seems to be a scanned picture with no readable text. Type or paste the CLOs and topics in the boxes instead.');
    return text;
  }

  // ---------- other formats ----------
  async function odtText(zip) {
    var xml = await zip.file('content.xml').async('string');
    xml = xml.replace(/<table:table-row[\s\S]*?<\/table:table-row>/g, function (row) {
      var cells = []; row.replace(/<table:table-cell[\s\S]*?(?:<\/table:table-cell>|\/>)/g, function (c) { cells.push(decode(c.replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim()); return c; });
      return '\n' + cells.join(' | ') + '\n';
    });
    return decode(xml.replace(/<text:tab\/>/g, ' ').replace(/<\/text:(?:p|h)>|<text:line-break\/>/g, '\n').replace(/<[^>]+>/g, '')).replace(/[ \t]+/g, ' ').replace(/\n\s*\n+/g, '\n');
  }
  async function pptxText(zip) {
    var names = Object.keys(zip.files).filter(function (n) { return /^ppt\/slides\/slide\d+\.xml$/.test(n); })
      .sort(function (a, b) { return Number(a.match(/\d+/)[0]) - Number(b.match(/\d+/)[0]); });
    var out = [];
    for (var i = 0; i < names.length; i++) {
      var xml = await zip.file(names[i]).async('string');
      xml.replace(/<a:p>[\s\S]*?<\/a:p>/g, function (p) { var t = ''; p.replace(/<a:t>([^<]*)<\/a:t>/g, function (m, x) { t += decode(x); return m; }); if (t.trim()) out.push(t.trim()); return p; });
    }
    return out.join('\n');
  }
  function rtfText(s) {
    return s.replace(/\\par[d]?\b/g, '\n').replace(/\\cell\b/g, ' | ').replace(/\\row\b/g, '\n').replace(/\\'([0-9a-f]{2})/gi, function (m, h) { return String.fromCharCode(parseInt(h, 16)); })
      .replace(/\\[a-z]+-?\d* ?/gi, '').replace(/[{}]/g, '').replace(/\n\s*\n+/g, '\n');
  }
  // Old binary formats (.doc etc.): pull out runs of readable text.
  function binaryText(buf) {
    var u8 = new Uint8Array(buf), pick = function (s) {
      return (s.match(/[A-Za-z0-9\u00c0-\u024f.,;:()&%'"\/\-\u2013\u2019 \t|\u0007\r]{6,}/g) || []).filter(function (r) { return /[a-z]{3}/i.test(r); });
    };
    var a = pick(new TextDecoder('utf-16le').decode(u8)), b = pick(new TextDecoder('windows-1252').decode(u8));
    var best = a.join('').length > b.join('').length ? a : b;
    return best.join('\n').replace(/\u0007\u0007/g, '\n').replace(/\u0007/g, ' | ').replace(/\r/g, '\n').replace(/\n\s*\n+/g, '\n');
  }

  var RE_CLO = /^\s*(?:\d+\.\s*)?CLO\s*[-#.]?\s*(\d{1,2})\s*[:.\-\u2013\u2014)|]?\s*(.+)$/i;
  var RE_WEEK = /^\s*(?:week|wk|lecture|lec|session|class|module|unit|chapter)\s*[-#.]?\s*(\d{1,2})(?:\s*(?:-|\u2013|&|,|to|and)\s*\d{1,2})?\s*[:.\-\u2013\u2014)|]?\s*(.*)$/i;
  var RE_HEAD_CLO = /^\s*(?:\d+[.)]?\s*)?(?:(?:course\s+)?learning\s+outcomes?|course\s+outcomes?|clos?|outcomes|learning\s+objectives|course\s+objectives)\b[^.]{0,80}$|students?\s+will\s+be\s+able\s+to\s*:?\s*$|upon\s+(?:successful\s+)?completion\b.*:\s*$/i;
  var RE_ITEM = /^\s*(?:CLO\s*[-#.]?\s*)?(?:\(?(\d{1,2}|[a-h]|[ivx]{1,4})[.):\-\u2013]|[\u2022\u25cf\u25aa\u2023\u2043\-*\u2013\u25e6\uf0b7\uf0a7])\s*(.{8,})$/i;
  var RE_VERB = /^(?:understand|explain|describe|identify|define|apply|analy[sz]e|evaluate|create|design|demonstrate|discuss|compare|calculate|interpret|develop|assess|examine|recogni[sz]e|use|outline|summari[sz]e|formulate|critically|construct|solve|prepare|communicate|differentiate|distinguish|illustrate|appraise|justify|integrate|comprehend|know|learn|be able)\b/i;
  var RE_HEAD_TOPICS = /^\s*(?:course\s+(?:contents?|outline|topics|plan|schedule)|topics?(?:\s+covered)?|syllabus|lecture\s+plan|weekly\s+(?:plan|schedule|breakdown)|tentative\s+schedule)\s*:?\s*$/i;
  var RE_HEAD_STOP = /^\s*(?:assessment|grading|evaluation|marks\s+distribution|text\s*books?|reference|recommended|readings?|policy|policies|attendance|plagiarism|instructor|office hours|teaching methodology|course\s+learning\s+outcomes?|clos?)\b.*$/i;

  function nums(s) { return (String(s).match(/\d{1,2}/g) || []).map(Number); }
  function cloNumsIn(s) {
    var out = [];
    String(s).replace(/CLO\s*[-#.]?\s*(\d{1,2}(?:\s*(?:,|&|and|\/)\s*\d{1,2})*)/gi, function (m, g) { out = out.concat(nums(g)); return m; });
    return out;
  }
  function clean(s) { return String(s || '').replace(/\s+/g, ' ').replace(/^[\s:\-\u2013|.]+|[\s:\-\u2013|]+$/g, '').trim(); }

  function extract(text) {
    var lines = String(text || '').replace(/\r\n?/g, '\n').split('\n');
    var clos = {}, topics = [], table = null, inTopics = false, inClos = false, cloSeq = 0, lastClo = null;
    var cloPlo = {};
    function addClo(n, d, row) {
      d = clean(d); if (n && d && d.length > 5 && (!clos[n] || clos[n].length < d.length)) clos[n] = d.slice(0, 600);
      if (n && row) { var p = []; String(row).replace(/PLO\s*[-#.]?\s*(\d{1,2}(?:\s*(?:,|&|and|\/)\s*\d{1,2})*)/gi, function (m, g) { p = p.concat(nums(g)); return m; }); if (p.length) cloPlo[n] = Array.from(new Set((cloPlo[n] || []).concat(p))); }
    }
    function addTopic(w, t, cl) {
      t = clean(t.replace(/CLO\s*[-#.]?\s*\d{1,2}(?:\s*(?:,|&|and|\/)\s*\d{1,2})*/gi, '').replace(/\(\s*\)|\[\s*\]/g, ''));
      if (!t || t.length < 3 || /^(topics?|contents?|week|lecture|description)$/i.test(t)) return;
      topics.push({ week: w || null, title: t.slice(0, 200), cloNums: Array.from(new Set(cl || [])) });
    }
    lines.forEach(function (raw) {
      var line = raw.trim();
      if (!line) { table = null; return; }
      // ---- section: course learning outcomes (any layout) ----
      if (RE_HEAD_CLO.test(line) && !RE_CLO.test(line) && line.length < 120) { inClos = true; inTopics = false; lastClo = null; return; }
      if (inClos) {
        var mm;
        if (RE_CLO.test(line.split('|')[0])) { /* handled below */ }
        else if (line.indexOf('|') >= 0) {
          var cs = line.split('|').map(function (c) { return c.trim(); });
          var nn = nums(cs[0])[0], longest = cs.slice().sort(function (a, b) { return b.length - a.length; })[0];
          if (nn && longest.length > 15) { addClo(nn, longest, line); lastClo = nn; cloSeq = Math.max(cloSeq, nn); return; }
          if (!/\d/.test(line) && /desc|outcome|statement|clo/i.test(line)) return; // header row
          if (longest.length > 15 && RE_VERB.test(longest)) { cloSeq++; addClo(cloSeq, longest); lastClo = cloSeq; return; }
        } else if ((mm = RE_ITEM.exec(line))) {
          var n2 = /^\d+$/.test(mm[1] || '') ? Number(mm[1]) : cloSeq + 1;
          cloSeq = Math.max(cloSeq, n2); addClo(n2, mm[2]); lastClo = n2; return;
        } else if (RE_VERB.test(line) && line.length > 15) { cloSeq++; addClo(cloSeq, line); lastClo = cloSeq; return; }
        else if (lastClo && /^[a-z(]/.test(line) && clos[lastClo] && !/[.;]$/.test(clos[lastClo])) { clos[lastClo] = (clos[lastClo] + ' ' + line).slice(0, 600); return; }
        else if (line.length < 80 && !/[.;,]$/.test(line)) { inClos = false; } // next heading
      }
      if (line.indexOf('|') >= 0) {
        var cells = line.split('|').map(function (c) { return c.trim(); }), low = cells.map(function (c) { return c.toLowerCase(); });
        // table header?
        var wi = low.findIndex(function (c) { return /^(week|wk|lecture|lec|session|class|s\.?\s*no|sr\.?\s*no|#)\b/.test(c); });
        var ti = low.findIndex(function (c) { return /topic|content|subject|description|lecture title|title/.test(c); });
        var ci = low.findIndex(function (c) { return /\bclos?\b|learning outcome/.test(c); });
        if (wi >= 0 && (ti >= 0 || cells.length >= 2) && !/\d/.test(cells[wi])) { table = { kind: 'week', wi: wi, ti: ti >= 0 && ti !== wi ? ti : (wi + 1), ci: ci }; return; }
        if (ci >= 0 && ti < 0 && /description|statement|outcome/.test(low.join(' ')) && !/\d/.test(cells[ci])) {
          table = { kind: 'clo', ci: ci, di: low.findIndex(function (c, i) { return i !== ci && /description|statement|outcome/.test(c); }) }; return;
        }
        if (ci >= 0 && low.some(function (c) { return /description|statement/.test(c); }) && !/\d/.test(line)) {
          table = { kind: 'clo', ci: ci, di: low.findIndex(function (c, i) { return i !== ci && /description|statement|outcome/.test(c); }) }; return;
        }
        // row with "CLO n" in a cell
        var cc = cells.findIndex(function (c) { return /^CLO\s*[-#.]?\s*\d{1,2}\s*[:.\-\u2013]?$/i.test(c); });
        if (cc >= 0 && (!table || table.kind !== 'week')) {
          var longest = cells.filter(function (c, i) { return i !== cc; }).sort(function (a, b) { return b.length - a.length; })[0];
          addClo(nums(cells[cc])[0], longest, line); return;
        }
        if (cells[0] && RE_CLO.test(cells[0])) { var m0 = RE_CLO.exec(cells[0]); addClo(Number(m0[1]), m0[2]); return; }
        if (table && table.kind === 'clo') {
          var n = nums(cells[table.ci] || cells[0])[0], d = table.di >= 0 ? cells[table.di] : cells.slice().sort(function (a, b) { return b.length - a.length; })[0];
          if (n) addClo(n, d, line); return;
        }
        if (table && table.kind === 'week') {
          var w = nums(cells[table.wi])[0] || null, t = cells[table.ti] || '';
          if (!t || t.length < 3) t = cells.filter(function (c, i) { return i !== table.wi && i !== table.ci; }).sort(function (a, b) { return b.length - a.length; })[0] || '';
          addTopic(w, t, (table.ci >= 0 ? nums(cells[table.ci]) : []).concat(cloNumsIn(line))); return;
        }
        var wm = RE_WEEK.exec(cells[0]);
        if (wm) { addTopic(Number(wm[1]), wm[2] || cells.slice(1).sort(function (a, b) { return b.length - a.length; })[0] || '', cloNumsIn(line)); return; }
        return;
      }
      var m;
      if ((m = RE_CLO.exec(line))) { addClo(Number(m[1]), m[2]); return; }
      if ((m = RE_WEEK.exec(line)) && m[2]) { addTopic(Number(m[1]), m[2], cloNumsIn(line)); inTopics = true; return; }
      if (RE_HEAD_TOPICS.test(line)) { inTopics = true; return; }
      if (RE_HEAD_STOP.test(line) && line.length < 60) { inTopics = false; return; }
      if (inTopics && line.length <= 160 && !/^(page|\d+)$/i.test(line)) addTopic(null, line.replace(/^[\-\u2022\u25cf*\d.)\s]+/, ''), cloNumsIn(line));
    });
    // merge duplicate weeks (e.g. two lecture rows in the same week)
    var merged = [], byKey = {};
    topics.forEach(function (t) {
      var k = t.title.toLowerCase();
      if (byKey[k]) { byKey[k].cloNums = Array.from(new Set(byKey[k].cloNums.concat(t.cloNums))); return; }
      byKey[k] = t; merged.push(t);
    });
    return {
      clos: Object.keys(clos).map(Number).sort(function (a, b) { return a - b; }).map(function (n) { return { num: n, desc: clos[n], plos: cloPlo[n] || [] }; }),
      topics: merged.slice(0, 120)
    };
  }

  async function readFile(file) {
    if (file.size > 40 * 1024 * 1024) throw new Error('File is too large (max 40 MB).');
    var buf = await file.arrayBuffer(), u8 = new Uint8Array(buf.slice(0, 8)), head = String.fromCharCode.apply(null, u8);
    if (head.indexOf('%PDF') === 0) return pdfText(buf);
    if (head.indexOf('PK') === 0) {
      var zip = await JSZip.loadAsync(buf);
      if (zip.file('word/document.xml')) return docxText(buf);
      if (zip.file('content.xml')) return odtText(zip);
      if (Object.keys(zip.files).some(function (n) { return /^ppt\/slides\//.test(n); })) return pptxText(zip);
      throw new Error('Could not find any text in this file.');
    }
    if (u8[0] === 0xD0 && u8[1] === 0xCF) return binaryText(buf);
    var txt = new TextDecoder('utf-8').decode(buf);
    if (/^\{\\rtf/.test(txt)) return rtfText(txt);
    if (/<html|<body|<p[\s>]/i.test(txt.slice(0, 2000))) return txt.replace(/<(script|style)[\s\S]*?<\/\1>/gi, '').replace(/<\/(?:p|div|li|h\d|tr)>|<br\s*\/?>/gi, '\n').replace(/<\/t[dh]>/gi, ' | ').replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&');
    if ((txt.match(/\uFFFD/g) || []).length > txt.length / 20) return binaryText(buf);
    return /\.csv$/i.test(file.name) ? txt.replace(/,/g, ' | ') : txt;
  }

  // "Week 3: Topic [CLO 1, CLO 2]" lines <-> topic objects
  function topicsToText(topics, cloLabel) {
    return topics.map(function (t) {
      var c = (t.cloLabels || []).join(', ');
      return (t.week ? 'Week ' + t.week + ': ' : '') + t.title + (c ? ' [' + c + ']' : '');
    }).join('\n');
  }
  function textToTopics(text) {
    return String(text || '').split('\n').map(function (l) {
      l = l.trim(); if (!l) return null;
      var cl = [], m = /\[([^\]]*)\]\s*$/.exec(l);
      if (m) { cl = cloNumsIn(m[1]).concat(/clo/i.test(m[1]) ? [] : nums(m[1])); l = l.slice(0, m.index).trim(); }
      var w = /^(?:week|wk)\s*(\d{1,2})\s*[:.\-\u2013]\s*(.*)$/i.exec(l);
      return { week: w ? Number(w[1]) : null, title: clean(w ? w[2] : l).slice(0, 200), cloNums: cl };
    }).filter(function (t) { return t && t.title; });
  }

  window.QBOutline = { readFile: readFile, extract: extract, topicsToText: topicsToText, textToTopics: textToTopics };
})();

;
/* UI. All user / imported / AI text is inserted with textContent only (no innerHTML anywhere). */
(function () {
  'use strict';
  var S = window.QBStore, D = window.QBDocx, AI = window.QBAI;
  var data = null;        // working data
  var keyInfo = null;     // encryption key in memory (when password set)
  var dirtyPC = false;    // changes not yet written to the PC backup file
  var lastPCSave = null;
  var aiCandidates = [];

  // ---------- DOM helpers ----------
  // AI Generate was removed from the page; its old code stays inert (ids below no longer exist).
  var REMOVED = /^(?:ai[A-Z]\w*|getKey|saveKey|clearKey|testKey|keyMsg|modelList)$/;
  function $(id) { var el = document.getElementById(id); return el || (REMOVED.test(id) ? document.createElement('div') : el); }
  function h(tag, attrs) {
    var el = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(function (k) {
      var v = attrs[k];
      if (v == null || v === false) return;
      if (k === 'text') el.textContent = v;
      else if (k === 'class') el.className = v;
      else if (k.slice(0, 2) === 'on') el.addEventListener(k.slice(2), v);
      else if (k === 'checked' || k === 'disabled' || k === 'value' || k === 'selected') el[k] = v;
      else el.setAttribute(k, v === true ? '' : String(v));
    });
    for (var i = 2; i < arguments.length; i++) {
      var c = arguments[i];
      if (c == null || c === false) continue;
      (Array.isArray(c) ? c : [c]).forEach(function (x) { if (x != null && x !== false) el.append(x.nodeType ? x : document.createTextNode(String(x))); });
    }
    return el;
  }
  function clear(el) { el.replaceChildren(); return el; }
  function toast(msg, kind) {
    var t = $('toast'); t.textContent = msg; t.className = 'toast show ' + (kind || '');
    clearTimeout(toast._t); toast._t = setTimeout(function () { t.className = 'toast'; }, kind === 'err' ? 6000 : 3000);
  }
  function opt(value, label, selected) { return h('option', { value: value, text: label, selected: !!selected }); }
  function course(id) { return data.courses.find(function (c) { return c.id === id; }); }
  function question(id) { return data.questions.find(function (q) { return q.id === id; }); }
  function cloLabels(q) {
    var c = course(q.courseId); if (!c) return [];
    return c.clos.filter(function (x) { return q.clos.indexOf(x.id) >= 0; }).map(function (x) { return x.label; });
  }
  function total(q) { return D.questionTotal(q); }
  function ploLabels(q) {
    var c = course(q.courseId); if (!c || !q.plos) return [];
    return (c.plos || []).filter(function (x) { return q.plos.indexOf(x.id) >= 0; }).map(function (x) { return x.label; });
  }
  function findLab(list, lab) { var k = lab.replace(/\s+/g, '').toUpperCase(); return list.find(function (y) { return y.label.replace(/\s+/g, '').toUpperCase() === k; }); }
  function round(n) { return Math.round(n * 100) / 100; }
  // ----- course outline topics -----
  function norm(t) { return String(t || '').trim().toLowerCase().replace(/\s+/g, ' '); }
  function topicOf(c, title) { var k = norm(title); return k && c && c.topics ? c.topics.find(function (t) { return norm(t.title) === k; }) : null; }
  function topicClos(c, t) { return c.clos.filter(function (x) { return t.clos.indexOf(x.id) >= 0; }).map(function (x) { return x.label; }); }
  function topicShort(t) { return (t.week ? 'W' + t.week + ' \u00b7 ' : '') + (t.title.length > 42 ? t.title.slice(0, 40) + '\u2026' : t.title); }
  function topicLong(c, t) { var cl = topicClos(c, t); return (t.week ? 'Week ' + t.week + ' \u2014 ' : '') + t.title + (cl.length ? '  \u00b7  ' + cl.join(', ') : ''); }
  function topicInfo(el, c, title) {
    clear(el); el.className = 'topic-info';
    if (!c || !title || !title.trim()) { if (c && c.topics && c.topics.length) el.textContent = c.topics.length + ' topics available from the course outline \u2014 start typing or pick from the list.'; return; }
    var parts = title.split(/\s*,\s*/).filter(Boolean), found = parts.map(function (p) { return topicOf(c, p); }).filter(Boolean);
    if (!found.length) { if (c.topics && c.topics.length) el.textContent = 'Not in the course outline (custom topic).'; return; }
    el.className = 'topic-info match';
    found.forEach(function (t, i) {
      var nq = data.questions.filter(function (q) { return q.courseId === c.id && norm(q.topic) === norm(t.title); }).length;
      el.append(h('div', null, '\ud83d\udcd8 ', h('b', { text: topicLong(c, t) }), h('span', { text: '  \u00b7  ' + nq + ' question' + (nq === 1 ? '' : 's') + ' in the bank' })));
    });
  }

  // ---------- persistence ----------
  var saveTimer = null;
  function changed() {
    dirtyPC = true; setStatus();
    clearTimeout(saveTimer); saveTimer = setTimeout(saveLocal, 400);
  }
  async function saveLocal() {
    clearTimeout(saveTimer);
    try { await S.writeLocal(data, keyInfo); }
    catch (e) { toast('Could not save in browser storage: ' + (e && e.name === 'QuotaExceededError' ? 'storage full — export a JSON backup.' : e.message), 'err'); }
  }
  function backupPayload() { // the PC backup never contains the AI key
    var d = JSON.parse(JSON.stringify(data)); d.settings.ai.geminiKey = ''; d.savedAt = new Date().toISOString(); return d;
  }
  async function saveAll() {
    await saveLocal();
    var mode = data.settings.backupMode;
    if (mode === 'browser') { dirtyPC = false; lastPCSave = null; setStatus('Saved in browser'); return toast('Saved on this PC (browser storage).'); }
    var payload = backupPayload();
    var text = JSON.stringify(keyInfo ? await S.encryptWith(keyInfo, payload) : payload, null, keyInfo ? 0 : 2);
    try {
      if (mode === 'auto' && S.fsSupported) {
        var hnd = await S.getLinkedFile();
        if (!hnd) { hnd = await S.linkNewFile(); }
        await S.writeToHandle(hnd, text);
        lastPCSave = new Date(); dirtyPC = false; setStatus(); refreshLinkState();
        return toast('Saved. Backup file updated: ' + hnd.name);
      }
      S.download(new Blob([text], { type: 'application/json' }), 'question-bank-backup_' + S.stamp() + '.json');
      lastPCSave = new Date(); dirtyPC = false; setStatus();
      toast('Saved. Backup file downloaded to your PC.');
    } catch (e) {
      if (e && e.name === 'AbortError') { setStatus(); return toast('Saved in browser. Backup file not written (cancelled).'); }
      toast('Saved in browser, but backup file failed: ' + e.message, 'err'); setStatus();
    }
  }
  function setStatus(txt) {
    var el = $('saveStatus');
    if (txt) { el.textContent = txt; el.className = 'save-status'; return; }
    if (dirtyPC && data.settings.backupMode !== 'browser') { el.textContent = 'Unsaved changes'; el.className = 'save-status warn'; }
    else el.textContent = lastPCSave ? 'Saved to PC ' + lastPCSave.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Saved', el.className = 'save-status';
  }

  // ---------- tabs ----------
  function showTab(name) {
    document.querySelectorAll('.tab').forEach(function (b) { b.classList.toggle('active', b.dataset.tab === name); });
    document.querySelectorAll('.panel').forEach(function (p) { p.classList.toggle('hidden', p.id !== 'tab-' + name); });
    render(name);
  }
  function current() { var a = document.querySelector('.tab.active'); return a ? a.dataset.tab : 'bank'; }
  function render(name) {
    name = name || current();
    if (name === 'bank') renderBank();
    else if (name === 'ai') renderAI();
    else if (name === 'paper') renderPaper();
    else if (name === 'import') renderImport();
    else if (name === 'courses') renderCourses();
    else if (name === 'backup') renderBackup();
  }

  function fillCourseSelect(sel, value, allLabel) {
    clear(sel);
    if (allLabel) sel.append(opt('', allLabel));
    data.courses.forEach(function (c) { sel.append(opt(c.id, c.code + ' — ' + c.title, c.id === value)); });
    if (value != null) sel.value = value;
  }

  // ---------- QUESTION BANK ----------
  var filt = { course: '', clo: '', type: '', diff: '', q: '', topic: '' };
  function renderBank() {
    fillCourseSelect($('fCourse'), filt.course, 'All courses');
    var fc = $('fClo'); clear(fc).append(opt('', 'All CLOs'));
    var c = course(filt.course);
    if (c) c.clos.forEach(function (x) { fc.append(opt(x.id, x.label, x.id === filt.clo)); });
    else filt.clo = '';
    fc.disabled = !c;
    var ft = clear($('fTopic')); ft.append(opt('', 'All topics'));
    if (c && c.topics.length) c.topics.forEach(function (t) { ft.append(opt(norm(t.title), topicShort(t), norm(t.title) === filt.topic)); });
    else filt.topic = '';
    ft.disabled = !(c && c.topics.length); ft.title = 'Topics come from the course outline';
    var list = filteredQuestions();
    $('bankCount').textContent = list.length + ' of ' + data.questions.length + ' questions';
    var box = clear($('qList'));
    if (!data.courses.length) box.append(h('div', { class: 'empty' }, 'Start by adding a course and its CLOs in ', h('button', { class: 'link', text: 'Courses & CLOs', onclick: function () { showTab('courses'); } }), '.'));
    else if (!list.length) box.append(h('div', { class: 'empty', text: 'No questions match. Click “+ Add question” or use AI Generate.' }));
    shownData = {};
    list.forEach(function (q) { box.append(questionCard(q)); });
    shownData = null;
  }
  function filteredQuestions() {
    var s = filt.q.trim().toLowerCase();
    return data.questions.filter(function (q) {
      if (filt.course && q.courseId !== filt.course) return false;
      if (filt.clo && q.clos.indexOf(filt.clo) < 0) return false;
      if (filt.type && q.qtype !== filt.type) return false;
      if (filt.diff && q.difficulty !== filt.diff) return false;
      if (filt.topic && norm(q.topic) !== filt.topic) return false;
      if (s) {
        var hay = [q.title, q.stem, q.topic, q.answer].concat(q.parts.map(function (p) { return p.text; })).join(' ').toLowerCase();
        if (hay.indexOf(s) < 0) return false;
      }
      return true;
    });
  }
  var shownData = null;   // shared-data texts already shown in the list being drawn
  function dataTitle(d) { var l = d.split('\n').map(function (x) { return x.trim(); }).filter(Boolean)[0] || 'shared data'; return l.indexOf('|') >= 0 ? 'shared table' : l.slice(0, 60); }
  function questionBody(q, label) {
    var frag = h('div', { class: 'qbody' });
    if (q.data && shownData && shownData[q.data]) {
      frag.append(h('p', { class: 'qdata-same' }, '\ud83d\udcca Uses the same shared data as ', h('b', { text: shownData[q.data] }), ' (\u201c' + dataTitle(q.data) + '\u201d) \u2014 printed only once on the paper.'));
    } else if (q.data) {
      if (shownData) shownData[q.data] = label || 'the question above';
      frag.append(h('details', { class: 'qdata' }, h('summary', { text: '\ud83d\udcca Shared data / tables (' + q.data.split('\n').filter(function (l) { return l.indexOf('|') >= 0; }).length + ' table rows)' }), stemPreview(q.data, (q.dataLines || data.paper.dataLines) === 'none')));
    }
    if (q.stem) frag.append(stemPreview(q.stem));
    if (q.parts.length) frag.append(h('ol', { class: 'parts' }, q.parts.map(function (p, i) {
      return h('li', null, h('span', { class: 'pl', text: '(' + D.letter(i) + ')' }), ' ', p.text, h('span', { class: 'pm', text: ' (' + D.fmtMarks(p.marks) + ')' }));
    })));
    return frag;
  }
  function badges(q, showCourse) {
    var c = course(q.courseId);
    return h('div', { class: 'badges' },
      showCourse && c ? h('span', { class: 'badge course', text: c.code }) : null,
      h('span', { class: 'badge marks', text: D.fmtMarks(total(q)) }),
      cloLabels(q).map(function (l) { return h('span', { class: 'badge clo', text: l }); }),
      q.clos.length ? null : h('span', { class: 'badge warn', text: 'No CLO' }),
      ploLabels(q).length ? h('span', { class: 'badge plo', text: D.ploText(ploLabels(q)) }) : null,
      q.data ? h('span', { class: 'badge data', text: 'Shared data' }) : null,
      q.qtype ? h('span', { class: 'badge', text: q.qtype }) : null,
      q.difficulty ? h('span', { class: 'badge diff-' + q.difficulty.toLowerCase(), text: q.difficulty }) : null,
      q.topic ? (function () { var c = course(q.courseId), t = topicOf(c, q.topic); return h('span', { class: 'badge topic', title: t ? topicLong(c, t) : 'Topic', text: (t && t.week ? 'W' + t.week + ' \u00b7 ' : '') + q.topic }); })() : null,
      q.answer ? h('span', { class: 'badge', text: 'Answer key' }) : null);
  }
  function questionCard(q) {
    var inPaper = data.paper.questionIds.indexOf(q.id) >= 0;
    return h('article', { class: 'qcard' },
      h('div', { class: 'qhead' }, h('h3', { text: q.title || '(untitled question)' }), badges(q, !filt.course)),
      questionBody(q, '\u201c' + (q.title || (q.stem || '').slice(0, 40) || 'question') + '\u201d'),
      q.answer ? h('details', { class: 'answer' }, h('summary', { text: 'Answer key' }), h('p', { text: q.answer })) : null,
      h('div', { class: 'qactions' },
        h('button', { class: 'btn small ' + (inPaper ? 'ghost' : ''), text: inPaper ? '✓ On paper (remove)' : '+ Add to paper', onclick: function () { togglePaper(q); renderBank(); } }),
        h('button', { class: 'btn small ghost', text: 'Edit', onclick: function () { openQuestion(q); } }),
        h('button', { class: 'btn small ghost', text: 'Duplicate', onclick: function () {
          var d = S.cleanQuestion(Object.assign({}, q, { id: '', title: q.title + ' (copy)', createdAt: '', updatedAt: '', parts: q.parts.map(function (p) { return { text: p.text, marks: p.marks }; }) }));
          data.questions.splice(data.questions.indexOf(q) + 1, 0, d); changed(); renderBank();
        } }),
        h('button', { class: 'btn small ghost danger-t', text: 'Delete', onclick: function () {
          if (!confirm('Delete this question permanently?')) return;
          data.questions = data.questions.filter(function (x) { return x !== q; });
          data.paper.questionIds = data.paper.questionIds.filter(function (x) { return x !== q.id; });
          changed(); renderBank();
        } })));
  }
  function togglePaper(q) {
    var ids = data.paper.questionIds, i = ids.indexOf(q.id);
    if (i >= 0) ids.splice(i, 1);
    else {
      if (data.paper.courseId && data.paper.courseId !== q.courseId && ids.length) {
        if (!confirm('This question belongs to a different course than the current paper. Switch the paper to that course and clear its questions?')) return;
        data.paper.questionIds = []; ids = data.paper.questionIds;
      }
      data.paper.courseId = q.courseId; ids.push(q.id);
      toast('Added to paper as Q' + ids.length);
    }
    changed();
  }

  // ---------- question editor ----------
  var editing = null, draftParts = [], draftClos = [];
  var addToPaperAfterSave = false;
  function openQuestion(q, preset) {
    if (!data.courses.length) { toast('Add a course first.', 'err'); return showTab('courses'); }
    editing = q || null;
    var src = q || S.cleanQuestion(Object.assign({ courseId: filt.course || data.paper.courseId || data.courses[0].id }, preset || {}));
    $('qDlgTitle').textContent = q ? 'Edit question' : 'New question';
    fillCourseSelect($('qCourse'), course(src.courseId) ? src.courseId : data.courses[0].id);
    $('qTitle').value = src.title; $('qStem').value = src.stem; $('qMarks').value = src.marks || '';
    $('qType').value = src.qtype; $('qDiff').value = src.difficulty; $('qTopic').value = src.topic; $('qAnswer').value = src.answer || '';
    draftParts = src.parts.map(function (p) { return { id: p.id, text: p.text, marks: p.marks }; });
    if (!q && !draftParts.length) draftParts = [{ text: '', marks: 1 }];
    draftClos = src.clos.slice(); draftPlos = (src.plos || []).slice();
    $('qData').value = src.data || ''; $('qDataWrap').open = !!src.data; $('qDataLines').value = src.dataLines || ''; $('qTableLines').value = src.tableLines || ''; $('qNewPlo').value = '';
    fillTopicList(); renderQPlos();
    $('qErr').textContent = ''; $('qNewClo').value = '';
    renderQClos(); renderQParts(); $('qDlg').showModal(); $('qTitle').focus();
  }
  function fillTopicList() {
    var c = course($('qCourse').value), dl = clear($('qTopicList'));
    (c ? c.topics : []).forEach(function (t) { dl.append(h('option', { value: t.title, label: topicLong(c, t) })); });
    topicInfo($('qTopicInfo'), c, $('qTopic').value);
  }
  function onQTopic() {
    var c = course($('qCourse').value), t = topicOf(c, $('qTopic').value);
    if (t && !draftClos.length && t.clos.length) { draftClos = t.clos.slice(); renderQClos(); }
    topicInfo($('qTopicInfo'), c, $('qTopic').value);
  }
  var draftPlos = [];
  function renderQPlos() {
    var c = course($('qCourse').value), box = clear($('qPlos'));
    if (!c || !(c.plos || []).length) box.append(h('span', { class: 'muted small', text: 'No PLOs for this course yet \u2014 add one below or in Courses & CLOs.' }));
    (c ? c.plos || [] : []).forEach(function (x) {
      var on = draftPlos.indexOf(x.id) >= 0;
      box.append(h('button', { type: 'button', class: 'chip' + (on ? ' on' : ''), title: x.desc, text: x.label, onclick: function () {
        if (on) draftPlos = draftPlos.filter(function (y) { return y !== x.id; }); else draftPlos.push(x.id); renderQPlos();
      } }));
    });
  }
  function renderQClos() {
    var c = course($('qCourse').value), box = clear($('qClos'));
    if (!c || !c.clos.length) box.append(h('span', { class: 'muted small', text: 'This course has no CLOs yet — add one below.' }));
    (c ? c.clos : []).forEach(function (x) {
      var on = draftClos.indexOf(x.id) >= 0;
      box.append(h('button', { type: 'button', class: 'chip' + (on ? ' on' : ''), title: x.desc, text: x.label, onclick: function () {
        if (on) draftClos = draftClos.filter(function (y) { return y !== x.id; });
        else { draftClos.push(x.id); (x.plos || []).forEach(function (p) { if (draftPlos.indexOf(p) < 0) draftPlos.push(p); }); renderQPlos(); }
        renderQClos();
      } }));
    });
  }
  function renderQParts() {
    var box = clear($('qParts'));
    draftParts.forEach(function (p, i) {
      var ta = h('textarea', { rows: 2, maxlength: 5000, placeholder: 'Part (' + D.letter(i) + ') text', value: p.text, oninput: function () { p.text = ta.value; } });
      var mk = h('input', { type: 'number', min: 0, step: 0.5, value: p.marks, class: 'mk', 'aria-label': 'Marks', oninput: function () { p.marks = Number(mk.value) || 0; updQTotal(); } });
      box.append(h('div', { class: 'part-row' }, h('span', { class: 'pl', text: '(' + D.letter(i) + ')' }), ta,
        h('div', { class: 'part-side' }, mk, h('span', { class: 'small muted', text: 'marks' }),
          h('div', { class: 'part-btns' },
            h('button', { type: 'button', class: 'icon', title: 'Move up', text: '↑', disabled: i === 0, onclick: function () { draftParts.splice(i - 1, 0, draftParts.splice(i, 1)[0]); renderQParts(); } }),
            h('button', { type: 'button', class: 'icon', title: 'Move down', text: '↓', disabled: i === draftParts.length - 1, onclick: function () { draftParts.splice(i + 1, 0, draftParts.splice(i, 1)[0]); renderQParts(); } }),
            h('button', { type: 'button', class: 'icon danger-t', title: 'Remove part', text: '✕', onclick: function () { draftParts.splice(i, 1); renderQParts(); } })))));
    });
    $('qMarksWrap').classList.toggle('hidden', draftParts.length > 0);
    updQTotal();
  }
  function updQTotal() {
    var t = draftParts.length ? draftParts.reduce(function (s, p) { return s + (Number(p.marks) || 0); }, 0) : Number($('qMarks').value) || 0;
    $('qTotal').textContent = 'Total: ' + D.fmtMarks(round(t));
  }
  function saveQuestion(ev) {
    ev.preventDefault();
    var parts = draftParts.filter(function (p) { return String(p.text).trim(); });
    var q = S.cleanQuestion({
      id: editing ? editing.id : '', courseId: $('qCourse').value, title: $('qTitle').value.trim(), stem: $('qStem').value.trim(), data: $('qData').value.trim(), dataLines: $('qDataLines').value, tableLines: $('qTableLines').value,
      plos: draftPlos.filter(function (id) { var c = course($('qCourse').value); return c && (c.plos || []).some(function (x) { return x.id === id; }); }),
      parts: parts, marks: $('qMarks').value, clos: draftClos.filter(function (id) { var c = course($('qCourse').value); return c && c.clos.some(function (x) { return x.id === id; }); }),
      qtype: $('qType').value, difficulty: $('qDiff').value, topic: $('qTopic').value.trim(), answer: $('qAnswer').value.trim(),
      createdAt: editing ? editing.createdAt : '', updatedAt: new Date().toISOString()
    });
    if (!q.title && !q.stem && !q.parts.length) { $('qErr').textContent = 'Write a heading, a statement or at least one part.'; return; }
    if (total(q) <= 0) { $('qErr').textContent = 'Give the question some marks.'; return; }
    if (editing) {
      if (editing.courseId !== q.courseId) data.paper.questionIds = data.paper.questionIds.filter(function (x) { return x !== q.id; });
      data.questions[data.questions.indexOf(editing)] = q;
    } else {
      data.questions.unshift(q);
      if (addToPaperAfterSave) {
        if (data.paper.courseId !== q.courseId && data.paper.questionIds.length && !confirm('This question is for a different course than the paper. Add it to the paper anyway?')) { /* keep in bank only */ }
        else { if (!data.paper.courseId) data.paper.courseId = q.courseId; data.paper.questionIds.push(q.id); toast('Question saved in the bank and added to the paper.'); }
      }
    }
    addToPaperAfterSave = false;
    $('qDlg').close(); changed(); render(); toast('Question saved.');
  }

  // ---------- COURSES ----------
  var editingCourse = null, draftCClos = [], draftCPlos = [];
  function renderCPlos() {
    var box = clear($('cPlos'));
    if (!draftCPlos.length) box.append(h('p', { class: 'muted small', text: 'No PLOs yet. They are optional.' }));
    draftCPlos.forEach(function (x, i) {
      var lb = h('input', { class: 'clo-label', maxlength: 30, value: x.label, 'aria-label': 'PLO label', oninput: function () { x.label = lb.value; } });
      var ds = h('textarea', { rows: 1, maxlength: 600, placeholder: 'PLO description (optional)', value: x.desc, oninput: function () { x.desc = ds.value; } });
      box.append(h('div', { class: 'plo-row' }, lb, ds, h('button', { type: 'button', class: 'icon danger-t', title: 'Remove PLO', text: '\u2715', onclick: function () { draftCPlos.splice(i, 1); renderCPlos(); } })));
    });
  }
  function renderCourses() {
    var box = clear($('courseList'));
    if (!data.courses.length) box.append(h('div', { class: 'empty', text: 'No courses yet. Add your first course and its CLOs.' }));
    data.courses.forEach(function (c) {
      var n = data.questions.filter(function (q) { return q.courseId === c.id; }).length;
      box.append(h('article', { class: 'card course' },
        h('div', { class: 'qhead' }, h('h3', null, h('span', { class: 'code', text: c.code }), ' ', c.title), h('span', { class: 'muted small', text: n + ' question' + (n === 1 ? '' : 's') })),
        c.clos.length ? h('ul', { class: 'clo-list' }, c.clos.map(function (x) {
          var cnt = data.questions.filter(function (q) { return q.clos.indexOf(x.id) >= 0; }).length;
          return h('li', null, h('b', { text: x.label }), ' ', x.desc || '', h('span', { class: 'muted small', text: '  · ' + cnt + ' q' }));
        })) : h('p', { class: 'muted small', text: 'No CLOs defined.' }),
        (c.plos || []).length ? h('p', { class: 'small' }, h('b', { text: 'PLOs: ' }), (c.plos || []).map(function (x) { return h('span', { class: 'badge plo', title: x.desc, text: x.label }); })) : null,
        outlineBox(c),
        h('div', { class: 'qactions' },
          h('button', { class: 'btn small', text: 'Edit course & CLOs', onclick: function () { openCourse(c); } }),
          h('button', { class: 'btn small', text: c.outline ? 'Replace outline' : '\u2b06 Upload outline', onclick: function () { outlineTarget = c; $('oFile').value = ''; $('oFile').click(); } }),
          h('button', { class: 'btn small ghost', text: 'Paste outline text', onclick: function () { openOutline(c, '', ''); } }),
          c.topics.length ? h('button', { class: 'btn small ghost', text: 'Edit topics', onclick: function () { openOutline(c, null, null); } }) : null,
          h('button', { class: 'btn small ghost', text: 'View questions', onclick: function () { filt.course = c.id; filt.clo = ''; showTab('bank'); } }),
          h('button', { class: 'btn small ghost danger-t', text: 'Delete', onclick: function () {
            if (!confirm('Delete course ' + c.code + (n ? ' and its ' + n + ' question(s)' : '') + '? This cannot be undone.')) return;
            data.courses = data.courses.filter(function (x) { return x !== c; });
            data.questions = data.questions.filter(function (q) { return q.courseId !== c.id; });
            if (data.paper.courseId === c.id) { data.paper.courseId = ''; data.paper.questionIds = []; }
            changed(); renderCourses();
          } }))));
    });
  }
  function outlineBox(c) {
    if (!c.outline && !c.topics.length) return h('p', { class: 'muted small', text: 'No course outline uploaded yet.' });
    var cnt = function (t) { return data.questions.filter(function (q) { return q.courseId === c.id && norm(q.topic) === norm(t.title); }).length; };
    return h('div', { class: 'outline-box' },
      c.outline ? h('p', { class: 'small' }, '\ud83d\udcc4 ', h('b', { text: c.outline.fileName || 'Pasted outline' }), h('span', { class: 'muted', text: c.outline.uploadedAt ? '  \u00b7  added ' + new Date(c.outline.uploadedAt).toLocaleDateString() : '' })) : null,
      h('details', { open: c.topics.length <= 16 ? true : null }, h('summary', { text: 'Topics from the outline (' + c.topics.length + ')' }),
        h('ul', { class: 'topic-list' }, c.topics.map(function (t) {
          var n = cnt(t);
          return h('li', null, h('span', { class: 'wk', text: t.week ? 'Week ' + t.week : '\u2022' }), h('span', { text: t.title }),
            topicClos(c, t).map(function (l) { return h('span', { class: 'badge clo', text: l }); }),
            h('span', { class: 'badge ' + (n ? '' : 'warn'), text: n + ' q' }),
            h('button', { class: 'link small', text: 'questions', onclick: function () { filt.course = c.id; filt.topic = norm(t.title); filt.clo = ''; showTab('bank'); } }));
        }))),
      c.outline && c.outline.text ? h('details', null, h('summary', { text: 'View outline text' }), h('div', { class: 'outline-text', text: c.outline.text })) : null);
  }

  // ---------- course outline dialog ----------
  var outlineTarget = null, outlineFile = '', outlineFound = [];
  async function outlineFromFile(file) {
    var c = outlineTarget; if (!file || !c) return;
    try { openOutline(c, await window.QBOutline.readFile(file), file.name); }
    catch (e) { toast(e.message, 'err'); openOutline(c, '', file.name); }
  }
  function openOutline(c, text, fileName) {
    outlineTarget = c; outlineFound = [];
    $('oTitle').textContent = 'Course outline \u2014 ' + c.code + ' ' + c.title;
    $('oMsg').textContent = ''; clear($('oClos')); $('oReplace').checked = false;
    if (text === null) { // edit existing topics
      outlineFile = c.outline ? c.outline.fileName : '';
      $('oText').value = c.outline ? c.outline.text : '';
      $('oTopics').value = window.QBOutline.topicsToText(c.topics.map(function (t) { return { week: t.week, title: t.title, cloLabels: topicClos(c, t) }; }));
      $('oFileInfo').textContent = 'Edit the topic list below, or click \u201cFind CLOs & topics\u201d to read the outline text again.';
    } else {
      outlineFile = fileName || '';
      $('oText').value = text; $('oTopics').value = '';
      $('oFileInfo').textContent = fileName ? 'Read from: ' + fileName : 'Paste the course outline text below, then click \u201cFind CLOs & topics\u201d.';
      if (text) readOutline();
    }
    $('oDlg').showModal();
  }
  function readOutline() {
    var c = outlineTarget, r = window.QBOutline.extract($('oText').value), box = clear($('oClos'));
    outlineFound = r.clos.map(function (x) {
      var lab = 'CLO ' + x.num, ex = c.clos.find(function (y) { return norm(y.label).replace(/\s/g, '') === lab.toLowerCase().replace(' ', ''); });
      return { label: lab, desc: x.desc, existing: ex, on: !ex || !ex.desc, plos: x.plos || [] };
    });
    if (!outlineFound.length) box.append(h('p', { class: 'small muted', text: 'No CLOs found in this text. You can still add them in \u201cEdit course & CLOs\u201d.' }));
    outlineFound.forEach(function (f) {
      var cb = h('input', { type: 'checkbox', checked: f.on, onchange: function () { f.on = cb.checked; } });
      var ta = h('textarea', { rows: 2, maxlength: 600, value: f.desc, oninput: function () { f.desc = ta.value; } });
      box.append(h('div', { class: 'oclo-row' }, cb, h('b', { text: f.label }), ta,
        h('span', { class: 'st', text: f.existing ? (f.existing.desc ? 'Already in course: \u201c' + f.existing.desc.slice(0, 80) + '\u201d' : 'Already in course (no description yet)') : 'New CLO' })));
    });
    $('oTopics').value = window.QBOutline.topicsToText(r.topics.map(function (t) { return { week: t.week, title: t.title, cloLabels: t.cloNums.map(function (n) { return 'CLO ' + n; }) }; }));
    var msg = $('oMsg'); msg.className = 'small ' + (r.clos.length || r.topics.length ? 'ok' : 'err');
    msg.textContent = r.clos.length || r.topics.length ? 'Found ' + r.clos.length + ' CLO(s) and ' + r.topics.length + ' topic(s). Check and edit them, then click Save to course.'
      : 'Nothing found automatically. Type the topics yourself (one per line), e.g. \u201cWeek 1: Introduction [CLO 1]\u201d.';
  }
  function saveOutline() {
    var c = outlineTarget; if (!c) return;
    var findClo = function (lab) { var k = lab.toLowerCase().replace(/\s/g, ''); return c.clos.find(function (y) { return norm(y.label).replace(/\s/g, '') === k; }); };
    outlineFound.forEach(function (f) {
      if (!f.on || !f.desc.trim()) return;
      var ex = findClo(f.label);
      if (ex) { if (!ex.desc || $('oReplace').checked) ex.desc = f.desc.trim().slice(0, 600); }
      else { ex = { id: S.newId(), label: f.label, desc: f.desc.trim().slice(0, 600) }; c.clos.push(ex); }
      if (f.plos && f.plos.length) {
        c.plos = c.plos || [];
        ex.plos = f.plos.map(function (n) { var p = findLab(c.plos, 'PLO ' + n); if (!p) { p = { id: S.newId(), label: 'PLO ' + n, desc: '' }; c.plos.push(p); } return p.id; });
        c.plos.sort(function (a, b) { return a.label.localeCompare(b.label, undefined, { numeric: true }); });
      }
    });
    c.topics = window.QBOutline.textToTopics($('oTopics').value).slice(0, 150).map(function (t) {
      return { id: S.newId(), week: t.week, title: t.title, clos: t.cloNums.map(function (n) {
        var x = findClo('CLO ' + n); if (!x) { x = { id: S.newId(), label: 'CLO ' + n, desc: '' }; c.clos.push(x); } return x.id;
      }) };
    });
    c.clos.sort(function (a, b) { return a.label.localeCompare(b.label, undefined, { numeric: true }); });
    if ($('oText').value.trim()) c.outline = { fileName: outlineFile || (c.outline && c.outline.fileName) || '', uploadedAt: new Date().toISOString(), text: $('oText').value.slice(0, 150000) };
    var cleaned = S.cleanCourse(c); data.courses[data.courses.indexOf(c)] = cleaned;
    $('oDlg').close(); changed(); render();
    toast('Outline saved: ' + cleaned.clos.length + ' CLO(s), ' + cleaned.topics.length + ' topic(s). Press Save to back up.');
  }

  function openCourse(c) {
    editingCourse = c || null;
    $('cDlgTitle').textContent = c ? 'Edit course' : 'New course';
    $('cCode').value = c ? c.code : ''; $('cTitle').value = c ? c.title : '';
    draftCClos = c ? c.clos.map(function (x) { return { id: x.id, label: x.label, desc: x.desc, plos: (x.plos || []).slice() }; }) : [{ id: S.newId(), label: 'CLO 1', desc: '' }];
    draftCPlos = c ? (c.plos || []).map(function (x) { return { id: x.id, label: x.label, desc: x.desc }; }) : [];
    $('cErr').textContent = ''; renderCClos(); renderCPlos(); $('cDlg').showModal(); $('cCode').focus();
  }
  function renderCClos() {
    var box = clear($('cClos'));
    draftCClos.forEach(function (x, i) {
      var lb = h('input', { class: 'clo-label', maxlength: 30, value: x.label, 'aria-label': 'CLO label', oninput: function () { x.label = lb.value; } });
      var ds = h('textarea', { rows: 2, maxlength: 600, placeholder: 'Students will be able to…', value: x.desc, oninput: function () { x.desc = ds.value; } });
      box.append(h('div', { class: 'clo-row' }, lb, ds, h('button', { type: 'button', class: 'icon danger-t', title: 'Remove CLO', text: '✕', onclick: function () {
        var used = data.questions.filter(function (q) { return q.clos.indexOf(x.id) >= 0; }).length;
        if (used && !confirm(x.label + ' is used by ' + used + ' question(s). Remove it from them?')) return;
        draftCClos.splice(i, 1); renderCClos();
      } })));
    });
  }
  function saveCourse(ev) {
    ev.preventDefault();
    var code = $('cCode').value.trim(), title = $('cTitle').value.trim();
    if (!code || !title) { $('cErr').textContent = 'Course code and title are required.'; return; }
    if (data.courses.some(function (c) { return c !== editingCourse && c.code.toLowerCase() === code.toLowerCase(); })) { $('cErr').textContent = 'A course with this code already exists.'; return; }
    var clos = draftCClos.filter(function (x) { return x.label.trim(); });
    var plos = draftCPlos.filter(function (x) { return x.label.trim(); }), plKeep = {}; plos.forEach(function (x) { plKeep[x.id] = 1; });
    clos.forEach(function (x) { x.plos = (x.plos || []).filter(function (id) { return plKeep[id]; }); });
    var c = S.cleanCourse({ id: editingCourse ? editingCourse.id : '', code: code, title: title, clos: clos, plos: plos,
      topics: editingCourse ? editingCourse.topics.map(function (t) { return Object.assign({}, t, { clos: t.clos.filter(function (id) { return clos.some(function (x) { return x.id === id; }); }) }); }) : [],
      outline: editingCourse ? editingCourse.outline : null });
    if (editingCourse) {
      var keep = {}; c.clos.forEach(function (x) { keep[x.id] = 1; });
      data.questions.forEach(function (q) { if (q.courseId === c.id) { q.clos = q.clos.filter(function (id) { return keep[id]; }); q.plos = (q.plos || []).filter(function (id) { return plKeep[id]; }); } });
      data.courses[data.courses.indexOf(editingCourse)] = c;
    } else data.courses.push(c);
    $('cDlg').close(); changed(); render(); toast('Course saved.');
  }

  // ---------- PAPER ----------
  function paperQuestions() { return data.paper.questionIds.map(question).filter(Boolean); }
  function paperTotal() { return round(paperQuestions().reduce(function (s, q) { return s + total(q); }, 0)); }
  function renderPaper() {
    var p = data.paper;
    if (!course(p.courseId) && data.courses.length) p.courseId = data.courses[0].id;
    fillCourseSelect($('pCourse'), p.courseId);
    var c = course(p.courseId) || { code: '', title: '' };
    $('pDept').value = p.department || (data.settings.deptPrefix + data.settings.department); $('pUni').value = p.university || data.settings.university;
    $('pCode').value = p.courseCode || c.code; $('pTitle').value = p.courseTitle || c.title;
    $('pExam').value = p.exam; $('pSeason').value = p.season; $('pClass').value = p.classSection; $('pInstructor').value = p.instructor;
    var ys = clear($('pYear')), now = new Date().getFullYear();
    for (var y = Math.min(now - 3, p.year); y <= Math.max(now + 5, p.year); y++) ys.append(opt(String(y), String(y), y === p.year));
    var known = Array.from($('pTime').options).some(function (o) { return o.value === p.timeAllowed; });
    $('pTime').value = known ? p.timeAllowed : '__custom';
    $('pTimeCustom').classList.toggle('hidden', known); $('pTimeCustom').value = known ? '' : p.timeAllowed;
    $('pStart').value = p.examTime; $('pDate').value = p.date;
    $('pDateMode').value = p.dateMode || 'exact'; $('pDateMonth').value = String(p.dateMonth || 1);
    var dy = clear($('pDateYear')), ny = new Date().getFullYear();
    for (var yy = ny - 2; yy <= ny + 5; yy++) dy.append(opt(String(yy), String(yy), yy === (p.dateYear || ny)));
    showDateMode(); $('pMax').value = p.maxMarksOverride; $('pInstr').value = p.instructions;
    $('paperName').textContent = paperName(p) + '  \u00b7  ' + paperStats(p);
    $('pCloTable').checked = p.appendCloTable; $('pShowPlo').checked = p.showPlo !== false; $('pDataLines').value = p.dataLines || 'none'; $('pStemLines').value = p.stemLines || 'lines';
    renderPaperLists(); renderRG();
  }
  function renderPaperLists() {
    var p = data.paper, sel = clear($('pSelected')), qs = paperQuestions();
    p.questionIds = qs.map(function (q) { return q.id; });
    if (!qs.length) sel.append(h('div', { class: 'empty small', text: 'No questions yet — add them from the list below.' }));
    qs.forEach(function (q, i) {
      sel.append(h('div', { class: 'mini' },
        h('span', { class: 'qn', text: 'Q' + (i + 1) }),
        h('div', { class: 'mini-main' }, h('b', { text: q.title || (q.stem || '').slice(0, 80) || '(untitled)' }), badges(q)),
        h('div', { class: 'part-btns' },
          h('button', { class: 'icon', title: 'Move up', text: '↑', disabled: i === 0, onclick: function () { move(i, -1); } }),
          h('button', { class: 'icon', title: 'Move down', text: '↓', disabled: i === qs.length - 1, onclick: function () { move(i, 1); } }),
          h('button', { class: 'icon', title: 'Edit', text: '✎', onclick: function () { openQuestion(q); } }),
          h('button', { class: 'icon danger-t', title: 'Remove from paper', text: '✕', onclick: function () { p.questionIds.splice(i, 1); changed(); renderPaperLists(); } }))));
    });
    var s = $('pSearch').value.trim().toLowerCase(), av = clear($('pAvailable'));
    var pool = data.questions.filter(function (q) {
      if (q.courseId !== p.courseId || p.questionIds.indexOf(q.id) >= 0) return false;
      return !s || [q.title, q.stem, q.topic].concat(q.parts.map(function (x) { return x.text; })).join(' ').toLowerCase().indexOf(s) >= 0;
    });
    if (!pool.length) av.append(h('div', { class: 'empty small', text: 'No more questions for this course.' }));
    pool.forEach(function (q) {
      av.append(h('div', { class: 'mini' },
        h('div', { class: 'mini-main' }, h('b', { text: q.title || (q.stem || '').slice(0, 80) || '(untitled)' }), badges(q)),
        h('button', { class: 'btn small', text: '+ Add', onclick: function () { p.questionIds.push(q.id); changed(); renderPaperLists(); } })));
    });
    $('paperName').textContent = paperName(p) + '  \u00b7  ' + paperStats(p);
    var t = paperTotal(), max = p.maxMarksOverride === '' ? t : p.maxMarksOverride;
    var sm = $('pSummary'); sm.textContent = qs.length + ' question(s) · total ' + D.fmtMarks(t) + ' · Max Marks on paper: ' + max;
    sm.className = 'summary' + (p.maxMarksOverride !== '' && Number(p.maxMarksOverride) !== t ? ' warn' : '');
    renderCloDist(qs); renderPreview(qs, max);
  }
  function move(i, d) { var ids = data.paper.questionIds; ids.splice(i + d, 0, ids.splice(i, 1)[0]); changed(); renderPaperLists(); }
  function renderCloDist(qs) {
    var c = course(data.paper.courseId), box = clear($('pCloDist'));
    if (!c || !qs.length) return;
    var t = paperTotal() || 1;
    c.clos.forEach(function (x) {
      var m = qs.filter(function (q) { return q.clos.indexOf(x.id) >= 0; }).reduce(function (s, q) { return s + total(q); }, 0);
      var bar = h('span', { class: 'bar-fill' }); bar.style.width = Math.min(100, m / t * 100) + '%';
      box.append(h('div', { class: 'dist-row', title: x.desc }, h('span', { class: 'dist-l', text: x.label }), h('span', { class: 'bar' }, bar), h('span', { class: 'dist-v', text: round(m) + ' marks' })));
    });
  }
  function fmtTime(t) {
    if (!/^\d{2}:\d{2}$/.test(t || '')) return '';
    var hh = Number(t.slice(0, 2)), mm = t.slice(3);
    return ((hh % 12) || 12) + ':' + mm + ' ' + (hh < 12 ? 'AM' : 'PM');
  }
  function paperModel(qsOverride, setLabel) {
    var p = data.paper, c = course(p.courseId) || { code: '', title: '', clos: [] }, qs = qsOverride || paperQuestions();
    var sum = round(qs.reduce(function (a, q) { return a + total(q); }, 0));
    return {
      university: p.university || data.settings.university, deptPrefix: p.department ? '' : data.settings.deptPrefix, department: p.department || data.settings.department,
      examTitle: [p.exam, p.season + ' ' + p.year].filter(function (x) { return x && x.trim(); }).join(' \u2013 ') + (setLabel ? ' (' + setLabel + ')' : ''),
      courseTitle: p.courseTitle || c.title, courseCode: p.courseCode || c.code, examTime: fmtTime(p.examTime), classSection: p.classSection, instructor: p.instructor, timeAllowed: p.timeAllowed,
      date: p.date, dateText: dateText(p), maxMarks: p.maxMarksOverride === '' || qsOverride ? sum : p.maxMarksOverride, instructions: p.instructions,
      appendCloTable: p.appendCloTable, cloInfo: c.clos.map(function (x) { return { label: x.label, desc: x.desc }; }),
      showPlo: p.showPlo !== false, body: null,
      questions: qs.map(function (q) { return { id: q.id, title: q.title, stem: q.stem, data: q.data || '', parts: q.parts, marks: q.marks, cloLabels: cloLabels(q), ploLabels: ploLabels(q),
        tableLines: q.tableLines || p.stemLines || 'lines', dataLines: q.dataLines || p.dataLines || 'none' }; })
    };
  }
  function stemPreview(stem, noLines) { // mirrors docx: lines with "|" become a table
    var wrap = h('div'), buf = [], lines = stem.split('\n'), i = 0;
    var isRow = function (l) { return l.indexOf('|') >= 0 && l.replace(/[|\s]/g, '') !== ''; };
    var isSep = function (l) { return /^\s*\|?\s*:?-{2,}/.test(l) && /^[\s|:-]+$/.test(l); };
    var cells = function (l) { var t = l.trim(); if (t.charAt(0) === '|' && t.charAt(t.length - 1) === '|' && t.length > 1) t = t.slice(1, -1); return t.split('|').map(function (c) { return c.trim(); }); };
    var flush = function () { if (buf.length) { wrap.append(h('p', { class: 'stem', text: buf.join('\n') })); buf = []; } };
    while (i < lines.length) {
      if (isRow(lines[i]) && i + 1 < lines.length && (isRow(lines[i + 1]) || isSep(lines[i + 1]))) {
        flush(); var rows = [];
        while (i < lines.length && (isRow(lines[i]) || isSep(lines[i]))) { if (!isSep(lines[i])) rows.push(cells(lines[i])); i++; }
        wrap.append(h('table', { class: 'pv-table' + (noLines ? ' nolines' : '') }, rows.map(function (r, ri) { return h('tr', null, r.map(function (c) { return h(ri ? 'td' : 'th', { text: c }); })); })));
      } else if (!lines[i].trim()) { flush(); i++; } else { buf.push(lines[i]); i++; }
    }
    flush(); return wrap;
  }
  // "December 3, 2026" | "December 00, 2026" (day not known) | "____________" (no date yet)
  function dateText(p) {
    var M = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    if (p.dateMode === 'month') return M[(p.dateMonth || 1) - 1] + ' 00, ' + (p.dateYear || p.year);
    if (p.dateMode === 'none') return '________________';
    return D.fmtDate(p.date) || '________________';
  }
  function showDateMode() {
    var md = $('pDateMode').value;
    $('pDateExact').classList.toggle('hidden', md !== 'exact');
    $('pDateMonthWrap').classList.toggle('hidden', md !== 'month');
  }
  function finishModel(m) { if (data.paper.edit) m.body = flatten(assemble(m)); return m; }
  function renderPreview(qs, max) {
    var m = paperModel(), box = clear($('preview'));
    box.append(
      h('div', { class: 'pv-head' }, h('img', { src: 'logo.png', alt: '', class: 'pv-logo' }),
        h('div', null, h('div', { class: 'pv-uni', text: m.university }), h('div', { class: 'pv-dept', text: m.deptPrefix + m.department }), h('div', { class: 'pv-exam', text: m.examTitle }))),
      h('p', { class: 'pv-course' }, h('b', { text: '(COURSE TITLE: ' }), h('u', { text: m.courseTitle }), '  ', h('b', { text: 'COURSE CODE' }), ': ', h('u', { text: m.courseCode }), ')'),
      h('div', { class: 'pv-grid' },
        h('span', null, h('b', { text: 'Class/ Section' }), ' : ' + m.classSection), h('span', null, h('b', { text: 'Time Allowed:' }), ' ' + m.timeAllowed),
        h('span', null, h('b', { text: 'Course Instructor' }), ': ' + m.instructor), h('span', null, h('b', { text: 'Max Marks:' }), ' ' + max),
        h('span', null, h('b', { text: 'Date of Exam' }), ' : ' + m.dateText + (m.examTime ? '  (' + m.examTime + ')' : '')), h('span', null, h('b', { text: 'Reg. No' }), ': ___________________'),
        h('span', null, h('b', { text: 'Student’s Name:' }), ' _____________________'), h('span', null, h('b', { text: 'Moderated by:' }), ' ________________')),
      h('p', null, h('b', null, h('u', { text: 'Note/ Instructions:' }), ' '), m.instructions ? m.instructions : h('b', { text: '(if Any)' })),
      h('hr', { class: 'pv-dots' }));
    box.append(edRoot());
    renderEditor(m);
    box.append(h('p', { class: 'pv-foot', text: 'Page 1 of …' }));
  }
  // ---------- editable paper ----------
  var edEl = null, edKey = '', edTimer = null, edRange = null, ED_FONT = 'Times New Roman';
  function edRoot() {
    if (!edEl) {
      edEl = h('div', { id: 'paperEdit', class: 'pv-edit', contenteditable: 'true', spellcheck: 'true', 'aria-label': 'Paper questions (editable)' });
      edEl.addEventListener('input', function () { clearTimeout(edTimer); edTimer = setTimeout(saveEdit, 400); $('edState').textContent = 'Editing\u2026'; });
      edEl.addEventListener('paste', function (e) { // paste as plain text (keeps the paper clean and safe)
        e.preventDefault(); var t = (e.clipboardData || window.clipboardData).getData('text/plain'); document.execCommand('insertText', false, t);
      });
      edEl.addEventListener('keydown', function (e) { if (e.key === 'Tab') { e.preventDefault(); document.execCommand('insertText', false, '    '); } });
      document.addEventListener('selectionchange', function () {
        var s = window.getSelection(); if (s.rangeCount && edEl.contains(s.getRangeAt(0).commonAncestorContainer)) { edRange = s.getRangeAt(0).cloneRange(); syncBar(); }
      });
    }
    return edEl;
  }
  function hashStr(s) { var h1 = 5381; for (var i = 0; i < s.length; i++) h1 = ((h1 << 5) + h1 + s.charCodeAt(i)) | 0; return (h1 >>> 0).toString(36) + '.' + s.length; }
  function baseSegs(m) { return D.buildSegments(m.questions, { showPlo: m.showPlo }); }
  function baseBody(m) { return flatten(baseSegs(m)); }
  function flatten(segs) { var out = []; segs.forEach(function (s) { s.blocks.forEach(function (b) { out.push(b); }); }); return out; }
  // signature of a question's own content, ignoring its number (so reordering keeps edits)
  function segSig(seg) {
    return hashStr(JSON.stringify(seg.blocks).replace(/"t":"Q\d+\. /g, '"t":"Q#. ').replace(/Use the following information for Questions? [\d, and]+:/g, 'Use the following information:'));
  }
  // paper = each question's edited version if that question did not change, otherwise its fresh version
  function assemble(m) {
    var ed = data.paper.edit && data.paper.edit.segs, segs = baseSegs(m);
    return segs.map(function (s, i) {
      var e = ed && ed[s.id];
      if (!e || e.sig !== segSig(s)) return s;
      var body = JSON.parse(JSON.stringify(e.body));
      var bh = s.blocks.filter(function (b) { return b.k === 'h'; })[0], eh = body.filter(function (b) { return b.k === 'h'; })[0];
      if (bh && eh && eh.l[0]) eh.l[0].t = eh.l[0].t.replace(/^Q\d+\./, 'Q' + (i + 1) + '.');            // keep numbering right
      var bl = s.blocks[0], el = body[0];
      if (bl && el && bl.k === 'p' && el.k === 'p' && /^Use the following information/.test((el.runs[0] || {}).t || '')) el.runs = [Object.assign({}, el.runs[0], { t: bl.runs.map(function (r) { return r.t; }).join('') })].concat(el.runs.slice(1).filter(function () { return false; }));
      return { id: s.id, blocks: body, edited: true };
    });
  }
  function renderEditor(m) {
    var p = data.paper, segs = assemble(m), body = flatten(segs);
    $('edStale').classList.add('hidden');
    var edited = segs.some(function (s) { return s.edited; });
    $('edReset').disabled = !p.edit; $('pSaveBank').classList.toggle('hidden', !edited);
    var key = hashStr(JSON.stringify(body)) + '|' + segs.map(function (s) { return s.id; }).join(',');
    if (key === edKey && edEl.childNodes.length) return;        // nothing changed: keep the caret where it is
    edKey = key;
    modelToDom(segs, edEl);
    $('edState').textContent = edited ? 'Edited ✓ (saved)' : '';
  }
  function runStyle(el, r) {
    if (r.b) el.style.fontWeight = 'bold';
    if (r.i) el.style.fontStyle = 'italic';
    if (r.u) el.style.textDecoration = 'underline';
    if (r.s) el.style.fontSize = r.s + 'pt';
    if (r.f) el.style.fontFamily = r.f;
  }
  function appendRuns(parent, runs) {
    (runs || []).forEach(function (r) {
      var outer = document.createElement('span'), inner = outer;
      if (r.s) outer.style.fontSize = r.s + 'pt';
      if (r.f) outer.style.fontFamily = r.f;
      ['b', 'i', 'u'].forEach(function (t) { if (r[t]) { var e = document.createElement(t); inner.appendChild(e); inner = e; } });
      String(r.t).split('\n').forEach(function (ln, i) { if (i) inner.appendChild(document.createElement('br')); if (ln) inner.appendChild(document.createTextNode(ln)); });
      parent.appendChild(outer);
    });
  }
  var CSS_ALIGN = { both: 'justify', left: 'left', center: 'center', right: 'right' };
  function modelToDom(segs, root) {
    root.replaceChildren();
    segs.forEach(function (sg) { sg.blocks.forEach(function (b) { var el = blockToDom(b); el.setAttribute('data-q', sg.id); root.appendChild(el); }); });
  }
  function blockToDom(b) {
    var root = { appendChild: function (x) { this.el = x; } };
    (function () {
      if (b.k === 't') {
        var rows = b.rows || [];
        root.appendChild(h('table', { class: 'pv-table' + (b.lines ? '' : ' nolines'), 'data-lines': b.lines ? '1' : '0' },
          rows.map(function (r, ri) { return h('tr', null, r.map(function (c, ci) { return h(ri ? 'td' : 'th', { class: ci && /^[-+\u2013(]?\s*[\d.,]+\s*%?\)?$|^[-\u2013]$/.test(c.trim()) ? 'num' : null, text: c }); })); })));
        return;
      }
      if (b.k === 'h') {
        var l = h('span', { class: 'l' }), r = h('span', { class: 'r' });
        appendRuns(l, b.l); appendRuns(r, b.r);
        root.appendChild(h('div', { class: 'qh' }, l, r));
        return;
      }
      var d = h('div', { class: 'pb' + (b.keep ? ' keep' : '') }); d.style.textAlign = CSS_ALIGN[b.a] || 'justify';
      if (b.runs && b.runs.length) appendRuns(d, b.runs); else d.appendChild(document.createElement('br'));
      root.appendChild(d);
    })();
    return root.el;
  }
  // --- read the edited page back into the document model ---
  function fmtOf(el, block) {
    var cs = getComputedStyle(el), u = false;
    for (var e = el; e && e !== block.parentNode; e = e.parentElement) { if ((getComputedStyle(e).textDecorationLine || '').indexOf('underline') >= 0 || e.tagName === 'U') { u = true; break; } }
    var s = Math.round(parseFloat(cs.fontSize) * 0.75 * 2) / 2, f = (cs.fontFamily || '').split(',')[0].replace(/["']/g, '').trim();
    return { b: parseInt(cs.fontWeight, 10) >= 600, i: cs.fontStyle === 'italic', u: u, s: s === 12 ? 0 : s, f: f === ED_FONT || /^(serif|Times)$/i.test(f) ? '' : f };
  }
  function runsOf(el) {
    var out = [];
    (function walk(n) {
      if (n.nodeType === 3) {
        var t = n.nodeValue.replace(/\u00a0/g, ' '); if (!t) return;
        var f = fmtOf(n.parentElement, el), last = out[out.length - 1];
        if (last && last.b === f.b && last.i === f.i && last.u === f.u && last.s === f.s && last.f === f.f) last.t += t;
        else out.push({ t: t, b: f.b, i: f.i, u: f.u, s: f.s, f: f.f });
      } else if (n.nodeType === 1) {
        if (n.tagName === 'BR') { if (out.length) out[out.length - 1].t += '\n'; else out.push({ t: '\n', b: false, i: false, u: false, s: 0, f: '' }); return; }
        Array.prototype.forEach.call(n.childNodes, walk);
      }
    })(el);
    if (out.length) { var lr = out[out.length - 1]; lr.t = lr.t.replace(/\n+$/, ''); if (!lr.t) out.pop(); }
    return out;
  }
  var BLOCK = /^(DIV|P|H[1-6]|LI|UL|OL|BLOCKQUOTE|SECTION|ARTICLE)$/;
  function alignOf(el) { var t = getComputedStyle(el).textAlign; return t === 'center' ? 'center' : (t === 'right' || t === 'end') ? 'right' : t === 'justify' ? 'both' : 'left'; }
  function domToModel(root) {
    var out = [], lastQ = '';
    var tagQ = function (n) { var t = n.nodeType === 1 ? (n.closest('[data-q]') || n.querySelector('[data-q]')) : null; if (t) lastQ = t.getAttribute('data-q'); return lastQ; };
    (function collect(container) {
      var inline = null;
      Array.prototype.forEach.call(container.childNodes, function (n) {
        if (n.nodeType === 1 && n.tagName === 'TABLE') {
          inline = null; tagQ(n);
          out.push({ q: lastQ, k: 't', lines: n.getAttribute('data-lines') !== '0' && !n.classList.contains('nolines'),
            rows: Array.prototype.map.call(n.querySelectorAll('tr'), function (tr) { return Array.prototype.map.call(tr.children, function (c) { return c.textContent.replace(/\u00a0/g, ' ').trim(); }); }) });
        } else if (n.nodeType === 1 && n.classList.contains('qh')) {
          inline = null;
          var l = n.querySelector('.l'), r = n.querySelector('.r'); tagQ(n);
          out.push(l && r ? { q: lastQ, k: 'h', l: runsOf(l), r: runsOf(r) } : { q: lastQ, k: 'p', a: 'both', runs: runsOf(n) });
        } else if (n.nodeType === 1 && BLOCK.test(n.tagName)) {
          inline = null;
          if (n.querySelector('div,p,table,h1,h2,h3,li')) collect(n);
          else { tagQ(n); out.push({ q: lastQ, k: 'p', a: alignOf(n), keep: n.classList.contains('keep'), runs: runsOf(n) }); }
        } else if (n.nodeType === 3 && !n.nodeValue.trim() && !inline) {
          /* whitespace between blocks */
        } else { // loose text / inline element typed straight into the page
          var tmp = document.createElement('span'); tmp.appendChild(n.cloneNode(true)); container.appendChild(tmp);
          var rs = runsOf(tmp); tmp.remove();
          if (!inline) { inline = { q: lastQ, k: 'p', a: alignOf(container), runs: [] }; out.push(inline); }
          inline.runs = inline.runs.concat(rs);
        }
      });
    })(root);
    return out;
  }
  function normBlocks(list) {
    var R = function (rs) { return (rs || []).map(function (r) { return [r.t, !!r.b, !!r.i, !!r.u, r.s || 0, r.f || '']; }).filter(function (r) { return r[0]; }); };
    return (list || []).map(function (b) {
      if (b.k === 't') return ['t', !!b.lines, b.rows];
      if (b.k === 'h') return ['h', R(b.l), R(b.r)];
      return ['p', b.a || 'both', !!b.keep, R(b.runs)];
    });
  }
  function saveEdit() {
    edTimer = null;
    var m = paperModel(), segs = baseSegs(m), blocks = domToModel(edEl), byQ = {}, firstId = segs[0] && segs[0].id;
    blocks.forEach(function (b) { var q = b.q || firstId; delete b.q; (byQ[q] = byQ[q] || []).push(b); });
    var ed = {};
    segs.forEach(function (s) {
      var mine = byQ[s.id] || [];
      if (JSON.stringify(normBlocks(mine)) === JSON.stringify(normBlocks(s.blocks))) return;     // unchanged question: nothing to keep
      ed[s.id] = { sig: segSig(s), body: mine };
    });
    data.paper.edit = Object.keys(ed).length ? { segs: ed } : null;
    edKey = hashStr(JSON.stringify(flatten(assemble(m)))) + '|' + segs.map(function (s) { return s.id; }).join(',');
    $('edReset').disabled = !data.paper.edit; $('pSaveBank').classList.toggle('hidden', !data.paper.edit);
    $('edState').textContent = data.paper.edit ? 'Edited ✓ (saved)' : 'Saved';
    changed();
  }
  function restoreSel() {
    if (!edRange) return false;
    edEl.focus(); var s = window.getSelection(); s.removeAllRanges(); s.addRange(edRange); return true;
  }
  function edCmd(cmd, val) {
    if (!restoreSel()) return toast('Click in the paper first, then select some text.', 'err');
    // Formatting uses tags (<b>, <i>, <u>, <font>) and style properties set from code, never inline style
    // attributes, so the app's strict Content-Security-Policy stays on.
    document.execCommand('styleWithCSS', false, false);
    var ALIGN = { justifyLeft: 'left', justifyCenter: 'center', justifyRight: 'right', justifyFull: 'justify' };
    if (ALIGN[cmd]) {
      var r = edRange, hit = Array.prototype.filter.call(edEl.children, function (c) { return r.intersectsNode(c); });
      hit.forEach(function (c) { if (!c.classList.contains('qh') && c.tagName !== 'TABLE') c.style.textAlign = ALIGN[cmd]; });
    } else if (cmd === 'size' || cmd === 'font') {
      document.execCommand(cmd === 'size' ? 'fontSize' : 'fontName', false, cmd === 'size' ? '7' : val);
      var made = [];
      edEl.querySelectorAll('font').forEach(function (f) {
        var sp = document.createElement('span'); made.push(sp);
        if (f.getAttribute('size') === '7' && cmd === 'size') sp.style.fontSize = val + 'pt';
        else if (f.getAttribute('size')) sp.style.fontSize = ({ 1: 8, 2: 10, 3: 12, 4: 14, 5: 18, 6: 24, 7: 36 })[f.getAttribute('size')] + 'pt';
        if (f.getAttribute('face')) sp.style.fontFamily = f.getAttribute('face');
        while (f.firstChild) sp.appendChild(f.firstChild);
        f.replaceWith(sp);
      });
      if (made.length) { // keep the same text selected so the next button applies to it too
        var nr = document.createRange(); nr.setStartBefore(made[0]); nr.setEndAfter(made[made.length - 1]);
        var ss = window.getSelection(); ss.removeAllRanges(); ss.addRange(nr);
      }
    } else document.execCommand(cmd, false, null);
    var s = window.getSelection(); if (s.rangeCount) edRange = s.getRangeAt(0).cloneRange();
    clearTimeout(edTimer); edTimer = setTimeout(saveEdit, 200);
  }
  function syncBar() {
    var s = window.getSelection(); if (!s.rangeCount) return;
    var n = s.anchorNode; var el = n && (n.nodeType === 1 ? n : n.parentElement); if (!el || !edEl.contains(el)) return;
    var cs = getComputedStyle(el), f = (cs.fontFamily || '').split(',')[0].replace(/["']/g, '').trim(), sz = String(Math.round(parseFloat(cs.fontSize) * 0.75 * 2) / 2);
    if (Array.prototype.some.call($('edFont').options, function (o) { return o.value === f; })) $('edFont').value = f;
    if (Array.prototype.some.call($('edSize').options, function (o) { return o.value === sz; })) $('edSize').value = sz;
  }

  // ---------- UPLOAD QUESTION BANK (tab) ----------
  var ibCands = [], ibCourse = '';
  function qKey(q) { return norm([q.title, q.stem].concat(q.parts.map(function (p) { return p.text; })).join(' ')).replace(/[^a-z0-9 ]/g, ''); }
  function renderImport() {
    if (!course(ibCourse)) ibCourse = filt.course || data.paper.courseId || (data.courses[0] && data.courses[0].id) || '';
    fillCourseSelect($('ibCourse'), ibCourse);
    renderImportList();
  }
  async function importFile(file) {
    if (!file) return;
    if (!course($('ibCourse').value)) { toast('Add a course first (Courses & CLOs).', 'err'); return showTab('courses'); }
    var msg = $('ibMsg'); msg.className = 'small'; msg.textContent = 'Reading ' + file.name + '\u2026';
    try { readImportText(await window.QBOutline.readFile(file), file.name); }
    catch (e) { msg.className = 'small err'; msg.textContent = e.message; }
  }
  function readImportText(text, name) {
    var c = course($('ibCourse').value), msg = $('ibMsg'); if (!c) return;
    var r = window.QBPaste.parse(text, { defaultMarks: $('ibMarks').value, sharedMode: $('ibShared').value });
    var res = fromPasted(r, c, $('ibType').value);
    var have = {}; data.questions.forEach(function (q) { if (q.courseId === c.id) have[qKey(q)] = 1; });
    ibCands = res.qs.map(function (q) { var dup = !!have[qKey(q)]; return { q: q, on: !dup, dup: dup }; });
    msg.className = 'small ' + (ibCands.length ? 'ok' : 'err');
    msg.textContent = ibCands.length ? 'Read ' + (name || 'the text') + ': ' + ibCands.length + ' question(s) found' + (res.added.length ? '. Added to the course: ' + res.added.join(', ') : '') + '.'
      : 'No questions found. Questions should start with Q1., Question 1 or 1.';
    renderImportList();
  }
  function renderImportList() {
    var box = clear($('ibList')), sum = clear($('ibSummary'));
    $('ibBar').classList.toggle('hidden', !ibCands.length);
    if (!ibCands.length) { sum.textContent = 'Upload a file to see its questions here.'; return; }
    var sel = ibCands.filter(function (k) { return k.on; }), c = course($('ibCourse').value) || { clos: [] };
    var topics = {}; ibCands.forEach(function (k) { var t = k.q.topic || '(no topic)'; topics[t] = (topics[t] || 0) + 1; });
    var dups = ibCands.filter(function (k) { return k.dup; }).length;
    sum.append(h('div', { class: 'ib-sum' },
      h('b', { text: ibCands.length + ' questions \u00b7 ' + round(ibCands.reduce(function (s, k) { return s + total(k.q); }, 0)) + ' marks \u00b7 ' + sel.length + ' selected' }),
      dups ? h('div', { class: 'small', text: dups + ' already in the bank (unticked).' }) : null,
      h('div', { class: 'chips' }, Object.keys(topics).map(function (t) { return h('span', { class: 'badge topic', text: t + ' (' + topics[t] + ')' }); })),
      h('div', { class: 'chips' }, c.clos.map(function (x) { var n = ibCands.filter(function (k) { return k.q.clos.indexOf(x.id) >= 0; }).length; return n ? h('span', { class: 'badge clo', text: x.label + ': ' + n }) : null; }))));
    shownData = {};
    ibCands.forEach(function (k, i) {
      var q = k.q;
      box.append(h('article', { class: 'qcard' + (k.on ? '' : ' off') },
        h('div', { class: 'qhead' }, h('label', { class: 'check' }, h('input', { type: 'checkbox', checked: k.on, onchange: function (e) { k.on = e.target.checked; renderImportList(); } }),
          h('b', { text: ' ' + (i + 1) + '. ' + (q.title || (q.stem || '').slice(0, 70) || '(no heading)') })), h('div', { class: 'badges' }, k.dup ? h('span', { class: 'badge dup', text: 'Already in bank' }) : null), badges(q)),
        questionBody(q, 'question ' + (i + 1)),
        q.answer ? h('details', { class: 'answer' }, h('summary', { text: 'Answer key' }), h('p', { text: q.answer })) : null));
    });
    shownData = null;
    $('ibAdd').disabled = !sel.length; $('ibAdd').textContent = 'Add ' + sel.length + ' selected to bank';
  }
  function importAdd() {
    var picked = ibCands.filter(function (k) { return k.on; }).map(function (k) { return k.q; });
    if (!picked.length) return;
    var now = new Date().toISOString();
    picked = picked.map(function (q) { return S.cleanQuestion(Object.assign({}, q, { createdAt: now, updatedAt: now })); });
    data.questions = data.questions.concat(picked);
    var cid = picked[0].courseId;
    ibCands = []; $('ibMsg').textContent = ''; $('ibText').value = '';
    changed(); filt.course = cid; filt.clo = ''; filt.topic = ''; showTab('bank');
    toast(picked.length + ' question(s) added to the bank. Press Save to back up.');
  }

  // ---------- paper edits -> question bank ----------
  function runsText(rs) { return (rs || []).map(function (r) { return r.t; }).join(''); }
  function editsToBank(mode) {
    var p = data.paper; if (!p.edit) return;
    var m = paperModel(), segs = assemble(m), updated = 0, created = 0, keepEdits = {};
    segs.forEach(function (sg) {
      if (!sg.edited) return;
      var orig = question(sg.id); if (!orig) return;
      var lines = [], started = false;
      sg.blocks.forEach(function (b) {
        if (b.k === 'h') { started = true; lines.push(runsText(b.l).replace(/^\s*Q\d+\.\s*/, 'Q1. ') + '  ' + runsText(b.r)); return; }
        if (!started) return;                                   // shared data printed before the heading stays as it is
        if (b.k === 't') (b.rows || []).forEach(function (r) { lines.push(r.join(' | ')); });
        else lines.push(runsText(b.runs));
      });
      var c = course(orig.courseId), r = window.QBPaste.parse(lines.join('\n'), { defaultMarks: 1, sharedMode: 'none' });
      if (!r.questions.length) return;
      var pq = fromPasted({ questions: [r.questions[0]] }, c, orig.qtype).qs[0];
      var nq = Object.assign({}, orig, { title: pq.title, stem: pq.stem, parts: pq.parts, marks: pq.marks,
        clos: pq.clos.length ? pq.clos : orig.clos, plos: pq.plos.length ? pq.plos : orig.plos, updatedAt: new Date().toISOString() });
      if (mode === 'new') {
        nq = S.cleanQuestion(Object.assign(nq, { id: '', createdAt: '' }));
        data.questions.unshift(nq); p.questionIds[p.questionIds.indexOf(orig.id)] = nq.id; created++;
        keepEdits[nq.id] = sg.blocks;
      } else { data.questions[data.questions.indexOf(orig)] = S.cleanQuestion(nq); updated++; keepEdits[orig.id] = sg.blocks; }
    });
    // the bank now matches the paper: keep the formatted text, linked to the updated questions
    var fresh = baseSegs(paperModel()), ed = {};
    fresh.forEach(function (s) { if (keepEdits[s.id]) ed[s.id] = { sig: segSig(s), body: keepEdits[s.id] }; else if (p.edit.segs[s.id]) ed[s.id] = p.edit.segs[s.id]; });
    p.edit = Object.keys(ed).length ? { segs: ed } : null; edKey = '';
    changed(); renderPaperLists();
    toast(mode === 'new' ? created + ' new question(s) saved in the bank and used on this paper.' : updated + ' question(s) updated in the bank.');
  }

  // ---------- course code / name typed in Paper Builder ----------
  // The Course dropdown follows the Course Code / Course Name typed in Paper Builder:
  //  - a code that exists  -> switch to that course
  //  - a new code or name  -> the selected course is renamed (Undo, or keep it and add a new course instead)
  var courseUndo = null, courseTimer = null;
  function courseTyped() {
    clearTimeout(courseTimer); courseTimer = null;
    var p = data.paper, code = $('pCode').value.trim(), title = $('pTitle').value.trim(), cur = course(p.courseId);
    if (!code && !title) return;
    var match = code && data.courses.find(function (c) { return c.code.toLowerCase() === code.toLowerCase(); });
    if (match && match !== cur) {
      if (p.questionIds.length && !confirm('Switch this paper to ' + match.code + ' — ' + match.title + '? The questions now on the paper will be taken off it (they stay in the bank).')) return;
      p.courseId = match.id; p.questionIds = []; p.edit = null; edKey = '';
      p.courseCode = ''; p.courseTitle = '';   // switching never renames: the fields now show that course's own name courseUndo = null; $('pCourseAsk').classList.add('hidden');
      changed(); renderPaper(); toast('Course changed to ' + match.code + ' — ' + match.title + '.'); return;
    }
    if (!cur) { courseAddNew(); return; }
    var newCode = code || cur.code, newTitle = title || cur.title;
    if (newCode === cur.code && newTitle === cur.title) return;
    if (!courseUndo || courseUndo.id !== cur.id) courseUndo = { id: cur.id, code: cur.code, title: cur.title };
    cur.code = newCode.slice(0, 40); cur.title = newTitle.slice(0, 200); p.courseCode = ''; p.courseTitle = '';
    $('pCourseAskText').textContent = '✓ Course updated: ' + courseUndo.code + ' — ' + courseUndo.title + '  →  ' + cur.code + ' — ' + cur.title;
    $('pcSeparate').classList.toggle('hidden', courseUndo.code.toLowerCase() === cur.code.toLowerCase());
    $('pCourseAsk').classList.remove('hidden');
    var keepFocus = document.activeElement && document.activeElement.id;
    changed(); fillCourseSelect($('pCourse'), p.courseId); renderPaperLists();
    if (keepFocus === 'pCode' || keepFocus === 'pTitle') $(keepFocus).focus();
  }
  function courseUndoRename() {
    if (!courseUndo) return;
    var c = course(courseUndo.id); if (c) { c.code = courseUndo.code; c.title = courseUndo.title; }
    courseUndo = null; $('pCourseAsk').classList.add('hidden'); changed(); renderPaper(); toast('Course name restored.');
  }
  function courseSeparate() {
    if (!courseUndo) return;
    var c = course(courseUndo.id), code = c.code, title = c.title;
    c.code = courseUndo.code; c.title = courseUndo.title; courseUndo = null;
    var nc = S.cleanCourse({ code: code, title: title, clos: [] });
    data.courses.push(nc); data.paper.courseId = nc.id; data.paper.courseCode = ''; data.paper.courseTitle = '';
    $('pCourseAsk').classList.add('hidden'); changed(); renderPaper();
    toast('New course ' + nc.code + ' added and selected. The paper keeps its questions. Add its CLOs (or upload its outline) in Courses & CLOs.');
  }
  function courseAddNew() {
    var p = data.paper, code = $('pCode').value.trim(), title = $('pTitle').value.trim() || code;
    if (!code) return;
    var c = S.cleanCourse({ code: code, title: title, clos: [] });
    data.courses.push(c); p.courseId = c.id; p.courseCode = ''; p.courseTitle = '';
    changed(); renderPaper(); toast('New course ' + c.code + ' added.');
  }

  // ---------- several papers ----------
  function paperName(p) {
    var c = course(p.courseId);
    var bits = [p.courseCode || (c && c.code) || 'No course', (p.exam || 'Exam').replace(/\s*Semester\s+Examinations?/i, '').trim(), p.season + ' ' + p.year];
    if (p.classSection) bits.push(p.classSection);
    return bits.filter(Boolean).join(' \u00b7 ');
  }
  function paperStats(p) {
    var qs = (p.questionIds || []).map(question).filter(Boolean);
    return qs.length + ' question' + (qs.length === 1 ? '' : 's') + ' \u00b7 ' + round(qs.reduce(function (s, q) { return s + total(q); }, 0)) + ' marks';
  }
  function savePaperToList() {
    var p = data.paper; if (!p.questionIds.length) return;
    var entry = { id: p.id, name: paperName(p), savedAt: new Date().toISOString(), paper: JSON.parse(JSON.stringify(p)) };
    var i = data.papers.findIndex(function (x) { return x.id === p.id; });
    if (i >= 0) data.papers[i] = entry; else data.papers.unshift(entry);
    changed();
  }
  function newPaper() {
    var old = data.paper;
    if (old.questionIds.length) savePaperToList();
    var keep = ['courseId', 'exam', 'season', 'year', 'instructor', 'department', 'university', 'timeAllowed', 'appendCloTable', 'showPlo', 'stemLines', 'dataLines', 'courseCode', 'courseTitle'];
    var np = { id: S.newId() }; keep.forEach(function (k) { np[k] = old[k]; });
    data.paper = S.cleanPaper(np); edKey = '';
    $('afterDl').classList.add('hidden');
    changed(); showTab('paper');
    toast('New paper started' + (old.questionIds.length ? ' (the previous one is saved in My papers)' : '') + '. Add questions from the bank, upload a paper or use the random generator.');
  }
  function openPaper(entry, copy) {
    if (data.paper.questionIds.length) savePaperToList();
    var p = JSON.parse(JSON.stringify(entry.paper)); if (copy) { p.id = S.newId(); p.classSection = ''; p.date = ''; }
    data.paper = S.cleanPaper(p); edKey = ''; $('mpDlg').close(); $('afterDl').classList.add('hidden');
    changed(); showTab('paper'); toast(copy ? 'Copy opened as a new paper.' : 'Paper opened.');
  }
  function renderMyPapers() {
    var box = clear($('mpList'));
    var list = data.papers.slice();
    if (data.paper.questionIds.length && !list.some(function (x) { return x.id === data.paper.id; })) list.unshift({ id: data.paper.id, name: paperName(data.paper), savedAt: '', paper: data.paper, unsaved: true });
    if (!list.length) box.append(h('div', { class: 'empty small', text: 'No papers yet. Papers are saved here when you download them.' }));
    list.forEach(function (e) {
      var cur = e.id === data.paper.id;
      box.append(h('div', { class: 'mp-item' + (cur ? ' current' : '') },
        h('div', { class: 'mp-main' }, h('b', { text: e.name || paperName(e.paper) }),
          h('span', { class: 'small muted', text: paperStats(e.paper) + (e.savedAt ? ' \u00b7 saved ' + new Date(e.savedAt).toLocaleString() : '') + (cur ? ' \u00b7 open now' : '') })),
        cur ? null : h('button', { class: 'btn small primary', text: 'Open', onclick: function () { openPaper(e, false); } }),
        h('button', { class: 'btn small', text: 'Copy', title: 'Start a new paper from a copy of this one', onclick: function () { openPaper(e, true); } }),
        e.unsaved ? null : h('button', { class: 'btn small ghost danger-t', text: 'Delete', onclick: function () {
          if (!confirm('Delete \u201c' + e.name + '\u201d from My papers? (Its questions stay in the bank.)')) return;
          data.papers = data.papers.filter(function (x) { return x.id !== e.id; }); changed(); renderMyPapers();
        } })));
    });
  }
  function showMyPapers() { renderMyPapers(); $('mpDlg').showModal(); }

  // "FIN-410 Risk Management - Fall 2026 Midterm Exam (Set A)"
  function examLabel(exam) {
    var e = String(exam || '').trim();
    if (/mid/i.test(e)) return 'Midterm Exam';
    if (/final|terminal/i.test(e)) return 'Final Term Exam';
    return e ? e.replace(/\s*Semester\s*/i, ' ').replace(/Examinations?/i, 'Exam').replace(/\s+/g, ' ').trim() : 'Exam';
  }
  function paperFileName(code, title, setLabel) {
    var p = data.paper;
    var n = [code, title].filter(Boolean).join(' ') + (p.classSection && p.classSection.trim() ? ' (' + p.classSection.trim() + ')' : '') +
      ' - ' + p.season + ' ' + p.year + ' ' + examLabel(p.exam) + (setLabel ? ' (' + setLabel + ')' : '');
    return n.replace(/[<>:"\/\\|?*\u0000-\u001f]+/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 150) || 'Paper';
  }
  async function downloadPaper() {
    if (edTimer) { clearTimeout(edTimer); edTimer = null; saveEdit(); }   // include the very last keystrokes
    var m = finishModel(paperModel());
    if (!m.questions.length) return toast('Add at least one question to the paper.', 'err');
    var noClo = paperQuestions().filter(function (q) { return !q.clos.length; }).length;
    if (noClo && !confirm(noClo + ' question(s) have no CLO. Download anyway?')) return;
    try {
      var blob = await D.buildPaper(m);
      S.download(blob, paperFileName(m.courseCode, m.courseTitle, '') + '.docx');
      savePaperToList(); $('afterDl').classList.remove('hidden'); $('afterDl').scrollIntoView({ behavior: 'smooth', block: 'center' });
      toast('Paper downloaded and saved in My papers.');
    } catch (e) { toast('Could not create the Word file: ' + e.message, 'err'); }
  }
  async function downloadBankReport() {
    var list = filteredQuestions();
    if (!list.length) return toast('No questions to export.', 'err');
    var c = course(filt.course);
    var withAns = list.some(function (q) { return q.answer; }) && confirm('Include the private answer keys in this file?\n\nOK = include, Cancel = questions only');
    try {
      var blob = await D.buildBankReport({
        university: data.settings.university, deptPrefix: data.settings.deptPrefix, department: data.settings.department,
        courseCode: c ? c.code : '', courseTitle: c ? c.title : '', generated: new Date().toLocaleString(), includeAnswers: withAns,
        totalMarks: round(list.reduce(function (s, q) { return s + total(q); }, 0)),
        cloInfo: c ? c.clos.map(function (x) { return { label: x.label, desc: x.desc }; }) : [],
        rows: list.map(function (q) { var cc = course(q.courseId); return Object.assign({}, q, { cloLabels: cloLabels(q), courseCode: cc ? cc.code : '' }); })
      });
      S.download(blob, 'Question_Bank_' + (c ? c.code.replace(/[^A-Za-z0-9_-]+/g, '_') : 'All') + '_' + S.stamp() + '.docx');
    } catch (e) { toast('Could not create the Word file: ' + e.message, 'err'); }
  }

  // ---------- RANDOM PAPER GENERATOR ----------
  var rgSel = { clos: [], course: '', topics: [] };
  function rnd(n) { var a = new Uint32Array(1); crypto.getRandomValues(a); return a[0] % n; }
  function shuffle(arr) { var a = arr.slice(); for (var i = a.length - 1; i > 0; i--) { var j = rnd(i + 1), t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function rgPool() {
    var p = data.paper, ty = $('rgType').value, df = $('rgDiff').value;
    return data.questions.filter(function (q) {
      if (q.courseId !== p.courseId) return false;
      if (ty && q.qtype !== ty) return false;
      if (df && q.difficulty !== df) return false;
      if (rgSel.clos.length && !q.clos.some(function (id) { return rgSel.clos.indexOf(id) >= 0; })) return false;
      if (rgSel.topics.length && rgSel.topics.indexOf(norm(q.topic)) < 0) return false;
      return true;
    });
  }
  function renderRG() {
    var c = course(data.paper.courseId), box = clear($('rgClos'));
    if (rgSel.course !== data.paper.courseId) { rgSel.course = data.paper.courseId; rgSel.clos = []; rgSel.topics = []; }
    var tb = clear($('rgTopics'));
    if (!c || !c.topics.length) tb.append(h('span', { class: 'muted small', text: 'Upload the course outline (Courses & CLOs) to choose by topic.' }));
    (c ? c.topics : []).forEach(function (t) {
      var k = norm(t.title), on = rgSel.topics.indexOf(k) >= 0;
      var nq = data.questions.filter(function (q) { return q.courseId === c.id && norm(q.topic) === k; }).length;
      tb.append(h('button', { type: 'button', class: 'chip' + (on ? ' on' : ''), title: topicLong(c, t) + ' \u00b7 ' + nq + ' question(s)', text: topicShort(t) + ' (' + nq + ')', onclick: function () {
        if (on) rgSel.topics = rgSel.topics.filter(function (y) { return y !== k; }); else rgSel.topics.push(k); renderRG();
      } }));
    });
    (c ? c.clos : []).forEach(function (x) {
      var on = rgSel.clos.indexOf(x.id) >= 0;
      box.append(h('button', { type: 'button', class: 'chip' + (on ? ' on' : ''), title: x.desc, text: x.label, onclick: function () {
        if (on) rgSel.clos = rgSel.clos.filter(function (y) { return y !== x.id; }); else rgSel.clos.push(x.id); renderRG();
      } }));
    });
    var pool = rgPool();
    $('rgPool').textContent = pool.length + ' matching question(s) in the bank, ' + round(pool.reduce(function (a, q) { return a + total(q); }, 0)) + ' marks in total';
  }
  // Randomised search for a set that meets the count / marks / CLO targets as closely as possible.
  function pickSet(pool, o) {
    var best = null, need = o.cover ? o.clos.slice() : [];
    for (var attempt = 0; attempt < 1500; attempt++) {
      var sh = shuffle(pool), chosen = [], sum = 0, covered = {};
      var fits = function (q) { return (!o.count || chosen.length < o.count) && (!o.target || sum + total(q) <= o.target + 1e-9); };
      var add = function (q) { chosen.push(q); sum += total(q); q.clos.forEach(function (id) { covered[id] = 1; }); };
      shuffle(need).forEach(function (cid) {
        if (covered[cid]) return;
        var q = sh.find(function (x) { return chosen.indexOf(x) < 0 && x.clos.indexOf(cid) >= 0 && fits(x); });
        if (q) add(q);
      });
      for (var i = 0; i < sh.length; i++) {
        var q = sh[i];
        if (chosen.indexOf(q) >= 0) continue;
        if (o.count && chosen.length >= o.count) break;
        if (!o.count && o.target && sum >= o.target) break;
        if (fits(q)) add(q);
      }
      var missing = need.filter(function (cid) { return !covered[cid]; }).length;
      var score = (o.target ? Math.abs(o.target - sum) * 10 : 0) + (o.count ? Math.abs(o.count - chosen.length) * 20 : 0) + missing * 50;
      if (!best || score < best.score) best = { qs: shuffle(chosen), sum: round(sum), score: score, missing: missing };
      if (score === 0) break;
    }
    return best;
  }
  function makeSets() {
    var c = course(data.paper.courseId);
    if (!c) throw new Error('Choose a course in Paper details first.');
    var o = {
      count: Math.max(0, Math.min(50, Math.round(Number($('rgCount').value) || 0))),
      target: Math.max(0, Number($('rgMarks').value) || 0),
      clos: rgSel.clos.length ? rgSel.clos.slice() : c.clos.map(function (x) { return x.id; }),
      cover: $('rgCover').checked
    };
    if (!o.count && !o.target) o.count = 4;
    var nSets = Math.max(1, Math.min(10, Math.round(Number($('rgSets').value) || 1)));
    var pool = rgPool();
    if (!pool.length) throw new Error('No questions in the bank match these settings.');
    // Only ask to cover CLOs that some question in the pool actually has
    o.clos = o.clos.filter(function (cid) { return pool.some(function (q) { return q.clos.indexOf(cid) >= 0; }); });
    var used = {}, sets = [], reused = false;
    for (var s = 0; s < nSets; s++) {
      var avail = $('rgUnique').checked ? pool.filter(function (q) { return !used[q.id]; }) : pool;
      var r = avail.length ? pickSet(avail, o) : null;
      if ($('rgUnique').checked && (!r || r.score > 0)) {
        var r2 = pickSet(pool, o);
        if (!r || r2.score < r.score) { r = r2; reused = true; }
      }
      r.qs.forEach(function (q) { used[q.id] = 1; });
      r.label = nSets > 1 ? 'Set ' + String.fromCharCode(65 + s) : '';
      sets.push(r);
    }
    return { sets: sets, o: o, reused: reused, course: c };
  }
  function showSetSummary(res) {
    var box = clear($('rgMsg'));
    res.sets.forEach(function (r) {
      var cl = res.course.clos.filter(function (x) { return r.qs.some(function (q) { return q.clos.indexOf(x.id) >= 0; }); }).map(function (x) { return x.label; });
      box.append(h('div', { class: 'set-sum' }, h('b', { text: (r.label || 'Paper') + ': ' }),
        r.qs.length + ' questions · ' + r.sum + ' marks · ' + (cl.join(', ') || 'no CLOs'),
        r.missing ? h('span', { class: 'err', text: ' · could not cover ' + r.missing + ' CLO(s)' }) : null,
        res.o.target && r.sum !== res.o.target ? h('span', { class: 'err', text: ' · target was ' + res.o.target }) : null));
    });
    if (res.reused) box.append(h('p', { class: 'err', text: 'Not enough questions for completely different sets, so some questions repeat. Add more questions to the bank for fully unique sets.' }));
  }
  function rgFill() {
    try {
      var sb = $('rgSets').value; $('rgSets').value = 1;
      var res = makeSets(); $('rgSets').value = sb;
      data.paper.questionIds = res.sets[0].qs.map(function (q) { return q.id; });
      changed(); renderPaperLists(); showSetSummary(res); toast('Paper filled with random questions. Edit or reorder them above if needed.');
    } catch (e) { toast(e.message, 'err'); }
  }
  async function rgDownload() {
    var res;
    try { res = makeSets(); } catch (e) { return toast(e.message, 'err'); }
    showSetSummary(res);
    var btn = $('rgDownload'); btn.disabled = true; btn.textContent = 'Generating…';
    try {
      var mm = paperModel(), base = paperFileName(mm.courseCode, mm.courseTitle, '');
      if (res.sets.length === 1) {
        S.download(await D.buildPaper(paperModel(res.sets[0].qs, '')), base + ' (random).docx');
      } else {
        var zip = new JSZip();
        for (var i = 0; i < res.sets.length; i++) {
          var r = res.sets[i];
          zip.file(paperFileName(mm.courseCode, mm.courseTitle, r.label) + '.docx', await D.buildPaper(paperModel(r.qs, r.label)));
        }
        S.download(await zip.generateAsync({ type: 'blob' }), base + ' (' + res.sets.length + ' sets).zip');
      }
      toast(res.sets.length > 1 ? res.sets.length + ' papers downloaded in one .zip file.' : 'Random paper downloaded.');
    } catch (e) { toast('Could not create the papers: ' + e.message, 'err'); }
    btn.disabled = false; btn.textContent = 'Generate & download sets';
  }

  // ---------- PASTE QUESTIONS ----------
  var psCandidates = [];
  var uploadToPaper = false;
  async function uploadPaperFile(file) {
    if (!file) return;
    if (!data.courses.length) { toast('Add a course first.', 'err'); return showTab('courses'); }
    var text;
    try { toast('Reading ' + file.name + '\u2026'); text = await window.QBOutline.readFile(file); }
    catch (e) { return toast(e.message, 'err'); }
    openPaste();
    $('psTitle').textContent = 'Questions from: ' + file.name;
    // pick the course: paper builder's course, or one whose code appears in the file
    var cid = uploadToPaper && data.paper.courseId ? data.paper.courseId : '';
    if (!cid) { var hit = data.courses.find(function (c) { return c.code && text.toUpperCase().indexOf(c.code.toUpperCase()) >= 0; }); if (hit) cid = hit.id; }
    if (cid) $('psCourse').value = cid;
    $('psToPaper').checked = uploadToPaper;
    $('psText').value = text; readPaste();
  }
  function openPaste() {
    $('psTitle').textContent = 'Paste questions';
    if (!data.courses.length) { toast('Add a course first.', 'err'); return showTab('courses'); }
    fillCourseSelect($('psCourse'), filt.course || data.paper.courseId || data.courses[0].id);
    psCandidates = []; renderPaste(); $('psMsg').textContent = '';
    $('psDlg').showModal(); $('psText').focus();
  }
  function mapPlos(c, nums, added) {
    c.plos = c.plos || [];
    var res = (nums || []).map(function (n) { var p = findLab(c.plos, 'PLO ' + n); if (!p) { p = { id: S.newId(), label: 'PLO ' + n, desc: '' }; c.plos.push(p); added.push('PLO ' + n); } return p.id; });
    c.plos.sort(function (a, b) { return a.label.localeCompare(b.label, undefined, { numeric: true }); });
    return res;
  }
  function fromPasted(r, c, qtype) {
    var added = [];
    var qs = r.questions.map(function (pq) {
      var ids = pq.cloNums.map(function (n) {
        var lab = 'CLO ' + n;
        var x = c.clos.find(function (y) { return y.label.replace(/\s+/g, '').toUpperCase() === lab.replace(' ', ''); });
        if (!x) { x = { id: S.newId(), label: lab, desc: '' }; c.clos.push(x); added.push(lab); }
        return x.id;
      });
      return S.cleanQuestion({ courseId: c.id, title: pq.title, stem: pq.stem, data: pq.data, parts: pq.parts, marks: pq.marks, clos: ids, plos: mapPlos(c, pq.ploNums, added), answer: pq.answer,
        qtype: pq.qtype || qtype || '', topic: pq.topic || '', difficulty: pq.difficulty || '' });
    });
    if (added.length) { c.clos.sort(function (a, b) { return a.label.localeCompare(b.label, undefined, { numeric: true }); }); changed(); }
    return { qs: qs, added: added };
  }
  function readPaste() {
    var c = course($('psCourse').value), msg = $('psMsg');
    if (!c) return;
    var r = window.QBPaste.parse($('psText').value, { defaultMarks: $('psMarks').value, sharedMode: $('psShared').value });
    var added = [];
    psCandidates = r.questions.map(function (pq) {
      var ids = pq.cloNums.map(function (n) {
        var lab = 'CLO ' + n;
        var x = c.clos.find(function (y) { return y.label.replace(/\s+/g, '').toUpperCase() === lab.replace(' ', ''); });
        if (!x) { x = { id: S.newId(), label: lab, desc: '' }; c.clos.push(x); added.push(lab); }
        return x.id;
      });
      return { on: true, q: S.cleanQuestion({ courseId: c.id, title: pq.title, stem: pq.stem, data: pq.data, parts: pq.parts, marks: pq.marks, clos: ids, plos: mapPlos(c, pq.ploNums, added), answer: pq.answer, qtype: pq.qtype || $('psType').value, topic: pq.topic || '', difficulty: pq.difficulty || '' }) };
    });
    if (added.length) { c.clos.sort(function (a, b) { return a.label.localeCompare(b.label, undefined, { numeric: true }); }); changed(); }
    msg.className = 'small ' + (psCandidates.length ? 'ok' : 'err');
    msg.textContent = psCandidates.length ? psCandidates.length + ' question(s) found' + (r.ignored ? ' (' + r.ignored + ' header line(s) skipped)' : '') +
      (added.length ? '. Added to the course: ' + added.join(', ') + ' (add their descriptions in Courses & CLOs)' : '') +
      (r.shared && r.shared.length ? '. Shared data kept: ' + r.shared.map(function (b) { return b.rows + ' table rows ' + b.where + ' \u2192 Q' + b.to.join(', Q'); }).join('; ') : '') + '. Check them, untick any you don\u2019t want, then click Add to bank.' : 'No questions found. Start each question with Q1., Q2. or 1., 2.';
    renderPaste();
  }
  function renderPaste() {
    var box = clear($('psResults'));
    shownData = {};
    psCandidates.forEach(function (cand, ci) {
      var q = cand.q;
      box.append(h('article', { class: 'qcard' + (cand.on ? '' : ' off') },
        h('div', { class: 'qhead' }, h('label', { class: 'check' }, h('input', { type: 'checkbox', checked: cand.on, onchange: function (e) { cand.on = e.target.checked; renderPaste(); } }), h('b', { text: ' ' + (q.title || '(no heading)') })), badges(q)),
        questionBody(q, 'Question ' + (ci + 1))));
    });
    shownData = null;
    $('psAdd').disabled = !psCandidates.some(function (x) { return x.on; });
  }
  function addPaste() {
    var picked = psCandidates.filter(function (x) { return x.on; }).map(function (x) { return x.q; });
    if (!picked.length) return;
    data.questions = picked.concat(data.questions);
    if ($('psToPaper').checked) {
      var cid = picked[0].courseId;
      if (data.paper.courseId !== cid) { data.paper.courseId = cid; data.paper.questionIds = []; }
      picked.forEach(function (q) { data.paper.questionIds.push(q.id); });
    }
    psCandidates = []; $('psText').value = ''; $('psDlg').close();
    changed(); render(); toast(picked.length + ' question(s) added to the bank. Press Save to back up.');
  }

  // ---------- AI ----------
  var aiSel = { course: '', clos: [] };
  function renderAI() {
    if (!course(aiSel.course)) aiSel.course = filt.course || data.paper.courseId || (data.courses[0] && data.courses[0].id) || '';
    fillCourseSelect($('aiCourse'), aiSel.course);
    var c = course(aiSel.course), box = clear($('aiClos'));
    if (!c) box.append(h('span', { class: 'muted small', text: 'Add a course with CLOs first.' }));
    else if (!c.clos.length) box.append(h('span', { class: 'muted small', text: 'This course has no CLOs yet.' }));
    (c ? c.clos : []).forEach(function (x) {
      var on = aiSel.clos.indexOf(x.id) >= 0;
      box.append(h('button', { type: 'button', class: 'chip' + (on ? ' on' : ''), title: x.desc, text: x.label, onclick: function () {
        if (on) aiSel.clos = aiSel.clos.filter(function (y) { return y !== x.id; }); else aiSel.clos.push(x.id); renderAI();
      } }));
    });
    var tc = clear($('aiTopicChips')), cur = $('aiTopic').value.split(/\s*,\s*/).map(norm);
    (c ? c.topics : []).forEach(function (t) {
      var on = cur.indexOf(norm(t.title)) >= 0;
      tc.append(h('button', { type: 'button', class: 'chip' + (on ? ' on' : ''), title: topicLong(c, t), text: topicShort(t), onclick: function () {
        var list = $('aiTopic').value.split(/\s*,\s*/).filter(Boolean);
        if (on) list = list.filter(function (x) { return norm(x) !== norm(t.title); });
        else { list.push(t.title); t.clos.forEach(function (id) { if (aiSel.clos.indexOf(id) < 0) aiSel.clos.push(id); }); }
        $('aiTopic').value = list.join(', '); renderAI();
      } }));
    });
    topicInfo($('aiTopicInfo'), c, $('aiTopic').value);
    $('aiKeyState').textContent = data.settings.ai.geminiKey ? '✓ Gemini connected (' + data.settings.ai.model + '). Tip: Ctrl+Enter in the command box sends it.' : 'First time? Clicking the button shows a 1-minute setup to connect Gemini with your Google account.';
    renderAIResults();
  }
  function aiPrompt(web) {
    var c = course(aiSel.course);
    if (!c) throw new Error('Choose a course first.');
    var sel = c.clos.filter(function (x) { return aiSel.clos.indexOf(x.id) >= 0; }).map(function (x) { return x.label; });
    var clamp = function (v, a, b, d) { v = Number(v); return isFinite(v) ? Math.min(b, Math.max(a, v)) : d; };
    return AI.buildPrompt({
      course: c, cloLabels: sel, count: clamp($('aiCount').value, 1, 20, 3), marks: clamp($('aiMarks').value, 0.5, 100, 4),
      parts: Math.round(clamp($('aiParts').value, 0, 10, 2)), difficulty: $('aiDiff').value, bloom: $('aiBloom').value,
      qtype: $('aiType').value, topic: $('aiTopic').value.trim().slice(0, 300), notes: $('aiNotes').value.trim().slice(0, 500),
      source: $('aiSource').value.trim().slice(0, 60000), withAnswers: $('aiAnswers').checked,
      mine: $('aiMine').value.trim().slice(0, 60000), mode: $('aiMode').value, web: !!web
    });
  }
  function updPromptView() { try { $('aiPromptView').value = aiPrompt(true); } catch (e) { $('aiPromptView').value = e.message; } }
  async function aiGemini() {
    var key = data.settings.ai.geminiKey;
    if (!key) { $('aiConnect').classList.remove('hidden'); $('aiKeyInline').focus(); $('aiConnect').scrollIntoView({ behavior: 'smooth', block: 'center' }); return; }
    var prompt; try { prompt = aiPrompt(false); } catch (e) { return toast(e.message, 'err'); }
    var btn = $('aiGemini'); btn.disabled = true; btn.replaceChildren(h('span', { class: 'ai-working' }), 'Gemini is writing your questions…');
    $('aiMsg').textContent = '';
    try {
      var text = await AI.generate(key, data.settings.ai.model, prompt, function (m) { data.settings.ai.model = m; changed(); });
      $('aiPaste').value = text; parseAI();
      if (aiCandidates.length && !$('aiReview').checked) aiAdd(true, true);
      else if (aiCandidates.length) $('aiResults').scrollIntoView({ behavior: 'smooth', block: 'start' });
    } catch (e) {
      var msg = String(e.message || e);
      if (/API key not valid|API_KEY_INVALID|permission|403|401/i.test(msg)) { msg = 'Google did not accept the key. Connect again with a new key.'; $('aiConnect').classList.remove('hidden'); }
      else if (/quota|429|RESOURCE_EXHAUSTED/i.test(msg)) msg = 'Gemini’s free limit was reached for now. Wait a minute and try again.';
      else if (/Failed to fetch|NetworkError/i.test(msg)) msg = 'Could not reach Google. Check your internet connection.';
      $('aiMsg').className = 'small err'; $('aiMsg').textContent = 'Gemini: ' + msg; toast('Gemini: ' + msg, 'err');
    } finally { btn.disabled = false; btn.textContent = '✨ Send to Gemini & add to paper'; }
  }
  async function aiConnect() {
    var k = $('aiKeyInline').value.trim(), m = $('aiConnectMsg');
    if (!/^[A-Za-z0-9._-]{20,300}$/.test(k)) { m.className = 'small err'; m.textContent = 'That doesn’t look like a Gemini key. Copy the whole key from Google AI Studio.'; return; }
    m.className = 'small'; m.textContent = 'Checking the key with Google…';
    try {
      var models = await AI.listModels(k);
      if (models.length && models.indexOf(data.settings.ai.model) < 0) {
        data.settings.ai.model = models.filter(function (x) { return /flash/i.test(x) && !/lite|preview|exp/i.test(x); }).sort().reverse()[0] || models[0];
      }
      data.settings.ai.geminiKey = k; $('aiKeyInline').value = ''; changed(); await saveLocal();
      m.className = 'small ok'; m.textContent = '✓ Connected.'; $('aiConnect').classList.add('hidden'); renderAI();
      aiGemini();
    } catch (e) { m.className = 'small err'; m.textContent = 'Google did not accept this key: ' + e.message; }
  }
  var lastPrompt = '';
  async function copyPrompt() {
    var prompt = aiPrompt(true); lastPrompt = prompt; updPromptView();
    try { await navigator.clipboard.writeText(prompt); return true; }
    catch (e) { $('aiPromptView').closest('details').open = true; $('aiPromptView').select(); toast('Could not copy automatically — the prompt is selected below, press Ctrl+C.', 'err'); return false; }
  }
  async function aiOpen(url) {
    try {
      var ok = await copyPrompt();
      window.open(url, '_blank', 'noopener,noreferrer');
      $('aiBack').classList.remove('hidden');
      if (ok) toast('Prompt copied. In the AI press Ctrl+V, add any command, send. Then copy its answer and come back here.');
    } catch (e) { toast(e.message, 'err'); }
  }
  async function pasteClipboard() {
    var t = '';
    try { t = await navigator.clipboard.readText(); }
    catch (e) { $('aiPaste').focus(); return toast('Clipboard access was blocked. Click in the answer box and press Ctrl+V instead.', 'err'); }
    if (!t.trim()) return toast('The clipboard is empty. Copy the AI’s answer first.', 'err');
    if (lastPrompt && t.trim() === lastPrompt.trim()) return toast('The clipboard still has the prompt. Copy the AI’s answer first, then try again.', 'err');
    $('aiPaste').value = t; $('aiBack').classList.add('hidden'); parseAI();
  }
  function parseAI() {
    var c = course(aiSel.course), msg = $('aiMsg'), txt = $('aiPaste').value;
    if (!c) return toast('Choose a course first.', 'err');
    if (!txt.trim()) { msg.className = 'small err'; msg.textContent = 'Paste the AI’s answer first.'; return; }
    var qs = [], added = [];
    try { qs = AI.parseQuestions(txt, c); } catch (e) { qs = []; }
    if (!qs.length) { var r = fromPasted(window.QBPaste.parse(txt, { defaultMarks: Number($('aiMarks').value) || 1 }), c, $('aiType').value === 'Mixed' ? '' : $('aiType').value); qs = r.qs; added = r.added; }
    qs.forEach(function (q) { if (!q.clos.length && aiSel.clos.length) q.clos = aiSel.clos.slice(); if (!q.topic && $('aiTopic').value.trim()) q.topic = $('aiTopic').value.split(',')[0].trim(); });
    aiCandidates = qs.map(function (q) { return { q: q, on: true }; });
    msg.className = 'small ' + (qs.length ? 'ok' : 'err');
    msg.textContent = qs.length ? qs.length + ' question(s) read' + (added.length ? ' (new CLOs added to the course: ' + added.join(', ') + ')' : '') + '. Adjust marks and CLOs below if needed, then click “Add to question paper”.'
      : 'No questions found in the answer. Make sure you copied the AI’s whole answer.';
    renderAIResults();
  }
  function setTotal(q, m) {
    m = Math.max(0, Math.round(Number(m) * 2) / 2); if (!m) return;
    if (!q.parts.length) { q.marks = m; return; }
    var each = Math.floor(m / q.parts.length * 2) / 2, rest = round(m - each * q.parts.length);
    q.parts.forEach(function (p, i) { p.marks = each + (i === q.parts.length - 1 ? rest : 0); });
  }
  function renderAIResults() {
    var box = clear($('aiResults')), c = course(aiSel.course);
    var any = aiCandidates.length > 0;
    $('aiBulk').classList.toggle('hidden', !any); $('aiAddBar').classList.toggle('hidden', !any);
    var bc = clear($('aiBulkClos'));
    (c ? c.clos : []).forEach(function (x) {
      var sel = aiCandidates.filter(function (k) { return k.on; }), all = sel.length && sel.every(function (k) { return k.q.clos.indexOf(x.id) >= 0; });
      bc.append(h('button', { type: 'button', class: 'chip' + (all ? ' on' : ''), title: x.desc, text: x.label, onclick: function () {
        sel.forEach(function (k) { var i = k.q.clos.indexOf(x.id); if (all) { if (i >= 0) k.q.clos.splice(i, 1); } else if (i < 0) k.q.clos.push(x.id); });
        renderAIResults();
      } }));
    });
    aiCandidates.forEach(function (cand, ci) {
      var q = cand.q;
      var title = h('input', { class: 'edit-title', value: q.title, placeholder: '(no heading)', maxlength: 300, oninput: function () { q.title = title.value; } });
      var tot = h('span', { class: 'badge marks', text: D.fmtMarks(total(q)) });
      var refreshTot = function () { tot.textContent = D.fmtMarks(total(q)); };
      var clos = h('div', { class: 'cand-clos' }, h('span', { class: 'small muted', text: 'CLOs:' }), (c ? c.clos : []).map(function (x) {
        var on = q.clos.indexOf(x.id) >= 0;
        return h('button', { type: 'button', class: 'chip' + (on ? ' on' : ''), title: x.desc, text: x.label, onclick: function () {
          if (on) q.clos = q.clos.filter(function (y) { return y !== x.id; }); else q.clos.push(x.id); renderAIResults();
        } });
      }), q.clos.length ? null : h('span', { class: 'badge warn', text: 'pick a CLO' }));
      var mk = function (get, set) {
        var inp = h('input', { type: 'number', min: 0, step: 0.5, value: get(), 'aria-label': 'Marks', oninput: function () { set(Number(inp.value) || 0); refreshTot(); } });
        return h('span', { class: 'mk-wrap' }, inp, 'marks');
      };
      var body = h('div', { class: 'qbody' },
        q.stem ? h('p', { class: 'stem', text: q.stem }) : null,
        q.parts.length ? q.parts.map(function (p, i) {
          return h('div', { class: 'cand-part' }, h('span', null, h('b', { text: '(' + D.letter(i) + ') ' }), p.text), mk(function () { return p.marks; }, function (v) { p.marks = v; }));
        }) : h('div', { class: 'cand-part' }, h('span', { class: 'muted small', text: 'Marks for this question' }), mk(function () { return q.marks; }, function (v) { q.marks = v; })));
      box.append(h('article', { class: 'qcard' + (cand.on ? '' : ' off') },
        h('div', { class: 'qhead' }, h('input', { type: 'checkbox', checked: cand.on, title: 'Include this question', onchange: function (e) { cand.on = e.target.checked; renderAIResults(); } }),
          h('span', { class: 'qn', text: 'Q' + (ci + 1) }), title, tot),
        clos, body,
        q.answer ? h('details', { class: 'answer' }, h('summary', { text: 'Answer key' }), h('p', { text: q.answer })) : null));
    });
    var none = !aiCandidates.some(function (x) { return x.on; });
    $('aiAddSel').disabled = none; $('aiAddPaper').disabled = none;
  }
  function aiAdd(toPaper, auto) {
    var picked = aiCandidates.filter(function (x) { return x.on; }).map(function (x) { return x.q; });
    if (!picked.length) return;
    var noClo = picked.filter(function (q) { return !q.clos.length; }).length;
    if (noClo && !auto && !confirm(noClo + ' question(s) have no CLO. Add anyway?')) return;
    if (toPaper && data.paper.courseId && data.paper.courseId !== aiSel.course && data.paper.questionIds.length &&
      !confirm('The current paper is for another course. Start a new paper for this course? (The old paper’s questions stay in the bank.)')) return;
    var now = new Date().toISOString();
    picked = picked.map(function (q) { return S.cleanQuestion(Object.assign({}, q, { createdAt: now, updatedAt: now })); });
    data.questions = picked.concat(data.questions);
    if (toPaper) {
      if (data.paper.courseId !== aiSel.course) { data.paper.courseId = aiSel.course; data.paper.questionIds = []; }
      picked.forEach(function (q) { data.paper.questionIds.push(q.id); });
    }
    aiCandidates = []; $('aiPaste').value = ''; $('aiMsg').textContent = '';
    changed(); renderAIResults();
    if (toPaper) { showTab('paper'); toast(picked.length + ' question(s) from ' + (auto ? 'Gemini' : 'the AI') + ' added to the paper' + (noClo ? ' (' + noClo + ' without a CLO — click ✎ to set it)' : '') + '. Press Save to back up.'); }
    else toast(picked.length + ' question(s) added to the bank. Press Save to back up.');
  }

  // ---------- BACKUP & SECURITY ----------
  function renderBackup() {
    document.querySelectorAll('input[name=bmode]').forEach(function (r) { r.checked = r.value === data.settings.backupMode; });
    refreshLinkState();
    $('pwState').textContent = keyInfo ? '🔒 A password is set. Data on this PC (and backup files) is encrypted.' : 'No password. Anyone who uses this PC’s browser profile can open the bank. Setting a password encrypts it.';
    $('removePw').disabled = !keyInfo; $('autoLock').value = String(data.settings.autoLockMin); $('autoLock').disabled = !keyInfo;
    $('aiKey').value = ''; $('aiKey').placeholder = data.settings.ai.geminiKey ? 'Key saved (…' + data.settings.ai.geminiKey.slice(-4) + ') — paste to replace' : 'Paste Gemini API key';
    $('aiModel').value = data.settings.ai.model;
    renderTplState();
    $('sUni').value = data.settings.university; $('sDeptPrefix').value = data.settings.deptPrefix; $('sDept').value = data.settings.department;
  }
  async function refreshLinkState() {
    var el = $('linkState');
    if (!S.fsSupported) { el.textContent = 'This browser cannot overwrite a file directly, so Save downloads a backup copy (to your Downloads folder). Use Chrome or Edge for a single auto-updated backup file.'; $('linkFile').disabled = true; $('unlinkFile').disabled = true; return; }
    var hnd = await S.getLinkedFile();
    el.textContent = hnd ? 'Linked backup file: ' + hnd.name + (lastPCSave ? ' (last written ' + lastPCSave.toLocaleTimeString() + ')' : '') : 'No backup file linked yet — you will be asked where to save it the first time you press Save.';
    $('unlinkFile').disabled = !hnd;
  }
  function askPassword(title, text) {
    return new Promise(function (res) {
      var dlg = $('pwDlg'); $('pwDlgTitle').textContent = title; $('pwDlgText').textContent = text || ''; $('pwDlgInput').value = '';
      dlg.returnValue = ''; dlg.showModal(); $('pwDlgInput').focus();
      dlg.addEventListener('close', function f() { dlg.removeEventListener('close', f); res(dlg.returnValue === 'ok' ? $('pwDlgInput').value : null); });
    });
  }
  async function exportJson() {
    S.download(new Blob([JSON.stringify(S.exportable(data), null, 2)], { type: 'application/json' }), 'question-bank-export_' + S.stamp() + '.json');
    toast('Exported ' + data.courses.length + ' course(s), ' + data.questions.length + ' question(s) and ' + data.papers.length + ' paper(s).');
  }
  async function importJson(file) {
    if (!file) return;
    if (file.size > S.MAX_IMPORT_BYTES) return toast('File is too large (max 15 MB).', 'err');
    var obj;
    try { obj = JSON.parse(await file.text()); } catch (e) { return toast('This is not a valid JSON file.', 'err'); }
    if (S.isEncrypted(obj)) {
      var pw = await askPassword('Encrypted backup', 'Enter the password that was used on the PC that made this backup.');
      if (pw == null) return;
      try { obj = (await S.decryptEnvelope(obj, pw)).data; } catch (e) { return toast('Wrong password.', 'err'); }
    }
    if (!obj || typeof obj !== 'object' || !Array.isArray(obj.courses) || !Array.isArray(obj.questions)) return toast('This file is not a question bank export.', 'err');
    var inc = S.cleanData(obj);
    $('iInfo').textContent = 'File contains ' + inc.courses.length + ' course(s), ' + inc.questions.length + ' question(s)' + (inc.papers.length ? ' and ' + inc.papers.length + ' saved paper(s)' : '') + '.';
    var dlg = $('iDlg'); dlg.returnValue = ''; dlg.showModal();
    dlg.addEventListener('close', function f() {
      dlg.removeEventListener('close', f);
      if (dlg.returnValue !== 'ok') return;
      var mode = document.querySelector('input[name=imode]:checked').value;
      if (mode === 'replace') {
        if (!confirm('Replace ALL current courses and questions on this PC?')) return;
        data.courses = inc.courses; data.questions = inc.questions; data.papers = inc.papers || [];
        data.paper = inc.paper && inc.paper.questionIds && inc.paper.questionIds.length ? inc.paper : S.cleanPaper({ id: S.newId() }); edKey = '';
        toast('Bank replaced: ' + inc.courses.length + ' courses, ' + inc.questions.length + ' questions.');
      } else toast(merge(inc));
      changed(); render();
    });
  }
  // Merge an imported bank into this one. Courses are matched by id or code; CLOs and PLOs by id or label;
  // questions by id (the newer version wins); topics, outlines and saved papers are added when missing.
  function merge(inc) {
    var addedC = 0, addedQ = 0, updQ = 0, addedP = 0, cmap = {}, clomap = {}, plomap = {};
    function mapList(exList, incList, map) {
      (incList || []).forEach(function (x) {
        var m = exList.find(function (y) { return y.id === x.id; }) || exList.find(function (y) { return y.label.toLowerCase() === x.label.toLowerCase(); });
        if (!m) { m = { id: exList.some(function (y) { return y.id === x.id; }) ? S.newId() : x.id, label: x.label, desc: x.desc }; if (x.plos) m.plos = x.plos.slice(); exList.push(m); }
        else if (!m.desc && x.desc) m.desc = x.desc;
        map[x.id] = m.id;
      });
    }
    inc.courses.forEach(function (ic) {
      var ex = data.courses.find(function (c) { return c.id === ic.id; }) || data.courses.find(function (c) { return c.code.toLowerCase() === ic.code.toLowerCase(); });
      if (!ex) {
        data.courses.push(ic); addedC++; cmap[ic.id] = ic.id;
        ic.clos.forEach(function (x) { clomap[x.id] = x.id; }); (ic.plos || []).forEach(function (x) { plomap[x.id] = x.id; });
        return;
      }
      cmap[ic.id] = ex.id; ex.plos = ex.plos || [];
      mapList(ex.plos, ic.plos, plomap);
      mapList(ex.clos, ic.clos, clomap);
      // CLO -> PLO links
      ic.clos.forEach(function (x) {
        var m = ex.clos.find(function (y) { return y.id === clomap[x.id]; });
        if (m && (!m.plos || !m.plos.length) && x.plos && x.plos.length) m.plos = x.plos.map(function (id) { return plomap[id]; }).filter(Boolean);
      });
      // topics + outline
      (ic.topics || []).forEach(function (t) {
        if (ex.topics.some(function (y) { return y.title.toLowerCase() === t.title.toLowerCase(); })) return;
        ex.topics.push({ id: S.newId(), week: t.week, title: t.title, clos: t.clos.map(function (id) { return clomap[id]; }).filter(Boolean) });
      });
      if (!ex.outline && ic.outline) ex.outline = ic.outline;
    });
    inc.questions.forEach(function (q) {
      q.courseId = cmap[q.courseId];
      q.clos = q.clos.map(function (id) { return clomap[id] || id; });
      q.plos = (q.plos || []).map(function (id) { return plomap[id] || id; });
      var c = course(q.courseId);
      if (c) { q.clos = q.clos.filter(function (id) { return c.clos.some(function (x) { return x.id === id; }); }); q.plos = q.plos.filter(function (id) { return (c.plos || []).some(function (x) { return x.id === id; }); }); }
      var ex = question(q.id);
      if (!ex) { data.questions.push(q); addedQ++; }
      else if ((q.updatedAt || '') > (ex.updatedAt || '')) { data.questions[data.questions.indexOf(ex)] = q; updQ++; }
    });
    (inc.papers || []).forEach(function (pp) {
      if (data.papers.some(function (x) { return x.id === pp.id; })) return;
      pp.paper.courseId = cmap[pp.paper.courseId] || pp.paper.courseId;
      data.papers.push(pp); addedP++;
    });
    return 'Merged: ' + addedC + ' new course(s), ' + addedQ + ' new question(s), ' + updQ + ' updated' + (addedP ? ', ' + addedP + ' paper(s)' : '') + '.';
  }
  async function setPassword() {
    var a = $('pw1').value, b = $('pw2').value;
    if (a.length < 8) return toast('Use at least 8 characters.', 'err');
    if (a !== b) return toast('The two passwords do not match.', 'err');
    keyInfo = await S.newKeyInfo(a); $('pw1').value = $('pw2').value = '';
    await saveLocal(); dirtyPC = true; setStatus(); $('lockNow').classList.remove('hidden'); renderBackup(); armAutoLock();
    toast('Password set. Data is now encrypted. Don’t forget it — it cannot be recovered.');
  }
  async function removePassword() {
    var pw = await askPassword('Remove password', 'Enter the current password to confirm.');
    if (pw == null) return;
    var raw = S.readRaw();
    try { await S.decryptEnvelope(raw.obj, pw); } catch (e) { return toast('Wrong password.', 'err'); }
    keyInfo = null; await saveLocal(); dirtyPC = true; setStatus(); $('lockNow').classList.add('hidden'); renderBackup();
    toast('Password removed. Data is stored unencrypted on this PC.');
  }

  // ---------- paper template ----------
  var tplInfo = null;
  async function loadTemplate() {
    var t = await S.getTemplate();
    tplInfo = t && t.b64 ? t : null;
    window.QB_CUSTOM_TEMPLATE_B64 = tplInfo ? tplInfo.b64 : null;
  }
  function renderTplState() {
    var el = $('tplState');
    el.textContent = tplInfo ? '\u2713 Using your template: ' + tplInfo.name + (tplInfo.at ? ' (added ' + new Date(tplInfo.at).toLocaleDateString() + ')' : '') : 'Using the default DHA Suffa University template.';
    $('tplReset').disabled = !tplInfo;
  }
  async function uploadTemplate(file) {
    if (!file) return;
    if (file.size > 20 * 1024 * 1024) return toast('That file is too large (max 20 MB).', 'err');
    try {
      var r = await D.prepareTemplate(await file.arrayBuffer());
      tplInfo = { name: file.name, b64: r.b64, at: new Date().toISOString() };
      await S.setTemplate(tplInfo); window.QB_CUSTOM_TEMPLATE_B64 = r.b64;
      if (r.found.uni) { data.settings.university = r.found.uni; data.paper.university = ''; }
      if (r.found.dept) { data.settings.deptPrefix = ''; data.settings.department = r.found.dept; data.paper.department = ''; }
      changed(); render();
      toast('Template saved: ' + file.name + '. ' + (r.found.titleBlock ? 'No letterhead was found in its header, so the university, department and exam title are printed at the top of the page.' : 'Header lines found and linked to Paper Builder.') + ' Download a paper to check it.');
    } catch (e) { toast(e.message, 'err'); }
  }

  // ---------- auto-lock ----------
  var lockTimer = null;
  function armAutoLock() {
    clearTimeout(lockTimer);
    if (!keyInfo || !data.settings.autoLockMin) return;
    lockTimer = setTimeout(lockNow, data.settings.autoLockMin * 60000);
  }
  async function lockNow() { await saveLocal(); keyInfo = null; data = null; location.reload(); }

  // ---------- boot ----------
  function showLock() {
    document.body.classList.remove('booting'); $('lock').classList.remove('hidden'); $('lockPw').focus();
    async function tryUnlock() {
      $('lockErr').textContent = ''; $('lockBtn').disabled = true; $('lockBtn').textContent = 'Unlocking…';
      try {
        var r = await S.decryptEnvelope(S.readRaw().obj, $('lockPw').value);
        keyInfo = r.keyInfo; data = S.cleanData(r.data); $('lockPw').value = '';
        $('lock').classList.add('hidden'); start();
      } catch (e) { $('lockErr').textContent = 'Wrong password.'; }
      $('lockBtn').disabled = false; $('lockBtn').textContent = 'Unlock';
    }
    $('lockBtn').addEventListener('click', tryUnlock);
    $('lockPw').addEventListener('keydown', function (e) { if (e.key === 'Enter') tryUnlock(); });
    $('lockForgot').addEventListener('click', function () {
      if (!confirm('Without the password the data cannot be decrypted.\n\nErase the question bank stored in this browser and start fresh? (Backup JSON files on your PC are not touched.)')) return;
      if (!confirm('Are you sure? This cannot be undone.')) return;
      S.wipeLocal(); S.unlinkFile().then(function () { location.reload(); });
    });
  }

  function bind() {
    document.querySelectorAll('.tab').forEach(function (b) { b.addEventListener('click', function () { showTab(b.dataset.tab); }); });
    $('saveBtn').addEventListener('click', saveAll);
    $('lockNow').addEventListener('click', lockNow);
    document.addEventListener('keydown', function (e) { if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') { e.preventDefault(); saveAll(); } });
    ['click', 'keydown'].forEach(function (ev) { document.addEventListener(ev, armAutoLock, { passive: true }); });
    window.addEventListener('beforeunload', function (e) { if (data && dirtyPC && data.settings.backupMode !== 'browser') { saveLocal(); e.preventDefault(); e.returnValue = ''; } });

    // bank
    $('fCourse').addEventListener('change', function (e) { filt.course = e.target.value; filt.clo = ''; renderBank(); });
    $('fClo').addEventListener('change', function (e) { filt.clo = e.target.value; renderBank(); });
    $('fType').addEventListener('change', function (e) { filt.type = e.target.value; renderBank(); });
    $('fDiff').addEventListener('change', function (e) { filt.diff = e.target.value; renderBank(); });
    $('fSearch').addEventListener('input', function (e) { filt.q = e.target.value; renderBank(); });
    $('addQ').addEventListener('click', function () { openQuestion(null); });
    $('pasteQ').addEventListener('click', function () { $('psToPaper').checked = false; openPaste(); });
    $('uploadPaperBank').addEventListener('click', function () { uploadToPaper = false; $('paperFile').value = ''; $('paperFile').click(); });
    $('uploadPaper').addEventListener('click', function () { uploadToPaper = true; $('paperFile').value = ''; $('paperFile').click(); });
    $('paperFile').addEventListener('change', function (e) { uploadPaperFile(e.target.files[0]); });
    $('tplUpload').addEventListener('click', function () { $('tplFile').value = ''; $('tplFile').click(); });
    $('tplFile').addEventListener('change', function (e) { uploadTemplate(e.target.files[0]); });
    $('tplDownload').addEventListener('click', function () {
      var b = Uint8Array.from(atob(window.QB_CUSTOM_TEMPLATE_B64 || window.QB_TEMPLATE_DOCX_B64), function (ch) { return ch.charCodeAt(0); });
      S.download(new Blob([b], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' }), tplInfo ? 'Template_' + tplInfo.name : 'Default_Paper_Template.docx');
    });
    $('tplReset').addEventListener('click', async function () {
      if (!confirm('Go back to the default DHA Suffa University template?')) return;
      await S.clearTemplate(); tplInfo = null; window.QB_CUSTOM_TEMPLATE_B64 = null; renderTplState(); toast('Default template restored.');
    });
    $('qAddPlo').addEventListener('click', function () {
      var c = course($('qCourse').value), d = $('qNewPlo').value.trim(); if (!c || !d) return;
      c.plos = c.plos || [];
      var mm = /^PLO\s*-?\s*(\d+)\s*[:.\-]?\s*(.*)$/i.exec(d);
      var nx = mm ? { id: S.newId(), label: 'PLO ' + mm[1], desc: mm[2] || '' } : { id: S.newId(), label: 'PLO ' + (c.plos.length + 1), desc: d.slice(0, 600) };
      var ex = findLab(c.plos, nx.label); if (ex) nx = ex; else c.plos.push(nx);
      if (draftPlos.indexOf(nx.id) < 0) draftPlos.push(nx.id); $('qNewPlo').value = ''; changed(); renderQPlos();
    });
    $('cAddPlo').addEventListener('click', function () { draftCPlos.push({ id: S.newId(), label: 'PLO ' + (draftCPlos.length + 1), desc: '' }); renderCPlos(); });
    $('fTopic').addEventListener('change', function (e) { filt.topic = e.target.value; renderBank(); });
    $('oFile').addEventListener('change', function (e) { outlineFromFile(e.target.files[0]); });
    $('oRead').addEventListener('click', readOutline);
    $('oSave').addEventListener('click', saveOutline);
    $('oCancel').addEventListener('click', function () { $('oDlg').close(); });
    $('qTopic').addEventListener('input', onQTopic);
    $('aiTopic').addEventListener('change', renderAI);
    $('psRead').addEventListener('click', readPaste);
    $('psAdd').addEventListener('click', addPaste);
    $('psCancel').addEventListener('click', function () { $('psDlg').close(); });
    document.querySelectorAll('[data-np]').forEach(function (b) {
      b.addEventListener('click', function () {
        var n = Number(b.dataset.np);
        var lost = draftParts.slice(n).filter(function (p) { return String(p.text).trim(); }).length;
        if (lost && !confirm('This removes ' + lost + ' part(s) that already have text. Continue?')) return;
        draftParts = draftParts.slice(0, n);
        while (draftParts.length < n) draftParts.push({ text: '', marks: 1 });
        renderQParts();
      });
    });
    $('pDateMode').addEventListener('change', function (e) {
      data.paper.dateMode = e.target.value;
      if (e.target.value === 'month' && data.paper.date) { data.paper.dateMonth = Number(data.paper.date.slice(5, 7)); data.paper.dateYear = Number(data.paper.date.slice(0, 4)); $('pDateMonth').value = String(data.paper.dateMonth); $('pDateYear').value = String(data.paper.dateYear); }
      showDateMode(); changed(); renderPaperLists();
    });
    $('pDateMonth').addEventListener('change', function (e) { data.paper.dateMonth = Number(e.target.value); changed(); renderPaperLists(); });
    $('pDateYear').addEventListener('change', function (e) { data.paper.dateYear = Number(e.target.value); changed(); renderPaperLists(); });
    function openCal() { try { $('pDate').showPicker(); } catch (e) { $('pDate').focus(); } }
    $('pDateBtn').addEventListener('click', openCal);
    $('pDate').addEventListener('click', openCal);
    ['rgType', 'rgDiff'].forEach(function (id) { $(id).addEventListener('change', renderRG); });
    $('rgFill').addEventListener('click', rgFill);
    $('rgDownload').addEventListener('click', rgDownload);
    $('bankReport').addEventListener('click', downloadBankReport);

    // question dialog
    $('qForm').addEventListener('submit', saveQuestion);
    $('qCancel').addEventListener('click', function () { $('qDlg').close(); });
    $('qCourse').addEventListener('change', function () { draftClos = []; draftPlos = []; renderQClos(); renderQPlos(); fillTopicList(); });
    $('qAddPart').addEventListener('click', function () { draftParts.push({ text: '', marks: 1 }); renderQParts(); });
    $('qMarks').addEventListener('input', updQTotal);
    $('qAddClo').addEventListener('click', function () {
      var c = course($('qCourse').value), d = $('qNewClo').value.trim();
      if (!c || !d) return;
      var nx = { id: S.newId(), label: 'CLO ' + (c.clos.length + 1), desc: d.slice(0, 600) };
      c.clos.push(nx); draftClos.push(nx.id); $('qNewClo').value = ''; changed(); renderQClos();
    });

    // course dialog
    $('addCourse').addEventListener('click', function () { openCourse(null); });
    $('cForm').addEventListener('submit', saveCourse);
    $('cCancel').addEventListener('click', function () { $('cDlg').close(); });
    $('cAddClo').addEventListener('click', function () { draftCClos.push({ id: S.newId(), label: 'CLO ' + (draftCClos.length + 1), desc: '' }); renderCClos(); });

    // paper
    var p = function () { return data.paper; };
    $('pCourse').addEventListener('change', function (e) {
      if (p().questionIds.length && !confirm('Changing the course clears the questions on this paper. Continue?')) { e.target.value = p().courseId; return; }
      p().courseId = e.target.value; p().questionIds = []; p().courseCode = ''; p().courseTitle = ''; p().edit = null; edKey = ''; courseUndo = null; $('pCourseAsk').classList.add('hidden'); changed(); renderPaper();
    });
    [['pExam', 'exam'], ['pSeason', 'season'], ['pClass', 'classSection'], ['pInstructor', 'instructor'], ['pTimeCustom', 'timeAllowed'], ['pStart', 'examTime'], ['pDate', 'date'], ['pInstr', 'instructions'], ['pDept', 'department'], ['pUni', 'university']].forEach(function (m) {
      $(m[0]).addEventListener('input', function (e) { p()[m[1]] = e.target.value; changed(); renderPaperLists(); });
    });
    $('pYear').addEventListener('change', function (e) { p().year = Number(e.target.value); changed(); renderPaperLists(); });
    $('pTime').addEventListener('change', function (e) {
      var custom = e.target.value === '__custom';
      $('pTimeCustom').classList.toggle('hidden', !custom);
      if (custom) { $('pTimeCustom').focus(); p().timeAllowed = $('pTimeCustom').value; } else p().timeAllowed = e.target.value;
      changed(); renderPaperLists();
    });
    $('pMax').addEventListener('input', function (e) { p().maxMarksOverride = e.target.value === '' ? '' : Math.max(0, Number(e.target.value) || 0); changed(); renderPaperLists(); });
    $('pCloTable').addEventListener('change', function (e) { p().appendCloTable = e.target.checked; changed(); });
    $('pShowPlo').addEventListener('change', function (e) { p().showPlo = e.target.checked; changed(); renderPaperLists(); });
    $('pDataLines').addEventListener('change', function (e) { p().dataLines = e.target.value; changed(); renderPaperLists(); });
    $('pStemLines').addEventListener('change', function (e) { p().stemLines = e.target.value; changed(); renderPaperLists(); });
    document.querySelectorAll('.edb').forEach(function (b) {
      b.addEventListener('mousedown', function (e) { e.preventDefault(); });   // keep the text selection
      b.addEventListener('click', function () { edCmd(b.dataset.cmd); });
    });
    $('edFont').addEventListener('change', function (e) { edCmd('font', e.target.value); });
    $('edSize').addEventListener('change', function (e) { edCmd('size', e.target.value); });
    var rebuild = function () { if (data.paper.edit && !confirm('Rebuild the paper from the questions? Your text edits and formatting will be replaced.')) return; data.paper.edit = null; edKey = ''; changed(); renderPaperLists(); };
    $('edReset').addEventListener('click', rebuild);
    $('edRebuild').addEventListener('click', function () { data.paper.edit = null; edKey = ''; changed(); renderPaperLists(); });
    $('edKeep').addEventListener('click', function () { $('edStale').classList.add('hidden'); });
    $('pNewQ').addEventListener('click', function () {
      if (!data.paper.courseId && data.courses[0]) data.paper.courseId = data.courses[0].id;
      addToPaperAfterSave = true; openQuestion(null, { courseId: data.paper.courseId });
    });
    $('qDlg').addEventListener('close', function () { setTimeout(function () { addToPaperAfterSave = false; }, 0); });
    $('pSaveBank').addEventListener('click', function () {
      var dlg = $('sbDlg'); dlg.returnValue = ''; dlg.showModal();
      dlg.addEventListener('close', function f() { dlg.removeEventListener('close', f); if (dlg.returnValue === 'ok') editsToBank(document.querySelector('input[name=sbmode]:checked').value); });
    });
    // upload bank tab
    $('ibCourse').addEventListener('change', function (e) { ibCourse = e.target.value; if (ibCands.length) toast('Course changed \u2014 upload or read the file again so CLOs match this course.'); });
    $('ibDrop').addEventListener('click', function () { $('ibFile').value = ''; $('ibFile').click(); });
    $('ibDrop').addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); $('ibFile').click(); } });
    $('ibDrop').addEventListener('dragover', function (e) { e.preventDefault(); $('ibDrop').classList.add('over'); });
    $('ibDrop').addEventListener('dragleave', function () { $('ibDrop').classList.remove('over'); });
    $('ibDrop').addEventListener('drop', function (e) { e.preventDefault(); $('ibDrop').classList.remove('over'); if (e.dataTransfer.files[0]) importFile(e.dataTransfer.files[0]); });
    $('ibFile').addEventListener('change', function (e) { importFile(e.target.files[0]); });
    $('ibRead').addEventListener('click', function () { if ($('ibText').value.trim()) readImportText($('ibText').value, ''); });
    $('ibAll').addEventListener('click', function () { ibCands.forEach(function (k) { k.on = true; }); renderImportList(); });
    $('ibNone').addEventListener('click', function () { ibCands.forEach(function (k) { k.on = false; }); renderImportList(); });
    $('ibAdd').addEventListener('click', importAdd);
    ['topNew', 'newPaper', 'dlAnother', 'mpNew'].forEach(function (id) { $(id).addEventListener('click', function () { if ($('mpDlg').open) $('mpDlg').close(); newPaper(); }); });
    ['topPapers', 'myPapers'].forEach(function (id) { $(id).addEventListener('click', showMyPapers); });
    $('mpClose').addEventListener('click', function () { $('mpDlg').close(); });
    $('dlStay').addEventListener('click', function () { $('afterDl').classList.add('hidden'); });
    ['pCode', 'pTitle'].forEach(function (id) {
      $(id).addEventListener('change', courseTyped);
      $(id).addEventListener('input', function () { clearTimeout(courseTimer); courseTimer = setTimeout(courseTyped, 900); });
    });
    $('pcUndo').addEventListener('click', courseUndoRename);
    $('pcSeparate').addEventListener('click', courseSeparate);
    $('pTpl').addEventListener('click', function () { $('tplFile').value = ''; $('tplFile').click(); });
    $('pSearch').addEventListener('input', renderPaperLists);
    $('pDownload').addEventListener('click', downloadPaper);
    $('pClear').addEventListener('click', function () { if (confirm('Remove all questions from this paper? (They stay in the bank.)')) { p().questionIds = []; changed(); renderPaperLists(); } });

    // AI
    $('aiCourse').addEventListener('change', function (e) { aiSel.course = e.target.value; aiSel.clos = []; renderAI(); });
    $('aiGemini').addEventListener('click', aiGemini);
    $('aiOpenGemini').addEventListener('click', function () { aiOpen(AI.GEMINI_WEB); });
    $('aiOpenCopilot').addEventListener('click', function () { aiOpen(AI.COPILOT_WEB); });
    $('aiCopy').addEventListener('click', function () { copyPrompt().then(function (ok) { if (ok) toast('Prompt copied.'); }).catch(function (e) { toast(e.message, 'err'); }); });
    $('aiParse').addEventListener('click', parseAI);
    $('aiAddSel').addEventListener('click', function () { aiAdd(false); });
    $('aiAddPaper').addEventListener('click', function () { aiAdd(true); });
    $('aiClip').addEventListener('click', pasteClipboard);
    $('aiGetKey').addEventListener('click', function () { window.open(AI.KEY_PAGE, '_blank', 'noopener,noreferrer'); });
    $('aiConnectBtn').addEventListener('click', aiConnect);
    $('aiKeyInline').addEventListener('keydown', function (e) { if (e.key === 'Enter') { e.preventDefault(); aiConnect(); } });
    $('aiMine').addEventListener('keydown', function (e) { if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) { e.preventDefault(); aiGemini(); } });
    $('aiClip2').addEventListener('click', pasteClipboard);
    $('aiBulkApply').addEventListener('click', function () {
      var m = Number($('aiBulkMarks').value); if (!(m > 0)) return toast('Type the marks first.', 'err');
      aiCandidates.forEach(function (k) { if (k.on) setTotal(k.q, m); }); renderAIResults();
    });
    window.addEventListener('focus', function () { var b = $('aiBack'); if (!b.classList.contains('hidden') && current() === 'ai') { b.classList.remove('flash'); void b.offsetWidth; b.classList.add('flash'); } });
    ['aiMine', 'aiMode', 'aiCount', 'aiMarks', 'aiParts', 'aiDiff', 'aiBloom', 'aiType', 'aiTopic', 'aiNotes', 'aiSource', 'aiAnswers'].forEach(function (id) { $(id).addEventListener('change', updPromptView); });
    if (document.querySelector('.web-ai details')) document.querySelector('.web-ai details').addEventListener('toggle', updPromptView);

    // backup & security
    document.querySelectorAll('input[name=bmode]').forEach(function (r) { r.addEventListener('change', function () { data.settings.backupMode = r.value; changed(); setStatus(); }); });
    $('linkFile').addEventListener('click', async function () { try { await S.linkNewFile(); await saveAll(); } catch (e) { if (e.name !== 'AbortError') toast(e.message, 'err'); } refreshLinkState(); });
    $('unlinkFile').addEventListener('click', async function () { await S.unlinkFile(); refreshLinkState(); toast('Backup file unlinked (the file itself is not deleted).'); });
    $('exportJson').addEventListener('click', exportJson);
    $('importJson').addEventListener('click', function () { $('importFile').value = ''; $('importFile').click(); });
    $('importFile').addEventListener('change', function (e) { importJson(e.target.files[0]); });
    $('setPw').addEventListener('click', function () { setPassword().catch(function (e) { toast(e.message, 'err'); }); });
    $('removePw').addEventListener('click', removePassword);
    $('autoLock').addEventListener('change', function (e) { data.settings.autoLockMin = Number(e.target.value); changed(); armAutoLock(); });
    $('getKey').addEventListener('click', function () { window.open(AI.KEY_PAGE, '_blank', 'noopener,noreferrer'); });
    $('saveKey').addEventListener('click', function () {
      var k = $('aiKey').value.trim();
      if (!/^[A-Za-z0-9._-]{20,300}$/.test(k)) return toast('That does not look like a Gemini API key.', 'err');
      data.settings.ai.geminiKey = k; changed(); saveLocal(); renderBackup();
      toast(keyInfo ? 'Key saved (encrypted on this PC).' : 'Key saved on this PC. Tip: set a password so the key is encrypted.');
    });
    $('clearKey').addEventListener('click', function () { data.settings.ai.geminiKey = ''; changed(); saveLocal(); renderBackup(); toast('Key removed.'); });
    $('aiModel').addEventListener('change', function (e) { var v = e.target.value.trim().replace(/[^A-Za-z0-9._-]/g, ''); if (v) { data.settings.ai.model = v; changed(); } });
    $('testKey').addEventListener('click', async function () {
      var k = $('aiKey').value.trim() || data.settings.ai.geminiKey, msg = $('keyMsg');
      if (!k) return toast('Paste a key first.', 'err');
      msg.className = 'small'; msg.textContent = 'Checking…';
      try {
        var models = await AI.listModels(k), dl = clear($('modelList'));
        models.forEach(function (m) { dl.append(h('option', { value: m })); });
        msg.className = 'small ok'; msg.textContent = '✓ Key works. ' + models.length + ' Gemini models available (pick one in the Model box).';
      } catch (e) { msg.className = 'small err'; msg.textContent = '✗ ' + e.message; }
    });
    [['sUni', 'university'], ['sDeptPrefix', 'deptPrefix'], ['sDept', 'department']].forEach(function (m) {
      $(m[0]).addEventListener('input', function (e) { data.settings[m[1]] = e.target.value; changed(); });
    });
    $('wipe').addEventListener('click', async function () {
      if (!confirm('Erase ALL courses, questions and settings stored in this browser?\n\nExport a JSON backup first if you may need them.')) return;
      if (!confirm('Really erase everything? This cannot be undone.')) return;
      S.wipeLocal(); await S.unlinkFile(); location.reload();
    });
  }

  function start() {
    loadTemplate().then(function () { if (current() === 'backup') renderTplState(); });
    document.body.classList.remove('booting');
    if (keyInfo) $('lockNow').classList.remove('hidden');
    bind(); setStatus(); render('bank'); armAutoLock();
    if (navigator.storage && navigator.storage.persist) navigator.storage.persist().catch(function () {});
  }

  function boot() {
    if (window.top !== window.self) { document.body.textContent = 'This app cannot be embedded in another site.'; return; } // anti-clickjacking
    if (!window.crypto || !crypto.subtle) { document.body.textContent = 'Please open this app over https (e.g. GitHub Pages) or from a local file in Chrome / Edge / Firefox.'; return; }
    var r = S.readRaw();
    if (r.error) { document.body.classList.remove('booting'); data = S.cleanData({}); start(); return toast(r.error, 'err'); }
    if (r.empty) { data = S.sampleData(); start(); S.writeLocal(data, null); return toast('Welcome! A sample course and 2 questions were added from your paper format.'); }
    if (S.isEncrypted(r.obj)) return showLock();
    data = S.cleanData(r.obj); start();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();

;
