export default {
  disabled: false,
  orientation: 'vertical',
  icons: ['bold', 'italic', 'underline'],
  iconImages: {
    bold: 'http://localhost:1337/v2/cms-assets/icons/bold.png',
    underline: 'http://localhost:1337/v2/cms-assets/icons/underline.png',
    italic: 'http://localhost:1337/v2/cms-assets/icons/italic.png',
  },
  iconStyle: {
    height: 15,
    width: 15,
    border: 'solid gray 1px',
    padding: 10,
    onHover: {
      backgroundColor: 'white'
    }
  }
}