var rule = require("../lib/catch-call-function");
var RuleTester = require("eslint").RuleTester;

var ruleTester = new RuleTester();
ruleTester.run("catch-call-function", rule, {
  valid: [{
    code: "try{}catch(e){x()}",
    options: [['x']]
  }],
  invalid: [
    {
      code: "try{}catch(e){z()}",
      options: [['x']],
      errors: [
        {
          message: 'Must call function: x inside catch',
        }
      ]
    }
  ]
});



ruleTester.run("catch-call-function", rule, {
  valid: [{
    code: "try{}catch(e){ throw e; }",
    options: [['x','throw']]
  }],
  invalid: [
    {
      code: "try{}catch(e){z()}",
      options: [['x','throw']],
      errors: [
        {
          message: 'Must call function: x or rethrow exception inside catch',
        }
      ]
    }
  ]
});


ruleTester.run("catch-call-function", rule, {
  valid: [{
    code: "try{}catch(e){ throw e; }",
    options: [['throw']]
  }],
  invalid: [
    {
      code: "try{}catch(e){z()}",
      options: [['throw']],
      errors: [
        {
          message: 'Must rethrow exception inside catch',
        }
      ]
    }
  ]
});

