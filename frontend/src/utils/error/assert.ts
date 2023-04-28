export default function assert (condition:boolean, message?:string): asserts condition {
  if(!condition){
    throw new Error("Assertion statement failed.\n" +
     ( message ? (`${message}\n`) : ""));
  }
}

export function assertEquals(a:any, b:any, message?:string){
  if(a === b){
    throw new Error(`Assertion for ${a} === ${b}\n` +
      ( message ? (`${message}\n`) : ""));
  }
}

export function assertDefined<T>(x:T, name?:string, message?:string): asserts x is NonNullable<T>{
  if(x === undefined){
    throw new Error("Defined assertion failed.\n" +
      ( name ? (`${name}`) + " is not defined\n" : "") +
      ( message ? (`${message}\n`) : "")
    );
  }
}

export function assertUndefined(x:any, name?:string, message?:string): asserts x is undefined|null{
  if(x !== undefined){
    throw new Error("Undefined assertion failed\n" +
      ( name ? (`${name}`) + " is defined\n" : "") +
      ( message ? (`${message}\n`) : "")
    );
  }
}

export const _ = undefined;