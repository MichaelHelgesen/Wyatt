const Menu = ({ test }) => {
  return (
    <ul style={{ listStyleType: "none", display: "flex", justifyContent: "space-between", flexWrap:"wrap", padding: "0"}}>
      {test.map((item, index) => {
        return <li key={index} style={{padding:"0 5px 0 0"}}>{item.title}</li>;
      })}
    </ul>
  );
};

export default Menu;
