const esquery = require('esquery');

module.exports = {
  meta: {
    docs: {
      type: "problem",
      description: 'Enforces call specified function inside catch',
    }
  },

  schema: [{
    "type": "array",
    "items": {
      "type": "string"
    }
  }],

  create(context) {
    return {
      CatchClause(node) {
        let funcs = context.options[0];
        let newFuncs = funcs.filter(f => f !== 'throw');
        const isThrow = newFuncs.length !== funcs.length;

        if (isThrow) {
          const nodes = (esquery.query(node, `ThrowStatement`));
          if (nodes.length !== 0) {
            return;

          }
        }

        const nodes = (esquery.query(node, `[callee.name=/^(${newFuncs.join('|')})$/]`));
        if (nodes.length !== 0) {
          return;

        }

        let message;

        if (newFuncs.length && isThrow) {
          message = `Must call function: ${newFuncs.join(',')} or rethrow exception inside catch`;
        } else if (isThrow) {
          message = "Must rethrow exception inside catch";
        } else {
          message = `Must call function: ${newFuncs.join(',')} inside catch`;
        }

        context.report({
          node,
          message,
        });
      }
    };
  }
};
