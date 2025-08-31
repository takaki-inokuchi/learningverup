export const Learning = (props) => {
  const {
    learningtext,
    learningtime,
    onChangetext,
    onChangetime,
    registerButton,
  } = props;
  return (
    <div>
      <p>
        学習内容
        <input value={learningtext} onChange={onChangetext} />
      </p>
      <p>
        学習時間
        <input value={learningtime} onChange={onChangetime} />
        時間
      </p>
      <p>入力されている学習：{learningtext}</p>
      <p>入力されている学習時間：{learningtime}時間</p>
      <button onClick={registerButton}>登録</button>
    </div>
  );
};
