'use babel';

import RequireJsSort from '../lib/require-js-sort';

// Use the command `window:run-package-specs` (cmd-alt-ctrl-p) to run specs.
//
// To run a specific `it` or `describe` block add an `f` to the front (e.g. `fit`
// or `fdescribe`). Remove the `f` to unfocus the block.

describe('RequireJsSort', () => {
    let workspaceElement, activationPromise;
    beforeEach(() => {
        activationPromise = atom.packages.activatePackage('require-js-sort');
    });

    describe('when the require-js-sort:sort event is triggered', () => {
        it('should keep already sorted import', () => {
            const inputText = "import a from 'apple.js';\nimport b from 'banana.js';";
            const expectedOutput = inputText;
            const output = RequireJsSort.sortText(inputText);
            expect(output).toBe(expectedOutput);
        });

        it('should sort multiple import', () => {
            const inputText = "import a from 'banana.js';\nimport b from 'apple.js';";
            const expectedOutput = "import b from 'apple.js';\nimport a from 'banana.js';";
            const output = RequireJsSort.sortText(inputText);
            expect(output).toBe(expectedOutput);
        });

        it('should keep already sorted mixed import and require', () => {
            const inputText = "const a = require('apple.js');\nimport b from 'banana.js';";
            const expectedOutput = inputText;
            const output = RequireJsSort.sortText(inputText);
            expect(output).toBe(expectedOutput);
        });

        it('should sort mixed import and require', () => {
            const inputText = "const a = require('banana.js');\nimport b from 'apple.js';";
            const expectedOutput = "import b from 'apple.js';\nconst a = require('banana.js');";
            const output = RequireJsSort.sortText(inputText);
            expect(output).toBe(expectedOutput);
        });
    });
});
