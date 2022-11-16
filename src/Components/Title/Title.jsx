function Title(props) {
  var img = props.img;
  var title = props.title;

  if (!img) {
    return (
      <>
        <h3>{title}</h3>
      </>
    );
  } else {
    return (
      <>
        <img src={img} alt="img" className="img-title" />
        <h3 >{title}</h3>
      </>
    );
  }
}
export default Title;
