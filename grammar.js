module.exports = grammar({
  name: "ats",

  rules: {
    source_file: ($) => seq(repeat1($.item), optional($.footer)),
    item: ($) => seq($.item_marker, $.item_content, optional($.item_note)),
    item_marker: ($) => seq("«", $.item_id, "»"),
    item_id: ($) => /[^»]+/,
    item_content: ($) => repeat1(/([^-«]|-[^-]|--[^-])/),
    item_note: ($) => seq("{-", $.item_note_inner, "-}"),
    item_note_inner: ($) => repeat1(/([^-]|-[^}])/),
    footer: ($) => seq($.footer_prefix, optional($.footer_content)),
    footer_prefix: ($) => "---",
    footer_content: ($) => repeat1(/./),
  },
});
