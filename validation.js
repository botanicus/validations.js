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

  function validationFunction (object) {
    var validation = validationFunction.validation;
    var list = validation.property.split(".");
    if (!validation._validate(object, object, list, condition)) {
      var list = validation.property.split(".");
      var errors = {};
      return validation._buildErrors(errors, list, object, errors);
    } else {
      return {};
    };
  };

  // let's make the instance accessible from the outside code
  validationFunction.validation = this;
  return validationFunction;
};

// TODO: rewrite this thing using list.reduce as I'm using in the matchers in the fn function

// {client: {name: "101Tasks.app"}}, ["client", "name"]
// {name: "101Tasks.app"},           ["name"]
Validation.prototype._validate = function _validate (object, value, list, condition) {
  var self = this;

  if (list.length > 0) {
    // do recursion
    var property = list.shift();
    // don't fail if object is null and return another null,
    // so if we have validations for "client.name", but the object
    // doesn't provide nor even client, it won't fail
    var value = value ? value[property] : null
    return this._validate(object, value, list, condition);
  } else {
    // final processing
    return condition.call(self, object, value);
  };
};

// NOTE: list.reduce won't simplify this code since we need to return both object and errors from each iteraction.

// {client: {name: "101Tasks.app"}}, {}, ["client", "name"]
// {name: "101Tasks.app"},           {}, ["name"]
Validation.prototype._buildErrors = function _buildErrors (errors, list, objectForStep, errorsForStep) {
  var self = this;
  var property = list.shift();

  if (list.length > 0) {
    // do recursion
    // don't fail if object is null and return another null,
    // so if we have validations for "client.name", but the object
    // doesn't provide nor even client, it won't fail
    var objectForStep = objectForStep ? objectForStep[property] : null
    errorsForStep[property] = {};

    // In each iteration errorsForStep is a different object (unlike
    // the errors object), so we can build the required structure:
    // begin: {}, then: {metadata: {}}, recursion: errorsForStep[metadata] which is {}
    return this._buildErrors(errors, list, objectForStep, errorsForStep[property]);
  } else {
    // final processing
    errorsForStep[property] || (errorsForStep[property] = []);
    errorsForStep[property].push(self.message);
    return errors;
  };
};

exports.Validation = Validation;

/*
Validate given object with given validations.

@example
	validate({email: null}, [validations.presence("email"), validations.email("email")]);
*/
exports.validate = function validate (object, validations) {
  assert.ok(object);
  assert.ok(validations);

  return validations.reduce(function (errors, validation) {
    var errorsForStep = validation(object);
    return deepMerge(errors, errorsForStep);
  }, {});
};

// merging of nested arrays doesn't work, but we don't need it here
function deepMerge (object1, object2) {
  assert.ok(object1);
  assert.ok(object2);

  var result = new Object();

  function _merge (object, another) {
    for (property in object) {
      var value = object[property];
      if (value !== null && value !== undefined) {
        if (value.__proto__.constructor == Array) {
          // copy the first array
          result[property] = value.slice(0);

          // copy the second object if it exists and if it's an array
          if (another[property] && another[property].__proto__.constructor == Array) {
            another[property].forEach(function (item) {
              result[property].push(item);
            });
          };
        } else if (typeof value == "object") {
          result[property] = deepMerge(value, another[property] || {});
        } else {
          result[property] = value;
        };
      };
    }
  };

  _merge(object1, object2);
  _merge(object2, object1);

  return result;
};
