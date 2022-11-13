
export const truncateText = (text, maxLength = 167) => {
    const MAX_LENGTH = maxLength

    if(!text) { return }

    if(text.length >= MAX_LENGTH) {
        return text.substring(0, MAX_LENGTH).concat('...')
    }else{
        return text
    }
}