var helper     = require("./test_helper"),
    Validation = require("validation").Validation;

context("Validation.prototype.constructor()", function () {
  this.assertion("it should throw an error if the first argument isn't provided", function (test) {
    assert.throws(function () {
      test.finished();
      new Validation();
    });
  });

  this.assertion("it should throw an error if the first argument isn't provided", function (test) {
    assert.throws(function () {
      test.finished();
      new Validation("email");
    });
  });

  this.assertion("it should not throw any error if it gets two not-null arguments", function (test) {
    assert.doesNotThrow(function () {
      test.finished();
      new Validation("email", "has to be present");
    });
  });

  this.assertion("it should take a property as the first argument", function (test) {
    var validation = new Validation("email", "has to be present");
    assert.equal(validation.property, "email");
    test.finished();
  });

  this.assertion("it should take a message as the second argument", function (test) {
    var validation = new Validation("email", "has to be present");
    assert.equal(validation.message, "has to be present");
    test.finished();
  });
});

context("Validation.prototype.generate()", function () {
  this.setup(function () {
    this.invalidObject = {name: "Jakub"};
    this.validObject   = {name: "Jakub", email: "jakub@example.com"};
    this.validation    = new Validation("email", "has to be present");
  });

  this.assertion("it should pass object and value into the validation function", function (test) {
    var lambda = this.validation.generate(function (object, value) {
      assert.equal(object.name, "Jakub");
      assert.equal(value, "jakub@example.com");
      test.finished();
    });

    lambda(this.validObject);
  });
});
