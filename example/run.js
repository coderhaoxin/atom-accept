'use strict';

var sync = require('..');

sync({
  list: [{
    from: './a.txt',
    dest: './result.txt',
    flags: [{
      start: '<start-a-1>',
      end: '<end-a-1>'
    }, {
      start: '<start-a-2>',
      end: '<end-a-2>'
    }]
  }, {
    from: './b.txt',
    dest: './result.txt',
    flags: [{
      start: '<start-b-1>',
      end: '<end-b-1>'
    }, {
      start: '<start-b-2>',
      end: '<end-b-2>'
    }]
  }]
});
