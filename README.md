# wakachigaki

4.4Kbの軽量日本語分かち書きライブラリ

[動作確認用のデモサイト](https://yuhsak.github.io/wakachigaki/)

## 紹介

`wakachigaki` は辞書を使わない軽量の日本語分かち書き用ライブラリです。

ピュアなJavaScriptなのでNode.jsやブラウザなど環境を問わず動作するのが特徴で、TypeScriptやES Module[^1]にも対応しています。

予め分かち書きされた大量の日本語テキストから作成した機械学習モデルを内包することで辞書不要の分かち書きを実現しています。

学習には[Wikipedia日本語版のダンプデータ](https://dumps.wikimedia.org/jawiki/)全量を用いました。[MeCab](https://taku910.github.io/mecab/) + [mecab-ipadic-NEologd](https://github.com/neologd/mecab-ipadic-neologd) で得られる分かち書き結果を約90%の精度で再現することが出来ています。

辞書を用いる [kuromoji.js](https://github.com/takuyaa/kuromoji.js/) などと異なり品詞の推定機能はありませんが、その分インストールも実行も軽量で環境を問わず動作します。

[^1]: ブラウザ用にES Module形式のコードを配布していますが、パッケージ自体が厳密にNode.jsのNative ESMに対応しているわけではありません。Node.jsでは従来通りCommonJS形式のパッケージとして読み込まれます。TypeScriptが正式にNative ESMに対応した段階でDual Package化する予定です。

## 使い方

### インストール

```sh
npm install wakachigaki
```

### 分かち書きの実行

```ts
import { tokenize } from 'wakachigaki'

/** CommonJSの場合 */
// const { tokenize } = require('wakachigaki')

tokenize('非常に効果的な機械学習モデル')
// => [ '非常', 'に', '効果的', 'な', '機械学習', 'モデル' ]
```

### 境界確率の取得

分かち書きされた結果を直接取得するだけでなく、テキスト内の各文字についてその文字の直後に単語境界がある確率を0~1の範囲の数値で取得することが出来ます。

```ts
import { features, predictProba } from 'wakachigaki'

// 特徴量を取得
const feats = features('非常に効果的な機械学習モデル')

predictProba(feats)
/*
=> [
  0.04352163495527219,
  0.9983674855549803,
  0.9570985196432062,
  0.020232997095785403,
  0.4410257854815464,
  0.9718047120298574,
  0.9350510773272682,
  0.053911107427991614,
  0.4902512356245618,
  0.10137858065530672,
  0.6850331853722771,
  0.003590023669711093,
  0.005351566605225266,
  0.9775552921668524
]
*/
```

`tokenize()` 関数は内部でこの数値が予め定義された閾値を超えているかどうかを判定の基準にしていて、閾値もまた `threshold` という変数でexportされています。

```ts
import { features, predictProba, predict, threshold } from 'wakachigaki'

const feats = features('非常に効果的な機械学習モデル')

const probas = predictProba(feats)

// probas.map(p => p >= threshold) と同じ結果
predict(feats)
/*
=> [
  false,
  true,
  true,
  false,
  false,
  true,
  true,
  false,
  false,
  false,
  true,
  false,
  false,
  true
]
*/
```

### ユーティリティ

内部で文字種の判定に利用している正規表現と判定用の関数も利用可能です。

正規表現の内容は [src/feature/regexp.ts](./src/feature/regexp.ts) を参照して下さい。

```ts
import { regexp, isHiragana, isKatakana, isKanji, isNumeralKanji, isAlphabet, isNumeral } from 'wakachigaki'

/**
 * 与えられた文字列が文字種判定用の正規表現を満たすかどうかチェックする関数。入力は複数文字でもOK
 * 以下は全てtrueになる例
 **/

// ひらがな
isHiragana('あ')

// カタカナ
isKatakana('カ')

// 漢字
isKanji('漢字')

// 漢数字
isNumeralKanji('一二三四五六七八九十百千万億兆')

// アルファベット (半角, 全角を無視)
isAlphabet('aａ')

// 数字 (半角, 全角を無視)
isNumeral('9９')
```

### ブラウザ対応

`wakachigaki` 自体では特にブラウザ用にビルドしたコードを配布していませんが、元々他パッケージへの依存がなくES Module形式に対応しているため [unpkg.com](https://unpkg.com) などのCDNを経由すればすぐに動作させることが出来ます。

下記のコードをhtmlに貼り付ければ多くのブラウザでそのまま動くはずです。

```html
<script type="module">
  import { tokenize } from 'https://unpkg.com/wakachigaki@1.2.4'
  console.log(tokenize('ブラウザで分かち書きのテスト'))
  // => [ 'ブラウザ', 'で', '分かち', '書き', 'の', 'テスト']
</script>
```

## 開発の動機

JSでアプリケーションを開発していると検索やレコメンド機能の実装などで日本語の分かち書きを行いたい時があります。

そんな時に `npm install` したらサクっと使えてブラウザでも動いてESM, TypeScriptにも対応しているものがあれば嬉しいと思ったのが直接の動機です。

特に最近はサーバとブラウザどちらでも動く処理を書く機会が多かったりサーバレス系のインフラの出番が増えて取り回しの良い軽量なライブラリが求められます。

そこで `wakachigaki` は **動作に環境依存がないこと**、**バンドルサイズがごく軽量なこと**、**ES Module, TypeScriptに対応していること**を目指して開発されました。

## モデルの学習方法

機械学習モデルを利用した分かち書きの学習方法を検討している際 [Tiny Segmenter](http://chasen.org/~taku/software/TinySegmenter/) がほぼ同様の構成になっているのを発見し大いに参考にさせて頂きました。

データの加工と学習にはPythonを使い、[Wikipedia日本語版のダンプデータ](https://dumps.wikimedia.org/jawiki/)を全量使ってモデルの学習を行っています。

教師データの分かち書きには [MeCab](https://taku910.github.io/mecab/) + [mecab-ipadic-NEologd](https://github.com/neologd/mecab-ipadic-neologd) を利用しました。

コーパス内の各文字に対して複数のパラメータでNgramを取得し、漢字、ひらがな、カタカナなど文字の種類と文字のハッシュ値から算出した文字グループを特徴量として抽出、その文字の直後が単語境界かどうかの二値分類を学習しています。

Tiny Segmenterでも解説されていますが、クライアントに配布することも考えると学習結果として取り出すモデルのパラメータは出来る限り軽量にしたかったのでモデルはL1ノルム正則化ロジスティック回帰を採用し、確率的勾配降下法によるミニバッチ学習を行いました。

結果、モデルを表現するパラメータのJSONファイルはgzip後でわずか3Kbという軽量サイズになっています。

(学習用のコードもGitHubで公開する予定です)

## クレジット

機械学習モデルの構築にあたり非常に優秀な機械学習エンジニアの友人たちに多大な助力を頂きました。感謝します🙌

[@mski-iksm (GitHub)](https://github.com/mski-iksm)

[@Gashin_Learning (Twitter)](https://twitter.com/Gashin_Learning)
