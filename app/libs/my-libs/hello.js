"use strict"

function User (name) {

    this.name = name;

  this.sayHi = function() {
    console.log(this.name);
  }

}