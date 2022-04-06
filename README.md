# wakachigaki

![](./badges/badge-statements.svg)
![](./badges/badge-branches.svg)
![](./badges/badge-functions.svg)
![](./badges/badge-lines.svg)

4.4Kbの軽量日本語分かち書きライブラリ

[動作確認用のデモサイト](https://yuhsak.github.io/wakachigaki/)

## 紹介

`wakachigaki` は辞書を使わない軽量の日本語分かち書き用ライブラリです。

ピュアなJavaScriptなのでNode.jsやDeno, ブラウザなど環境を問わず動作し、TypeScriptやES Module[^1]にも対応しています。

予め分かち書きされた大量の日本語テキストから作成した機械学習モデルを内包することで辞書不要の分かち書きを実現しています。

学習には[Wikipedia日本語版のダンプデータ](https://dumps.wikimedia.org/jawiki/)全量を用いました。[MeCab](https://taku910.github.io/mecab/) + [mecab-ipadic-NEologd](https://github.com/neologd/mecab-ipadic-neologd) で得られる分かち書き結果を約90%の精度で再現することが出来ています。

単語境界の判定には文中に出現する文字の種類や並び順の情報のみを用いるようになっており、文字や単語単位で固有の情報を一切利用していないため未知語に非常に強いのが特徴です。

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
// => [ '非常', 'に', '効果', '的', 'な', '機械学習', 'モデル' ]
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
  0.0327992634970502,     // 非
  0.9901071412275622,     // 常
  0.9742190417471894,     // に
  0.04298367736033199,    // 効
  0.7249201317135311,     // 果
  0.9920294555733393,     // 的
  0.904908994982585,      // な
  0.10174356598870479,    // 機
  0.3827245071932094,     // 械
  0.11608892206899486,    // 学
  0.6410674063348171,     // 習
  0.0045548383234342614,  // モ
  0.00006214363582036111, // デ
  0.9720230891240956      // ル
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
  false, // 非
  true,  // 常
  true,  // に
  false, // 効
  true,  // 果
  true,  // 的
  true,  // な
  false, // 機
  false, // 械
  false, // 学
  true,  // 習
  false, // モ
  false, // デ
  true   // ル
]
*/
```

### ユーティリティ

内部で文字種の判定に利用している正規表現と判定用の関数も利用可能です。

正規表現の内容は [src/feature/regexp.ts](./src/feature/regexp.ts) を参照して下さい。

```ts
import {
  regexp,
  isHiragana,
  isKatakana,
  isKanji,
  isNumeralKanji,
  isAlphabet,
  isNumeral,
} from 'wakachigaki'

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
  import { tokenize } from 'https://unpkg.com/wakachigaki@1.2.5'
  console.log(tokenize('ブラウザで分かち書きのテスト'))
  // => [ 'ブラウザ', 'で', '分かち', '書き', 'の', 'テスト']
</script>
```

### Deno対応

`wakachigaki` はNode.js固有のAPIを使用していないためDeno環境でも動作します。

ブラウザ同様にCDNとしてunpkgを利用することも出来ますが、TypeScriptの型定義の配布に対応した [Skypack](https://www.skypack.dev) を利用するのがおすすめです。

```ts
import { tokenize } from 'https://cdn.skypack.dev/wakachigaki@1.2.5?dts'

console.log(tokenize('Denoで分かち書きのテスト'))
// => ['Deno', 'で', '分かち', '書き', 'の', 'テスト']
```

## 精度の比較

下記の表はJS環境で利用可能な類似のライブラリと併せて精度の比較を行ったものです。

比較用のコーパスにはNHN Japan株式会社提供の[livedoor ニュースコーパス](https://www.rondhuit.com/download.html#ldcc)を利用しました。

各記事を行単位に分解し適宜URLのみのものを取り除くなど前処理をして得られた約10万の文章について、[MeCab](https://taku910.github.io/mecab/) + [mecab-ipadic-NEologd](https://github.com/neologd/mecab-ipadic-neologd)で行った分かち書き結果を正解として各数値を算出しました。

従来の手法と比べても遜色ない結果が得られていることがわかります。

ただし`wakachigaki`がそもそも学習に`mecab-ipadic-NEologd`を用いているために新語や複合語に強くなっており、同列の条件での比較にはなっていない点に注意して下さい。あくまで参考程度の結果です。

特に高く見える適合率にはその影響が強く出ていると思われます。他ライブラリと比べて`判定した単語境界の数`が少なく`実際の単語境界の数`に近い数字になっていることからも`mecab-ipadic-NEologd`から学習した複合語の判定傾向が高い適合率の要因になっていると考えられます。

| ライブラリ                   | 実際の単語境界の数 | 判定した単語境界の数 |  正答数 | 適合率 | 再現率 | F2スコア |
| :--------------------------- | -----------------: | -------------------: | ------: | -----: | -----: | -------: |
| wakachigaki                  |            4611683 |              4628452 | 4169113 |  0.901 |  0.904 |    0.902 |
| TinySegmenter                |            4611683 |              5055596 | 4170853 |  0.825 |  0.904 |    0.863 |
| kuromoji.js (デフォルト辞書) |            4611683 |              5015672 | 4312946 |  0.860 |  0.935 |    0.896 |

**項目の意味**

| 項目名               | 説明                                                 |
| :------------------- | :--------------------------------------------------- |
| 実際の単語境界の数   | コーパス全体に対してMeCabが出力した単語境界の総数    |
| 判定した単語境界の数 | ライブラリが出力した単語境界の総数                   |
| 正答数               | ライブラリが出力した単語境界のうち正解だったものの数 |
| 適合率               | 正答数 ÷ 判定した単語境界の数                        |
| 再現率               | 正答数 ÷ 実際の単語境界の数                          |
| F2スコア             | 適合率と再現率の調和平均                             |

### 適合率と再現率について

日本語文章内の多くの単語は複数の文字で構成されていることから、分かち書きされた文章について単純に文字単位で単語境界の有無を正解ラベルにすると負例の割合が多い不均衡なラベル郡になります。

このため単純にラベルの一致率(Accuracy)を計算すると負例の影響が大きくなりますが、実際にモデルの精度として評価したいのは単純な一致率ではなく「モデルが判定した単語境界の信頼度」のようなものであると考えるため、ここでは正例に注目した指標である`適合率`(Precision)と`再現率`(Recall)を採用しました。

どちらも`正解した数`を分子とするのは変わりませんが、適合率は分母に`モデルが単語境界だと判断した数`をとるため**モデルが判断した単語境界が正解だった割合**を示すものになっています。

再現率の方は分母に`実際の単語境界の数`をとるため**MeCabが出力した単語境界のうちモデルが捕捉できたものの割合**を示しています。

例えば`MeCab` + `mecab-ipadic-NEologd`に「ベクトル空間への埋め込みを利用した分散表現の学習」と入力すると`ベクトル空間 | へ | の | 埋め込み | を | 利用 | し | た | 分散 | 表現 | の | 学習`と出力し、`wakachigaki`では`ベクトル空間 | へ | の | 埋め | 込み | を | 利用 | し | た | 分散 | 表現 | の | 学習`と出力します。

この場合、`MeCab`の方に存在する単語境界は全て`wakachigaki`の方にも存在するので再現率は1.0になります。一方で`wakachigaki`に存在する`埋め | 込み`の単語境界は`MeCab`の方には存在しないため適合率は11 / 12 ≒ 0.917となります。

一般的に適合率は**判定の確実性**を、再現率は**判定の網羅性**を表すと考えて差し支えないと思います。

また、モデルの判断基準を厳しくすればするほど適合率は向上しますが反対に再現率は低下するので多くの場合この2つの指標はトレードオフの関係にあると言えます。

## 開発の動機

JSでアプリケーションを開発していると検索やレコメンド機能の実装などで日本語の分かち書きを行いたい時があります。

そんな時に `npm install` したらサクっと使えてブラウザやDenoでも動いてESM, TypeScriptにも対応しているものがあれば嬉しいと思ったのが直接の動機です。

特に最近はサーバとブラウザどちらでも動く処理を書く機会が多かったりサーバレス系のインフラの出番が増えて取り回しの良い軽量なライブラリが求められます。

そこで `wakachigaki` は **動作に環境依存がないこと**、**バンドルサイズがごく軽量なこと**、**ES Module, TypeScriptに対応していること**を目指して開発されました。

## モデルの学習方法

機械学習モデルを利用した分かち書きの学習方法を検討している際 [TinySegmenter](http://chasen.org/~taku/software/TinySegmenter/) がほぼ同様の構成になっているのを発見し大いに参考にさせて頂きました。

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
