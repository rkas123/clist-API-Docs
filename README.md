# clist API Documentation

- In this Documentation, I will through the cplist API for _Contests_ only.
- clist provides an API which gives information about all the past and future contests on various Coding Platforms.
- I recently built a [React Project](https://thirsty-kilby-5c3c7c.netlify.app/signin) Using the clist API.

## <br/>

# STEPS

## 1. **Get Your API Key from clist**

- Create an Account on [clist](https://clist.by/)
- Go the API section and get your API key

## <br/>


## 2. **Data Format**

### Received Data will look like this

```javascript
{
    "meta": {
        "limit": 1,
        "next": "/api/v1/contest/?username={}&api_key={}&resource__id__in=1%2C2&limit=1&offset=1",
        "offset": 0,
        "previous": null,
        "total_count": 3002
    },
    "objects": [
        {
            "duration": 7200,
            "end": "2018-12-15T16:35:00",
            "event": "Educational Codeforces Round 56 (Rated for Div. 2)",
            "href": "http://codeforces.com/contests/1093",
            "id": 13281548,
            "resource": {
                "icon": "/imagefit/static_resize/64x64/img/resources/codeforces_com.png",
                "id": 1,
                "name": "codeforces.com"
            },
            "start": "2018-12-15T14:35:00"
        }
    ]
}
```

- Meta: Contains all meta data related to the API call.
- objects: Array of JS ojects. Each objects consists of data related to the Contest.

```javascript
    // Schema Representation
    {
        meta: {
            limit : 1,                          // Integer value, default set to 100.
            next : "",                          // String, consists of parameters of API
            total_count : 3002                  //Int, total number of valid contests
        },
        objects:                                // Array of Javascript Objects. Each Objects represents an unique contest
        [
            {
                duration: 3600,                 //Integer, Duration of contest in seconds
                end: "2018-12-15T16:35:00",     // Ending Time in YYYY-MM-DD T HH:MM:SS format
                event: "",                      // String, Name of contest
                href: "" ,                      //Link to contest
                id: "",                         // Integer, Unique Id of contest
                start: "2018-12-15T14:35:00" ,  //Starting Time of Contest
                resource:                       //Consists of information about the platform
                {
                    icon: "",                   //Address of image in clist database, You can't access, relative path
                    id: 1,                      //Integer, resource_id of the platform
                    name: "",                   //Link to Home Page of the platform
                }
            },

        ]
    }
```


## <br/>

## 3. **Filtering Data Fetched from API**

- With API key you are all set to start fetching data from clist API.
- > https://clist.by/api/v1/contest/?username=${username}&api_key=${apiKey}
  - The data returned by the above API call will not be of any practical use as it consists for random contests.

## <br/>

# **Filters**

## **limit**

Specifies the number of elements that are returned of the API call.

> https://clist.by/api/v1/contest/?username=${username}&api_key=${apiKey}&limit=30

## <br/>

## **id**

Each Contest in the clist database has an unique id associated with it. This filter can be used to get info of a particular contest.

> https://clist.by/api/v1/contest/?username=${username}&api_key=${apiKey}&id=23990128

## <br/>

## **id\_\_in**

To get info of mulitple contests. Integer Ids must be separated by _comma_.

> https://clist.by/api/v1/contest/?username=${username}&api_key=${apiKey}&id__in=23990128,13281548

## <br/>

## **resource_id**

- Each platfrom has an unique resource_id associated with it. We can filter data by providing the resource_id of a platform of your choice.
- clist doesn't provide the resource ids publically, but I have written a NodeJS program which extracts the platform associated with each resource_id.
- You can find the code in [here]().
- Nevertheless, some useful data is here->

| resource_id | Platform                                              |
| ----------- | ----------------------------------------------------- |
| 1           | Codeforces                                            |
| 2           | Codechef                                              |
| 3           | UVA                                                   |
| 12          | Topcoder                                              |
| 25          | USACO                                                 |
| 26          | SPOJ                                                  |
| 29          | Facebook Hackercup                                    |
| 35          | Google Coding Contests (Kickstart, Codejam, HashCode) |
| 63          | Hackerrank                                            |
| 65          | Project Euler                                         |
| 67          | Yandex                                                |
| 73          | Hackerearth                                           |
| 74          | Kaggle                                                |
| 82          | IOI                                                   |
| 90          | CSAcademy                                             |
| 93          | Atcoder                                               |
| 102         | LeetCode                                              |

> https://clist.by/api/v1/contest/?username=${username}&api_key=${apiKey}&resource_id=1

## <br/>

## **resource\_\_id\_\_in**

> ## NOTE
>
> The Official 'Try' says, _'resource_id\_\_in'_ but actually it is _'resource\_\_id\_\_in'_. Offical 'Try' is incorrect.

- We can also fetch data of mulitple resource*id in 1 API call. Separate the resource_ids by a \_comma*.

> https://clist.by/api/v1/contest/?username=${username}&api_key=${apiKey}&resource__id__in=1,2

## <br/>

## **Start and End Time Filters**

| Filter Name  | Description                                                   |
| ------------ | ------------------------------------------------------------- |
| start\_\_gt  | Starting time **strictly greater** than the specified time    |
| start\_\_gte | Starting time **greater than or equal** to the specified time |
| start\_\_lt  | Starting time **strictly less** than the specified time       |
| start\_\_lte | Starting time **less than or equal** to the specified time    |
| end\_\_gt    | Ending time **strictly greater** than the specified time      |
| end\_\_gte   | Ending time **greater than or equal** to the specified time   |
| end\_\_lt    | Ending time **strictly less** than the specified time         |
| end\_\_lte   | Ending time **less than or equal** to the specified time      |

- Similar Filters are also available for duration too.

## <br/>

## **order_by**

We can get data sorted in desired order. This field only accepts certain values.

| Value        | Description      | Order      |
| ------------ | ---------------- | ---------- |
| id           | contest Id       | ascending  |
| -id          | contest Id       | descending |
| start        | starting time    | ascending  |
| -start       | starting time    | descending |
| end          | ending time      | ascending  |
| -end         | ending time      | descending |
| duration     | contest duration | ascending  |
| -duration    | contest duration | descending |
| resource_id  | resource_id      | ascending  |
| -resource_id | resource_id      | descending |

## <br/>


## 4. **Caution**

### clist API has a throttle of only **6 API calls per minute**. If a user crosses the limit, the user will receive an Error Code 429!!

### For multiple API calls, without crossing the throttle, we need to use **setTimeout** function in javascript. For Demo, refer to [my code]() I used for fetching resource_ids.

## <br/>


## 5. **Complete List of Resources clist Provides**

- [Find it here]()

