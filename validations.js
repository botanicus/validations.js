var Validation = require("validation").Validation;

/*
Check if object has given property and if it isn't null, an empty string nor an empty array.

@example
  validations.presence("email");
  validations.presence("client.name");
*/
exports.presence = function presence (property) {
  var validation = new Validation(property, "has to be present");

  return validation.generate(function (object, value) {
    return value === null || value === undefined;
  });
};

/*
Check if object has given property match given format.

@example
  validations.match("client.version", /^\d+(\.\d+)+$/);
*/
exports.match = function match (property, regexp) {
  var validation = new Validation(property, "has to match " + regexp);

  return validation.generate(function (object, value) {
    return value.match(regexp);
  });
};

/*
Check if value is a date in proper format.

@example
  validations.date("titleUpdatedAt");
*/
exports.date = function date (property) {
  var validation = new Validation(property, "has to be a date");

  return validation.generate(function (object, value) {
    return null; // TODO
  });
};

/*
Check if value is an email.

E-mail validation is really hard thing to do right
(if you don't believe me, read RFC 822) and a very
common mistake is that validators are too strict.
In order to avoid it, we only check if there is
something, the at sign and then again something.

@example
  validations.email("email");
*/
exports.email = function email (property) {
  var validation = new Validation(property, "has to be a valid email");

  return validation.generate(function (object, value) {
    return value && value.match(/.+@.+/);
  });
};
