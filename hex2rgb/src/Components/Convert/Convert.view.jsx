import { useState } from 'react'

export const Convert = () => {
  const [rgbInput, setRgbInput] = useState();
  const [hexInput, setHexInput] = useState({
    hexColor: '',
  })

  const hexToRgb = (hex) => {
    let c;
    if (!hex) return ''
    if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
      c = hex.substring(1).split('');
      if (c.length === 3) {
        c = [c[0], c[0], c[1], c[1], c[2], c[2]];
      }
      c = '0x' + c.join('');
      return 'rgb(' + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') + ')';
    }
    return 'Ошибка!';
  }

  const handleHexChange = evt => {
    setHexInput(prevHexInput => ({ ...prevHexInput, hexColor: evt.target.value }));
    if (evt.target.value.length >= 7) {
      const resultHex = hexToRgb(evt.target.value);
      setRgbInput(resultHex);
    }
    if (evt.target.value.length === 0) {
      setRgbInput('')
    }
  }

  return (
    <div className="container-box" style={{ backgroundColor: rgbInput === 'Ошибка!' ? 'rgb(234,75,52)' : rgbInput }}>
      <div className="container-boxes-input">
        <input
          className="input-hex"
          placeholder="Введите hex"
          type="text"
          name="hex"
          value={hexInput.hexColor}
          onChange={handleHexChange} />
        <input
          className='input-rgb'
          type="text" name="rgb"
          defaultValue={rgbInput}
          placeholder="RGB"
          readOnly
        />
      </div>
    </div>
  )
}
