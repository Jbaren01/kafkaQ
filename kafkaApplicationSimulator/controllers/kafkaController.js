const { EventEmitter } = require('events');
const { Kafka } = require('kafkajs');
// const { HEARTBEAT } = consumer.events;


const kafkaController = {};

kafkaController.produceMessage = async (req, res, next) => {
                                                             // const removeListener = consumer.on(HEARTBEAT, (e) =>
                                                             //   console.log(`heartbeat at ${e.timestamp}`)
                                                             // );

                                                             try {
                                                               const kafka = new Kafka(
                                                                 {
                                                                   clientId:
                                                                     'myapp',
                                                                   brokers: [
                                                                     'Jonathans-iMac.local:9092',
                                                                   ],
                                                                 }
                                                               );
                                                               const producer = kafka.producer();
                                                               console.log(
                                                                 'connecting...'
                                                               );
                                                               await producer.connect();
                                                               console.log(
                                                                 'connected!'
                                                               );

                                                               const {
                                                                 msg,
                                                               } = req.body;
                                                               console.log(msg);

                                                               const partition =
                                                                 msg[0].toLowerCase() <
                                                                 'n'
                                                                   ? 0
                                                                   : 1;
                                                               const result = await producer.send(
                                                                 {
                                                                   topic:
                                                                     'Users',
                                                                   messages: [
                                                                     {
                                                                       value: msg,
                                                                       partition: partition,
                                                                     },
                                                                   ],
                                                                 }
                                                               );
                                                               console.log(
                                                                 `send successfully! ${JSON.stringify(
                                                                   result
                                                                 )}`
                                                               );
                                                               await producer.disconnect();
                                                             } catch (err) {
                                                               console.error(
                                                                 `ERROR: ${err}`
                                                               );
                                                             } finally {
                                                               next();
                                                             }
                                                           };

module.exports = kafkaController;
