import "@testing-library/jest-dom";//Jest の機能を拡張するライブラリを読み込んでいます。 →　関数使用可能になる
//toBeInTheDocument、toHaveTextContent使用可能に
import dotenv from "dotenv";//環境変数を使えるようにするライブラリ

dotenv.config();//toHaveTextContent