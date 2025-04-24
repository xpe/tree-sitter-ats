module.exports = grammar({
  name: "ats",

  rules: {
    source_file: ($) => seq(repeat1($.entry), optional($.note)),
    entry: ($) => seq($.entry_marker, $.entry_content, optional($.entry_comment)),
    entry_marker: ($) => seq("«", $.entry_id, "»"),
    entry_id: ($) => /[^»]+/,
    entry_content: ($) => repeat1(/([^-«]|-[^-]|--[^-])/),
    entry_comment: ($) => seq("{-", $.entry_comment_inner, "-}"),
    entry_comment_inner: ($) => repeat1(/([^-]|-[^}])/),
    note: ($) => seq($.note_prefix, optional($.note_content)),
    note_prefix: ($) => "---",
    note_content: ($) => repeat1(/./),
  },
});
