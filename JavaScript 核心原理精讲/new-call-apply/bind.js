// Function.prototype.bind2 = function (context) {
//   var partialArgs = Array.prototype.slice.call(arguments, 1);

//   function bound() {
//     console.log(bound.prototype);
//     if (!(this instanceof bound.prototype)) {
//       if (arguments.length) {
//         partialArgs = partialArgs.concat(Array.prototype.slice.call(arguments));
//       }

//       return fn.apply(context, partialArgs);
//     }
//   }

//   return bound;
// };

Function.prototype.bind2 = function (context, ...args) {
  var self = this;
  var fbound = function () {
    self.apply(
      this instanceof self ? this : context,
      args.concat(Array.prototype.slice.call(arguments))
    );
  };

  if (this.prototype) {
    fbound.prototype = Object.create(this.prototype);
  }
  return fbound;
};

function fn(name) {
  console.log(this);
  this.name = name;
  this.age = 1;
}

const obj = { sex: 1 };

const fn2 = fn.bind2(obj);

fn2('haha');
console.log(obj);

// const obj2 = new fn2('haha');
// console.log(obj, obj2);
