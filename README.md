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
      ...
      "2017": 66202,
      "2018": 40198,
      "2019": 4405
    },
    "distribution": {
      ...
      "group of friends": {
        "Me": 21.479472788043136,
        "Friend #1": 20.01639654411301,
        "Friend #2": 20.003783817872232,
        "Friend #3": 11.950558113136154,
        "Friend #4": 16.6298795484644,
        "Friend #5": 5.051396859431166,
        "Friend #6": 2.699123415526266,
        "Friend #7": 1.2423535347165289,
      }
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
