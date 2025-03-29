# 幸子Xsearch

X(Twitter)の高度な検索ツール。キーワード、ユーザー名、期間、いいね数、国別など、様々な条件で検索を絞り込むことができます。

## 主な機能

- キーワード検索
- ユーザー名検索
- 日付範囲指定
- いいね数フィルター（100単位で調整可能）
- 国別フィルター
- ダークモード / ライトモード切替
- 検索条件のお気に入り保存
- ショートカットキー
- 検索条件の共有機能

## ショートカットキー

- `Ctrl + Enter`: 検索実行
- `Ctrl + S`: お気に入り追加
- `Ctrl + R`: フォーム初期化
- `Ctrl + D`: ダークモード切替
- `ESC`: モーダルを閉じる

## デプロイ方法

1. このリポジトリをフォークまたはクローン
2. Netlifyにログイン
3. 「New site from Git」を選択
4. このリポジトリを選択
5. デプロイ設定は不要（静的サイト）
6. 「Deploy site」をクリック

## カスタマイズ

### 独自ドメインの設定

1. Netlifyのサイト設定から「Domain settings」を選択
2. 「Custom domains」セクションで「Add custom domain」をクリック
3. ドメインを入力して設定を完了

### アナリティクス追加

1. Google Analyticsなどのトラッキングコードを取得
2. `index.html`の`<head>`タグ内に追加

## ライセンス

MIT License

## 作者

[Your Name]

## 貢献

1. このリポジトリをフォーク
2. 新しいブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'Add some amazing feature'`)
4. ブランチをプッシュ (`git push origin feature/amazing-feature`)
5. プルリクエストを作成 