// require
var sys = require("sys")
var assert = require("assert");
var validate = require("./validation").validate;

exports.isValid = function isValid (validations, object, validationFunction) {
  assert.ok(object);
  assert.ok(validations);

  var validationFunction = validationFunction || validate;

  var errors = validationFunction(validations, object);
  assert.deepEqual(errors, {});
};

exports.isNotValid = function isNotValid (validations, object, validationFunction) {
  assert.ok(object);
  assert.ok(validations);

  var validationFunction = validationFunction || validate;

  var errors = validationFunction(validations, object);
  assert.notDeepEqual(errors, {});
};

// {metadata: {version: ["has to be present"]}} // metadata, version
// {version: ["has to be present"]} // version
// ["has to be present"]
function getPropertyRecursively (errors, list) {
  var messages = list.reduce(function (errors, property) {
    return errors ? errors[property] : null;
  }, errors);
  return messages || [];
}

// assert.hasErrorOn(post, [], "title");
// assert.hasErrorOn(post, [], "title", "has to be present");
// assert.hasErrorOn(post, [], "metadata.version");
exports.hasErrorOn = function hasErrorOn (validations, object, property, message, validationFunction) {
  assert.ok(object);
  assert.ok(validations);
  assert.ok(property);

  var validationFunction = validationFunction || validate;
  var errors = validationFunction(validations, object);

  exports.errorsInclude(errors, property, message);

  return errors;
};

exports.hasNotErrorOn = function hasNotErrorOn (validations, object, property, message, validationFunction) {
  assert.ok(object);
  assert.ok(validations);
  assert.ok(property);

  var validationFunction = validationFunction || validate;
  var errors = validationFunction(validations, object);

  exports.errorsDoNotInclude(errors, property, message);

  return errors;
};

/*
This is a low-level API. It can be handy if you have a model and you are testing if the validate method works.
*/

// Deprecated: this will be private soon since we can specify the validation function

// assert.errorsInclude(errors, "metadata.version", message);
exports.errorsInclude = function errorsInclude (errors, property, message) {
  assert.ok(errors);
  assert.ok(property);
  var messages = getPropertyRecursively(errors, property.split("."));

  if (message && messages.indexOf(message) === -1) {
    var error = "errors " + sys.inspect(messages) + " for property " + property + " don't include message '" + message + "'.\nThe errors object: " + sys.inspect(errors);
    assert.fail(messages, message, error, exports.hasErrorOn);
  } else if (!message && messages.length === 0) {
    assert.deepEqual(messages, []);
  };
};

exports.errorsDoNotInclude = function errorsDoNotInclude (errors, property, message) {
  assert.ok(errors);
  assert.ok(property);

  var messages = getPropertyRecursively(errors, property.split("."));

  if (message && messages.indexOf(message) !== -1) {
    var error = "errors " + sys.inspect(messages) + " for property " + property + " include message '" + message + "', but it shouldn't";
    assert.fail(messages, message, error, exports.hasNotErrorOn);
  } else if (!message && messages.length !== 0) {
    assert.deepEqual(messages, []);
  };
};
