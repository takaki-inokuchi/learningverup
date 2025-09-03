import { useState, useEffect } from "react";
import { Learning } from "./compornents/Learning";
import { Studycontents } from "./compornents/studycontents";
import "./index.css";
import { supabase } from "../supabase";

export default function App() {
  const [learningtext, setLeaningtext] = useState("");
  const [learningtime, setLeaningtime] = useState(0);
  const [records, setRecords] = useState([]);
  const [error, setError] = useState("");
  const [totaltime, setTotaltime] = useState(0);
  const [loading, setloading] = useState(false);

  const onChangetext = (event) => {
    setLeaningtext(event.target.value);
  };
  const onChangetime = (event) => {
    const value = event.target.value;
    setLeaningtime(parseInt(value, 10) || 0);
  };

  const registerButton = async () => {
    if (learningtext === "" || learningtime === "")
      return setError("入力されていない項目があります。");
    const newRecord = {
      title: learningtext,
      time: parseInt(learningtime, 10) || 0,
    };

    const { data, error } = await supabase
      .from("study-record")
      .insert([newRecord])
      .select();
    if (error) {
      console.error(error);
      setError("データの取得に失敗しました。");
    } else {
      setRecords([...records, data[0]]);
      setLeaningtext("");
      setLeaningtime("");
      setError("");
      setTotaltime(totaltime + (parseInt(learningtime, 10) || 0));
    }
  };

  const deletebutton = async (targetId) => {
    console.log("targetId:", targetId);

    const { data, error } = await supabase
      .from("study-record")
      .delete()
      .eq("id", targetId);
    if (error) {
      console.log(error);
      setError("データの削除に失敗しました");
    } else {
      console.log("削除成功！", data);
      setRecords(records.filter((record) => record.id !== targetId));
    }
  };

  useEffect(() => {
    const fetchRecords = async () => {
      setloading(true);
      const { data, error } = await supabase
        .from("study-record")
        .select("id, title, time");
      console.log("fetch data:", data);
      console.log("fetch error:", error);

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
      setloading(false);
    };

    fetchRecords();
  }, []);

  return (
    <div className="App">
      {loading ? (
        <p>データ取得中🐈・・・</p>
      ) : (
        <div>
          <h1 data-testid="title">Hello Jest</h1>
          <Learning
            learningtext={learningtext}
            learningtime={learningtime}
            onChangetext={onChangetext}
            onChangetime={onChangetime}
            registerButton={registerButton}
          />
          {error}
          <Studycontents records={records} deletebutton={deletebutton} />
          <p>合計時間：{totaltime}/1000</p>
        </div>
      )}
    </div>
  );
}
