import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class EnglishToBanglaNumberService {

  private englishToBanglaMap: { [key: string]: string } = {
    '0': '০',
    '1': '১',
    '2': '২',
    '3': '৩',
    '4': '৪',
    '5': '৫',
    '6': '৬',
    '7': '৭',
    '8': '৮',
    '9': '৯'
  };

  convertToBanglaNumber(englishNumber: string | number): string {
    const englishNumberStr = englishNumber.toString();
    let banglaNumber = '';

    for (const char of englishNumberStr) {
      banglaNumber += this.englishToBanglaMap[char] || char;
    }

    return banglaNumber;
  }
}