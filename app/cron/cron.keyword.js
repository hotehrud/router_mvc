const CronJob = require('cron').CronJob;
const redis = require('../redis')('keyword');
const keyword = require('../models')['Keyword'];

const job = new CronJob({
    cronTime: '* * * * * *',
    onTick: () => {
        console.log('every second Test');

        redis.keys('*', (err, keys) => {
            if (err) throw err;

            if (!keys.length) return;

            const arrayObject = [];

            const sum = () => {
                // count = db + redis
                for(let i in arrayObject) {

                    keyword.findOne({
                        attributes: ['keyword_count'],
                        where: {
                            keyword_name: arrayObject[i]['name'],
                            keyword_group: arrayObject[i]['group']
                        }
                    }).then(value => {

                        if (value) {
                            arrayObject[i]['count'] += Number(value['keyword_count']);
                        }

                        // insert or update
                        keyword.upsert({
                            keyword_name: arrayObject[i]['name'],
                            keyword_group: arrayObject[i]['group'],
                            keyword_count: arrayObject[i]['count']
                        }).then( (rr) => {
                            //console.log(rr)
                        }).catch(function (err) {
                            // handle error;
                            if (err) throw err;
                        });
                    });

                }



            }

            // Get - the number of value about keyword in redis
            (loop = (i) => {
                const promise = new Promise((resolve, reject) => {

                    redis.get(keys[i], (err, value) => {

                        const key = keys[i].split('&');

                        if (err) throw err;

                        const obj = {
                            name: key[0],
                            group: key[1],
                            count: Number(value)
                        }

                        arrayObject.push(obj);

                        // I think del-command than better flushall-command.
                        // In the result, Errors are reduced.
                        // Also they have the same time-complexity as O(N).
                        redis.del(keys[i]);

                        resolve(); // resolve it!
                    })

                })
                    .then( () => ++i < keys.length ? loop(i) : sum());

            })(0);

        })

    },
    start: false,
    timeZone: 'Asia/Seoul'
});

job.start();
