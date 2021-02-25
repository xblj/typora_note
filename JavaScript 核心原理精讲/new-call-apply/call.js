Function.prototype.call2 = function () {
  var context = Array.prototype.shift.call(arguments);
  if (context === null || context === undefined) {
    // null和undefined就默认指向全局
    context = globalThis;
  } else if (typeof context !== 'object' && typeof context !== 'function') {
    // 如果基础数据类型，就将其包装成对象
    context = new context.constructor(context);
  }
  var fn = this;

  // 由于是临时变量，使其不可被遍历
  Object.defineProperty(context, 'fn', {
    value: fn,
  });

  delete context.fn

  var args = [];
  for (var i = 1, len = arguments.length; i < len; i++) {
    args.push('arguments[' + i + ']');
  }

  const res = eval('context.fn(' + args + ')');
  return res;
};

function fn() {
  console.log(this.name);
}

fn.call(1);
fn.call2(1);

fn.call(null);
fn.call2(null);

fn.call({ name: 1 });
fn.call2({ name: 1 });
