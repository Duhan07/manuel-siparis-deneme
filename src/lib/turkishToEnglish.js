export function turkishToEnglish(text) {
    const specialChars = {
      ı: "i",
      ö: "o",
      Ö: "O",
      ü: "u",
      Ü: "U",
      ş: "s",
      Ş: "S",
      ğ: "g",
      Ğ: "G",
      ç: "c",
      Ç: "C",
      İ: "i",
      I: "i",
    };

    text = text.toLowerCase().replace(/\s+/g, "-").replace(/['"]/g, "");

    let result = "";
    for (let char of text) {
      if (char in specialChars) {
        result += specialChars[char];
      } else if (!/[a-zA-Z0-9\s-]/.test(char)) {
        result += "-";
      } else {
        result += char;
      }
    }

    return result;
  }