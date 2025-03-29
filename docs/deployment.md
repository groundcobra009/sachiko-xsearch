# 幸子Xsearch デプロイ手順書

## 1. 開発環境のセットアップ

### 1.1 必要なツール
- Git
- GitHubアカウント
- Netlifyアカウント
- テキストエディタ（推奨: VS Code）

### 1.2 ローカル環境の準備
1. リポジトリのクローン
   ```bash
   git clone https://github.com/groundcobra009/sachiko-xsearch.git
   cd sachiko-xsearch
   ```

2. 依存関係の確認
   - このプロジェクトは純粋なHTML/CSS/JavaScriptで構成
   - 追加の依存関係なし

## 2. GitHubでの設定

### 2.1 リポジトリの作成
1. GitHubにログイン
2. 「New repository」をクリック
3. リポジトリ名を「sachiko-xsearch」に設定
4. 説明を追加（オプション）
5. 「Public」を選択
6. 「Create repository」をクリック

### 2.2 コードのプッシュ
1. ローカルリポジトリの初期化
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. リモートリポジトリの設定
   ```bash
   git remote add origin https://github.com/groundcobra009/sachiko-xsearch.git
   git branch -M main
   git push -u origin main
   ```

## 3. Netlifyでのデプロイ

### 3.1 サイトの作成
1. Netlifyにログイン
2. 「Add new site」→「Import an existing project」をクリック
3. 「Deploy with GitHub」を選択
4. 「sachiko-xsearch」リポジトリを選択

### 3.2 デプロイ設定
1. ビルド設定
   - Build command: 空欄のまま
   - Publish directory: /

2. 環境変数（必要な場合）
   - このプロジェクトでは環境変数は不要

3. 「Deploy site」をクリック

### 3.3 デプロイの確認
1. デプロイログの確認
   - ビルドプロセスの進行状況
   - エラーの有無

2. プレビューURLの確認
   - デプロイ完了後、プレビューURLが表示される
   - サイトの動作確認

## 4. カスタムドメインの設定（オプション）

### 4.1 ドメインの追加
1. Netlifyダッシュボードで「Site settings」→「Domain management」を選択
2. 「Add custom domain」をクリック
3. ドメイン名を入力
4. DNSレコードの設定を確認

### 4.2 SSL証明書の設定
1. 「Verify」をクリック
2. DNSプロバイダーでの設定を確認
3. SSL証明書の自動発行を待つ

## 5. メンテナンス

### 5.1 更新のデプロイ
1. コードの変更
2. 変更のコミット
   ```bash
   git add .
   git commit -m "Update: 変更内容の説明"
   git push
   ```
3. Netlifyの自動デプロイを確認

### 5.2 ロールバック
1. Netlifyダッシュボードで「Deploys」を選択
2. ロールバックしたいデプロイを選択
3. 「Revert to this deploy」をクリック

## 6. トラブルシューティング

### 6.1 デプロイエラー
1. ビルドログの確認
2. ファイルパスの確認
3. 依存関係の確認

### 6.2 サイトの動作確認
1. ブラウザでの表示確認
2. レスポンシブデザインの確認
3. 機能の動作確認

### 6.3 サポート
- Netlifyのドキュメントを参照
- GitHub Issuesで問題を報告
- コミュニティフォーラムで質問 