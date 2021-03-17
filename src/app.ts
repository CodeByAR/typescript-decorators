//First class decorator
function Logger(constructor: Function) {
  console.log("Logging...");
  console.log(constructor);
}

//Decorator Factory
function LoggerFactory(logStr: string) {
  return function (constructor: Function) {
    console.log(logStr);
    console.log(constructor);
  };
}

function WithTemplate(template: string, hookId: string) {
  return function (constructor: any) {
    const hookEl = document.getElementById(hookId);
    const p = new constructor();
    if (hookEl) {
      hookEl.innerHTML = template;
      hookEl.querySelector("h1")!.textContent = p.name;
    }
  };
}

//Logger
//@LoggerFactory("Logging - Person")
@WithTemplate(`<h1>My Person Object</h1>`, "app")
class Person {
  name = "Ank";
  constructor() {
    console.log("Creating Person object...");
  }
}

const pObj = new Person();
console.log(pObj);
