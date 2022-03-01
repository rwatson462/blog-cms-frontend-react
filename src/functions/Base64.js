
export const Base64Encode = (str) => {
   return btoa(str)
}

export const Base64Decode = (str) => {
   return atob(str)
}

export const Base64EncodeUrl = (str) => {
   return Base64Encode(str).replaceAll('+','-').replaceAll('/','_')
}

export const Base64DecodeUrl = (str) => {
   return Base64Decode(str.replaceAll('-','+').replaceAll('_','/'))
}