# todo conventions
- task is not done yet
@ task is in progress
+ task is done

__fix__ - small fix that doesn't introduce new functionality

__feat__ - change that introduces new functionality but doesn't break backward compatibility

__break__ - change that breaks backward compatibility


# initial release
All of the tasks here are considered as __break__ because app is not
released yet.

## project setup
+ git repo setup
+ npm init
+ design documentation in TDD fashion (design application interface first)
+ todo.md file
+ setup jest

## cli functionality
+ aktreport --version
  + add genversion package to extract version from package.json
    because importing a package.json into the application exposes not just
    version which maybe a security issue, genversion grabs version only
  + add husky to define pre-commit hook to autogenerate ./src/version.cjs
+ aktreport -c, --config - to list current working directory and other
  config values if any
+ aktreport init
  + application config (conf library)
  + working directory creation
    + create working direcatory taking into account config and its existence
    + aktreport init --path <workin_dir_location>
    + generate data template yml
      + generate template data with pure function
      + write data template to <workingDir>/data.yml
      + handle case if data template already created
+ aktreport
  + generate pdf akt report
    + pure function to generate list of done tasks for the report
    + aktreport -l, --list-only
    + generate pdf report
    + handle case when pdf report already exists
    + handle case when data template doesn't exist
    @ aktreport -y, --yml <data_template_location>
  + remove & backup data template
- aktreport daily
  - handle case when prev day doesn't have any work items
  - aktreport daily -d, --day <day-number>


# 0.0.1 hide sensitive data
  + specify aktconfig.yml requirement in the README.md
  + read akt sensitive data from <workingDirectory>/aktconfig.yml
  - recreate repository or remove commit history

# next release
