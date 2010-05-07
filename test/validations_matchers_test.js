var helper      = require("./test_helper"),
    validations = require("validations"),
    matchers    = require("validations_matchers");

// TODO: test not just if something is thrown, but also if it's an assertion error
//       test messages (-> use try/catch rather than assert.throws() )

// include matchers
for (key in matchers) {
  assert[key] = matchers[key];
};

/* assert.isValid(object, validations) */
context("assert.isValid(object, validations)", function () {
  this.assertion("it should throw an error if object isn't provided", function (test) {
    assert.throws(function () {
      test.finished();
      assert.isValid();
    });
  });

  this.assertion("it should throw an error if validations aren't provided", function (test) {
    assert.throws(function () {
      test.finished();
      assert.isValid({});
    });
  });

  this.assertion("it should work for an empty object and empty validations", function (test) {
    assert.doesNotThrow(function () {
      test.finished();
      assert.isValid({}, []);
    });
  });

  this.assertion("it should not throw anything if the object is valid", function (test) {
    assert.doesNotThrow(function () {
      test.finished();
      assert.isValid({email: "joe@doe.com"}, [validations.presence("email")]);
    });
  });

  this.assertion("it should fail if validations fail", function (test) {
    assert.throws(function () {
      test.finished();
      assert.isValid({}, [validations.presence("email")]);
    });
  });
});

/* assert.isNotValid(object, validations) */
context("assert.isNotValid(object, validations)", function () {
  this.assertion("it should throw an error if object isn't provided", function (test) {
    assert.throws(function () {
      test.finished();
      assert.isNotValid();
    });
  });

  this.assertion("it should throw an error if validations aren't provided", function (test) {
    assert.throws(function () {
      test.finished();
      assert.isNotValid({});
    });
  });

  this.assertion("it should throw an assertion error if the object is valid", function (test) {
    assert.throws(function () {
      test.finished();
      assert.isNotValid({email: "joe@doe.com"}, [validations.presence("email")]);
    });
  });

  this.assertion("it should not throw anything if the validations fail", function (test) {
    assert.doesNotThrow(function () {
      test.finished();
      assert.isNotValid({}, [validations.presence("email")]);
    });
  });
});

/* assert.hasErrorOn(object, validations, property) */
context("assert.hasErrorOn(object, validations, property)", function () {
  this.assertion("it should throw an error if object isn't provided", function (test) {
    assert.throws(function () {
      test.finished();
      assert.hasErrorOn();
    });
  });

  this.assertion("it should throw an error if validations aren't provided", function (test) {
    assert.throws(function () {
      test.finished();
      assert.hasErrorOn({});
    });
  });

  this.assertion("it should throw an error if property isn't provided", function (test) {
    assert.throws(function () {
      test.finished();
      assert.hasErrorOn({}, []);
    });
  });

  this.assertion("it should not throw any error if given error exist", function (test) {
    assert.doesNotThrow(function () {
      test.finished();
      var functions = [validations.presence("email")];
      assert.hasErrorOn({}, functions, "email");
    });
  });

  this.assertion("it should throw an assertion error if given error doesn't exist", function (test) {
    assert.doesNotThrow(function () {
      test.finished();
      var functions = [validations.presence("email")];
      assert.hasErrorOn({email: "joe@doe.com"}, functions, "email");
    });
  });

  this.assertion("it should work recursively", function (test) {
    assert.doesNotThrow(function () {
      test.finished();
      var object = {metadata: {version: "0.0.1"}}
      var functions = [validations.presence("metadata.version")];
      assert.hasErrorOn(object, functions, "metadata.version");
    });
  });

  this.assertion("it should work recursively even if the nested properties don't exist", function (test) {
    assert.throws(function () {
      test.finished();
      assert.hasNotErrorOn({}, [validations.presence("metadata.version")]);
    });
  });
});

/* assert.hasErrorOn(object, validations, property, message) */
context("assert.hasErrorOn(object, validations, property, message)", function () {
  this.assertion("it should throw an assertion error if errors for given property don't include given message", function (test) {
    assert.throws(function () {
      test.finished();
      var functions = [validations.presence("metadata.version")];
      assert.hasErrorOn({}, functions, "metadata.version", "a bad message");
    });
  });

  this.assertion("it should not throw any assertion error if errors for given property include given message", function (test) {
    assert.doesNotThrow(function () {
      test.finished();
      var functions = [validations.presence("metadata.version")];
      assert.hasErrorOn({}, functions, "metadata.version", "has to be present");
    });
  });
});

/* assert.hasNotErrorOn(object, validations, property) */
context("assert.hasNotErrorOn(object, validations, property)", function () {
  this.assertion("it should throw an error if object isn't provided", function (test) {
    assert.throws(function () {
      test.finished();
      assert.hasNotErrorOn();
    });
  });

  this.assertion("it should throw an error if validations aren't provided", function (test) {
    assert.throws(function () {
      test.finished();
      assert.hasNotErrorOn({});
    });
  });

  this.assertion("it should throw an error if property isn't provided", function (test) {
    assert.throws(function () {
      test.finished();
      assert.hasNotErrorOn({}, []);
    });
  });

  this.assertion("it should throw an assertion error if given error doesn't exist", function (test) {
    assert.throws(function () {
      test.finished();
      var functions = [validations.presence("email")];
      assert.hasNotErrorOn({}, functions, "email");
    });
  });

  this.assertion("it should not throw any assertion error if given error exists", function (test) {
    assert.doesNotThrow(function () {
      test.finished();
      var functions = [validations.presence("email")];
      assert.hasNotErrorOn({email: "joe@doe.com"}, functions, "email");
    });
  });

  this.assertion("it should work recursively", function (test) {
    assert.throws(function () {
      test.finished();
      var object = {metadata: {version: "0.0.1"}}
      var functions = [validations.presence("metadata.version")];
      assert.hasNotErrorOn(object, functions, "metadata.version");
    });
  });

  this.assertion("it should work recursively even if the nested properties don't exist", function (test) {
    assert.doesNotThrow(function () {
      test.finished();
      assert.hasNotErrorOn({}, [validations.presence("metadata.version")]);
    });
  });
});

