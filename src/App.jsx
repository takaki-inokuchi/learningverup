import { useState, useEffect } from "react";
import { Learning } from "./compornents/Learning";
import { Studycontents } from "./compornents/studycontents";
import "./index.css";
import { supabase } from "./supabase";

export default function App() {
  const [learningtext, setLeaningtext] = useState("");
  const [learningtime, setLeaningtime] = useState(0);
  const [records, setRecords] = useState([]);
  const [error, setError] = useState("");
  const [totaltime, setTotaltime] = useState(0);

  const onChangetext = (event) => {
    setLeaningtext(event.target.value);
  };
  const onChangetime = (event) => {
    const value = event.target.value;
    setLeaningtime(parseInt(value, 10) || 0);
  };

  const registerButton = () => {
    if (learningtext === "" || learningtime === "")
      return setError("入力されていない項目があります。");
    const newRecord = {
      title: learningtext,
      time: parseInt(learningtime, 10) || 0,
    };
    setRecords([...records, newRecord]);
    setLeaningtext("");
    setLeaningtime("");
    setError("");
    setTotaltime(totaltime + (parseInt(learningtime, 10) || 0));
  };
  useEffect(() => {
    const fetchRecords = async () => {
      const { data, error } = await supabase.from("study-record").select("*");

      if (error) {
        console.error(error);
        setError("データの取得に失敗しました");
      } else {
        setRecords(data || []);
        const total = (data || []).reduce(
          (sum, rec) => sum + (rec.time || 0),
          0
        );
        setTotaltime(total);
      }
    };

    fetchRecords();
  }, []);

  return (
    <div className="App">
      <title>
        <h1>学習記録一覧</h1>
      </title>
      <Learning
        learningtext={learningtext}
        learningtime={learningtime}
        onChangetext={onChangetext}
        onChangetime={onChangetime}
        registerButton={registerButton}
      />
      {error}
      <Studycontents records={records} />
      <p>合計時間：{totaltime}/1000</p>
    </div>
  );
}
