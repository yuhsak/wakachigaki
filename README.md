# wakachigaki

4.4Kbの軽量日本語分かち書きライブラリ

## 紹介

`wakachigaki` は辞書を使わない軽量の日本語分かち書き用ライブラリです。

## インストール

```sh
npm install wakachigaki
```

## 使い方

```ts
import { tokenize } from 'wakachigaki'

tokenize('非常に効果的な機械学習モデル')
// => [ '非常', 'に', '効果的', 'な', '機械学習', 'モデル' ]
```
