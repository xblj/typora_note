Function.prototype.apply2 = function (context, arr) {
  var type = typeof context;
  if (context === null || context === undefined) {
    context = globalThis;
  } else if (type !== 'object' && type !== 'function') {
    context = new context.constructor(context);
  }

  Object.defineProperty(context, 'fn', {
    value: this,
  });
  let res;
  if (!arr) {
    res = eval('context.fn()');
  } else {
    // 可以没有第二个参数，有的话，必须是一个数组，或者类数组
    if (arr.length === undefined) {
      throw new TypeError('CreateListFromArrayLike called on non-object');
    }
    var args = [];
    for (var i = 0; i < arr.length; i++) {
      args.push('arr[' + i + ']');
    }
    res = eval('context.fn(' + args + ')');
  }

  return res;
};

function fn(arg1, arg2) {
  console.log(this.name);
  console.log(arg1, arg2);
}

fn.apply({ name: 1 }, [1, 2]);
console.log('====');
fn.apply2({ name: 1 }, [1, 2]);
