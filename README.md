# Hanamaru CreditCard Validator

## A simple credit card validator

### セットアップ手順

1. 依存関係をインストール

   ```bash
   $npm install
   ```

2. サーバーをスタート

   ```bash
   $npm start <IPアドレス>
   ```

3. アクセス先

  `localhost:3000` or `<EC2 PublicIP>:3000`

  もしパブリックIPが12.34.56.78だったら、
  `http://12.34.56.78:3000`
  でindexページにアクセスできます。

  開発環境では、`localhost:3000`でアクセスできます。

  アクセスしたら、サンプルページが表示されます。

4. クレジット情報のアクセス先

   ```text
   POST /credit/verify
   {
      "cname": "Yoshiki Onaga",
      "cno": "4539692580891212",
      "edate": "11/28"
    }
    ```

    ```bash
    $curl -X POST http://localhost:3000/credit/verify -H "Content-Type: application/json" -d '{"cname": "Yoshiki Onaga", "cno": "4539692580891212", "edate": "11/28"}'
    ```

