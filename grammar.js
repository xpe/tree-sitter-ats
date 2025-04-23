/**
 * @file ATS parser
 * @author David James <davidcjames@gmail.com>
 * @license none
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check
module.exports = grammar({
  name: "ats",

  rules: {
    // The root rule
    document: ($) => repeat(choice($.entry_marker, $.note_prefix)),

    // Match the entry marker with the ID inside
    entry_marker: ($) => seq("«", $.entry_id, "»"),

    // The actual ID between the markers
    entry_id: ($) => /[^»]+/,

    // Match the note prefix
    note_prefix: ($) => "---",
  },
});
