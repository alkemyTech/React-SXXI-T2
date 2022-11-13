
export const cleanDescription = (text = '') => {

    if(!text) { return void 0 }

    return text?.includes('<') ? text.substring(3, text.length - 4) : text
}