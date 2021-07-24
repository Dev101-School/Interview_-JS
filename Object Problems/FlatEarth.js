/*
Title: 
Flat Earth

Meta-Tags:
Javascript, JS, interview, questions, interview questions, arrays,objects,practice, hard

Description:
You are given an object. Write a function to flatten it, where the term flatten is defined as to get all the keys of nested objects and bring them to same level.

Constraints:
Nil

Sample Input:
{
  newObj: {
    obj2: {
      obj5: {
        one: 1,
      },
    },
  },
  obj3: {
    obj4: { two: 2 },
  },
};

Sample Output:
{ 'newObj.obj2.obj5.one': 1, 'obj3.obj4.two': 2 }

Test Cases:
    Input#1:
    {
    name: {
        first: "robin",
        last: "negi",
    },
    address: {
        city: {
        name: "Gwalior",
        },
        landmark: "Badri Marg",
        street: "22",
    },
  };

*/

const input = {
  newObj: {
    obj2: {
      obj5: {
        one: 1,
      },
    },
  },
  obj3: {
    obj4: { two: 2 },
  },
};

let test1={
  name: {
      first: "robin",
      last: "negi",
  },
  address: {
      city: {
      name: "Gwalior",
      },
      landmark: "Badri Marg",
      street: "22",
  },
};

let test2={
  flavor: "vanilla",
  topping: {
      drizzle: "chocolava",
      sprinkle: "choco-chips",
  },
  cone: {
      type: "waffle",
      crust: {
      color: "dark",
      texture: "soft",
      },
  },
};


// Solutions
let obj={};
function objFun(input,str) {
  for (let props in input) {
    if (typeof input[props] === "object" && input[props]!=null) {
      str!=='' ? objFun(input[props],str+'.'+props):objFun(input[props],props+'')
    } else {
      obj[str!==''?str+'.'+props: props+'']=input[props];
    }
  }
} 
objFun(test2,'')
console.log(obj);