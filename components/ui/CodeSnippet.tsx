"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

type TokenType =
  | "keyword"
  | "string"
  | "comment"
  | "number"
  | "function"
  | "type"
  | "plain";

type Token = { type: TokenType; value: string };

const TOKEN_COLORS: Record<TokenType, string> = {
  keyword: "#7c3aed",
  string: "#16a34a",
  comment: "#9ca3af",
  number: "#dc2626",
  function: "#2563eb",
  type: "#d97706",
  plain: "#374151",
};

function tokenizeLine(line: string): Token[] {
  const tokens: Token[] = [];
  let rest = line;

  while (rest.length > 0) {
    const comment = rest.match(/^(\/\/.*)/);
    if (comment) {
      tokens.push({ type: "comment", value: comment[1] });
      break;
    }
    const str = rest.match(/^(["'`](?:[^"'`\\]|\\.)*?["'`])/);
    if (str) {
      tokens.push({ type: "string", value: str[1] });
      rest = rest.slice(str[1].length);
      continue;
    }
    const kw = rest.match(
      /^(const|let|var|async|await|return|if|else|new|import|export|default|from|type|interface|void|true|false|null|undefined|function|class)\b/
    );
    if (kw) {
      tokens.push({ type: "keyword", value: kw[1] });
      rest = rest.slice(kw[1].length);
      continue;
    }
    const builtin = rest.match(
      /^(Promise|Map|Set|Array|Object|Date|JSON|Socket|Redis)\b/
    );
    if (builtin) {
      tokens.push({ type: "type", value: builtin[1] });
      rest = rest.slice(builtin[1].length);
      continue;
    }
    const fn = rest.match(/^([a-z_$][a-zA-Z0-9_$]*)(?=\s*\()/);
    if (fn) {
      tokens.push({ type: "function", value: fn[1] });
      rest = rest.slice(fn[1].length);
      continue;
    }
    const typeId = rest.match(/^([A-Z][a-zA-Z0-9_$]*)/);
    if (typeId) {
      tokens.push({ type: "type", value: typeId[1] });
      rest = rest.slice(typeId[1].length);
      continue;
    }
    const num = rest.match(/^(\d+(?:_\d+)*)/);
    if (num) {
      tokens.push({ type: "number", value: num[1] });
      rest = rest.slice(num[1].length);
      continue;
    }
    tokens.push({ type: "plain", value: rest[0] });
    rest = rest.slice(1);
  }

  return tokens;
}

interface CodeSnippetProps {
  code: string;
  filename?: string;
  language?: string;
  className?: string;
}

export default function CodeSnippet({
  code,
  filename = "snippet.ts",
  language = "TypeScript",
  className,
}: CodeSnippetProps) {
  const [copied, setCopied] = useState(false);
  const lines = code.split("\n");

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={cn(
        "rounded-lg overflow-hidden border border-[#e5e5e5] bg-[#fafafa]",
        className
      )}
    >
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-[#e5e5e5] bg-white">
        <span className="font-mono text-xs text-[#999]">{filename}</span>
        <div className="flex items-center gap-3">
          <span className="font-mono text-[10px] text-[#d4d4d4] uppercase tracking-wider">
            {language}
          </span>
          <button
            onClick={handleCopy}
            className="p-1 text-[#d4d4d4] hover:text-[#666] transition-colors"
            aria-label={copied ? "Copied" : "Copy code"}
          >
            {copied ? (
              <Check size={12} className="text-[#09f]" />
            ) : (
              <Copy size={12} />
            )}
          </button>
        </div>
      </div>

      <div className="overflow-x-auto py-4">
        <table className="min-w-full">
          <tbody>
            {lines.map((line, i) => (
              <tr key={i} className="hover:bg-[#f0f0f0] transition-colors">
                <td className="select-none w-10 pr-4 pl-4 text-right font-mono text-xs text-[#d4d4d4] align-top leading-6">
                  {i + 1}
                </td>
                <td className="pr-8 font-mono text-[12.5px] leading-6 whitespace-pre">
                  {tokenizeLine(line).map((token, j) => (
                    <span key={j} style={{ color: TOKEN_COLORS[token.type] }}>
                      {token.value}
                    </span>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
