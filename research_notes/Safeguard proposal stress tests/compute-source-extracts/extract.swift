import Foundation
import PDFKit
for path in CommandLine.arguments.dropFirst() {
 guard let doc = PDFDocument(url: URL(fileURLWithPath: path)) else { continue }
 var text = ""
 for i in 0..<doc.pageCount { text += "\n--- PDF page \(i+1) ---\n" + (doc.page(at:i)?.string ?? "") }
 try text.write(toFile: path.replacingOccurrences(of: ".pdf", with: ".txt"), atomically: true, encoding: .utf8)
 print("Extracted \(path): \(doc.pageCount) pages")
}
