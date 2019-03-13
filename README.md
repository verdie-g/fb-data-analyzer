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

## Example output

```json
{
  "messages": {
    "countByDiscussion": {
      ...
      "friend #2": 10357,
      "friend #1": 12329,
      "group of friends": 15875,
      "thot": 47568
    },
    "countPerYear": {
      "2017": 66202,
      "2018": 40198,
      "2019": 4405
    },
    ...
  },
  "friends": {
    "newPerYear": {
      "2016": 44,
      "2017": 10,
      "2018": 21,
      "2019": 4
    },
    ...
  }
}
```

## View json with [fx](http://fx.wtf)

```
$ node index.js ./facebook-json-folder | fx
```

## How to delete facebook

[facebook.com/help/delete_account](https://www.facebook.com/help/delete_account)

I didn't do it because I'm weak.
