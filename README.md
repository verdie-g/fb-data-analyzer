# Facebook Data Analyzer

Generate an analyse in JSON of your Facebook activity.

## Requirements

Node >= 10

## Usage

- go to your [Facebook Information](https://www.facebook.com/settings?tab=your_facebook_information)
- download your data in json
- `unzip facebook-json.zip -d facebook-json-folder`
- `yarn install`
- `node index.js facebook-json-folder`

## Extract part of the result with [jq](https://stedolan.github.io/jq)
```
$ node index.js ./facebook-json-folder | jq '.messages.countPerYear'
{
  "2009": 18,
  "2010": 96,
  "2011": 1240,
  "2012": 1396,
  "2013": 8082,
  "2014": 10175,
  "2015": 16121,
  "2016": 27954,
  "2017": 66202,
  "2018": 40198,
  "2019": 4405
}
```

## How to delete facebook

[facebook.com/help/delete_account](https://www.facebook.com/help/delete_account)

I didn't do it because I'm weak.
