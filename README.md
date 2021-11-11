# wakachigaki

4.4Kbの軽量日本語分かち書きライブラリ

[動作確認用のデモサイト](https://yuhsak.github.io/wakachigaki/)

## 紹介

`wakachigaki` は辞書を使わない軽量の日本語分かち書き用ライブラリです。

予め分かち書きされた大量の日本語テキストから作成した機械学習モデルを内包することで辞書不要の分かち書きを実現しています。

ピュアなJavaScriptなのでNode.jsやブラウザなど環境を問わず動作するのが特徴で、TypeScriptやES Module [^1] にも対応しています。

学習には[Wikipedia日本語版のダンプデータ](https://dumps.wikimedia.org/jawiki/)全量を用いました。

辞書を用いる [MeCab](https://taku910.github.io/mecab/) や [kuromoji.js](https://github.com/takuyaa/kuromoji.js/) などと異なり品詞の推定機能はありませんが、その分インストールも実行も軽量で環境を問わず動作します。

[^1]: ブラウザ用にES Module形式のコードを配布していますが、パッケージ自体が厳密にNode.jsのNative ESMに対応しているわけではありません

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

### ブラウザ対応

`wakachigaki` 自体では特にブラウザ用にビルドしたコードを配布していませんが、元々ES Module形式に対応しているため [unpkg.com](https://unpkg.com) などのCDNを経由すればすぐに動作させることが出来ます。

下記のコードをhtmlに貼り付ければ多くのブラウザでそのまま動くはずです。

```html
<script type="module">
  import { tokenize } from 'https://unpkg.com/wakachigaki@1.0.0/lib/esm/tokenize.js'
  console.log(tokenize('ブラウザで分かち書きのテスト'))
  // => [ 'ブラウザ', 'で', '分かち', '書き', 'の', 'テスト']
</script>
```

## 開発の動機

JSでアプリケーションを開発していると検索機能の実装などで日本語の分かち書きを行いたい時があります。

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
