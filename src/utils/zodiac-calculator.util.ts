import * as fs from 'fs';
import { promisify } from 'util';

interface ZodiacData {
  [key: string]: string;
}

export class ZodiacCalculatorUtil {
  private static zodiacData: ZodiacData;

  private static async loadZodiacData() {
    try {
      const readFile = promisify(fs.readFile);
      const jsonData = await readFile('./zodiac-data.json', 'utf8');
      this.zodiacData = JSON.parse(jsonData);
    } catch (error) {
      console.error(`Error loading zodiac data: ${error.message}`);
    }
  }

  public static getZodiacSign(birthdate: Date) {
    this.loadZodiacData();

    const birthdateString = birthdate.toISOString().slice(0, 10).replace(/-/g, '');

    for (const range in this.zodiacData) {
      const [start, end] = range.split('-');

      if (birthdateString >= start && birthdateString <= end) {
        return this.zodiacData[range];
      }
    }

    return null;
  }
}
