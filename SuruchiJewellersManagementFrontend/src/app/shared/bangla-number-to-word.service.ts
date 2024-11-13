import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class BanglaNumberToWordService {
  private singleDigitMap: { [key: string]: string } = {
    '0': 'শূন্য', '1': 'এক', '2': 'দুই', '3': 'তিন', '4': 'চার',
    '5': 'পাঁচ', '6': 'ছয়', '7': 'সাত', '8': 'আট', '9': 'নয়'
  };

  private tensMap: { [key: string]: string } = {
    '10': 'দশ', '20': 'বিশ', '30': 'ত্রিশ', '40': 'চল্লিশ',
    '50': 'পঞ্চাশ', '60': 'ষাট', '70': 'সত্তর', '80': 'আশি', '90': 'নব্বই'
  };

  private teenMap: { [key: string]: string } = {
    '11': 'এগারো', '12': 'বারো', '13': 'তেরো', '14': 'চৌদ্দ', 
    '15': 'পনেরো', '16': 'ষোল', '17': 'সতেরো', '18': 'আঠারো', '19': 'উনিশ',
    '21': 'একুশ', '31': 'একত্রিশ', '41': 'একচল্লিশ', '51': 'একান্ন', 
    '61': 'একষট্টি', '71': 'একাত্তর', '81': 'একাশি', '91': 'একানব্বই',
    '22': 'বাইশ', '32': 'বত্রিশ', '42': 'বিয়াল্লিশ', '52': 'বাহান্ন',
    '62': 'বাষট্টি', '72': 'বাহাত্তর', '82': 'বিরাশি', '92': 'বিরানব্বই',
    '23': 'তেইশ', '33': 'তেত্রিশ', '43': 'তেতাল্লিশ', '53': 'তিপ্পান্ন',
    '63': 'তেষট্টি', '73': 'তিয়াত্তর', '83': 'তিরাশি', '93': 'তিরানব্বই',
    '24': 'চব্বিশ', '34': 'চৌত্রিশ', '44': 'চুয়াল্লিশ', '54': 'চুয়ান্ন',
    '64': 'চৌষট্টি', '74': 'চুয়াত্তর', '84': 'চুরাশি', '94': 'চুরানব্বই',
    '25': 'পঁচিশ', '35': 'পঁইত্রিশ', '45': 'পঁইতাল্লিশ', '55': 'পঞ্চান্ন',
    '65': 'পঁষট্টি', '75': 'পঁচাত্তর', '85': 'পঁচাশি', '95': 'পঁচানব্বই',
    '26': 'ছাব্বিশ', '36': 'ছত্রিশ', '46': 'ছেচল্লিশ', '56': 'ছাপ্পান্ন',
    '66': 'ছেষট্টি', '76': 'ছিয়াত্তর', '86': 'ছিয়াশি', '96': 'ছিয়ানব্বই',
    '27': 'সাতাশ', '37': 'সাঁইত্রিশ', '47': 'সাতচল্লিশ', '57': 'সাতান্ন',
    '67': 'সাতষট্টি', '77': 'সাতাত্তর', '87': 'সাতাশি', '97': 'সাতানব্বই',
    '28': 'আটাশ', '38': 'আটত্রিশ', '48': 'আটচল্লিশ', '58': 'আটান্ন',
    '68': 'আটষট্টি', '78': 'আটাত্তর', '88': 'আটাশি', '98': 'আটানব্বই',
    '29': 'উনত্রিশ', '39': 'ঊনচল্লিশ', '49': 'ঊনপঞ্চাশ', '59': 'ঊনষাট',
    '69': 'ঊনসত্তর', '79': 'ঊনআশি', '89': 'ঊননব্বই', '99': 'নিরানব্বই'
  };

  convertBanglaNumberToWord(banglaNumber: string): string {
    // Convert Bangla digits to English digits
    const numericValue = parseInt(this.convertBanglaToEnglish(banglaNumber), 10);
    if (isNaN(numericValue)) {
      return 'অবৈধ ইনপুট'; // Invalid input
    }
    return this.numberToWord(numericValue);
  }

  private convertBanglaToEnglish(banglaNumber: string): string {
    // Map each Bangla digit to its English counterpart
    const banglaToEnglishMap: { [key: string]: string } = {
      '০': '0', '১': '1', '২': '2', '৩': '3', '৪': '4',
      '৫': '5', '৬': '6', '৭': '7', '৮': '8', '৯': '9'
    };
    return banglaNumber.split('').map(digit => banglaToEnglishMap[digit] || digit).join('');
  }

  private numberToWord(num: number): string {
    if (num === 0) return 'শূন্য';
    if (num < 10) return this.singleDigitMap[num.toString()] || '';
    if (num < 20) return this.teenMap[num.toString()] || '';
    if (num < 100) {
      const tens = Math.floor(num / 10) * 10;
      const units = num % 10;
      return units === 0 
        ? this.tensMap[tens.toString()]
        : this.teenMap[`${tens + units}`] || `${this.tensMap[tens.toString()]} ${this.singleDigitMap[units.toString()]}`;
    }
    if (num < 1000) {
      const hundreds = Math.floor(num / 100);
      const remainder = num % 100;
      return remainder === 0
        ? `${this.singleDigitMap[hundreds.toString()]}শ`
        : `${this.singleDigitMap[hundreds.toString()]}শ ${this.numberToWord(remainder)}`;
    }
    if (num < 100000) {
      const thousands = Math.floor(num / 1000);
      const remainder = num % 1000;
      return remainder === 0
        ? `${this.numberToWord(thousands)} হাজার`
        : `${this.numberToWord(thousands)} হাজার ${this.numberToWord(remainder)}`;
    }
    if (num < 10000000) {
      const lakhs = Math.floor(num / 100000);
      const remainder = num % 100000;
      return remainder === 0
        ? `${this.numberToWord(lakhs)} লাখ`
        : `${this.numberToWord(lakhs)} লাখ ${this.numberToWord(remainder)}`;
    }
    if (num < 1000000000) {
      const crores = Math.floor(num / 10000000);
      const remainder = num % 10000000;
      return remainder === 0
        ? `${this.numberToWord(crores)} কোটি`
        : `${this.numberToWord(crores)} কোটি ${this.numberToWord(remainder)}`;
    }
    return 'সংখ্যা বড়';
  }
}