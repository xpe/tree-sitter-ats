module.exports = grammar({
  name: "ats",

  rules: {
    source_file: ($) => seq(repeat1($.entry), optional($.note)),
    entry: ($) => seq($.entry_marker, $.entry_content),
    entry_marker: ($) => seq("«", $.entry_id, "»"),
    entry_id: ($) => /[^»]+/,
    entry_content: ($) => $._inner,
    _inner: ($) => repeat1(/([^-«]|-[^-]|--[^-])/),
    // _inner: ($) => repeat1(
    //   choice(
    //     /--[^-]/,
    //     /-[^-]/,
    //     /[^-«]/,
    //   )
    // ),
    note: ($) => seq($.note_prefix, optional($.note_content)),
    note_prefix: ($) => "---",
    note_content: ($) => repeat1(/./),
  },
});
