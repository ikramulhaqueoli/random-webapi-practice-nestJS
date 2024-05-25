export class HoroscopeCalculatorUtil {
    private static dateToHoroscopeMap = [        // key is the start date of each range.
        { key: '03/21', value: 'Aries' },       // Mar 21 - Apr 19
        { key: '04/20', value: 'Taurus' },      // Apr 20 - May 20
        { key: '05/21', value: 'Gemini' },      // May 21 - Jun 21
        { key: '06/22', value: 'Cancer' },      // Jun 22 - Jul 22
        { key: '07/23', value: 'Leo' },         // Jul 23 - Aug 22
        { key: '08/23', value: 'Virgo' },       // Aug 23 - Sep 22
        { key: '09/23', value: 'Libra' },       // Sep 23 - Oct 23
        { key: '10/24', value: 'Scorpius' },    // Oct 24 - Nov 21
        { key: '11/22', value: 'Sagittarius' }, // Nov 22 - Dec 21
        { key: '12/22', value: 'Capricornus' }, // Dec 22 - Jan 19
        { key: '01/20', value: 'Aquarius' },    // Jan 20 - Feb 18
        { key: '02/19', value: 'Pisces' },      // Feb 19 - Mar 20
    ]

    public static getHoroscopeByBirthDay(birthday: Date): string {
        const month = birthday.getMonth() + 1; // getMonth() is zero-based
        const day = birthday.getDate();
        
        const birthString = `${month.toString().padStart(2, '0')}/${day.toString().padStart(2, '0')}`;
        
        for (let i = 0; i < this.dateToHoroscopeMap.length; i++) {
            const startDate = this.dateToHoroscopeMap[i].key;
            const endDate = this.dateToHoroscopeMap[(i + 1) % this.dateToHoroscopeMap.length].key;
            
            if (startDate <= birthString && birthString < endDate) {
                return this.dateToHoroscopeMap[i].value;
            }

            if (startDate === '12/22' && (birthString >= '12/22' || birthString < '01/20')) {
                return 'Capricornus';
            }
        }
        
        throw new Error('Invalid birthday');
    }
}
