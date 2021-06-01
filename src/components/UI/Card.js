import "./Card.css";

export default function Card(props) {
  const classes = "card " + props.className;
  return (
    <div style={props.styles} className={classes}>
      {props.children}
    </div>
  );
}
