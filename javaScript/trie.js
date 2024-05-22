class TrieNode {
  constructor() {
    this.children = {};
    this.isEndOfWord = false;
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  // 插入单词
  insert(word) {
    let node = this.root;
    // node指向元素根节点的引用,每次重新赋值都是在子元素之间形成一个纽带 root => children[a] => children[b]
    for (let char of word) {
      if (!node.children[char]) {
        node.children[char] = new TrieNode();
      }
      node = node.children[char];
    }
    node.isEndOfWord = true;
  }

  // 搜索单词
  search(word) {
    let node = this.root;
    for (let char of word) {
      if (!node.children[char]) {
        return false;
      }
      node = node.children[char];
    }
    return node.isEndOfWord;
  }

  // 检查前缀是否存在
  startsWith(prefix) {
    let node = this.root;
    for (let char of prefix) {
      if (!node.children[char]) {
        return false;
      }
      node = node.children[char];
    }
    return true;
  }

  // 删除单词
  delete(word) {
    // 辅助函数，用于删除节点并返回是否需要删除其父节点
    const removeNode = (node, char) => {
      if (!node) return false;

      if (char) {
        const shouldRemove = removeNode(node.children[char], null);
        if (Object.keys(node.children).length === 0 && !node.isEndOfWord) {
          delete node.children[char];
          return true;
        }
        return shouldRemove;
      }

      if (!node.isEndOfWord && Object.keys(node.children).length === 0) {
        // 当前节点没有子节点且不是单词的结尾，删除该节点
        return true;
      }

      return false;
    };

    // 从根节点开始删除
    return removeNode(this.root, word[0]) && !this.search(word);
  }

  // 获取所有单词
  getAllWords(node = this.root, currentWord = '', result = []) {
    if (node.isEndOfWord) {
      result.push(currentWord);
    }

    for (let char in node.children) {
      this.getAllWords(node.children[char], currentWord + char, result);
    }

    return result;
  }

  // 获取所有以给定前缀开头的单词
  getAllStartingWith(prefix, result = []) {
    let node = this.root;
    for (let char of prefix) {
      if (!node.children[char]) {
        return result;
      }
      node = node.children[char];
    }

    this.getAllWords(node, prefix, result);
    return result;
  }
}

// 使用示例
let trie = new Trie();
trie.insert("apple");
trie.insert("application");
trie.insert("banana");
trie.insert("bat");
trie.insert("b");
console.log(trie, 999)

console.log(trie.search("apple"));              // 输出: true
console.log(trie.search("pp"));                // 输出: false
console.log(trie.startsWith("b"));            // 输出: true
console.log(trie.getAllStartingWith("app"));    // 输出: ["apple", "application"]
console.log(trie.getAllWords());                // 输出: ["apple", "application", "banana", "bat"]
trie.delete("apple");
console.log(trie.search("apple"));              // 输出: false
console.log(trie.getAllWords());                // 输出: ["application", "banana", "bat"]


// let a = {children: 'a', end: false}
