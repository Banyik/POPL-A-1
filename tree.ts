export class Tree {
  protected value: number = 0;
  private left: Tree | null;
  private right: Tree | null;

  constructor(value: number) {
    this.setValue(value);
    this.left = null;
    this.right = null;
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

  public treeIterator(start = 0, end = this.getDepth(), step = 1) {
    let nextIndex = start;
    let iterationCount = 0;

    const treeIter = {
      next() {
        let result;
        if (nextIndex < end) {
          result = { value: nextIndex, done: false };
          nextIndex += step;
          iterationCount++;
          return result;
        }
        return { value: iterationCount, done: true };
      },
    };
    return treeIter;
  }

  public inorderTraversal(Tree) {
    const result: number[] = [];

    function inorderTraverse(node: Tree | null) {
      if (!node) return;

      inorderTraverse(node.left);
      result.push(node.value);
      inorderTraverse(node.right);
    }

    inorderTraverse(Tree);

    return result;
  }

  public TreeIterator() {
    let treeInArray: number[];
    let currentIndex: number = 0;

    function Iterator(root: Tree) {
      let list: number[] = [];
      PopulateArray(root, list);
      let treeInArray: number[] = list.map((e) => treeInArray.push(e));
      let currentIndex: number = -1;
    }

    function HasNext() {
      return currentIndex < treeInArray.length - 1;
    }

    function Next() {
      return treeInArray[++currentIndex];
    }

    function HasPrev() {
      return currentIndex > 0;
    }

    function Prev() {
      return treeInArray[--currentIndex];
    }

    function PopulateArray(node: Tree, list: number[]) {
      if (node == null) return;
      if (node.left != null) PopulateArray(node.left, list);

      list.push(node.value);
      if (node.right != null) PopulateArray(node.right, list);
    }
  }
}
