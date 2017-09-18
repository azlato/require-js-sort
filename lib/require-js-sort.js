'use babel';

import { CompositeDisposable } from 'atom';

const QUOTATION_CHAR = "\"\'\`";
const REQUIRE_TEMPLATE = `=\\s+require\\([${QUOTATION_CHAR}](.+)[${QUOTATION_CHAR}]\\)`;
const IMPORT_TEMPLATE = `\\s+from\\s+[${QUOTATION_CHAR}](.+)[${QUOTATION_CHAR}]`;
const MATCH_REGEXP = new RegExp(`^.+(${REQUIRE_TEMPLATE}|${IMPORT_TEMPLATE}).+`);
const LINE_SPLITTER = '\n';

export default {

    subscriptions: null,

    activate(state) {
        // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
        this.subscriptions = new CompositeDisposable();

        this.subscriptions.add(atom.commands.add('atom-workspace', {
            'require-js-sort:sort': () => this.sortSelection()
        }));
    },

    deactivate() {
        this.subscriptions.dispose();
    },

    sortSelection() {
        const editor = atom.workspace.getActiveTextEditor();
        if (!editor) {
            throw new Error("Active editor not found.");
        }

        const selection = editor.getLastSelection();
        selection.expandOverLine();

        const selectedText = editor.getSelectedText();
        const sortedText = this.sortText(selectedText);
        editor.insertText(sortedText);
    },

    sortText(text) {
        let lines = text.split(LINE_SPLITTER);
        lines = lines.map((line, index) => {
            const matched = line.match(MATCH_REGEXP);
            if (!matched) {
                return;
            }

            const fullLine = matched[0];
            const sortingPart = matched.pop() || matched.pop();
            return {
                fullLine,
                sortingPart,
            };
        }).sort((a, b) => {
            if (!a || !b) {
                return 0;
            }

            const first = a.sortingPart.toLowerCase();
            const second = b.sortingPart.toLowerCase();
            if (first < second) {
                return -1;
            } else if (first > second) {
                return 1;
            }

            return 0;
        }).map(lineData => lineData && lineData.fullLine);

        return lines.join(LINE_SPLITTER);
    }
};
