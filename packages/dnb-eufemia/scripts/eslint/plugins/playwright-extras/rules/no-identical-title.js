/**
 * ESLint rule: no-identical-title
 *
 * Disallows duplicate test titles within the same describe/scope block.
 * Works with both `test('title')` and `test.describe('title')` patterns
 * used in Playwright.
 */

function getTitle(node) {
  const arg = node.arguments && node.arguments[0]
  if (!arg) {
    return null
  }
  if (arg.type === 'Literal' && typeof arg.value === 'string') {
    return arg.value
  }
  if (arg.type === 'TemplateLiteral' && arg.quasis.length === 1) {
    return arg.quasis[0].value.cooked
  }
  return null
}

function isTestCall(node) {
  return (
    node.type === 'CallExpression' &&
    node.callee.type === 'Identifier' &&
    node.callee.name === 'test'
  )
}

function isDescribeCall(node) {
  return (
    node.type === 'CallExpression' &&
    node.callee.type === 'MemberExpression' &&
    node.callee.object.name === 'test' &&
    node.callee.property.name === 'describe'
  )
}

module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description:
        'Disallow duplicate test or describe titles in the same scope',
    },
    messages: {
      duplicateTest:
        'Duplicate test title "{{ title }}" in the same scope.',
      duplicateDescribe:
        'Duplicate describe title "{{ title }}" in the same scope.',
    },
    schema: [],
  },
  create(context) {
    const scopeStack = [{ tests: new Map(), describes: new Map() }]

    function currentScope() {
      return scopeStack[scopeStack.length - 1]
    }

    function handleTest(node) {
      const title = getTitle(node)
      if (title === null) {
        return // stop here
      }

      const scope = currentScope()
      if (scope.tests.has(title)) {
        context.report({
          node: node.arguments[0],
          messageId: 'duplicateTest',
          data: { title },
        })
      } else {
        scope.tests.set(title, node)
      }
    }

    function handleDescribeEnter(node) {
      const title = getTitle(node)
      if (title !== null) {
        const scope = currentScope()
        if (scope.describes.has(title)) {
          context.report({
            node: node.arguments[0],
            messageId: 'duplicateDescribe',
            data: { title },
          })
        } else {
          scope.describes.set(title, node)
        }
      }

      scopeStack.push({ tests: new Map(), describes: new Map() })
    }

    function handleDescribeExit() {
      scopeStack.pop()
    }

    return {
      CallExpression(node) {
        if (isTestCall(node)) {
          handleTest(node)
        } else if (isDescribeCall(node)) {
          handleDescribeEnter(node)
        }
      },
      'CallExpression:exit'(node) {
        if (isDescribeCall(node)) {
          handleDescribeExit()
        }
      },
    }
  },
}
