// require
var sys = require("sys")
var assert = require("assert");
var validate = require("./validation").validate;

exports.isValid = function isValid (object, validations) {
  assert.ok(object);
  assert.ok(validations);

  var errors = validate(object, validations);
  assert.deepEqual(errors, {});
};

exports.isNotValid = function isNotValid (object, validations) {
  assert.ok(object);
  assert.ok(validations);

  var errors = validate(object, validations);
  assert.notDeepEqual(errors, {});
};

// {metadata: {version: ["has to be present"]}} // metadata, version
// {version: ["has to be present"]} // version
// ["has to be present"]
function fn (errors, list) {
  var messages = list.reduce(function (errors, property) {
    return errors ? errors[property] : null;
  }, errors);
  return messages || [];
}

// assert.hasErrorOn(post, [], "title");
// assert.hasErrorOn(post, [], "title", "has to be present");
// assert.hasErrorOn(post, [], "metadata.version");
exports.hasErrorOn = function hasErrorOn (object, validations, property, message) {
  assert.ok(object);
  assert.ok(validations);
  assert.ok(property);

  sys.p([object, validations]) ////
  var errors = validate(object, validations);
  sys.p(errors) ////
  sys.puts("")
  errors = fn(errors, property.split("."));

  exports.errorsInclude(errors, property, message);
};

exports.hasNotErrorOn = function hasNotErrorOn (object, validations, property, message) {
  assert.ok(object);
  assert.ok(validations);
  assert.ok(property);

  var errors = validate(object, validations);
  errors = fn(errors, property.split("."));

  exports.errorsDoNotInclude(errors, property, message);
};

/*
This is a low-level API. It can be handy if you have a model and you are testing if the validate method works.
*/

// assert.errorsInclude(errors, "metadata.version", message);
exports.errorsInclude = function errorsInclude (errors, property, message) {
  assert.ok(errors);
  assert.ok(property);

  if (message && errors.indexOf(message) === -1) {
    var error = "errors " + sys.inspect(errors) + " for property " + property + " don't include message '" + message + "'";
    assert.fail(errors, message, error, exports.hasErrorOn);
  } else if (!message && errors.length === 0) {
    assert.deepEqual(errors, []);
  };
};

exports.errorsDoNotInclude = function errorsDoNotInclude (errors, property, message) {
  assert.ok(errors);
  assert.ok(property);

  if (message && errors.indexOf(message) !== -1) {
    var error = "errors " + sys.inspect(errors) + " for property " + property + " include message '" + message + "', but it shouldn't";
    assert.fail(errors, message, error, exports.exports.hasNotErrorOn);
  } else if (!message && errors.length !== 0) {
    assert.deepEqual(errors, []);
  };
};