'use strict';

var write = require('fs').writeFileSync,
  read = require('fs').readFileSync,
  resolve = require('path').resolve,
  watch = require('fs').watchFile,
  assert = require('assert');

module.exports = filesync;

/**
 * example
 *   {
 *     list: [{
 *       from: '',
 *       dest: '',
 *       flags: [{
 *         start: '<!-- start -->',
 *         end: '<!-- end -->'
 *       }]
 *     }]
 *   }
 */
function filesync(options) {
  assert(typeof options === 'object', 'options required');
  assert(Array.isArray(options.list), 'options.list must be array');

  var list = options.list;

  for (var i = 0; i < list.length; i++) {
    var task = list[i],
      from = resolve(task.from),
      dest = resolve(task.dest),
      flags = task.flags;

    var worker = factory(from, dest, flags);

    watch(from, {
      persistent: true
    }, worker).on('error', function(e) {
      console.error(e);
    });
  }
}

function factory(from, dest, flags) {
  return function() {
    sync(from, dest, flags);
  };
}

function sync(from, dest, flags) {
  var source = read(from, 'utf-8'),
    result = read(dest, 'utf-8');

  var start, end;

  for (var i = 0; i < flags.length; i++) {
    var flag = flags[i];
    // read from source
    start = getStart(source, flag.start);
    end = source.indexOf(flag.end);

    if (start < 0 || end <= 0 || end <= start) {
      console.warn('start: %s, end: %s - not found', flag.start, flag.end);
      continue;
    }

    var data = source.slice(start, end);

    start = getStart(result, flag.start);
    end = result.indexOf(flag.end);

    result = result.slice(0, start) + data + result.slice(end);

    write(dest, result, {
      encoding: 'utf-8'
    });
  }
}

function getStart(text, flag) {
  return text.indexOf(flag) + flag.length;
}
