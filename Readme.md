### partial-file-sync
sync text files partially

### example

```js
var sync = require('partial-file-sync');

sync({
  list: [{
    from: './a.txt',
    dest: './result.txt',
    flags: [{
      start: '<start>',
      end: '<end>'
    }]
  }]
});
```

### License
MIT
