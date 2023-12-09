import {format} from 'date-fns';
import {uk} from 'date-fns/locale/index.js';
import PDFDocument from 'pdfkit';
import {createWriteStream, existsSync, copyFileSync, unlinkSync} from 'fs';
import {conf} from '../../index.mjs';
import {getTasksList} from './tasks-list.mjs';
import {done, err, info} from '../../style.mjs';

export const generateReport = (data, aktconfig) => {
  const workingDirectory = conf.get('workingDirectory');
  const font = conf.get('font');
  const fontBold = conf.get('font-bold');
  const c = new Date();
  const cDay = format(c, 'dd');
  const cMonth =format(c, 'MMMM', {locale: uk}); 
  const cYear = format(c, 'yyyy');
  const aktLocation = `${workingDirectory}/${data.month}.pdf`;
  const dataYmlLocation = `${workingDirectory}/data.yml`;
  const dataYmlBackupLocation = `${workingDirectory}/${data.month}.yml`;

  if (!!data) {
    if (!existsSync(aktLocation)) {
      const tasksList = getTasksList(data);

      const pdf = new PDFDocument({
        margins: {
          top: 40,
          bottom: 40,
          left: 30,
          right: 30,
        },
      });

      pdf.pipe(createWriteStream(aktLocation));

      pdf
        .fontSize(11)
        .font(fontBold)
        .text('Акт', {align: 'center'})
        .font(font)
        .text(`м.Львів                                                                                                                    ${
          cDay
        } ${
          cMonth
        } ${
          cYear
        }р.`)
        .moveDown()
        .text(`${aktconfig.customer}, надалі - `, {
          align: 'justify',
          continued: true,
        })
        .font(fontBold)
        .text('Замовник, ', {
          continued: true,
        })
        .font(font)
        .text('з однієї сторони, та')
        .text(`${aktconfig.contractor}, надалі - `, {
          align: 'justify',
          continued: true,
        })
        .font(fontBold)
        .text('Виконавець, ', {
          continued: true,
        })
        .font(font)
        .text('з іншої сторони, разом іменовані Сторони і окремо – Сторона, склали даний Акт приймання-передачі наданих послуг (надалі - Акт) про наступне.')
        .moveDown()
        .text(`1. Сторони по даному Акту підтверджують, що станом на ${
          cDay
        } ${
          cMonth
        } ${
          cYear
        }р. Виконавцем фактично надані, а Замовником прийняті послуги згідно ${aktconfig.contract} (надалі - Договір):`, {
          align: 'justify',
        })
        .text(tasksList, {
          indent: 20,
        })
        .moveDown()
        .text('2. Загальна вартість винагороди Виконавця складає ', {
          continued: true,
        })
        .font(fontBold)
        .text(aktconfig.amount)
        .font(font)
        .text('3. На момент підписання даного акту винагорода Замовником не сплачена.')
        .text('4. На момент підписання даного Акту недоліків в наданих послугах (роботах) не виявлено, претензій щодо наданих послуг (робіт) у Замовника немає.')
        .text('5. Винагорода Виконавця підлягає сплаті в порядку, передбаченому Договором впродовж ', {
          continued: true,
        })
        .font(fontBold)
        .text('5', {
          continued: true,
        })
        .font(font)
        .text(' календарних днів з моменту підписання даного Акту (п.4.3 Договору).')
        .text(`6. Даний Акт складено українською мовою за вийнятком назв завдань, які подані мовою оригіналу - англійською, в двох примірниках по одному для кожної із сторін, є невід’ємною частиною ${aktconfig.contract}`)
        .moveDown(2)
        .font(fontBold)
        .text('Виконавець________________________________________________________ /Матвіїв Олег Iгорович')
        .moveDown(2)
        .text('Замовник _________________________________________________________ /_______________________________(П.I.Б)')

      pdf.end();

      console.log(`${done} Akt successfully generated: ${aktLocation}`);

      // backup data.yml
      copyFileSync(dataYmlLocation, dataYmlBackupLocation);
      unlinkSync(dataYmlLocation);
      console.log(`${done} ${dataYmlLocation} backed up as ${dataYmlBackupLocation}`);
      console.log(`${info} run 'aktreport init' to generate data.yml for new mont when new month starts`);
    }
    else {
      console.log(`${err} Can't create akt report because it already exists.`);
      console.log(`${info} Pls check ${aktLocation} rename or remove it and try again.`);
    }
  }
};
