const setting = document.querySelector('.settings')
setting.addEventListener('click', ()=>{

     const SettingDialog = document.querySelector('.setting-dialog')
     SettingDialog.showModal()

     const settingExit = document.querySelector('.setting-exit')
     settingExit.addEventListener('click', ()=>{
          SettingDialog.close()
     })

     const mainColor = document.querySelector('.main-color')
     mainColor.value = userSettings.mainColor
     mainColor.addEventListener('change', ()=>{
          const color = hexToHSL(mainColor.value)

          userSettings.mainColor = color[0]
          userSettings.mainHover =  color[1]
          renderColor()
     })

     const backgroundColor = document.querySelector('.background-color')
     backgroundColor.addEventListener('change', ()=>{
          const color = hexToHSL(backgroundColor.value)

          userSettings.backgroundColor = color[0]
          renderColor()
     })

     const xxColor = document.querySelector('.color')
     xxColor.addEventListener('change', ()=>{
          const color = hexToHSL(xxColor.value)

          userSettings.color = color[0]
          renderColor()
     })

     const favicon = document.querySelector('.favicon')
     favicon.addEventListener('change', ()=>{
          userSettings.favicon = favicon.value
          renderItems()
     })

     const faviconQuility = document.querySelector('.favicon-quility')
     faviconQuility.addEventListener('change', ()=>{
          userSettings.faviconSize = Number(faviconQuility.value)
          renderItems()
     })

})

function hexToHSL(H) {
     // Convert hex to RGB first
     let r = 0, g = 0, b = 0;
     if (H.length == 4) {
       r = "0x" + H[1] + H[1];
       g = "0x" + H[2] + H[2];
       b = "0x" + H[3] + H[3];
     } else if (H.length == 7) {
       r = "0x" + H[1] + H[2];
       g = "0x" + H[3] + H[4];
       b = "0x" + H[5] + H[6];
     }
     // Then to HSL
     r /= 255;
     g /= 255;
     b /= 255;
     let cmin = Math.min(r,g,b),
         cmax = Math.max(r,g,b),
         delta = cmax - cmin,
         h = 0,
         s = 0,
         l = 0;
   
     if (delta == 0)
       h = 0;
     else if (cmax == r)
       h = ((g - b) / delta) % 6;
     else if (cmax == g)
       h = (b - r) / delta + 2;
     else
       h = (r - g) / delta + 4;
   
     h = Math.round(h * 60);
   
     if (h < 0)
       h += 360;
   
     l = (cmax + cmin) / 2;
     s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
     s = +(s * 100).toFixed(1);
     l = +(l * 100).toFixed(1);

     return ["hsl(" + h + "," + s + "%," + l + "%)", "hsl(" + h + "," + s + "%," + (l-4) + "%)"];
}

function HSLToHex(h,s,l) {
  s /= 100;
  l /= 100;

  let c = (1 - Math.abs(2 * l - 1)) * s,
      x = c * (1 - Math.abs((h / 60) % 2 - 1)),
      m = l - c/2,
      r = 0,
      g = 0, 
      b = 0; 

  if (0 <= h && h < 60) {
    r = c; g = x; b = 0;
  } else if (60 <= h && h < 120) {
    r = x; g = c; b = 0;
  } else if (120 <= h && h < 180) {
    r = 0; g = c; b = x;
  } else if (180 <= h && h < 240) {
    r = 0; g = x; b = c;
  } else if (240 <= h && h < 300) {
    r = x; g = 0; b = c;
  } else if (300 <= h && h < 360) {
    r = c; g = 0; b = x;
  }
  // Having obtained RGB, convert channels to hex
  r = Math.round((r + m) * 255).toString(16);
  g = Math.round((g + m) * 255).toString(16);
  b = Math.round((b + m) * 255).toString(16);

  // Prepend 0s, if necessary
  if (r.length == 1)
    r = "0" + r;
  if (g.length == 1)
    g = "0" + g;
  if (b.length == 1)
    b = "0" + b;

  return "#" + r + g + b;
}