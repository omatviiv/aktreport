# Use

1. `aktreport init` generates ~/akt working directory and ~/akt/data.yml
Will newer delete anything and if working directory or data tempalte
already esists it will simply stop showing an error message.
2. fill in the data into a generated template ~/akt/data.yml
3. create ~/akt/aktconfig.yml providing values for sensitive info fields:
- amount (contract amount with currency and spelled amount)
- customer
- contractor
without these data `aktreport` will throw an error when generating akt report.
4. `aktreport` generates ~/akt/month-year.pdf akt for ~/akt/data.yml
5. `aktreport daily` generates status update for previous working day


# Akt working directory
Run `actreport init` to generate working directory.
Default working directory location with content example:
```
~/akt
| data.yml
| 06-2022.yml <- data file backup for June of 2022
| 06-2022.pdf <- generated akt for June of 2022
| 05-2022.yml <- data file backup for May of 2022
| 05-2022.pdf <- generated akt for May of 2022
```
To generate working directory in different location use `actreport init -p`.


# aktreport init
- creates akt working directory
  if directory exists and its location is undefined in config then
  a message is displayed:
  ```
  Couldn't create working directory because it already exists.
  Pls check its content and either remove it or specify another location.
  Use --path option of `aktreport init` see the `aktreport init --help` for
  more info.
  ```
- saves working directory location in the application config
  if application config contains saved working directory location it means
  that application no longer attempts to create working directory on
  `aktreport init` run. If you would want to intentionally change working dir
  location - run `aktreport init -p <new_location>`
- if working directory is defined in config and exists in the file system
  then `aktreport init` shows a message:
  ```
  Working directory in place - all good.
  Trying to generate data template file.
  ```
  and after that one of these steps will be done:
  * it will generate data template file if ~/akt/data.yml doesn't exist
  * if data template file doesn't exist it will show a message:
  ```
  Couldn't generate data template because it exists.
  Pls check <data-template-yml-file-location>.
  ```
- to check current working directory location run `aktreport -c, --config`

## aktreport init -p, --path <path>
By default aktreport init creates working directory in ~/akt
`aktreport init --path ~/gdrive/akt` creates working dir in another location
This option (-p, --path) also overrides working directory location to new
place i.e. it changes working directory location for the application.


# aktreport
- backups ~/akt/data.yml > ~/akt/07-2022.yml (removes data.yml)
- generates ~/akt/07-2022.pdf akt
- prints a message:
```
✓ Akt successfully generated: /Users/omatviiv/akt1/02-2023.pdf
✓ ~/akt/data.yml backed up as ~/akt/07-2022.yml.
✏ run 'aktreport init' to generate data.yml for new mont when new month starts
```

## aktreport -l, --list-only
Simply returns a list of the tasks for akt without building pdf or backing
up the data.yml file.

## aktreport -y, --yml <path-to-data-yml>
Default behaviour is to generate pdf akt for <working-dir>/data.yml file.
`aktreport -y ~/mycompany/10-2022.yml` will generate pdf akt for a
specified yml. If yml format is unexpected an error message will be shown:
```
Couldn't read data format.
```

# aktreport daily
- generates daily status for previous working day
  if previous day doesn't have any work items listed it will show a message:
  ```
  No work items at previous day. Showing daily for <day>
  ```
  And showing daily status for a closes day in the past days with some
  work items available.
- Every daily status mentions day number and name (Mon-Sun).

## aktreport daily -d, --day <day-number>
`aktreport daily -d 12` shows daily status for day number 12 in current month


# Development notes
- cd into project folder
- update code in src/
- run `npm run build`
- npm i -g - to update the application on development machine
- run application commands

## Resources
- https://blog.logrocket.com/creating-a-cli-tool-with-node-js/
- https://www.npmjs.com/package/commander#command-arguments
- https://www.npmjs.com/package/js-yaml
- https://www.npmjs.com/package/pdfkit
