//버퍼 객체의 크기만 지정해서 만듬, 문자열을 씀
var output = 'Hello';
var buffer1 = Buffer.alloc(10);
var len = buffer1.write(output, 'utf8');
console.log('1st buffer string :', buffer1.toString());

//버퍼 객체를 문자열을 이용해 만듬
var buffer2 = Buffer.from('Hello2', 'utf8');
console.log('2nd buffer string :', buffer2.toString());

//타입확인
console.log('buffer type :', Buffer.isBuffer(buffer1));

//버퍼 객체에 있는 문자열 데이터를 문자열 변수로 만듬
var byteLen = Buffer.byteLength(output);
var str1 = buffer1.toString('utf8',0,byteLen);
var str2 = buffer2.toString('utf8');

//첫번쩨 버퍼 객체의 문자열을 두번째 버퍼 객체로 복사
buffer1.copy(buffer2,0,0,len);
console.log('2nd buffer string :', buffer2.toString('utf8'));

//두 버퍼를 붙임
var buffer3 = Buffer.concat([buffer1, buffer2]);
console.log('add two buffer :', buffer3.toString('utf8'));