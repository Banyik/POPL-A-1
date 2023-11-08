export default class Tree implements Iterator<Object> {
  protected value: number = 0;
  private left: Tree | null;
  private right: Tree | null;

  constructor(value: number) {
    this.setValue(value);
    this.left = null;
    this.right = null;
  }
  next(...args: [] | [undefined]): IteratorResult<Object, any> {
    throw new Error('Method not implemented.');
  }

  private setValue(v: number): void {
    if (v <= 0) {
      throw new Error('value must be positive');
    }
    this.value = v;
  }

  private getDepth(): number {
    const leftDepth = this.left ? this.left.getDepth() : 0;
    const rightDepth = this.right ? this.right.getDepth() : 0;
    return Math.min(leftDepth, rightDepth) + 1;
  }

  public add(v: number): void {
    if (!this.left) {
      this.left = new Tree(v);
    } else if (!this.right) {
      this.right = new Tree(v);
    } else if (this.left.getDepth() <= this.right.getDepth()) {
      this.left.add(v);
    } else {
      this.right.add(v);
    }
  }

  public display(d: number = 0): void {
    if (this.left) {
      this.left.display(d + 1);
    }
    for (let i = d; i > 0; i--) {
      console.log(' ');
    }
    console.log(this.value);
    if (this.right) {
      this.right.display(d + 1);
    }
  }

  public equals(node2: Tree) {
    if (!node2) return 0;
    return this.value === node2.value;
  }

  myIterator = {
    next() {
      let done = false;
      let value;
      let traversal: Tree[] = [];
      inorderTraversal(this);

      function inorderTraversal(node: Tree) {
        if (node != null) {
          inorderTraversal(node.left);
          traversal.push(node);
          inorderTraversal(node.right);
        }
      }

      let node: Tree = traversal.pop();
      if (node) value = node.value;
      else done = true;

      return { done: done, value: value };
    },
    [Symbol.iterator]() {
      return this;
    },
  };
}
