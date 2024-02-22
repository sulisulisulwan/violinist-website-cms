import { ParsedHTMLComponent } from 'suli-violin-website-types/src'

export const componentParser = (text: string): ParsedHTMLComponent[] => {
  
  const createParagraphComponent = (): ParsedHTMLComponent => {
    return {
      type: 'p',
      content: ''
    }
  }

  const components = []

  let currComponent = null

  for (let i = 0; i < text.length; i++) {

    let currChar = text[i]

    if (currChar === '\r' || currChar === '\n') {
      if (currComponent !== null) {
        components.push(currComponent)
        currComponent = null
      }
      continue
    }
    
    if (currComponent === null) currComponent = createParagraphComponent()
    currComponent.content += currChar
  }

  if (currComponent) components.push(currComponent)

  return components

}