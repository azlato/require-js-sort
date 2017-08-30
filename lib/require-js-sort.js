'use babel';

import RequireJsSortView from './require-js-sort-view';
import { CompositeDisposable } from 'atom';


// const GadgetAukro = require("app/ui/page-hp/components/main-content/gadget-layout/gadget-aukro/gadget-aukro.jsx");
// const GadgetEmail = require("app/ui/page-hp/components/main-content/gadget-layout/gadget-email/gadget-email.jsx");

const commonSplitters = [
    'require("',
    'from "',
];
const LINE_SPLITTER = '\n';

export default {

  requireJsSortView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.requireJsSortView = new RequireJsSortView(state.requireJsSortViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.requireJsSortView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'require-js-sort:sort': () => this.sort()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.requireJsSortView.destroy();
  },

  serialize() {
    return {
      requireJsSortViewState: this.requireJsSortView.serialize()
    };
  },

  sort() {
    let editor;
    if (editor = atom.workspace.getActiveTextEditor()) {
        let text = editor.getSelectedText();
        let lines = text.split(LINE_SPLITTER);

        lines = lines
            .map((line) => {
                let usedSplitterIndex = commonSplitters.findIndex((splitter) => {
                    return line.indexOf(splitter) > -1;
                })

                let config = line.split(commonSplitters[usedSplitterIndex]);

                if (config.length < 2) {
                    return;
                }
                config.push(usedSplitterIndex);
                console.log("config", config);
                return config;
            })
            .sort((a, b) => {
                console.log(a, b);
                let first = a[1].toLowerCase();
                let second = b[1].toLowerCase();

                if (first < second) {
                    return -1;
                } else if (first > second) {
                    return 1;
                }

                return 0;
            })
            .map((line) => {
                if (!line) {
                    return;
                }
                console.log(line);
                let usedSplitterIndex = line.splice(-1);
                console.log(line, usedSplitterIndex);
                return line.join(commonSplitters[usedSplitterIndex]);
            });

        text = lines.join(LINE_SPLITTER);
        editor.insertText(text);
    }
  }

};
