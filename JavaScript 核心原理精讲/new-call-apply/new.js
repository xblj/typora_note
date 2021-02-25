function myNew() {
  const constructor = Array.prototype.shift.call(arguments);
  const isFunction = typeof constructor === 'function';
  if (!isFunction) {
    throw new Error(`${constructor} is not a constructor`);
  }

  const obj = Object.create(constructor.prototype);
  const res = constructor.apply(obj, arguments);

  if ((res && typeof res === 'object') || typeof res === 'function') {
    return res;
  }
  return obj;
}

function Parent(name) {
  this.name = name;
}

Parent.prototype.say = function () {
  console.log(this.name);
};

const p = new Parent('parent');
const p2 = myNew(Parent, 'parent');
console.assert(p.say === p2.say, '原型实现不对');
