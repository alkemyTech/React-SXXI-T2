import imagDefault from "../../resources/logo/img2.png";

function Title(props) {
  var img = props.img;
  var title = props.title;

  if (!img) {
    return (
      <>

          <img src={imagDefault} alt="img" className="title-img"/>
          <h3 className="title-t">{title}</h3>
      </>
    );
  } else {
    return (
      <>

          <img src={img} alt="img" className="title-img"/>
          <h3 className="title-t">{title}</h3>

      </>
    );
  }
}
export default Title;
