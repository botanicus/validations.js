var assert = require("assert");

/*
Validation class.

@example
  var validation = new Validation("client.name", "has to be present");
*/

function Validation (property, message) {
  assert.ok(property);
  assert.ok(message);

  this.property = property;
  this.message  = message;
};

/*
Generate the actual validation function.

@example
  var validationFunction = validation.generate(function (object, value) {
    return value;
  });
*/
Validation.prototype.generate = function generate (condition) {
  assert.ok(condition);

  var list = this.property.split(".");

  function getValue (object, list) {
    if (list.length !== 0) {
      var property = list.shift();
      var object = object[property];
      var result = getValue(object, list);
      return result;
    } else {
      return object;
    };
  };

  var validation = this;

  return function (object) {
    var value = getValue(object, list); // TODO: refactor using reduce
    if (!condition.call(validation, object, value)) {
      var errors  = new Object();
      var message = validation.property + " " + validation.message;
      errors[validation.property] || (errors[validation.property] = []);
      errors[validation.property].push(message);
      return errors;
    };
  };
};

exports.Validation = Validation;
