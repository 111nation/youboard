import "./Edit.css";

function TextArea(props) {
  let className = "edit " + (props.className ? props.className : "");
  return (
    <textarea
      name={props.name}
      placeholder={props.placeholder}
      className={className}
      value={props.value}
      onChange={props.onChange}
    ></textarea>
  );
}

export default TextArea;
