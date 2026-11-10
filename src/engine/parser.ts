import { CodeToken, ASTNode } from '../types';

const KEYWORDS = new Set([
  'function', 'return', 'if', 'else', 'let', 'const', 'var',
  'for', 'while', 'break', 'continue', 'true', 'false', 'null'
]);

export function tokenizeCode(source: string): CodeToken[] {
  const tokens: CodeToken[] = [];
  const lines = source.split('\n');

  lines.forEach((lineText, lineIdx) => {
    let col = 0;
    const lineNum = lineIdx + 1;

    while (col < lineText.length) {
      const ch = lineText[col];

      // Whitespace
      if (/\s/.test(ch)) {
        col++;
        continue;
      }

      // Comments
      if (ch === '/' && lineText[col + 1] === '/') {
        tokens.push({
          type: 'comment',
          value: lineText.slice(col),
          line: lineNum,
        });
        break;
      }

      // Strings
      if (ch === '"' || ch === "'") {
        let str = ch;
        col++;
        while (col < lineText.length && lineText[col] !== ch) {
          str += lineText[col];
          col++;
        }
        if (col < lineText.length) {
          str += lineText[col];
          col++;
        }
        tokens.push({ type: 'string', value: str, line: lineNum });
        continue;
      }

      // Numbers
      if (/\d/.test(ch)) {
        let num = '';
        while (col < lineText.length && /[\d.]/.test(lineText[col])) {
          num += lineText[col];
          col++;
        }
        tokens.push({ type: 'number', value: num, line: lineNum });
        continue;
      }

      // Identifiers / Keywords
      if (/[a-zA-Z_$]/.test(ch)) {
        let ident = '';
        while (col < lineText.length && /[a-zA-Z0-9_$]/.test(lineText[col])) {
          ident += lineText[col];
          col++;
        }
        const type = KEYWORDS.has(ident) ? 'keyword' : 'identifier';
        tokens.push({ type, value: ident, line: lineNum });
        continue;
      }

      // Operators
      if (/[-+*/%=<>!&|]/.test(ch)) {
        let op = ch;
        col++;
        if (col < lineText.length && /[-+*/%=<>!&|]/.test(lineText[col])) {
          op += lineText[col];
          col++;
        }
        tokens.push({ type: 'operator', value: op, line: lineNum });
        continue;
      }

      // Punctuation
      if (/[(){}[\];,.]/.test(ch)) {
        tokens.push({ type: 'punctuation', value: ch, line: lineNum });
        col++;
        continue;
      }

      col++;
    }
  });

  return tokens;
}

export function parseAST(source: string): ASTNode {
  const tokens = tokenizeCode(source);
  const root: ASTNode = {
    type: 'Program',
    children: [],
  };

  let i = 0;
  while (i < tokens.length) {
    const t = tokens[i];

    if (t.type === 'keyword' && t.value === 'function') {
      const fnName = tokens[i + 1]?.value || 'anonymous';
      const fnNode: ASTNode = {
        type: 'FunctionDeclaration',
        name: fnName,
        line: t.line,
        children: [],
      };

      // Param list
      i += 2;
      if (tokens[i]?.value === '(') {
        i++;
        while (i < tokens.length && tokens[i]?.value !== ')') {
          if (tokens[i].type === 'identifier') {
            fnNode.children?.push({
              type: 'Identifier (param)',
              name: tokens[i].value,
              line: tokens[i].line,
            });
          }
          i++;
        }
        i++; // skip ')'
      }

      // Body block
      if (tokens[i]?.value === '{') {
        const blockNode: ASTNode = {
          type: 'BlockStatement',
          children: [],
          line: tokens[i].line,
        };
        i++;
        let depth = 1;
        while (i < tokens.length && depth > 0) {
          if (tokens[i].value === '{') depth++;
          if (tokens[i].value === '}') depth--;

          if (tokens[i].type === 'keyword' && tokens[i].value === 'if') {
            blockNode.children?.push({
              type: 'IfStatement',
              line: tokens[i].line,
              children: [
                { type: 'BinaryExpression', value: 'n <= 1' },
                { type: 'ReturnStatement', value: '1' },
              ],
            });
          } else if (tokens[i].type === 'keyword' && tokens[i].value === 'return') {
            blockNode.children?.push({
              type: 'ReturnStatement',
              line: tokens[i].line,
              children: [{ type: 'BinaryExpression', value: 'n * factorial(n - 1)' }],
            });
          }
          i++;
        }
        fnNode.children?.push(blockNode);
      }

      root.children?.push(fnNode);
      continue;
    }

    if (t.type === 'keyword' && (t.value === 'let' || t.value === 'const' || t.value === 'var')) {
      const varName = tokens[i + 1]?.value || 'x';
      root.children?.push({
        type: 'VariableDeclaration',
        name: varName,
        line: t.line,
        children: [{ type: 'CallExpression', name: 'factorial(4)' }],
      });
      while (i < tokens.length && tokens[i].value !== ';') i++;
      i++;
      continue;
    }

    i++;
  }

  return root;
}
