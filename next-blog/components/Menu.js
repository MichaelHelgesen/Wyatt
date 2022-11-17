const Menu = ({ test }) => {
  return (
    <ul
      style={{
        listStyleType: "none",
        display: "flex",
        justifyContent: "space-between",
        flexWrap: "wrap",
        padding: "20px",
        borderBottom: "1px solid black",
        borderTop: "1px solid black",
      }}
    >
      {test[0].menupages.map((item, index) => {
        return (
          <li key={index} style={{ padding: "0 5px 0 0" }}>
            <a href={item.slug.current}>{item.title}</a>
          </li>
        );
      })}
    </ul>
  );
};

export default Menu;
