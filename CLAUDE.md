# CLAUDE.md — 白石百合恵 公式サイト (clarinet-lessons)

このファイルは Claude Code がこのプロジェクトで作業する際の指示書です。

---

## プロジェクト概要

クラリネット・ピアノ奏者 **白石百合恵** の公式ウェブサイト。
Astro 4.x を使用した静的サイト（SPA なし）。

| 項目 | 値 |
|---|---|
| フレームワーク | Astro 4.16.x |
| スタイル | CSS カスタムプロパティ（フレームワークなし） |
| 画像最適化 | `astro:assets` Image コンポーネント（WebP 変換） |
| JavaScript | 最小限のインライン `<script>`（Astro のデフォルト bundled）|
| フォント | Google Fonts — Cormorant Garamond / Noto Sans JP / Shippori Mincho |
| デプロイ | 静的ビルド (`npm run build` → `dist/` フォルダをサーバーへアップ) |

---

## 開発コマンド

```bash
# 依存パッケージのインストール（初回のみ）
npm install

# 開発サーバー起動（http://localhost:4321）
npm run dev

# 本番ビルド（dist/ に出力）
npm run build

# ビルド結果のプレビュー
npm run preview
```

> **注意 (社内ネットワーク)**: SSL エラーが出る場合は `npm config set strict-ssl false` を先に実行すること。

---

## ファイル構成

```
clarinet-lessons/
├── public/
│   ├── favicon.svg        # ファビコン
│   └── ogp.jpg            # OGP 画像（1200×630px 推奨）
├── src/
│   ├── assets/images/     # astro:assets で最適化する画像
│   │   ├── top.jpg        # ヒーローセクション右側
│   │   ├── profile.jpg    # プロフィール写真
│   │   ├── clarinet.jpg   # レッスン：クラリネット
│   │   └── piano.jpg      # レッスン：ピアノ
│   ├── layouts/
│   │   └── BaseLayout.astro   # SEO / OGP / JSON-LD / フォント
│   ├── pages/
│   │   └── index.astro        # トップページ（全セクションを import して組み立て）
│   ├── components/            # セクション別コンポーネント（以下参照）
│   └── styles/
│       └── global.css         # CSS カスタムプロパティ・グローバルリセット
├── astro.config.mjs
├── package.json
├── tsconfig.json
└── README.md
```

### コンポーネント一覧

| ファイル | セクション | 備考 |
|---|---|---|
| `Header.astro` | ヘッダー | sticky + ハンバーガーメニュー（< 880px） |
| `Hero.astro` | ファーストビュー | top.jpg、左テキスト右画像の分割レイアウト |
| `Profile.astro` | プロフィール | profile.jpg、経歴テキスト |
| `Video.astro` | 演奏動画 | YouTube iframe 埋め込み |
| `Lesson.astro` | レッスンについて | clarinet.jpg / piano.jpg |
| `LessonFlow.astro` | レッスンの流れ | 3ステップカード |
| `Price.astro` | 料金システム | 全コース・ご案内 |
| `Voice.astro` | 生徒の声 | 口コミ 3 件 |
| `Faq.astro` | よくある質問 | `<details>` による JS なしアコーディオン |
| `Instagram.astro` | Instagram | Behold.so ウィジェット対応 |
| `Access.astro` | アクセス | Google マップ（未設定） |
| `Contact.astro` | お問い合わせ | `mailto:` フォーム |
| `Footer.astro` | フッター | |
| `FloatingCta.astro` | モバイル固定 CTA バー | CSS のみ（max-width: 680px で表示） |
| `ScrollToTop.astro` | トップへ戻るボタン | 400px スクロールで表示 |

---

## カスタマイズ箇所（TODO）

公開前に必ず変更が必要な箇所を下記にまとめる。

### 1. ドメイン設定

```js
// astro.config.mjs
site: 'https://yurieshiraishi.com',  // ← 実際のドメインに変更

// src/layouts/BaseLayout.astro
const SITE_URL = 'https://yurieshiraishi.com';  // ← 同様に変更
```

### 2. YouTube 動画

```js
// src/components/Video.astro
const YOUTUBE_VIDEO_ID = '';  // ← 特定動画の ID を入れる（例: 'dQw4w9WgXcQ'）
// 空のままにするとチャンネルの最新動画リストが表示される
```

### 3. Instagram（Behold.so）

```js
// src/components/Instagram.astro
const BEHOLD_FEED_ID = '';  // ← Behold.so の Feed ID を入れる
```

Behold.so 設定手順:
1. https://behold.so でアカウント作成（無料プランあり）
2. Instagram アカウント `@yreee22` を連携
3. Feed を作成して Feed ID をコピーし上記に貼り付ける

### 4. Google マップ

```html
<!-- src/components/Access.astro の該当コメント箇所 -->
<!-- TODO: Google マップ埋め込みコードを貼り付け -->
```

### 5. OGP 画像

`public/ogp.jpg` を実際の写真（1200×630px 推奨）に差し替える。

---

## デザイントークン（CSS カスタムプロパティ）

`src/styles/global.css` で定義。色を変える場合はここだけ変更する。

```css
--navy:       #1f2a3a;   /* ダークネイビー（ヘッダー、見出し） */
--wine:       #6e2a36;   /* ディープワインレッド（アクセント） */
--cream:      #f6f0e3;   /* ウォームクリーム（背景） */
--cream-light:#faf6ed;   /* ライトクリーム（カード背景） */
--text:       #2c2420;   /* 本文テキスト */
--text-muted: #6b6057;   /* サブテキスト */
```

---

## コーディング規約

- コメントはすべて **日本語** で記述する
- 変数名・関数名は **英語**、説明コメントは日本語
- `console.log` などのメッセージは日本語で出力する
- Astro コンポーネントの `<script>` ブロックは `lang="ts"` を付与する
- フロントマター（`---` ブロック）内のブロックコメント (`/** */`) は使わない  
  → esbuild の pre-scanner がエラーになる。代わりに `//` の行コメントを使う
- 新しいセクションを追加する場合は `src/components/` にコンポーネントを作り、`src/pages/index.astro` で import する
- 画像はすべて `src/assets/images/` に置き、`astro:assets` の `Image` コンポーネントで読み込む（`public/` には置かない）

---

## 既知のトラブルと対処

| 症状 | 原因 | 対処 |
|---|---|---|
| `npm install` で SSL エラー | 社内プロキシ | `npm config set strict-ssl false` |
| `npm run dev` で "Unterminated regular expression" | フロントマターの `/** */` ブロックコメント | `//` 行コメントに変更 |
| YouTube が表示されない | `YOUTUBE_VIDEO_ID` が空かつチャンネル名が間違っている | `Video.astro` の `YOUTUBE_CHANNEL_HANDLE` を確認 |
