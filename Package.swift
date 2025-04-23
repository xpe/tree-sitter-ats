// swift-tools-version:5.3

import Foundation
import PackageDescription

var sources = ["src/parser.c"]
if FileManager.default.fileExists(atPath: "src/scanner.c") {
    sources.append("src/scanner.c")
}

let package = Package(
    name: "TreeSitterAts",
    products: [
        .library(name: "TreeSitterAts", targets: ["TreeSitterAts"]),
    ],
    dependencies: [
        .package(url: "https://github.com/tree-sitter/swift-tree-sitter", from: "0.8.0"),
    ],
    targets: [
        .target(
            name: "TreeSitterAts",
            dependencies: [],
            path: ".",
            sources: sources,
            resources: [
                .copy("queries")
            ],
            publicHeadersPath: "bindings/swift",
            cSettings: [.headerSearchPath("src")]
        ),
        .testTarget(
            name: "TreeSitterAtsTests",
            dependencies: [
                "SwiftTreeSitter",
                "TreeSitterAts",
            ],
            path: "bindings/swift/TreeSitterAtsTests"
        )
    ],
    cLanguageStandard: .c11
)
