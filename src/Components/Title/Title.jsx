import './TitleStyle.css'

export const Title = (props) => {
  const img = props.img;
  const title = props.title;
  const container = props.containerStyles;
  const styles = props.titleStyles;

  return !img 
          ? 
            <div style={container}>
              <h1 style={styles}>
                {title}
              </h1>
            </div>
          :
          <div style={container}>
            <img src={img} alt="img" className="img-title" />
            <h1 style={styles}>
              {title}
            </h1>
          </div>
}