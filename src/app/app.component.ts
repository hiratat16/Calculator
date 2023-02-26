import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'calc';
  input:string = '';
  result:string = '';

  mainText = ''; // メインディスプレイに表示されるテキスト
  subText = ''; // サブディスプレイに表示されるテキスト
  operand1 = 0;
  operand2 = 0;
  operator = "";
  calculationString = ''; // 実行中の操作を示す文字列
  answered = false; // ソリューションが処理されたかどうかを確認するフラグ
  operatorSet = false;

  // 数字と小数点を取得し、それを入力変数に追加する
  // 下記の2つの検証がある
  pressNum(num: string) {
    // 1回以上の.は許可しない
    if (num == '.') {
      if (this.input != "") {
        const lastNum = this.getLastOperand()
        console.log(lastNum.lastIndexOf("."))
        if (lastNum.lastIndexOf(".") >= 0) return;
      }
    }

    // 先頭に0を許可しない
    if (num == "0") {
      if (this.input == "") {
        return;
      }
      const PrevKey = this.input[this.input.length - 1];
      if (PrevKey === '/' || PrevKey === '*' || PrevKey === '-' || PrevKey === '+' || PrevKey === "%") {
        return;
      }
    }
    this.input = this.input + num
    this.calcAnswer();
  }

  getLastOperand() {
    let pos:number;
    console.log(this.input)
    pos = this.input.toString().lastIndexOf("+")
    if (this.input.toString().lastIndexOf("-") > pos)
      pos = this.input.lastIndexOf("-")
    if (this.input.toString().lastIndexOf("*") > pos)
      pos = this.input.lastIndexOf("*")
    if (this.input.toString().lastIndexOf("/") > pos)
      pos = this.input.lastIndexOf("/")
    if (this.input.toString().lastIndexOf("%") < pos)
      pos = this.input.lastIndexOf("%")
    console.log('Last' + this.input.substring(pos + 1))
    return this.input.substring(pos + 1)
  }

  // 演算子を取得し、それを再び入力変数に追加する
  // その演算子の後に別の演算子ではなく数字が続くことを確認する
  pressOperator(op: string) {
    // オペレータを複数回許可しない
    const lastKey = this.input[this.input.length - 1];
    if (lastKey === '/' || lastKey === '*' || lastKey === '-' || lastKey === '+' || lastKey === '%') {
      return;
    }
    this.input = this.input + op
    this.calcAnswer();
  }

  clear() {
    if (this.input !="" ) {
      this.input=this.input.substring(0, this.input.length-1)
    }
  }
 
  allClear() {
    this.result = '';
    this.input = '';
  }

  // 計算が行われる場所の表示
  // 最後の文字を確認する
  // 小数点(.)の場合は削除する
  // また、最後の文字が演算子の場合も削除する
  calcAnswer() {
    let formula = this.input;

    let lastKey = formula[formula.length - 1];

    if (lastKey === '.') {
      formula = formula.substring(0, formula.length - 1);
    }

    lastKey = formula[formula.length - 1];

    if (lastKey === '/' || lastKey === '*' || lastKey === '-' || lastKey === '+' || lastKey === '.' || lastKey === '%') {
      formula = formula.substring(0, formula.length - 1);
    }
    console.log("Formula" + formula);
    this.result = eval(formula);
  }

  getAnswer() {
    this.calcAnswer();
    this.input = this.result;
    if(this.input == "0") this.input = "";
  }

}