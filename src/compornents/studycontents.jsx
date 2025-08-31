export const Studycontents = (props) => {
  const { records } = props;
  return (
    <div>
      <ul>
        {records.map((record, index) => (
          <li key={index}>
            {record.title} {record.time}時間
          </li>
        ))}
      </ul>
    </div>
  );
};
