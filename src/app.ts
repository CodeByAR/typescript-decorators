//First class decorator
function Logger(constructor: Function) {
  console.log("Logging...");
  console.log(constructor);
}

//Decorator Factory
function LoggerFactory(logStr: string) {
  console.log("Logger Factory!!");
  return function (constructor: Function) {
    console.log(logStr);
    console.log(constructor);
  };
}

function WithTemplate(template: string, hookId: string) {
  console.log("Template Factory!!");
  return function (constructor: any) {
    console.log("Rendering Template...");
    const hookEl = document.getElementById(hookId);
    const p = new constructor();
    if (hookEl) {
      hookEl.innerHTML = template;
      hookEl.querySelector("h1")!.textContent = p.name;
    }
  };
}

//Decorators executes bottom up - WithTemplate > LoggerFactory
//However Factories are called in conventional JS execution order

//Logger
@LoggerFactory("Logging - Person")
@WithTemplate(`<h1>My Person Object</h1>`, "app")
class Person {
  name = "Ank";
  constructor() {
    console.log("Creating Person object...");
  }
}

const pObj = new Person();
console.log(pObj);

//Property Decorator
//it executes when class definition is created
function Log(target: any, propertyName: string | Symbol) {
  console.log("Property Decorator!");
  console.log(target, propertyName);
}

class Product {
  @Log title: string;
  private _price: number;
  constructor(t: string, p: number) {
    this.title = t;
    this._price = p;
  }

  getPriceWithTax(tax: number) {
    return this._price * (1 + tax);
  }

  set Price(val: number) {
    if (val > 0) {
      this._price = val;
    } else {
      throw new Error("Invalid Price - Price should be positive.");
    }
  }

  get Price() {
    return this._price;
  }
}
