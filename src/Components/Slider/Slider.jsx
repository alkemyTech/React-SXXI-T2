import { Button } from "antd"
import { useSlider } from "../../Hooks"
import { RightOutlined, LeftOutlined } from '@ant-design/icons'

export function Slider() {
    const {
        selectedImage,
        previous,
        next,
        isLoaded,
        setIsLoaded
    } = useSlider()


    return (
        <>
            <div className="carrousel-container">
                    <img 
                        className={`image-carrousel ${isLoaded ? 'image-carrousel--loaded' : ''}`}  
                        src={selectedImage.image} 
                        alt={selectedImage.description} 
                        onLoad={() => setIsLoaded(true)}
                    />

                <Button 
                    type="primary"
                    shape="circle"
                    icon={<LeftOutlined />}
                    className='image-carrousel__button image-carrousel__button--left'
                    onClick={previous}
                />
                <Button 
                    type="primary"
                    shape="circle"
                    icon={<RightOutlined />}
                    className='image-carrousel__button image-carrousel__button--right'
                    onClick={next}
                />
            </div>
        </>
    )
}
