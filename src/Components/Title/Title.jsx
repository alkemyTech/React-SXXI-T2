function Title(props) {
  var img = props.img;
  var title = props.title;
  var imagDefault = "ACA VA LA IMAGEN DEFAULT"

  if (!img) {
    return (
      <>
        <img src={imagDefault} alt="img" />
        <h3>{title}</h3>
      </>
    );
  } else {
    return (
      <>
        <img src={img} alt="img" />
        <h3 >{title}</h3>
      </>
    );
  }
}
export default Title;
