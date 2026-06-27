# 白石百合恵 クラリネット・ピアノ 個人ウェブサイト

クラリネット・ピアノ奏者 白石百合恵のオフィシャルサイト。  
Astro で構築した静的サイトです。

---

## ファイル構成

```
HP制作/
├── public/
│   ├── favicon.svg               ← クラリネットのイラスト
│   └── ogp.jpg                   ← SNSシェア用サムネイル（top.jpg のコピー）
├── src/
│   ├── assets/images/            ← Astro が最適化する画像（ビルド時に WebP 変換）
│   │   ├── top.jpg
│   │   ├── profile.jpg
│   │   ├── clarinet.jpg
│   │   └── piano.jpg
│   ├── components/
│   │   ├── Header.astro          sticky ヘッダー・ハンバーガーメニュー
│   │   ├── Hero.astro            ファーストビュー（写真左右 2 カラム）
│   │   ├── Profile.astro         プロフィール
│   │   ├── Video.astro           YouTube 動画
│   │   ├── Lesson.astro          レッスン案内（クラリネット・ピアノ 2 カード）
│   │   ├── LessonFlow.astro      レッスンの流れ（3 ステップ）
│   │   ├── Price.astro           料金システム
│   │   ├── Voice.astro           お客様の声
│   │   ├── Faq.astro             よくある質問（JS 不要アコーディオン）
│   │   ├── Instagram.astro       Instagram セクション
│   │   ├── Access.astro          アクセス
│   │   ├── Contact.astro         お問い合わせフォーム
│   │   ├── Footer.astro          フッター
│   │   ├── ScrollToTop.astro     ページトップへ戻るボタン
│   │   └── FloatingCta.astro     モバイル固定 CTA バー
│   ├── layouts/
│   │   └── BaseLayout.astro      SEO・OGP・構造化データ・フォント読み込み
│   ├── pages/
│   │   └── index.astro           トップページ（各コンポーネントを組み合わせる）
│   └── styles/
│       └── global.css            カラー変数・リセット・共通スタイル
├── astro.config.mjs              Astro 設定（サイト URL など）
├── package.json
└── tsconfig.json
```

---

## 開発環境のセットアップ

### 必要な Node.js バージョン

**Node.js 18.17.1 以上**（LTS 推奨）

### インストール

```bash
npm install
```

社内ネットワーク等で SSL 証明書エラーが出る場合：

```bash
npm config set strict-ssl false
npm install
```

### 開発サーバーの起動

```bash
npm run dev
```

ブラウザで `http://localhost:4321` が開きます。  
ファイルを保存すると自動でホットリロードされます。

### 本番ビルド

```bash
npm run build
```

`dist/` フォルダに静的ファイルが出力されます。この中身をサーバーにアップロードしてください。

### ビルド結果のプレビュー

```bash
npm run preview
```

---

## 後から設定・差し替えが必要な箇所

| ファイル | 変数・箇所 | 内容 |
|---------|-----------|------|
| `astro.config.mjs` | `site:` | 公開する実際のドメインに変更してください（例: `https://yurieshiraishi.com`） |
| `src/layouts/BaseLayout.astro` | `const SITE_URL` | 同上。OGP・canonical URL に使用されます |
| `src/components/Video.astro` | `const YOUTUBE_VIDEO_ID` | 埋め込みたい YouTube 動画の ID を設定してください。動画 URL `https://www.youtube.com/watch?v=XXXXX` の `XXXXX` 部分が ID です。空文字のままにするとチャンネルリンクが表示されます |
| `public/favicon.svg` | ファイル自体 | 正式なファビコン画像（.svg または .ico）に差し替えてください |
| `public/ogp.jpg` | ファイル自体 | SNS シェア時に表示されるサムネイル画像です。現在は `top.jpg` のコピーです。専用のOGP画像（1200×630px 推奨）があれば差し替えてください |
| `src/components/Instagram.astro` | コメント箇所 | 特定の投稿を埋め込む場合は、Instagram の「埋め込む」から取得したコードをコメント箇所に貼り付けてください |
| `src/components/Access.astro` | コメント箇所 | Google マップを埋め込む場合は、Google Maps の「地図を埋め込む」から取得したコードをコメント箇所に有効化してください |

---

## 実装のポイント

### 画像最適化

`astro:assets` の `Image` コンポーネントを使用。ビルド時に全画像を WebP 形式に変換し、複数サイズを生成します。

| 元ファイル | 変換前 | 変換後（最大サイズ） |
|-----------|--------|-------------------|
| top.jpg | 361 KB | 197 KB |
| profile.jpg | 65 KB | 45 KB |
| clarinet.jpg | 61 KB | 35 KB |
| piano.jpg | 161 KB | 99 KB |

### JavaScript の使用箇所（最小限）

Astro のアイランドアーキテクチャに従い、JavaScript は以下の箇所のみに限定しています。

- `Header.astro` — ハンバーガーメニューの開閉
- `ScrollToTop.astro` — スクロール量の検知・ボタン表示/非表示
- `Contact.astro` — フォーム送信時のメール本文組み立て

FAQ アコーディオンは `<details>/<summary>` 要素で実装しており、JavaScript 不要です。  
モバイル固定 CTA バー（`FloatingCta.astro`）は CSS メディアクエリのみで制御しています。

### SEO 対策

`src/layouts/BaseLayout.astro` に以下をまとめて管理しています。

- `<title>` タグ・`<meta name="description">`・`<meta name="keywords">`
- OGP タグ（og:title / og:description / og:image / og:type / og:url）
- Twitter Card（summary_large_image）
- canonical タグ
- 構造化データ（JSON-LD）— `Person` と `LocalBusiness` の 2 種類

### 将来の拡張について

「お知らせ」「演奏予定」などのページを追加する場合は、`src/pages/` に新しい `.astro` ファイルを作成するだけで対応できます。  
コレクション（ブログ形式）を使う場合は `src/content/` ディレクトリを追加し、Astro の Content Collections を利用することを推奨します。

---

## お問い合わせ先

- メール: clarinet.yurie@gmail.com
- Instagram: [@yreee22](https://www.instagram.com/yreee22)
- YouTube: [@yurieshiraishiclarinet](https://youtube.com/@yurieshiraishiclarinet)
