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
                            keyword_name: arrayObject[i]['name']
                        }
                    }).then(value => {

                        if (value) {
                            arrayObject[i]['count'] += Number(value['keyword_count']);
                        }

                        // insert or update
                        keyword.upsert({
                            keyword_name: arrayObject[i]['name'],
                            keyword_count: arrayObject[i]['count']
                        }).then( (rr) => {
                            //console.log(rr)
                        })
                    });

                }



            }

            // Get - the number of value about keyword in redis
            (loop = (i) => {
                const promise = new Promise((resolve, reject) => {

                    redis.get(keys[i], (err, value) => {

                        if (err) throw err;

                        const obj = {
                            name: keys[i],
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