/* assert.hasNotErrorOn(object, validations, property, message) */
context("assert.hasNotErrorOn(object, validations, property, message)", function () {
  this.assertion("it should not throw any assertion error if errors for given property include given message", function (test) {
    assert.doesNotThrow(function () {
      test.finished();
      var object = {metadata: {version: "0.0.1"}}
      var functions = [validations.presence("metadata.version")];
      assert.hasNotErrorOn(object, functions, "metadata.version", "a bad message");
    });
  });

  this.assertion("it should throw an assertion error if errors for given property don't include given message", function (test) {
    assert.throws(function () {
      test.finished();
      var object = {metadata: {version: "0.0.1"}}
      var functions = [validations.presence("metadata.version")];
      assert.hasNotErrorOn(object, functions, "metadata.version", "has to be present");
    });
  });
});

/* assert.errorsInclude(errors, property) */
context("assert.errorsInclude(errors, property)", function () {
  this.assertion("it should throw an assertion error if the errors aren't provided", function (test) {
    assert.throws(function () {
      test.finished();
      assert.errorsInclude();
    });
  });

  this.assertion("it should throw an error if property isn't provided", function (test) {
    assert.throws(function () {
      test.finished();
      assert.errorsInclude({});
    });
  });

  this.assertion("it should throw an assertion error if given error doesn't exist", function (test) {
    assert.throws(function () {
      test.finished();
      var functions = [validations.presence("email")];
      assert.errorsInclude({}, functions, "email");
    });
  });

  this.assertion("it should not throw any assertion error if given error exists", function (test) {
    assert.doesNotThrow(function () {
      test.finished();
      var functions = [validations.presence("email")];
      assert.errorsInclude({email: "joe@doe.com"}, functions, "email");
    });
  });
});

/* assert.errorsInclude(errors, property, message) */
context("assert.errorsInclude(errors, property, message)", function () {
  this.assertion("it should throw an error if errors don't include given message", function (test) {
    assert.throws(function () {
      test.finished();
      assert.errorsInclude({}, "email", "bad message");
    });
  });

  this.assertion("it should not throw any error if errors include given message", function (test) {
    assert.doesNotThrow(function () {
      test.finished();
      assert.errorsInclude({}, "email", "has to be present");
    });
  });

  this.assertion("it should work recursively", function (test) {
    assert.throws(function () {
      test.finished();
      var object = {metadata: {version: "0.0.1"}}
      var functions = [validations.presence("metadata.version")];
      assert.errorsInclude(object, "metadata.version", "has to be present");
    });
  });

  this.assertion("it should work recursively even if the nested properties don't exist", function (test) {
    assert.doesNotThrow(function () {
      test.finished();
      assert.errorsInclude({}, "metadata.version", "has to be present");
    });
  });
});

/* assert.errorsDoNotInclude(errors, property) */
context("assert.errorsDoNotInclude(errors, property)", function () {
  this.assertion("it should throw an assertion error if the errors aren't provided", function (test) {
    assert.throws(function () {
      test.finished();
      assert.errorsDoNotInclude();
    });
  });

  this.assertion("it should throw an error if property isn't provided", function (test) {
    assert.throws(function () {
      test.finished();
      assert.errorsDoNotInclude({});
    });
  });

  this.assertion("it should not throw any assertion error if given error exists", function (test) {
    assert.doesNotThrow(function () {
      test.finished();
      var functions = [validations.presence("email")];
      assert.errorsDoNotInclude({}, functions, "email");
    });
  });

  this.assertion("it should throw an assertion error if given error doesn't exist", function (test) {
    assert.throws(function () {
      test.finished();
      var functions = [validations.presence("email")];
      assert.errorsDoNotInclude({email: "joe@doe.com"}, functions, "email");
    });
  });
});

/* assert.errorsDoNotInclude(errors, property, message) */
context("assert.errorsDoNotInclude(errors, property, message)", function () {
  this.assertion("it should not throw any error if errors include given message", function (test) {
    assert.doesNotThrow(function () {
      test.finished();
      assert.errorsDoNotInclude({}, "email", "bad message");
    });
  });

  this.assertion("it should throw an error if errors don't include given message", function (test) {
    assert.throws(function () {
      test.finished();
      assert.errorsDoNotInclude({}, "email", "has to be present");
    });
  });

  this.assertion("it should work recursively", function (test) {
    assert.doesNotThrow(function () {
      test.finished();
      var object = {metadata: {version: "0.0.1"}}
      var functions = [validations.presence("metadata.version")];
      assert.errorsDoNotInclude(object, "metadata.version", "has to be present");
    });
  });

  this.assertion("it should work recursively even if the nested properties don't exist", function (test) {
    assert.throws(function () {
      test.finished();
      assert.errorsDoNotInclude({}, "metadata.version", "has to be present");
    });
  });
});
