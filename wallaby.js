module.exports = function (wallaby) {
  return {
    files: [
      'server/index.js',
      'server/**/*.js'
    ],

    tests: [
      'server/tests/*.test.js'
    ],
    // for node.js tests you need to set env property as well
    // https://wallabyjs.com/docs/integration/node.html
    env: {
      type: "node",
      runner: "node"
    }
  };
};