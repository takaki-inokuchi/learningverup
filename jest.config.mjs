//どういう環境でテストをするのかを教える説明書
export default {
  testEnvironment: "jsdom",//jsdom = 「ブラウザっぽい機能を Node.js 上でエミュレートする仕組み」
  moduleNameMapper: {
    "\\.(css|less)$": "identity-obj-proxy",//"identity-obj-proxy" を使うと、テスト中はクラス名を「そのまま文字列」として使えるようになる。
  },
  setupFilesAfterEnv: ["./jest.setup.mjs"],
};
