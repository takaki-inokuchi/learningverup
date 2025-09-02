export const Studycontents = (props) => {
  const { records,deletebutton } = props;
  return (
    <div>
      <ul>
        {records.map((record, index) => (
          <li key={record.id}>
            {record.title} {record.time}時間
            <button onClick={() => deletebutton(record.id)}>TODOを削除</button>
          </li>
        ))}
      </ul>
    </div>  
  );
};
