import { classNames } from "../../helpers/classNames";

const TextField = (props) => {
  return (
    <div className="form-group">
      <input
        type={props.type}
        className={classNames("form-control form-control-lg", {
          "is-invalid": props.error,
        })}
        placeholder={props.placeholder}
        name={props.name}
        value={props.value}
        onChange={props.onChange}
      />
      {props.info && (
        <small className="form-text text-muted">{props.info}</small>
      )}
      {props.error && <div className="invalid-feedback">{props.error}</div>}
    </div>
  );
};

export default TextField;
